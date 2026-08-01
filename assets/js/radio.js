const audio = document.getElementById('audio');
const miniTitle = document.getElementById('miniTitle');
const miniArtist = document.getElementById('miniArtist');
const miniCover = document.getElementById('miniCover');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volume = document.getElementById('volume');

let playlist = [];
let index = Number(localStorage.getItem('anhsTrack') || 0);
let playlistReady = false;

volume.value = localStorage.getItem('anhsVolume') || '.75';
audio.volume = Number(volume.value);

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);
}

async function loadPlaylist() {
  try {
    const response = await fetch(`data/playlist.json?v=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Playlist request failed: ${response.status}`);
    const data = await response.json();
    playlist = Array.isArray(data) ? data.filter(track => track && track.file) : [];
  } catch (error) {
    console.error(error);
    playlist = [];
  }

  playlistReady = true;
  if (index >= playlist.length) index = 0;

  if (playlist.length) {
    loadTrack(index, true);
  } else {
    showEmptyState();
  }

  if (location.hash === '#radio' && window.renderRadioPage) window.renderRadioPage();
}

function showEmptyState() {
  audio.removeAttribute('src');
  miniTitle.textContent = 'No MP3 files found';
  miniArtist.textContent = 'Add files to assets/music';
  miniCover.src = 'assets/images/anhs-club-logo.png';
  syncButtons();
  syncPage();
}

function loadTrack(nextIndex, restore = true) {
  if (!playlist.length) return;
  index = (nextIndex + playlist.length) % playlist.length;
  const track = playlist[index];
  audio.src = track.file;
  miniTitle.textContent = track.title || 'Untitled Track';
  miniArtist.textContent = track.artist || 'ANHS Radio';
  miniCover.src = track.cover || 'assets/images/anhs-club-logo.png';
  localStorage.setItem('anhsTrack', String(index));

  if (restore) {
    const saved = Number(localStorage.getItem('anhsTime') || 0);
    audio.addEventListener('loadedmetadata', () => {
      if (Number.isFinite(saved) && saved > 0 && saved < audio.duration) audio.currentTime = saved;
    }, { once: true });
  }
  syncPage();
}

function toggle() {
  if (!playlistReady || !playlist.length) return;
  if (!audio.src) loadTrack(index);
  if (audio.paused) audio.play().catch(() => {});
  else audio.pause();
}

function syncButtons() {
  const icon = audio.paused ? '▶' : '❚❚';
  playBtn.textContent = icon;
  const pagePlay = document.getElementById('radioPlay');
  if (pagePlay) pagePlay.textContent = audio.paused ? '▶ Play' : '❚❚ Pause';
}

function syncPage() {
  const title = document.getElementById('radioTitle');
  const artist = document.getElementById('radioArtist');
  const cover = document.getElementById('radioCover');
  const track = playlist[index];

  if (track) {
    if (title) title.textContent = track.title || 'Untitled Track';
    if (artist) artist.textContent = `${track.artist || 'ANHS Radio'} • ${track.genre || 'Audio'}`;
    if (cover) cover.src = track.cover || 'assets/images/anhs-club-logo.png';
  } else {
    if (title) title.textContent = 'No MP3 files found';
    if (artist) artist.textContent = 'Drop MP3 files into assets/music and push to GitHub.';
    if (cover) cover.src = 'assets/images/anhs-club-logo.png';
  }

  document.querySelectorAll('.track').forEach((element, trackIndex) => {
    element.classList.toggle('active', trackIndex === index);
  });
  syncButtons();
}

window.renderRadioPage = () => {
  const list = document.getElementById('trackList');
  if (!list) return;

  if (!playlistReady) {
    list.innerHTML = '<div class="empty-radio">Scanning the GitHub playlist…</div>';
    return;
  }

  if (!playlist.length) {
    list.innerHTML = '<div class="empty-radio"><strong>No music detected.</strong><br>Upload one or more .mp3 files to <code>assets/music</code>. GitHub Actions will automatically rebuild <code>data/playlist.json</code>.</div>';
  } else {
    list.innerHTML = playlist.map((track, trackIndex) => `
      <button class="track ${trackIndex === index ? 'active' : ''}" data-i="${trackIndex}" type="button">
        <img src="${escapeHtml(track.cover || 'assets/images/anhs-club-logo.png')}" alt="">
        <span><strong>${escapeHtml(track.title || 'Untitled Track')}</strong><br><small>${escapeHtml(track.artist || 'ANHS Radio')} • ${escapeHtml(track.genre || 'Audio')}</small></span>
        <span>▶</span>
      </button>`).join('');

    list.querySelectorAll('.track').forEach(element => {
      element.onclick = () => {
        loadTrack(Number(element.dataset.i), false);
        audio.play().catch(() => {});
      };
    });
  }

  document.getElementById('radioPlay').onclick = toggle;
  document.getElementById('radioPrev').onclick = () => {
    if (!playlist.length) return;
    loadTrack(index - 1, false);
    audio.play().catch(() => {});
  };
  document.getElementById('radioNext').onclick = () => {
    if (!playlist.length) return;
    loadTrack(index + 1, false);
    audio.play().catch(() => {});
  };

  const progress = document.getElementById('progress');
  progress.oninput = () => {
    if (audio.duration) audio.currentTime = (Number(progress.value) / 100) * audio.duration;
  };
  syncPage();
};

playBtn.onclick = toggle;
prevBtn.onclick = () => {
  if (!playlist.length) return;
  loadTrack(index - 1, false);
  audio.play().catch(() => {});
};
nextBtn.onclick = () => {
  if (!playlist.length) return;
  loadTrack(index + 1, false);
  audio.play().catch(() => {});
};
volume.oninput = () => {
  audio.volume = Number(volume.value);
  localStorage.setItem('anhsVolume', volume.value);
};
audio.onplay = syncButtons;
audio.onpause = syncButtons;
audio.onended = () => {
  if (!playlist.length) return;
  loadTrack(index + 1, false);
  audio.play().catch(() => {});
};
audio.ontimeupdate = () => {
  localStorage.setItem('anhsTime', String(Math.floor(audio.currentTime)));
  const progress = document.getElementById('progress');
  if (progress && audio.duration) progress.value = String((audio.currentTime / audio.duration) * 100);
};

loadPlaylist();
