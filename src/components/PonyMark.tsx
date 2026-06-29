// Оригинальный знак Chevailer: голова коня в профиль (мотив рыцаря/chevalier).
// Намеренно НЕ повозка и не эмблема какого-либо бренда — собственный силуэт.
// Координаты в системе 0..64; центр ≈ (30, 33) — используется и в canvas.
export const PONY_PATH =
  "M39 12 C38 9 36 6 35 6 C34 9 33 12 33 14 C26 19 17 28 10 38 C8 40 7 42 9 44 C12 46 16 46 19 45 C21 44 22 44 23 44 C24 49 25 54 28 58 C29 60 30 62 31 63 L48 63 C50 52 50 40 48 28 C47 22 47 18 46 14 C46 10 46 7 45 6 C43 8 41 10 39 12 Z";

export const PONY_CENTER = { x: 29, y: 34 };

export function PonyMark({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <path d={PONY_PATH} />
    </svg>
  );
}
