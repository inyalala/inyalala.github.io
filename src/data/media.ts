import dimsJson from './image-dimensions.json';

interface ImgDim {
  width: number;
  height: number;
}

const dims = dimsJson as Record<string, ImgDim>;

export function getImageDim(src: string, fallbackW = 800, fallbackH = 500): ImgDim {
  return dims[src] || { width: fallbackW, height: fallbackH };
}

export function getThumbSrc(src: string): string {
  if (src.startsWith('/images/news/')) {
    const stem = src.slice('/images/news/'.length).replace(/\.[^.]+$/, '');
    const candidate = `/images/thumbs/news/${stem}.webp`;
    if (dims[candidate]) return candidate;
  }
  if (src.startsWith('/images/research/')) {
    const stem = src.slice('/images/research/'.length).replace(/\.[^.]+$/, '');
    const candidate = `/images/thumbs/research/${stem}.webp`;
    if (dims[candidate]) return candidate;
  }
  if (src.startsWith('/images/writing/')) {
    const stem = src.slice('/images/writing/'.length).replace(/\.[^.]+$/, '');
    const candidate = `/images/thumbs/writing/${stem}.webp`;
    if (dims[candidate]) return candidate;
  }
  return src;
}
