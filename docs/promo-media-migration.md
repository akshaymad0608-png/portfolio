# Promo media: moving it out of the repo

`public/promo/` used to hold about 712 MB of Instagram/Reels media (103 videos and
114 cover images). It was deployed with the site, sat in git history and was
publicly downloadable from `akshay.website/promo/...`, but no page, script or
other repo here links to it. The folder was removed from the repo in this change.
Media for reels now belongs in object storage, not in the site repo.

## Where it lives now: Cloudflare R2

R2 has a free tier (10 GB of storage, no charge for downloads), so a media bucket
costs nothing at this size.

1. In Cloudflare, create a bucket (for example `akshay-media`).
2. Make it publicly readable through a custom domain such as `media.akshay.website`.
   The custom domain needs the domain's DNS to be managed by Cloudflare. If
   `akshay.website` DNS lives elsewhere, either move that DNS to Cloudflare or use a
   separate domain on Cloudflare. The `*.r2.dev` URL works for a quick test but is
   rate-limited and not meant for production.
3. Upload only what you still need to publish, keeping the folder layout:

   ```bash
   # one-time: rclone config  ->  type "s3", provider "Cloudflare", the R2 endpoint and API token
   rclone copy ./promo r2:akshay-media/promo --progress
   ```

4. Point the automation that publishes reels (n8n, Metricool, Meta Business Suite)
   at `https://media.akshay.website/promo/<file>`. Instagram's API fetches the video
   from a public URL when a post is created, so the URL must return the file
   directly (HTTP 200, `Content-Type: video/mp4`, no login or redirect).
5. Publish one test post and confirm it goes out before using it for the rest.

Reels that are already posted live on Instagram/YouTube; the originals only need to
be kept somewhere private (Drive or a disk), not on a public URL.

## Before merging the PR that removes the folder

- Make a private backup of `public/promo/` (it is still in git history, but keep a copy).
- Search the publishing workflows for `akshay.website/promo` and move any hit to the new URL.
- Check scheduled posts in Metricool / Meta Business Suite; a post that points at the
  old URL will fail after the deploy.
- In Vercel, Usage, look at recent requests for `/promo/` to see whether anything still fetches it.

## After merging

`/promo/...` URLs return the site's 404 page (which is `noindex`). `robots.txt` keeps
`Disallow: /promo/` so crawlers stop trying. If something breaks, restore a file with:

```bash
git checkout <commit-before-removal> -- public/promo/<path-to-file>
```

Do not rewrite git history to shrink the repo: it needs a force-push to `main`, breaks
clones, forks and open PRs, and removes the easy rollback above. A fresh shallow
clone (`git clone --depth 1`) only downloads the latest files, so it is small once
the folder is gone from `main`.
