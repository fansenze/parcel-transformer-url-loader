import ImageSrc from './img.png';
// const ImageSrc = new URL('img.png', location.origin);

const img = document.createElement('img');

img.src = ImageSrc;

console.log('ImageSrc: ', ImageSrc);

document.body.append(img);
