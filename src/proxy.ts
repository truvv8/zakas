import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Обновляет сессию Supabase на каждом запросе и защищает /dashboard.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Обновляем сессию (нужно для серверных запросов к Supabase).
  await supabase.auth.getUser();

  // ВНИМАНИЕ: редирект /dashboard -> /login временно отключён (превью кабинета).
  // Перед запуском вернуть гейт по оплате.
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
