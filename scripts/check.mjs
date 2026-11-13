import assert from 'node:assert/strict';
import fs from 'node:fs';
const html=fs.readFileSync('dist/index.html','utf8');
const js=fs.readFileSync('dist/app.js','utf8');
for(const file of ['styles.css','app.js','favicon.svg','assets/proposta-de-patrocinio.pdf'])assert(fs.existsSync(`dist/${file}`),`Missing ${file}`);
for(let i=1;i<=25;i++){const file=`dist/assets/image-${String(i).padStart(2,'0')}.jpg`;assert(fs.statSync(file).size>1000,`Missing image ${i}`);}
for(const id of ['inicio','projetos','conquistas','ajudar','sobre']){assert(html.includes(`id="${id}"`));assert(html.includes(`id="title-${id}"`));}
assert.equal((js.match(/^  \[\d+,'/gm)||[]).length,20);
for(const price of ['3.000','5.000','10.000','15.000'])assert(html.includes(price));
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){const url=match[1];if(!url.includes(':'))assert(fs.existsSync(`dist/${url}`),`Broken asset: ${url}`);}
assert(!html.includes('lorem ipsum'));
console.log('OK: five pages, 25 images, 20 gallery entries, sponsorship values and local asset links.');
