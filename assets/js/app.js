const app = document.getElementById('app');
const links = [...document.querySelectorAll('.main-nav a')];
const joinLink='https://www.chess.com/club/the-anhs-protocol-cote/join?utm_campaign=club_invite_link&utm_source=chesscom&utm_medium=copy';
const pages={
home:()=>`<section class="page"><div class="hero"><span class="badge"><i class="dot"></i> SYSTEM ONLINE</span><div class="eyebrow">ADVANCED NURTURING HIGH SCHOOL</div><h1>The ANHS<br>Protocol</h1><p>A dedicated academy operating system inspired by Advanced Nurturing High School: membership, rankings, events, directives, partnerships, communications, and academy intelligence.</p><div class="actions"><a class="btn primary" href="#registry">Open Registry</a><a class="btn" href="#command">Academy Command</a></div><img class="hero-crest" src="assets/images/anhs-club-logo.png" alt="ANHS academy crest"></div><div class="section-title"><h2>Academy Status</h2><p>Core systems and public modules.</p></div><div class="grid-cards"><article class="card"><div class="stat">ACTIVE</div><h3>Academy Network</h3><p>Club systems, records, and communications are available.</p></article><article class="card"><div class="stat">LIVE</div><h3>OAA Framework</h3><p>Events, rankings, and academy activity are accessible.</p></article><article class="card"><div class="stat">5.0</div><h3>System Build</h3><p>Classroom-of-the-Elite-inspired academy interface with dedicated feature modules.</p></article></div></section>`,
registry:()=>`<section class="page"><div class="hero"><div class="eyebrow">OFFICIAL ENROLLMENT DATABASE</div><h1>School<br>Registry</h1><p>Access academy records, member profiles, rankings, enrollment verification, and registry services.</p><div class="actions"><a class="btn primary" target="_blank" rel="noopener" href="https://www.chess.com/clubs/members/the-anhs-protocol-cote?sort=12">Open Chess.com Registry</a></div></div><div class="section-title member-board-title"><div><h2>Newest Students</h2><p>Live enrollment data from the Chess.com public API.</p></div><button class="btn member-refresh" id="refreshMembers" type="button">Refresh Board</button></div><div id="memberBoard" class="member-board" aria-live="polite"><div class="member-loading"><span class="loader-ring"></span><strong>Synchronizing academy registry…</strong></div></div><div class="member-board-footer"><span id="memberUpdated">Awaiting registry synchronization</span><a target="_blank" rel="noopener" href="https://www.chess.com/clubs/members/the-anhs-protocol-cote?sort=12">View all members →</a></div><div class="section-title"><h2>Registry Systems</h2></div><div class="grid-cards"><div class="card"><h3>Member Directory</h3><p>Browse enrolled members and academy profiles.</p><div class="status-list"><div class="status-row"><span>DATABASE</span><strong>CONNECTED</strong></div><div class="status-row"><span>SECURITY</span><strong>VERIFIED</strong></div></div></div><div class="card"><h3>Embedded Registry</h3><p>The original GitHub registry can remain embedded below.</p><a class="btn" target="_blank" rel="noopener" href="https://yangyanghappy88.github.io/anhsmember/">Open Registry App</a></div><div class="card"><h3>OAA Rankings</h3><p>Connect this card to the academy's official ranking system or spreadsheet.</p></div></div></section>`,
command:()=>`<section class="page"><div class="hero"><div class="eyebrow">AUTHORIZED SYSTEM MODULES</div><h1>Academy<br>Command</h1><p>Central access for announcements, communications, feedback, promotion, rewards, and events.</p></div><div class="section-title"><h2>Command Modules</h2></div><div class="module-list"><a class="module-link" target="_blank" rel="noopener" href="https://www.chess.com/club/the-anhs-protocol-cote/announcements"><span>📡 Announcements</span><strong>ONLINE</strong></a><a class="module-link" target="_blank" rel="noopener" href="https://www.chess.com/clubs/forum/the-anhs-protocol-cote"><span>💬 Communications Network</span><strong>ACTIVE</strong></a><a class="module-link" target="_blank" rel="noopener" href="https://www.chess.com/clubs/forum/view/member-feedback-3"><span>📝 Feedback Portal</span><strong>OPEN</strong></a><a class="module-link" target="_blank" rel="noopener" href="https://www.chess.com/clubs/forum/view/official-advertising-forum-22-1"><span>📢 Promotion Portal</span><strong>READY</strong></a><a class="module-link" target="_blank" rel="noopener" href="https://www.chess.com/club/anhs-protocol-giveaway"><span>🎁 Reward Center</span><strong>ONLINE</strong></a><a class="module-link" target="_blank" rel="noopener" href="https://www.chess.com/clubs/events/the-anhs-protocol-cote"><span>♟ OAA Events</span><strong>OPEN</strong></a></div></section>`,
directives:()=>`<section class="page"><div class="hero"><div class="eyebrow">AUTHORIZED STUDENT PROTOCOL</div><h1>Academy<br>Directives</h1><p>The operational standards that preserve a safe, fair, and disciplined academy.</p></div><div class="section-title"><h2>Core Directives</h2></div>${['Respect every member.','Fair Play is mandatory.','English is the primary language.','Compete with honor.','Help strengthen the academy.','Friendly banter is welcome; accusations and hostility are not.','Keep discussions calm and constructive.','Consult an administrator before posting official club-related content.','Rules may evolve as the academy grows.'].map(x=>`<div class="directive">${x}</div>`).join('')}<div class="section-title"><h2>Discipline Protocol</h2></div><div class="grid-cards"><div class="card"><div class="stat">01</div><h3>Warning</h3><p>Formal notice and correction opportunity.</p></div><div class="card"><div class="stat">02</div><h3>Mute</h3><p>Temporary communication restriction.</p></div><div class="card"><div class="stat">03</div><h3>Ban</h3><p>Removal reserved for serious or repeated violations.</p></div></div></section>`,
partners:()=>`<section class="page"><div class="hero"><div class="eyebrow">PROTOCOL NETWORK</div><h1>Partner<br>Network</h1><p>Connected clubs and allied communities across the Chess.com network.</p></div><div class="section-title"><h2>Affiliated Clubs</h2></div><div class="partner-grid"><a class="partner" target="_blank" rel="noopener" href="https://www.chess.com/club/chess-japan">CHESS JAPAN</a><a class="partner" target="_blank" rel="noopener" href="https://www.chess.com/club/club-of-the-elite-1">CLUB OF THE ELITE</a><a class="partner" target="_blank" rel="noopener" href="https://www.chess.com/club/the-uchiha-clan-2">UCHIHA CLAN</a><a class="partner" target="_blank" rel="noopener" href="https://www.chess.com/club/anime-team-3">ANIME TEAM</a></div></section>`,
exchange:()=>{const markets={
  'Yogurt Market':[['🥄','Chobani Greek','PP 298','▲2'],['🥣','Morinaga Bifidus','PP 168','▲1'],['🍑','Oikos Triple Zero','PP 198','▲3'],['🇯🇵','Meiji Bulgaria','PP 188','▼2'],['🇮🇸','Skyr Vanilla','PP 328','▲5'],['🍓','Activia Strawberry','PP 178','▲1']],
  'Milk & Dairy':[['🥛','Hokkaido Whole Milk','PP 248','▲3'],['🧈','Hokkaido Butter','PP 498','▲4'],['🧀','Mozzarella','PP 428','▲2'],['🥄','Whipped Cream','PP 338','►'],['🍮','Custard Cream','PP 298','▲1'],['🥛','Fresh Cream','PP 458','▲4']],
  'Bread & Pastry':[['🍞','Shokupan','PP 320','▲3'],['🥐','Butter Croissant','PP 280','▲4'],['🥖','French Baguette','PP 340','▲2'],['🍈','Melon Pan','PP 220','►'],['🥪','Tamago Sando','PP 390','▲5'],['🥧','Apple Pie','PP 420','▲2']],
  'Mochi & Wagashi':[['🥛','Milk Mochi','PP 238','▲2'],['🍓','Ichigo Daifuku','PP 298','▲2'],['🍵','Matcha Daifuku','PP 248','►'],['🌸','Sakura Mochi','PP 288','▲3'],['🍡','Mitarashi Dango','PP 220','▲1'],['🐟','Taiyaki','PP 280','▲4']]
};
const feeds=Object.entries(markets).map(([name,rows])=>`<article class="market-feed"><div class="market-feed-head"><h3>${name}</h3><span>LIVE</span></div><div class="vertical-feed"><div class="vertical-feed-track">${[...rows,...rows].map(r=>`<div class="market-row"><span class="market-product">${r[0]} ${r[1]}</span><span>${r[2]}</span><strong class="${r[3].includes('▼')?'down':'up'}">${r[3]}</strong></div>`).join('')}</div></div></article>`).join('');
return `<section class="page"><div class="hero"><div class="eyebrow">TOKYO BAKERY EXCHANGE</div><h1>TBX Market</h1><p>A continuously moving academy retail exchange. Every product feed advances upward while the headline index moves across the screen.</p></div><div class="section-title"><h2>Live Retail Feed</h2><p>All market rows are animated rather than static.</p></div><div class="ticker"><span>🥖 BREAD INDEX +5.3% • 🥛 DAIRY INDEX +4.1% • 🍡 MOCHI INDEX +3.6% • 🥄 YOGURT INDEX +4.2% • CULTURE FUTURES BULLISH • </span><span aria-hidden="true">🥖 BREAD INDEX +5.3% • 🥛 DAIRY INDEX +4.1% • 🍡 MOCHI INDEX +3.6% • 🥄 YOGURT INDEX +4.2% • CULTURE FUTURES BULLISH • </span></div><div class="market-feed-grid">${feeds}</div></section>`},
console:()=>`<section class="page"><div class="hero"><div class="eyebrow">LIVE OPERATING FEED</div><h1>System<br>Console</h1><p>Academy infrastructure diagnostics, protocol status, and mainframe activity.</p></div><div class="section-title"><h2>Boot Log</h2></div><div class="console" id="consoleLog"></div></section>`,
radio:()=>`<section class="page"><div class="hero"><div class="eyebrow">DEDICATED ACADEMY AUDIO MODULE</div><h1>ANHS Radio</h1><p>This is the only music player on the website. Drop MP3 files into <strong>assets/music</strong> and push them to GitHub; the included Action detects them and rebuilds <strong>data/playlist.json</strong> automatically.</p></div><div class="section-title"><h2>Now Playing</h2></div><div class="radio-layout"><div class="card now-playing"><img class="cover" id="radioCover" src="assets/images/default-cover.svg" alt="Album cover"><h2 id="radioTitle">ANHS Radio</h2><p id="radioArtist">Select a track</p><input class="progress" id="progress" type="range" min="0" max="100" value="0" step="0.1" aria-label="Track progress"><div class="time-row"><span id="elapsed">0:00</span><span id="duration">0:00</span></div><label class="volume-control">Volume <input id="radioVolume" type="range" min="0" max="1" value="0.75" step="0.01"></label><div class="actions"><button class="btn" id="radioPrev">⏮ Previous</button><button class="btn primary" id="radioPlay">▶ Play</button><button class="btn" id="radioNext">Next ⏭</button></div></div><div><div class="track-list" id="trackList"></div></div></div></section>`,
enroll:()=>`<section class="page"><div class="hero"><div class="eyebrow">ACADEMY ENROLLMENT SYSTEM</div><h1>Enroll</h1><p>Join The ANHS Protocol or share the academy invitation with another student.</p><div class="actions"><a class="btn primary" target="_blank" rel="noopener" href="${joinLink}">Join the Academy</a><button class="btn" id="copyJoin">Copy Enrollment Link</button><a class="btn" target="_blank" rel="noopener" href="https://meet.google.com/aef-vctr-tyi">Open Google Meet</a></div></div><div class="section-title"><h2>Enrollment Status</h2></div><div class="grid-cards"><div class="card"><div class="stat">OPEN</div><h3>Public Enrollment</h3><p>New students may request admission through the official Chess.com invitation.</p></div><div class="card"><div class="stat">SECURE</div><h3>Verification</h3><p>Membership records are maintained through the official academy club.</p></div><div class="card"><div class="stat">READY</div><h3>Orientation</h3><p>Review directives, command modules, and academy systems after joining.</p></div></div></section>`};

