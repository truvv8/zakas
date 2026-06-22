"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Device = { id: string; fingerprint: string; last_seen: string };

export default function DeviceList({ devices }: { devices: Device[] }) {
  const [list, setList] = useState(devices);

  async function unlink(id: string) {
    if (!confirm("Отвязать это устройство?")) return;
    const supabase = createClient();
    // RLS разрешает удалять только свои устройства.
    const { error } = await supabase.from("devices").delete().eq("id", id);
    if (!error) setList((l) => l.filter((d) => d.id !== id));
  }

  return (
    <section className="mb-8 rounded-lg border p-4">
      <h2 className="mb-2 font-semibold">
        Устройства ({list.length}/{process.env.NEXT_PUBLIC_MAX_DEVICES ?? 2})
      </h2>
      {list.length === 0 ? (
        <p className="text-gray-500">Устройств пока нет.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {list.map((d) => (
            <li key={d.id} className="flex items-center justify-between text-sm">
              <span className="font-mono text-gray-600">
                {d.fingerprint.slice(0, 12)}… · вход{" "}
                {new Date(d.last_seen).toLocaleDateString("ru-RU")}
              </span>
              <button
                onClick={() => unlink(d.id)}
                className="text-red-600 hover:underline"
              >
                Отвязать
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
