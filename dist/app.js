'use strict';
const chapters = [
  {id:'inicio', label:'Página inicial', image:1},
  {id:'projetos', label:'Nossos projetos', image:2},
  {id:'conquistas', label:'Conquistas', image:3},
  {id:'ajudar', label:'Como você pode nos ajudar', image:4},
  {id:'sobre', label:'Sobre nós', image:5}
];
const photos = [
  [6,'equipe','A equipe e o robô na Arena SESI de Robótica.'],
  [7,'robo','Concentração e trabalho em equipe nos bastidores da arena.'],
  [8,'equipe','Unity Sunset reunida na Arena SESI de Robótica.'],
  [9,'equipe','Equipe, mentores e troféus no estande da Unity Sunset.'],
  [10,'robo','O robô #22660 e seus mecanismos em detalhe.'],
  [11,'equipe','Nossa equipe em frente ao SESI Escada.'],
  [12,'conquistas','Integrantes celebrando com os troféus.'],
  [13,'conquistas','Uma conquista compartilhada por toda a equipe.'],
  [14,'conquistas','Celebração do primeiro lugar no prêmio Inspiração.'],
  [15,'conquistas','Registro em preto e branco da classificação para a etapa nacional.'],
  [16,'conquistas','Aliança Finalista: uma conquista construída em cooperação.'],
  [17,'equipe','A Unity Sunset reunida em seu estande.'],
  [18,'robo','Preparação do robô em equipe durante o festival.'],
  [19,'robo','Ajustes e colaboração nos mecanismos do robô.'],
  [20,'equipe','Torcida e energia da Unity na competição.'],
  [21,'robo','Concentração dos pilotos na arena.'],
  [22,'robo','Engenharia em detalhe: o robô da Unity Sunset.'],
  [23,'conquistas','Equipes classificadas para a etapa nacional.'],
  [24,'equipe','Unity Sunset: unidos no SESI Escada.'],
  [25,'robo','Pilotos e equipes em ação no festival regional.']
];
const imagePath = n => `assets/image-${String(n).padStart(2,'0')}.jpg`;
const transition = document.querySelector('#transition');
const menu = document.querySelector('#navigation');
const menuButton = document.querySelector('.menu-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let currentChapter = -1;
let transitionTimer;
let finishTimer;
function closeMenu(){ menu.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); document.body.classList.remove('menu-open'); }
function showPage(index, focus = true){
  document.querySelectorAll('.page').forEach((page,i)=>{page.hidden=i!==index;page.classList.toggle('active',i===index);});
  document.querySelectorAll('#navigation a').forEach((link,i)=>{if(i===index)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
  currentChapter=index;
  document.querySelector('#chapter-label').textContent=`${String(index+1).padStart(2,'0')} — ${chapters[index].label.toLocaleUpperCase('pt-BR')}`;
  document.querySelectorAll('.chapter-dots i').forEach((dot,i)=>dot.classList.toggle('active',i===index));
  document.querySelector('#next-page').innerHTML=`${chapters[(index+1)%5].label} <span>→</span>`;
  document.title=`${chapters[index].label} — Instituto Sunset`;
  window.scrollTo({top:0,behavior:'instant'});
  if(focus)document.querySelector(`#title-${chapters[index].id}`).focus({preventScroll:true});
}
function route(initial=false){
  const id=location.hash.slice(1)||'inicio';
  if(id==='conteudo'){document.querySelector('.page.active h1').focus();return;}
  let index=chapters.findIndex(chapter=>chapter.id===id);
  if(index<0){index=0;history.replaceState(null,'','#inicio');}
  if(index===currentChapter)return;
  closeMenu();clearTimeout(transitionTimer);clearTimeout(finishTimer);
  if(reducedMotion.matches){transition.classList.remove('running');showPage(index,!initial);return;}
  transition.querySelector('img').src=imagePath(chapters[index].image);
  transition.classList.remove('running');void transition.offsetWidth;transition.classList.add('running');
  if(initial)showPage(index,false);
  else transitionTimer=setTimeout(()=>showPage(index),230);
  finishTimer=setTimeout(()=>transition.classList.remove('running'),850);
}
menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open);});
menu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
window.addEventListener('hashchange',()=>route());
document.querySelector('#next-page').addEventListener('click',()=>location.hash=chapters[(currentChapter+1)%5].id);
chapters.forEach(chapter=>{const img=new Image();img.src=imagePath(chapter.image);});
route(true);
const gallery=document.querySelector('#gallery');
const dialog=document.querySelector('#lightbox');
let activeFilter='todos';let selectedPhoto=0;let opener=null;
photos.forEach(([n,category,caption],index)=>{
  const button=document.createElement('button');button.type='button';button.dataset.category=category;button.setAttribute('aria-label',`Ampliar fotografia: ${caption}`);
  const img=document.createElement('img');img.src=imagePath(n);img.alt=caption;img.loading='lazy';img.width=600;img.height=600;
  const icon=document.createElement('span');icon.setAttribute('aria-hidden','true');icon.textContent='↗';
  button.append(img,icon);button.addEventListener('click',()=>{opener=button;selectedPhoto=index;updatePhoto();dialog.showModal();document.body.classList.add('no-scroll');});gallery.append(button);
});
const filteredIndices=()=>photos.map((photo,i)=>({photo,i})).filter(({photo})=>activeFilter==='todos'||photo[1]===activeFilter).map(({i})=>i);
function updatePhoto(){const [n,,caption]=photos[selectedPhoto];document.querySelector('#lightbox-image').src=imagePath(n);document.querySelector('#lightbox-image').alt=caption;document.querySelector('#lightbox-caption').textContent=caption;const indices=filteredIndices();document.querySelector('#photo-count').textContent=`${String(indices.indexOf(selectedPhoto)+1).padStart(2,'0')} / ${indices.length} — UNITY SUNSET`;}
function changePhoto(direction){const indices=filteredIndices();selectedPhoto=indices[(indices.indexOf(selectedPhoto)+direction+indices.length)%indices.length];updatePhoto();}
document.querySelector('#prev-photo').addEventListener('click',()=>changePhoto(-1));document.querySelector('#next-photo').addEventListener('click',()=>changePhoto(1));
document.querySelector('#close-lightbox').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.classList.remove('no-scroll');opener?.focus();});
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
document.addEventListener('keydown',event=>{if(dialog.open){if(event.key==='ArrowRight')changePhoto(1);if(event.key==='ArrowLeft')changePhoto(-1);}else if(event.key==='Escape')closeMenu();});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  activeFilter=button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item=>{item.classList.toggle('selected',item===button);item.setAttribute('aria-pressed',String(item===button));});
  gallery.querySelectorAll('button').forEach(item=>item.hidden=activeFilter!=='todos'&&item.dataset.category!==activeFilter);
}));
document.querySelector('#copy-pix').addEventListener('click',async()=>{
  const input=document.querySelector('#pix-key');const status=document.querySelector('#copy-status');
  try{if(!navigator.clipboard)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(input.value);status.textContent='Chave Pix copiada!';}
  catch{input.focus();input.select();status.textContent='Chave selecionada. Use a opção Copiar do seu dispositivo.';}
});

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target); } }), {threshold:0.08});
document.querySelectorAll('.impact-projects article,.project-feature,.project-grid article,.awards-grid article,.plans article,.mission,.support-options article').forEach(el=>{el.classList.add('reveal');revealObserver.observe(el);});
