"use client";

import { useEffect, useState } from "react";
import { Player } from "@remotion/player";
import { ReestrPromo } from "@/remotion/ReestrPromo";
import { VIDEO, HIGGSFIELD_SRC } from "@/remotion/config";

// Встраивает Remotion-ролик в страницу. Рендерим только на клиенте.
export default function PromoPlayer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-[0_1px_2px_rgba(40,33,22,0.04),0_30px_70px_-36px_rgba(60,45,30,0.4)]">
      {mounted ? (
        <Player
          component={ReestrPromo}
          inputProps={{ videoSrc: HIGGSFIELD_SRC }}
          durationInFrames={VIDEO.durationInFrames}
          fps={VIDEO.fps}
          compositionWidth={VIDEO.width}
          compositionHeight={VIDEO.height}
          style={{ width: "100%", display: "block" }}
          autoPlay
          loop
          controls={false}
          clickToPlay={false}
        />
      ) : (
        // Заглушка до монтирования — сохраняет пропорции, без скачка вёрстки.
        <div style={{ aspectRatio: `${VIDEO.width} / ${VIDEO.height}` }} className="bg-oat" />
      )}
    </div>
  );
}