const CLUB_API_SLUG='the-anhs-protocol-cote';
const MEMBER_LIMIT=8;

function escapeHtml(value=''){
  return String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

function highestRating(stats={}){
  const labels={chess_rapid:'Rapid',chess_blitz:'Blitz',chess_bullet:'Bullet',chess_daily:'Daily',chess960_daily:'Chess960'};
  const ratings=Object.entries(labels).map(([key,label])=>({label,rating:Number(stats?.[key]?.last?.rating)||0})).filter(item=>item.rating>0);
  ratings.sort((a,b)=>b.rating-a.rating);
  return ratings[0]||{label:'Unrated',rating:'—'};
}

async function fetchJson(url,timeout=10000){
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),timeout);
  try{
    const response=await fetch(url,{headers:{Accept:'application/json'},signal:controller.signal});
    if(!response.ok)throw new Error(`Request failed: ${response.status}`);
    return await response.json();
  }finally{clearTimeout(timer)}
}

async function loadNewestMembers(force=false){
  const board=document.getElementById('memberBoard');
  const updated=document.getElementById('memberUpdated');
  const refresh=document.getElementById('refreshMembers');
  if(!board)return;
  if(refresh){refresh.disabled=true;refresh.textContent='Synchronizing…'}
  board.innerHTML='<div class="member-loading"><span class="loader-ring"></span><strong>Synchronizing academy registry…</strong></div>';
  try{
    const club=await fetchJson(`https://api.chess.com/pub/club/${CLUB_API_SLUG}/members`);
    const all=[...(club.all_time||[])].sort((a,b)=>(b.joined||0)-(a.joined||0)).slice(0,MEMBER_LIMIT);
    if(!all.length)throw new Error('No members were returned by the club API.');
    const records=await Promise.all(all.map(async member=>{
      const username=member.username;
      const [profileResult,statsResult]=await Promise.allSettled([
        fetchJson(`https://api.chess.com/pub/player/${encodeURIComponent(username)}`),
        fetchJson(`https://api.chess.com/pub/player/${encodeURIComponent(username)}/stats`)
      ]);
      const profile=profileResult.status==='fulfilled'?profileResult.value:{};
      const stats=statsResult.status==='fulfilled'?statsResult.value:{};
      return {...member,profile,topRating:highestRating(stats)};
    }));
    const now=Math.floor(Date.now()/1000);
    board.innerHTML=records.map((member,index)=>{
      const username=escapeHtml(member.username);
      const profile=member.profile||{};
      const avatar=profile.avatar||'assets/images/anhs-club-logo.png';
      const joined=member.joined?new Date(member.joined*1000).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}):'Unknown';
      const online=profile.last_online&&now-profile.last_online<600;
      const countryCode=(profile.country||'').split('/').pop();
      const rating=member.topRating||{label:'Unrated',rating:'—'};
      return `<a class="member-card" href="https://www.chess.com/member/${encodeURIComponent(member.username)}" target="_blank" rel="noopener" style="--member-delay:${index*55}ms"><div class="member-avatar-wrap"><img class="member-avatar" src="${escapeHtml(avatar)}" alt="${username}" loading="lazy" onerror="this.src='assets/images/anhs-club-logo.png'"><span class="member-presence ${online?'online':'offline'}" title="${online?'Recently online':'Offline'}"></span></div><div class="member-info"><span class="member-sequence">ENROLLMENT ${String(index+1).padStart(2,'0')}</span><h3>${username}</h3><div class="member-meta"><span>${countryCode?escapeHtml(countryCode):'ANHS'}</span><span>Joined ${escapeHtml(joined)}</span></div></div><div class="member-rating"><strong>${escapeHtml(rating.rating)}</strong><small>${escapeHtml(rating.label)}</small></div></a>`;
    }).join('');
    if(updated)updated.textContent=`Registry synchronized ${new Date().toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})} • ${records.length} newest members`;
  }catch(error){
    console.error('Newest member board:',error);
    board.innerHTML=`<div class="member-error"><strong>Registry synchronization failed.</strong><span>The Chess.com public API may be temporarily unavailable.</span><button class="btn" id="retryMembers" type="button">Retry Connection</button></div>`;
    document.getElementById('retryMembers')?.addEventListener('click',()=>loadNewestMembers(true));
    if(updated)updated.textContent='Public API connection unavailable';
  }finally{
    if(refresh){refresh.disabled=false;refresh.textContent='Refresh Board';refresh.onclick=()=>loadNewestMembers(true)}
  }
}

