import { redirect } from "next/navigation";
import { getSession } from "@/entities/session";
import { LoginForm } from "@/features/auth-by-drasl";
import { routes } from "@/shared/config";
import { safeInternalPath } from "@/shared/lib";
import { Container } from "@/shared/ui";

export async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string | string[] }> }) {
  const params = await searchParams;
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const next = safeInternalPath(rawNext, routes.shop);

  const session = await getSession();
  if (session) {
    redirect(next);
  }

  return (
    <Container className="py-14 md:py-20">
      <div className="mx-auto max-w-md rounded-xl border border-line bg-surface/80 p-6 sm:p-8">
        <p className="font-pixel text-[10px] uppercase tracking-widest text-neon-cyan">Вход</p>
        <h1 className="mt-3 text-2xl font-bold text-fg">Аккаунт сервера</h1>
        <p className="mt-2 text-sm text-muted">
          Введите ник и пароль от аккаунта игрового сервера (Drasl). Это те же данные, что вы используете в лаунчере.
        </p>
        <div className="mt-6">
          <LoginForm next={next} />
        </div>
        <p className="mt-6 text-xs text-muted">
          Пароль передаётся только на сервер авторизации для проверки и не сохраняется на сайте.
        </p>
      </div>
    </Container>
  );
}
