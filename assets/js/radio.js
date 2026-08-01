const audio = document.getElementById('audio');
let playlist = [];
let index = Number(localStorage.getItem('anhsTrack') || 0);
let playlistReady = false;
audio.volume = Number(localStorage.getItem('anhsVolume') || '.75');

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'})[character]);
}
function formatTime(value){
  if(!Number.isFinite(value)) return '0:00';
  const m=Math.floor(value/60), s=Math.floor(value%60);
  return `${m}:${String(s).padStart(2,'0')}`;
}
async function loadPlaylist(){
  try{
    const response=await fetch(`data/playlist.json?v=${Date.now()}`,{cache:'no-store'});
    if(!response.ok) throw new Error(`Playlist request failed: ${response.status}`);
    const data=await response.json();
    playlist=Array.isArray(data)?data.filter(track=>track&&track.file):[];
  }catch(error){console.error(error);playlist=[];}
  playlistReady=true;
  if(index>=playlist.length) index=0;
  if(playlist.length) loadTrack(index,true); else audio.removeAttribute('src');
  if(location.hash==='#radio'&&window.renderRadioPage) window.renderRadioPage();
}
function loadTrack(nextIndex,restore=true){
  if(!playlist.length)return;
  index=(nextIndex+playlist.length)%playlist.length;
  const track=playlist[index];
  audio.src=new URL(track.file, document.baseURI).href;
  audio.load();
  localStorage.setItem('anhsTrack',String(index));
  if(restore){
    const saved=Number(localStorage.getItem('anhsTime')||0);
    audio.addEventListener('loadedmetadata',()=>{if(saved>0&&saved<audio.duration)audio.currentTime=saved;},{once:true});
  }
  syncPage();
}
function toggle(){
  if(!playlistReady||!playlist.length)return;
  if(!audio.src)loadTrack(index,false);
  if(audio.paused)audio.play().catch(()=>{});else audio.pause();
}
function syncPage(){
  const track=playlist[index];
  const title=document.getElementById('radioTitle');
  const artist=document.getElementById('radioArtist');
  const cover=document.getElementById('radioCover');
  const play=document.getElementById('radioPlay');
  if(track){
    if(title)title.textContent=track.title||'Untitled Track';
    if(artist)artist.textContent=`${track.artist||'ANHS Radio'} • ${track.genre||'Audio'}`;
    if(cover){cover.src=track.cover||'assets/images/anhs-club-logo.png';cover.classList.toggle('playing',!audio.paused);}
  }else{
    if(title)title.textContent='No MP3 files found';
    if(artist)artist.textContent='Add MP3 files to assets/music and push to GitHub.';
    if(cover)cover.src='assets/images/anhs-club-logo.png';
  }
  if(play)play.textContent=audio.paused?'▶ Play':'❚❚ Pause';
  document.querySelectorAll('.track').forEach((el,i)=>el.classList.toggle('active',i===index));
}
window.renderRadioPage=()=>{
  const list=document.getElementById('trackList');
  if(!list)return;
  if(!playlistReady){list.innerHTML='<div class="empty-radio">Scanning the GitHub playlist…</div>';return;}
  if(!playlist.length){
    list.innerHTML='<div class="empty-radio"><strong>No music detected.</strong><br>Upload .mp3 files to <code>assets/music</code>. The GitHub Action will automatically rebuild <code>data/playlist.json</code>.</div>';
  }else{
    list.innerHTML=playlist.map((track,i)=>`<button class="track ${i===index?'active':''}" data-i="${i}" type="button"><img src="${escapeHtml(track.cover||'assets/images/anhs-club-logo.png')}" alt=""><span><strong>${escapeHtml(track.title||'Untitled Track')}</strong><br><small>${escapeHtml(track.artist||'ANHS Radio')} • ${escapeHtml(track.genre||'Audio')}</small></span><span>▶</span></button>`).join('');
    list.querySelectorAll('.track').forEach(el=>el.onclick=()=>{loadTrack(Number(el.dataset.i),false);audio.play().catch(()=>{});});
  }
  const play=document.getElementById('radioPlay');
  const prev=document.getElementById('radioPrev');
  const next=document.getElementById('radioNext');
  const progress=document.getElementById('progress');
  const volume=document.getElementById('radioVolume');
  if(play)play.onclick=toggle;
  if(prev)prev.onclick=()=>{if(playlist.length){loadTrack(index-1,false);audio.play().catch(()=>{});}};
  if(next)next.onclick=()=>{if(playlist.length){loadTrack(index+1,false);audio.play().catch(()=>{});}};
  if(progress)progress.oninput=()=>{if(audio.duration)audio.currentTime=(Number(progress.value)/100)*audio.duration;};
  if(volume){volume.value=String(audio.volume);volume.oninput=()=>{audio.volume=Number(volume.value);localStorage.setItem('anhsVolume',volume.value);};}
  syncPage();
};
window.stopRadioForNavigation=()=>{audio.pause();};
audio.onplay=syncPage;
audio.onpause=syncPage;
audio.onended=()=>{if(playlist.length){loadTrack(index+1,false);audio.play().catch(()=>{});}};
audio.onerror=()=>{
  const track=playlist[index];
  console.error('Unable to load audio track:', track?.file, audio.error);
  const artist=document.getElementById('radioArtist');
  if(artist) artist.textContent='Audio file is missing, empty, or not a valid MP3.';
};
audio.ontimeupdate=()=>{
  localStorage.setItem('anhsTime',String(Math.floor(audio.currentTime)));
  const progress=document.getElementById('progress');
  const elapsed=document.getElementById('elapsed');
  const duration=document.getElementById('duration');
  if(progress&&audio.duration)progress.value=String((audio.currentTime/audio.duration)*100);
  if(elapsed)elapsed.textContent=formatTime(audio.currentTime);
  if(duration)duration.textContent=formatTime(audio.duration);
};
loadPlaylist();