function render(){const route=(location.hash||'#home').slice(1);const fn=pages[route]||pages.home;app.innerHTML=fn();links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${route}`));app.focus({preventScroll:true});document.getElementById('mainNav').classList.remove('open');document.getElementById('navToggle').setAttribute('aria-expanded','false');if(route==='console')startConsole();if(route==='registry')loadNewestMembers();if(route==='radio'&&window.renderRadioPage)window.renderRadioPage();const copy=document.getElementById('copyJoin');if(copy)copy.onclick=async()=>{try{await navigator.clipboard.writeText(joinLink);copy.textContent='✓ Link Copied';setTimeout(()=>copy.textContent='Copy Enrollment Link',1600)}catch{prompt('Copy this link:',joinLink)}}}
let consoleTimer;
function startConsole(){
  clearInterval(consoleTimer);
  const messages=['Boot sequence initialized','Authentication verified','Chairman authority accepted','Academy network online','Student registry synchronized','OAA framework active','Class point engine ready','Examination scheduler synchronized','White Room archive access denied','Merit evaluation running','Academy monitoring stable','Discipline matrix online','Student identity verified','Security clearance Level II','Club communications connected','Leaderboard synchronization complete','Reward network ready','Special examination queue checked','ANHS operating system stable'];
  const states=['VERIFIED','ACCEPTED','ONLINE','CONNECTED','ACTIVE','READY','SYNCHRONIZED','STABLE','COMPLETE'];
  const box=document.getElementById('consoleLog');
  if(!box)return;
  const addLine=()=>{
    if(!document.body.contains(box)){clearInterval(consoleTimer);return;}
    const now=new Date();
    const time=[now.getHours(),now.getMinutes(),now.getSeconds()].map(v=>String(v).padStart(2,'0')).join(':');
    const message=messages[Math.floor(Math.random()*messages.length)];
    const state=states[Math.floor(Math.random()*states.length)];
    const line=document.createElement('div');
    line.className='console-line live-line';
    line.innerHTML=`<span>[${time}]</span> ${message.padEnd(40,'.')} <strong>${state}</strong>`;
    box.appendChild(line);
    requestAnimationFrame(()=>line.classList.add('visible'));
    while(box.children.length>16)box.firstElementChild.remove();
  };
  for(let i=0;i<12;i++)addLine();
  consoleTimer=setInterval(addLine,900);
}
window.addEventListener('hashchange',()=>{if(location.hash!=='#radio'&&window.stopRadioForNavigation)window.stopRadioForNavigation();render();});document.getElementById('navToggle').onclick=()=>{const nav=document.getElementById('mainNav');nav.classList.toggle('open');document.getElementById('navToggle').setAttribute('aria-expanded',nav.classList.contains('open'))};render();
