const html=document.documentElement;
const languageButtons=document.querySelectorAll('button[data-language]');
function language(mode){html.dataset.language=mode;html.lang=mode==='en'?'en':'zh-CN';languageButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===mode)));try{localStorage.setItem('jp-language',mode);}catch{}}
let preferred;try{preferred=localStorage.getItem('jp-language');}catch{}if(['mixed','zh','en'].includes(preferred))language(preferred);
languageButtons.forEach(b=>b.addEventListener('click',()=>language(b.dataset.language)));
const groups=[...document.querySelectorAll('.nav-group')];
function closeGroup(group){group.querySelector('.nav-trigger').setAttribute('aria-expanded','false');group.querySelector('.dropdown').hidden=true;}
function openGroup(group){groups.forEach(g=>{if(g!==group)closeGroup(g);});group.querySelector('.nav-trigger').setAttribute('aria-expanded','true');group.querySelector('.dropdown').hidden=false;}
for(const group of groups){const trigger=group.querySelector('.nav-trigger');group.addEventListener('mouseenter',()=>{if(innerWidth>850)openGroup(group);});group.addEventListener('mouseleave',()=>{if(innerWidth>850&&!group.contains(document.activeElement))closeGroup(group);});trigger.addEventListener('click',e=>{if(innerWidth>850&&e.detail>0){openGroup(group);return;}if(trigger.getAttribute('aria-expanded')==='true')closeGroup(group);else openGroup(group);});group.addEventListener('focusout',e=>{if(!group.contains(e.relatedTarget))closeGroup(group);});trigger.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();openGroup(group);group.querySelector('.dropdown a').focus();}});}
const mobile=document.querySelector('.mobile-toggle');const navList=document.querySelector('.nav-list');
mobile.addEventListener('click',()=>{const open=mobile.getAttribute('aria-expanded')!=='true';mobile.setAttribute('aria-expanded',String(open));navList.classList.toggle('open',open);if(!open)groups.forEach(closeGroup);});
document.addEventListener('click',e=>{if(!e.target.closest('.main-nav'))groups.forEach(closeGroup);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const focused=document.activeElement.closest('.nav-group');groups.forEach(closeGroup);if(focused)focused.querySelector('.nav-trigger').focus();else{navList.classList.remove('open');mobile.setAttribute('aria-expanded','false');}}});
matchMedia('(min-width:851px)').addEventListener('change',()=>{groups.forEach(closeGroup);navList.classList.remove('open');mobile.setAttribute('aria-expanded','false');});
document.querySelectorAll('[data-copy-contact]').forEach(button=>button.addEventListener('click',async()=>{const message=document.querySelector('#copy-status');try{await navigator.clipboard.writeText('JP Golden Pearl Consulting Pte. Ltd.\nLi Ning · General Manager\n+65 8941 6879\n1905880430@qq.com');message.textContent='联系方式已复制 / Contact details copied.';}catch{message.textContent='请选中电话或邮箱复制 / Select the phone number or email to copy.';}}));

