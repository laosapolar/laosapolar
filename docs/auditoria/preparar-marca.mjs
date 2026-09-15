import fs from 'node:fs';
import sharp from 'sharp';
const mark = await sharp('src/assets/home/logoFull.png').extract({left: 0, top: 0, width: 287, height: 287}).resize(96, 96).png().toBuffer();
fs.writeFileSync('public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><image width="96" height="96" href="data:image/png;base64,${mark.toString('base64')}" /></svg>\n`);
await sharp('src/assets/home/cropped-12-scaled-2-scaled.jpg').resize(1200, 630, {fit: 'cover', position: 'centre'}).jpeg({quality: 85}).toFile('public/social.jpg');
