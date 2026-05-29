import html2canvas from 'html2canvas';

const STORY_WIDTH = 1080;
const STORY_HEIGHT = 1920;

export async function resolveAvatarDataUrl(url: string): Promise<string> {
  if (!url || url.startsWith('data:')) {
    return url;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return url;
    }

    const blob = await response.blob();
    return await blobToDataUrl(blob);
  } catch {
    return url;
  }
}

export function downloadDataUrl(dataUrl: string, fileName = 'stickify-card.png'): void {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function getBase64FromDataUrl(dataUrl: string): string {
  return dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
}

/**
 * Копирует видимую карточку коллекционера (DOM) в PNG 1080×1920.
 * ShareCard в интерфейсе не меняется.
 */
export async function renderCollectorCardToPng(card: HTMLElement): Promise<string> {
  const width = card.offsetWidth;
  const height = card.offsetHeight;

  if (!width || !height) {
    throw new Error('Карточка не отрисована');
  }

  card.scrollIntoView({ block: 'center' });
  await waitFrames(2);
  await inlineShareCardAvatar(card);

  const scale = STORY_WIDTH / width;

  const snapshot = await html2canvas(card, {
    backgroundColor: '#eef7ff',
    scale,
    useCORS: true,
    allowTaint: true,
    imageTimeout: 20_000,
    logging: false,
    scrollX: 0,
    scrollY: -window.scrollY,
    onclone: (_document, element) => {
      element.classList.add('share-card--exporting');
    }
  });

  if (snapshot.width < 100 || snapshot.height < 100) {
    throw new Error('Пустой снимок карточки');
  }

  const output = document.createElement('canvas');
  output.width = STORY_WIDTH;
  output.height = STORY_HEIGHT;
  const ctx = output.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas не поддерживается');
  }

  ctx.fillStyle = '#eef7ff';
  ctx.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);
  ctx.drawImage(snapshot, 0, 0, STORY_WIDTH, STORY_HEIGHT);

  const dataUrl = output.toDataURL('image/png');

  if (dataUrl.length < 10_000) {
    throw new Error('PNG пустой');
  }

  return dataUrl;
}

async function inlineShareCardAvatar(card: HTMLElement): Promise<void> {
  const avatar = card.querySelector<HTMLImageElement>('.share-card__avatar img');
  if (!avatar) {
    return;
  }

  const source = avatar.currentSrc || avatar.getAttribute('src') || '';
  if (!source || source.startsWith('data:')) {
    return;
  }

  const previousSrc = avatar.src;

  try {
    avatar.src = await resolveAvatarDataUrl(source);
    await waitForImage(avatar);
  } catch {
    avatar.src = previousSrc;
  }
}

function waitForImage(image: HTMLImageElement): Promise<void> {
  if (image.complete && image.naturalWidth > 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    image.onload = () => resolve();
    image.onerror = () => resolve();
  });
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('read failed'));
    reader.readAsDataURL(blob);
  });
}

function waitFrames(count: number): Promise<void> {
  return new Promise((resolve) => {
    let left = count;
    const tick = () => {
      left -= 1;
      if (left <= 0) resolve();
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}
