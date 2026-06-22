// Конфиг Remotion CLI/Studio (не влияет на сборку Next.js).
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setEntryPoint("./src/remotion/index.ts");
Config.setOverwriteOutput(true);
