# The ANHS Protocol — Build 5.0

A GitHub Pages dashboard inspired by the academy-system atmosphere of *Classroom of the Elite*.

## Important radio behavior

The website has **no floating radio player**. Music controls exist only on the dedicated **Radio** page. Leaving the Radio page pauses playback.

## Add new MP3 files

1. Open `assets/music/` in your GitHub repository.
2. Upload or drag in any `.mp3` files.
3. Commit the upload.
4. The included GitHub Action scans the folder and automatically rebuilds `data/playlist.json`.
5. The new tracks appear on the Radio page after the workflow completes.

You do **not** edit `playlist.json` manually.

### Optional artwork

Put matching artwork in `assets/artwork/` using the same base filename:

```text
assets/music/white-room.mp3
assets/artwork/white-room.png
```

Supported artwork formats: `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`.

Tracks without matching artwork use the ANHS club crest.

## Required GitHub permission

In the repository, open:

`Settings → Actions → General → Workflow permissions`

Select **Read and write permissions**, then save.

## Publish with GitHub Pages

Open:

`Settings → Pages → Deploy from a branch → main / root`

## Chess.com embed

Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` in `CHESSCOM-EMBED.html`, then paste the iframe into the Chess.com editor.

## Newest Members Board (v5.2)

The Registry page loads the eight newest club members from the Chess.com public API:

- Club member list: `https://api.chess.com/pub/club/the-anhs-protocol-cote/members`
- Player profiles and avatars: `https://api.chess.com/pub/player/{username}`
- Player ratings: `https://api.chess.com/pub/player/{username}/stats`

No API key is required. The board includes a refresh control and a graceful retry state if the public API is temporarily unavailable.

## Important: real MP3 files are required
The repository must contain complete audio files. An MP3 that is only a few bytes is an empty placeholder and cannot play. Replace the placeholder files inside `assets/music/` with the real MP3 files while keeping these names:

- `babymonster.mp3`
- `moonlight-sonata.mp3`
- `classroom-ost.mp3`
- `yoasobi-idol.mp3`
- `chess-phonk.mp3`
