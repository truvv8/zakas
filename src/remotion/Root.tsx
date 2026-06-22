import React from "react";
import { Composition, staticFile } from "remotion";
import { ReestrPromo } from "./ReestrPromo";
import { HIGGSFIELD_SRC, VIDEO } from "./config";

// Точка входа для Remotion Studio и рендера в MP4.
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ReestrPromo"
      component={ReestrPromo}
      durationInFrames={VIDEO.durationInFrames}
      fps={VIDEO.fps}
      width={VIDEO.width}
      height={VIDEO.height}
      defaultProps={{
        // При рендере видео берётся из Remotion public-папки.
        videoSrc: HIGGSFIELD_SRC ? staticFile("higgsfield.mp4") : null,
      }}
    />
  );
};
