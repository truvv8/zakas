import { FactoryBrowser } from "@/components/dashboard/FactoryBrowser";

// ВНИМАНИЕ: пока превью-режим — кабинет открыт без авторизации и на демо-данных,
// чтобы можно было смотреть дизайн. Перед запуском вернуть гейт по оплате
// (checkAccess) и брать фабрики из Supabase.
export default function DashboardPage() {
  return <FactoryBrowser />;
}
