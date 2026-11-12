# Home page welcome video (public/intro/akshay-intro.mp4)

1080p, 30 fps, about 56 s, in the site's blue palette. Narration is 10 text-to-speech clips (Indian English male
voice) placed on `timeline.json`; scenes are drawn in HTML by `video.html` and captured frame by frame.

## Rebuild
1. Put the assets next to `video.html`: `fonts/` (inter, instrument-serif normal+italic, noto-sans-devanagari 700,
   noto-sans-gujarati 700 as `inter.woff2 is.woff2 isi.woff2 dev.woff2 guj.woff2`), `ak.webp`
   (`public/akshay-pointing-900.webp`), `av.webp` (`public/akshay-avatar-96.webp`) and the five
   `public/work/*-640.webp` screenshots as `ai-master-tools.webp quickresume.webp photo-resizer.webp fitsmart.webp rosetta.webp`.
2. Make `s01.wav`..`s10.wav` from the sentences in `timeline.json`, then recompute `start`/`dur` from their lengths.
3. Replace `__TL__` in `video.html` with the contents of `timeline.json` and save it as `final.html`.
4. `node render.cjs <worker> 4` for workers 0-3 writes `frames/f_00000.jpg`...
5. Mix the audio (adelay each clip to its `start`, loudnorm to -16 LUFS), then
   `ffmpeg -framerate 30 -i frames/f_%05d.jpg -i mix.wav -c:v libx264 -preset slow -crf 30 -tune stillimage -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 112k -shortest out.mp4`
6. Poster: frame at 2.2 s, 1280x720, WebP quality about 72. Update `duration` and the transcript in
   `components/IntroVideoSection.tsx` if the narration changes.
