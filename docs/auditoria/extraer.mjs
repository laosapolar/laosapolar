import fs from 'node:fs';
import {parse} from 'parse5';
const base = 'docs/auditoria/';
const decode = s => s.replaceAll('&amp;', '&');
const urls = [...fs.readFileSync(base+'original/pages-sitemap.xml','utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>decode(m[1]));
urls.push('https://laosapolar.es/?page_id=68','https://laosapolar.es/?page_id=62','https://laosapolar.es/?page_id=82');
const files = urls.map((url,i)=>({url,file:i===0?'inicio':new URL(url).search?'page-'+new URL(url).searchParams.get('page_id'):new URL(url).pathname.split('/').filter(Boolean).join('-')}));
fs.writeFileSync(base+'urls.json',JSON.stringify(files,null,2));
if (process.argv.includes('--config')) {
 fs.writeFileSync(base+'curl.txt',files.filter(p=>p.file!=='inicio').map(p=>`url = "${p.url}"\noutput = "${base}original/${p.file}.html"\n`).join('\n'));
 process.exit();
}
const results=[];
for(const {url,file} of files){
 if(!fs.existsSync(base+'original/'+file+'.html'))continue;
 const html=fs.readFileSync(base+'original/'+file+'.html','utf8');
 const doc=parse(html); const nodes=[]; const walk=n=>{if(n.tagName)nodes.push(n); for(const c of n.childNodes||[])walk(c)};walk(doc);
 const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value||'';
 const text=n=>n.nodeName==='#text'?n.value:['script','style'].includes(n.tagName)?'':(n.childNodes||[]).map(text).join(' ');
 const clean=n=>text(n).replace(/\s+/g,' ').trim();
 const content=nodes.find(n=>attr(n,'class').split(' ').includes('entry-content'))||nodes.find(n=>n.tagName==='main');
 const contentNodes=[];const sub=n=>{contentNodes.push(n);for(const c of n.childNodes||[])sub(c)};if(content)sub(content);
 const absolute=v=>{try{return new URL(v,url).href}catch{return v}};
 const r={url,file,title:clean(nodes.find(n=>n.tagName==='title')||{}),canonical:attr(nodes.find(n=>n.tagName==='link'&&attr(n,'rel')==='canonical')||{},'href'),meta:nodes.filter(n=>n.tagName==='meta').map(n=>Object.fromEntries(n.attrs.map(a=>[a.name,a.value]))),headings:nodes.filter(n=>/^h[1-6]$/.test(n.tagName)).map(n=>({level:n.tagName,text:clean(n)})),text:content?clean(content):'',links:nodes.filter(n=>n.tagName==='a'&&attr(n,'href')).map(n=>({text:clean(n),url:absolute(attr(n,'href'))})),images:nodes.filter(n=>n.tagName==='img').map(n=>({url:absolute(attr(n,'src')),alt:attr(n,'alt'),width:attr(n,'width'),height:attr(n,'height'),srcset:attr(n,'srcset')})),backgrounds:[...html.matchAll(/url\(["']?(https?:[^)'"\s]+)["']?\)/g)].map(m=>decode(m[1])),forms:nodes.filter(n=>n.tagName==='form').map(n=>({id:attr(n,'id'),action:attr(n,'action'),method:attr(n,'method'),text:clean(n)})),contentBlocks:contentNodes.filter(n=>['p','h1','h2','h3','h4','li','figcaption'].includes(n.tagName)).map(n=>({tag:n.tagName,text:clean(n)})).filter(x=>x.text)};
 results.push(r);
 fs.writeFileSync(base+'original/'+file+'.txt',r.title+'\n'+r.contentBlocks.map(b=>b.tag+': '+b.text).join('\n'));
}
fs.writeFileSync(base+'inventario.json',JSON.stringify(results,null,2));
console.log(results.map(r=>({url:r.url,title:r.title,canonical:r.canonical,chars:r.text.length,images:r.images.length,forms:r.forms.map(f=>f.id),headings:r.headings.filter(h=>h.text!=='ENCUÉNTRANOS'&&h.text!=='ENLACES'&&h.text!=='BÚSQUEDA')})));
