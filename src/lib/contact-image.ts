import sharp from "sharp";

// Экранирование для вставки текста в SVG.
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Рендерит контакт в PNG с диагональным водяным знаком (email покупателя).
 * Текст — растр, его нельзя выделить/скопировать как текст; перепечатывать вручную.
 */
export async function renderContactImage(opts: {
  title: string;
  body: string;
  watermark: string; // email или id покупателя
}): Promise<Buffer> {
  const width = 900;
  const height = 360;

  // Строки тела контакта.
  const bodyLines = opts.body.split("\n").slice(0, 8);
  const bodyTspans = bodyLines
    .map(
      (line, i) =>
        `<tspan x="48" dy="${i === 0 ? 0 : 34}">${esc(line)}</tspan>`
    )
    .join("");

  // Повторяющийся водяной знак по всей площади.
  const marks: string[] = [];
  for (let y = 40; y < height; y += 90) {
    for (let x = -50; x < width; x += 340) {
      marks.push(
        `<text x="${x}" y="${y}" transform="rotate(-25 ${x} ${y})"
           font-family="sans-serif" font-size="20" fill="#000000"
           fill-opacity="0.08">${esc(opts.watermark)}</text>`
      );
    }
  }

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="100%" height="100%" fill="#ffffff"/>
    <rect x="1" y="1" width="${width - 2}" height="${height - 2}"
          fill="none" stroke="#e5e5e5" stroke-width="2"/>
    <text x="48" y="64" font-family="sans-serif" font-size="28"
          font-weight="700" fill="#111111">${esc(opts.title)}</text>
    <text x="48" y="130" font-family="monospace" font-size="24" fill="#222222">
      ${bodyTspans}
    </text>
    ${marks.join("")}
  </svg>`;

  return sharp(Buffer.from(svg)).png().toBuffer();
}
