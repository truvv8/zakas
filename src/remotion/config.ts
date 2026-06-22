// Параметры промо-ролика и СЛОТ для вашего видео из Higgsfield.
//
// Как вставить видео:
// 1. Положите файл в  public/higgsfield.mp4  (рядом с папкой src).
// 2. Замените null на "/higgsfield.mp4"  ↓
// 3. Готово — ролик на сайте автоматически покажет ваше видео вместо заглушки.
export const HIGGSFIELD_SRC: string | null = null;

// Геометрия и длительность ролика.
export const VIDEO = {
  fps: 30,
  width: 1280,
  height: 720,
  durationInFrames: 270, // 9 секунд
} as const;
