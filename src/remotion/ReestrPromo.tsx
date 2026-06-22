import React from "react";
import {
  AbsoluteFill,
  Sequence,
  Video,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

const SERIF = 'var(--font-display), "Source Serif 4", Georgia, serif';
const SANS = 'var(--font-sans), "Manrope", system-ui, sans-serif';

const C = {
  cream: "#f4f1ea",
  paper: "#fbfaf6",
  oat: "#ece8dd",
  ink: "#1a1915",
  inkSoft: "#3b3933",
  muted: "#62605a",
  coral: "#d97757",
  coralInk: "#b1502c",
  line: "#e3dfd4",
};

export type ReestrPromoProps = {
  videoSrc: string | null;
};

// Плавное появление/исчезание по кадрам.
function fade(
  frame: number,
  inEnd: number,
  outStart: number,
  outEnd: number
): number {
  return interpolate(
    frame,
    [0, inEnd, outStart, outEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
}

// Фон: кремовый с мягким дрейфующим коралловым свечением.
const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const x = interpolate(frame, [0, durationInFrames], [-120, 120]);
  const y = interpolate(
    frame,
    [0, durationInFrames / 2, durationInFrames],
    [40, -40, 40]
  );
  return (
    <AbsoluteFill style={{ background: C.cream, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 900,
          height: 900,
          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
          background:
            "radial-gradient(circle, rgba(217,119,87,0.18), rgba(217,119,87,0) 60%)",
          filter: "blur(20px)",
        }}
      />
      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 240px rgba(60,45,30,0.10)",
        }}
      />
    </AbsoluteFill>
  );
};

// Коралловый знак-астериск, прорисовывается с пружиной.
const Mark: React.FC<{ size?: number; delay?: number }> = ({
  size = 64,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  const rot = interpolate(s, [0, 1], [-90, 0]);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        background: C.coral,
        display: "grid",
        placeItems: "center",
        transform: `scale(${s}) rotate(${rot}deg)`,
      }}
    >
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" stroke={C.ink} strokeWidth={2.4} strokeLinecap="round">
        <line x1="12" y1="4" x2="12" y2="20" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="6.3" y1="6.3" x2="17.7" y2="17.7" />
        <line x1="17.7" y1="6.3" x2="6.3" y2="17.7" />
      </svg>
    </div>
  );
};

// Сцена 1 — бренд.
const SceneBrand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = spring({ frame: frame - 12, fps, config: { damping: 18 } });
  const y = interpolate(rise, [0, 1], [28, 0]);
  const tag = fade(frame, 40, 80, 100);
  const opacity = fade(frame, 16, 78, 100);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 24, opacity }}>
      <Mark size={84} delay={0} />
      <div
        style={{
          fontFamily: SERIF,
          fontWeight: 500,
          fontSize: 92,
          letterSpacing: "-0.02em",
          color: C.ink,
          transform: `translateY(${y}px)`,
        }}
      >
        Реестр
      </div>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 24,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: C.muted,
          opacity: tag,
        }}
      >
        Частный реестр поставщиков
      </div>
    </AbsoluteFill>
  );
};

// Сцена 2 — заголовок, слова поднимаются по очереди.
const words = ["Проверенные", "поставщики —", "по подписке"];
const SceneHeadline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fade(frame, 14, 66, 85);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity }}>
      <div style={{ maxWidth: 980, textAlign: "center", lineHeight: 1.08 }}>
        {words.map((w, i) => {
          const s = spring({ frame: frame - 6 - i * 8, fps, config: { damping: 16 } });
          const y = interpolate(s, [0, 1], [40, 0]);
          const last = i === words.length - 1;
          return (
            <span
              key={w}
              style={{
                display: "inline-block",
                fontFamily: SERIF,
                fontWeight: 500,
                fontSize: 84,
                letterSpacing: "-0.02em",
                color: last ? C.coralInk : C.ink,
                fontStyle: last ? "italic" : "normal",
                transform: `translateY(${y}px)`,
                opacity: s,
                margin: "0 14px",
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Сцена 3 — видеослот (ваше видео из Higgsfield) + подпись и CTA.
const SceneShowreel: React.FC<{ videoSrc: string | null }> = ({ videoSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 20 } });
  const scale = interpolate(s, [0, 1], [0.92, 1]);
  const opacity = fade(frame, 14, 999, 1000);
  const cta = fade(frame, 55, 999, 1000);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity }}>
      <div
        style={{
          width: 940,
          height: 470,
          transform: `scale(${scale})`,
          borderRadius: 28,
          overflow: "hidden",
          background: C.paper,
          border: `1px solid ${C.line}`,
          boxShadow: "0 30px 80px -40px rgba(60,45,30,0.5)",
          position: "relative",
        }}
      >
        {videoSrc ? (
          <Video src={videoSrc} muted loop style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <Placeholder />
        )}

        {/* Подпись-чип поверх */}
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 20,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(251,250,246,0.9)",
            border: `1px solid ${C.line}`,
            borderRadius: 999,
            padding: "8px 14px",
            fontFamily: SANS,
            fontSize: 16,
            fontWeight: 600,
            color: C.inkSoft,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: 999, background: C.coral }} />
          Шоурил
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: 36,
          opacity: cta,
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: C.coral,
          color: C.ink,
          fontFamily: SANS,
          fontSize: 24,
          fontWeight: 600,
          padding: "16px 30px",
          borderRadius: 999,
        }}
      >
        Получить доступ
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};

// Анимированная заглушка — пока нет видео из Higgsfield.
const Placeholder: React.FC = () => {
  const frame = useCurrentFrame();
  const shimmer = interpolate(frame % 90, [0, 45, 90], [0.4, 1, 0.4]);
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${C.oat}, ${C.paper})`,
        justifyContent: "center",
        alignItems: "center",
        gap: 18,
      }}
    >
      <div
        style={{
          width: 78,
          height: 78,
          borderRadius: 999,
          background: C.coral,
          display: "grid",
          placeItems: "center",
          opacity: shimmer,
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill={C.ink}>
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <div style={{ fontFamily: SERIF, fontSize: 30, color: C.ink }}>
        Сюда вставится видео Higgsfield
      </div>
      <div style={{ fontFamily: SANS, fontSize: 16, color: C.muted, letterSpacing: "0.04em" }}>
        public/higgsfield.mp4 · 1280×720
      </div>
    </AbsoluteFill>
  );
};

export const ReestrPromo: React.FC<ReestrPromoProps> = ({ videoSrc }) => {
  return (
    <AbsoluteFill>
      <Backdrop />
      <Sequence durationInFrames={100}>
        <SceneBrand />
      </Sequence>
      <Sequence from={100} durationInFrames={85}>
        <SceneHeadline />
      </Sequence>
      <Sequence from={185}>
        <SceneShowreel videoSrc={videoSrc} />
      </Sequence>
    </AbsoluteFill>
  );
};
