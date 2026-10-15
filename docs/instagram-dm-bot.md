# Instagram auto-reply bot

`api/instagram-webhook.ts` answers two things on the @akshay.website account:

- **Comments** that contain a trigger word (website, price, quote, chatbot, demo, details, info, link, book): the commenter gets a private DM with the services link and the call link, and a short public reply "Sent you a DM with the details."
- **Direct messages**: answered by the same Gemini assistant as the site chat, in the language the person wrote in, in three short sentences.

Nothing is sent to our own account's messages or to echoes, so it cannot loop.

## One-time setup (needs the account owner)

1. Meta for Developers: create an app (type Business), add the **Instagram** product, and connect the professional account @akshay.website.
2. Generate an Instagram access token with `instagram_business_basic`, `instagram_business_manage_messages` and `instagram_business_manage_comments`.
3. In Vercel, project `portfolio`, add these environment variables for Production, then redeploy:
   - `IG_VERIFY_TOKEN`: any string you choose
   - `IG_APP_SECRET`: the Meta app secret
   - `IG_ACCESS_TOKEN`: the token from step 2
   - `IG_USER_ID`: `17841443589108118`
   - `GEMINI_API_KEY` is already set.
4. In the Meta app, Webhooks, Instagram: callback URL `https://akshay.website/api/instagram-webhook`, verify token = `IG_VERIFY_TOKEN`, and subscribe to `comments` and `messages`.
5. While the Meta app is in Development mode it only answers accounts that have a role on the app (admin, developer, tester). To answer the public it needs Advanced Access for the messaging permissions, which Meta grants after app review.

## Use it in a reel

End the caption or the video with: "Comment WEBSITE and I will DM you the details."

## Limits

- Retries from Meta are de-duplicated per warm serverless instance only, so a rare duplicate DM is possible.
- Instagram only lets a business send a private reply within 7 days of the comment, and one per comment.
- Replies are not stored anywhere. Add logging before relying on it for lead tracking.
