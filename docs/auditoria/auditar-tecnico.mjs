import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'parse5';

const htmlFiles=[]; const scan=dir=>{for(const item of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,item.name);item.isDirectory()?scan(full):item.name.endsWith('.html')&&htmlFiles.push(full)}}; scan('dist');
const issues=[]; const titles=new Map();
const attr=(node,name)=>node.attrs?.find(a=>a.name===name)?.value;
const text=node=>node.nodeName==='#text'?node.value:(node.childNodes||[]).map(text).join('');
for(const file of htmlFiles){
  const nodes=[];const walk=n=>{nodes.push(n);for(const c of n.childNodes||[])walk(c)};walk(parse(fs.readFileSync(file,'utf8')));
  const redirect=nodes.some(n=>n.tagName==='meta'&&attr(n,'http-equiv')==='refresh'); if(redirect)continue;
  const tag=name=>nodes.filter(n=>n.tagName===name); const meta=(key,value)=>tag('meta').find(n=>attr(n,key)===value);
  const canonicalNode=tag('link').find(n=>attr(n,'rel')==='canonical');
  const title=text(tag('title')[0]||{}).trim(); if(!title)issues.push(`${file}: title vacío`); else titles.set(title,[...(titles.get(title)||[]),file]);
  if(!meta('name','description')||!attr(meta('name','description'),'content'))issues.push(`${file}: sin description`);
  if(!canonicalNode)issues.push(`${file}: sin canonical`);
  for(const key of ['og:title','og:description','og:url','og:image'])if(!meta('property',key))issues.push(`${file}: sin ${key}`);
  for(const key of ['twitter:card','twitter:title','twitter:description','twitter:image'])if(!meta('name',key))issues.push(`${file}: sin ${key}`);
  const headings=nodes.filter(n=>/^h[1-6]$/.test(n.tagName)).map(n=>+n.tagName[1]);
  if(headings.filter(h=>h===1).length!==1)issues.push(`${file}: requiere un H1`);
  if(headings.some((h,i)=>i>0&&h>headings[i-1]+1))issues.push(`${file}: salto de encabezado ${headings.join('-')}`);
  if(nodes.some(n=>n.tagName==='figure'&&nodes.some(child=>child.tagName==='figure'&&child.parentNode===n)))issues.push(`${file}: figure anidado`);
  const ids=new Set(nodes.map(n=>attr(n,'id')).filter(Boolean));
  for(const link of tag('a')){
    const href=attr(link,'href');if(!href||/^(mailto:|tel:|https?:)/.test(href))continue;
    const linkedImages=[];const collectImages=n=>{if(n.tagName==='img')linkedImages.push(n);for(const c of n.childNodes||[])collectImages(c)};collectImages(link);
    if(!text(link).trim()&&linkedImages.length&&linkedImages.every(img=>!attr(img,'alt')))issues.push(`${file}: enlace de imagen sin nombre accesible ${href}`);
    const url=new URL(href,'https://laosapolar.es');
    const target=url.pathname==='/'?'dist/index.html':url.pathname==='/404.html'?'dist/404.html':`dist${url.pathname}${url.pathname.endsWith('/')?'index.html':''}`;
    if(!fs.existsSync(target))issues.push(`${file}: enlace roto ${href}`);
    if(canonicalNode&&url.pathname===new URL(attr(canonicalNode,'href'),'https://laosapolar.es').pathname&&url.hash&&!ids.has(url.hash.slice(1)))issues.push(`${file}: ancla rota ${href}`);
  }
  for(const img of tag('img')){
    if(attr(img,'alt')===undefined)issues.push(`${file}: imagen sin alt`);
    if(!attr(img,'width')||!attr(img,'height'))issues.push(`${file}: imagen sin dimensiones ${attr(img,'src')}`);
    if(attr(img,'loading')==='lazy'&&nodes.indexOf(img)<20)issues.push(`${file}: posible LCP lazy`);
  }
  for(const field of [...tag('input'),...tag('textarea')])if(attr(field,'type')!=='hidden'&&!tag('label').some(l=>attr(l,'for')===attr(field,'id')))issues.push(`${file}: campo sin label`);
}
for(const [title,files] of titles)if(files.length>1)issues.push(`title duplicado: ${title} (${files.join(', ')})`);
console.log(JSON.stringify({pages:htmlFiles.length,issues},null,2));
if(issues.length)process.exitCode=1;
