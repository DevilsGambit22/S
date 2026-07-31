# The ANHS Protocol Dashboard v4.1

A responsive GitHub Pages dashboard with separate ANHS modules, continuously moving system feeds, and a GitHub-managed radio.

## Improvements in v4.1

- The System Console now runs continuously instead of ending on a static list.
- Boot messages enter from the bottom and move upward as new diagnostics appear.
- Every Tokyo Bakery Exchange category is now a looping upward-moving market feed.
- The horizontal TBX index ticker loops continuously.
- The radio reads `data/playlist.json` instead of a manually edited JavaScript list.
- A GitHub Action automatically detects all MP3 files in `assets/music/` and rebuilds the playlist.

## Publish on GitHub Pages

1. Upload the complete contents of this folder to a GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the `main` branch and `/root` folder.
5. Save and wait for the Pages URL.

## Add music automatically

1. Open the repository's `assets/music/` folder.
2. Upload or drag in one or more `.mp3` files.
3. Commit the upload to the `main` branch.
4. Open the repository's **Actions** tab and allow the **Update ANHS Radio Playlist** workflow to finish.
5. The workflow automatically updates `data/playlist.json`; the new tracks then appear in the radio.

You do **not** need to edit the playlist manually.

### Automatic titles

The filename becomes the displayed track title:

- `tokyo-signal.mp3` → **Tokyo Signal**
- `midnight_academy.mp3` → **Midnight Academy**

### Optional cover artwork

Place an image in `assets/images/` using the same base filename as the MP3:

- `assets/music/tokyo-signal.mp3`
- `assets/images/tokyo-signal.png`

Supported artwork extensions are `.webp`, `.png`, `.jpg`, `.jpeg`, and `.svg`. When no matching artwork exists, the default ANHS cover is used.

## Important GitHub setting

The workflow needs permission to commit the generated JSON file. In the repository, open:

**Settings → Actions → General → Workflow permissions → Read and write permissions**

Then save the setting.

## Browser audio limitation

Most browsers require the visitor to press Play once before sound can begin. After that, the dashboard remembers the selected track, playback position, and volume locally.

## Chess.com embed

Replace `YOUR-GITHUB-PAGES-URL` in `CHESSCOM-EMBED.html` with the published GitHub Pages URL.
