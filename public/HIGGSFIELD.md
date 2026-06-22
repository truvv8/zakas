# Куда класть видео из Higgsfield

1. Положите файл сюда:  **public/higgsfield.mp4**
2. Откройте  `src/remotion/config.ts`  и замените:
   ```ts
   export const HIGGSFIELD_SRC: string | null = null;
   ```
   на
   ```ts
   export const HIGGSFIELD_SRC: string | null = "/higgsfield.mp4";
   ```
3. Готово. На сайте в секции «Шоурил» вместо заглушки заиграет ваше видео,
   и при рендере MP4 оно тоже подставится.

Рекомендуемый формат: 1280×720 (16:9), .mp4 (H.264). Другое разрешение тоже
подойдёт — видео впишется в рамку по `object-fit: cover`.
