import FingerprintJS from "@fingerprintjs/fingerprintjs";

let cached: Promise<string> | null = null;

// Стабильный отпечаток устройства. Кэшируем на время жизни вкладки.
export function getFingerprint(): Promise<string> {
  if (cached) return cached;
  cached = (async () => {
    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();
    return visitorId;
  })();
  return cached;
}
