# The ANHS Protocol Dashboard

A responsive GitHub Pages website that converts the original Chess.com sidebar into page-style modules with a persistent radio.

## Publish
1. Upload all files to a GitHub repository.
2. Open **Settings → Pages**.
3. Select **Deploy from a branch**.
4. Choose the `main` branch and `/root` folder.
5. Save and wait for the Pages URL.

## Add music
1. Put MP3 files in `assets/music/`.
2. Open `data/playlist.js`.
3. Match each `file` value to the exact MP3 filename.
4. Add artwork to `assets/images/` and update the `cover` value.

Browsers normally require the visitor to press Play once before audio can begin.

## Chess.com embed
Replace `YOUR-GITHUB-PAGES-URL` below:

```html
<div style="width:100%;max-width:760px;margin:0 auto;">
  <iframe
    src="YOUR-GITHUB-PAGES-URL"
    title="The ANHS Protocol Dashboard"
    style="display:block;width:100%;height:1500px;border:0;border-radius:18px;overflow:hidden;"
    loading="lazy"
    allow="autoplay">
  </iframe>
</div>
```
