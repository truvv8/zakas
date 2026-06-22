import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PayButton from "@/components/PayButton";
import ContactsViewer from "@/components/ContactsViewer";
import DeviceList from "@/components/DeviceList";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // RLS пускает читать только свою строку — поэтому безопасно.
  const { data: profile } = await supabase
    .from("profiles")
    .select("status, access_until")
    .eq("id", user.id)
    .single();

  const { data: devices } = await supabase
    .from("devices")
    .select("id, fingerprint, last_seen")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  const active =
    profile?.status === "paid" &&
    profile.access_until &&
    new Date(profile.access_until).getTime() > Date.now();

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Личный кабинет</h1>
        <span className="text-sm text-gray-500">{user.email}</span>
      </div>

      <section className="mb-8 rounded-lg border p-4">
        <h2 className="mb-2 font-semibold">Подписка</h2>
        {active ? (
          <p className="text-green-700">
            Активна до{" "}
            {new Date(profile!.access_until!).toLocaleDateString("ru-RU")}
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-gray-600">
              Подписка не активна. Оплатите доступ к базе поставщиков.
            </p>
            <PayButton userId={user.id} email={user.email ?? ""} />
          </div>
        )}
      </section>

      {active && (
        <>
          <DeviceList devices={devices ?? []} />
          <ContactsViewer />
        </>
      )}
    </main>
  );
}
