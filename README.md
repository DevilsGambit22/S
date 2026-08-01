# The ANHS Protocol Dashboard v4.2

A responsive Classroom of the Elite-inspired academy dashboard with separate modules, continuously moving feeds, the official club crest, and a GitHub-managed radio.

## What changed in v4.2

- Added the official ANHS club logo to the navigation, home page, and radio artwork system.
- Refined the visual design around a restrained Classroom of the Elite academy aesthetic: monochrome crest, dark institutional panels, crimson system accents, glass overlays, and examination-style interface details.
- Added a real, visible `assets/music/` folder containing `ADD-YOUR-MP3-FILES-HERE.txt`.
- Kept the automatic GitHub playlist generator and workflow.
- Console and Tokyo Bakery Exchange feeds continue moving instead of remaining static.

## Publish on GitHub Pages

1. Extract the ZIP.
2. Upload the complete contents of the `anhs-dashboard` folder to the root of a GitHub repository.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/root`, then save.

## Add MP3 files whenever you want

The folder is included here:

```text
assets/music/
```

It contains a visible instruction file so GitHub will not hide or remove the folder.

To add music:

1. Open `assets/music/` in your GitHub repository.
2. Click **Add file → Upload files**.
3. Drag in any `.mp3` files.
4. Commit the upload to `main`.
5. Wait for the **Update ANHS Radio Playlist** workflow to finish.

The workflow scans every MP3 and automatically rebuilds:

```text
data/playlist.json
```

You do not edit that JSON manually.

### Automatic track names

- `classroom-of-the-elite-theme.mp3` becomes **Classroom Of The Elite Theme**
- `white_room.mp3` becomes **White Room**

### Optional cover artwork

Use the same filename stem in `assets/images/`:

```text
assets/music/tokyo-night.mp3
assets/images/tokyo-night.png
```

Supported artwork: `.webp`, `.png`, `.jpg`, `.jpeg`, and `.svg`. Tracks without matching artwork use the ANHS club crest.

## Required GitHub permission

Open:

**Settings → Actions → General → Workflow permissions → Read and write permissions**

Save the setting. This allows the workflow to commit the rebuilt playlist JSON.

## Browser audio limitation

Browsers normally require the visitor to press Play once before audio can begin. The dashboard then remembers the selected track, playback position, and volume on that device.

## Chess.com embed

Replace `YOUR-GITHUB-PAGES-URL` inside `CHESSCOM-EMBED.html` with the published GitHub Pages URL.
