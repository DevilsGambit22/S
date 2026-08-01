#!/usr/bin/env python3
"""Generate data/playlist.json from MP3 files stored in assets/music."""
from __future__ import annotations
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
MUSIC_DIR = ROOT / "assets" / "music"
ARTWORK_DIR = ROOT / "assets" / "artwork"
IMAGE_DIR = ROOT / "assets" / "images"
OUTPUT = ROOT / "data" / "playlist.json"
DEFAULT_COVER = "assets/images/anhs-club-logo.png"

def humanize(stem: str) -> str:
    value = re.sub(r"[_-]+", " ", stem).strip()
    value = re.sub(r"\s+", " ", value)
    return value.title() or "Untitled Track"

def cover_for(stem: str) -> str:
    for folder in (ARTWORK_DIR, IMAGE_DIR):
        for extension in (".webp", ".png", ".jpg", ".jpeg", ".svg"):
            candidate = folder / f"{stem}{extension}"
            if candidate.exists():
                return candidate.relative_to(ROOT).as_posix()
    return DEFAULT_COVER

def build_playlist() -> list[dict[str, str]]:
    MUSIC_DIR.mkdir(parents=True, exist_ok=True)
    ARTWORK_DIR.mkdir(parents=True, exist_ok=True)
    tracks=[]
    for path in sorted(MUSIC_DIR.rglob('*'), key=lambda i: i.as_posix().lower()):
        if not path.is_file() or path.suffix.lower() != '.mp3':
            continue
        tracks.append({
            'title': humanize(path.stem),
            'artist': 'ANHS Radio',
            'file': path.relative_to(ROOT).as_posix(),
            'cover': cover_for(path.stem),
            'genre': 'Classroom of the Elite',
        })
    return tracks

def main():
    playlist=build_playlist()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(playlist, indent=2, ensure_ascii=False)+'\n', encoding='utf-8')
    print(f'Generated {OUTPUT.relative_to(ROOT)} with {len(playlist)} track(s).')
if __name__=='__main__': main()
