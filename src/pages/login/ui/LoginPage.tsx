import { redirect } from "next/navigation";
import { getSession } from "@/entities/session";
import { LoginForm } from "@/features/auth-by-drasl";
import { routes } from "@/shared/config";
import { safeInternalPath } from "@/shared/lib";
import { Container, Panel } from "@/shared/ui";

export async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string | string[] }> }) {
  const params = await searchParams;
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const next = safeInternalPath(rawNext, routes.shop);

  const session = await getSession();
  if (session) {
    redirect(next);
  }

  return (
    <Container className="py-12 md:py-20">
      <div className="mx-auto max-w-md">
        <h1 className="font-display text-5xl font-bold uppercase leading-none tracking-wide text-white">Вход</h1>
        <p className="mt-4 leading-7 text-body">
          Введите ник и пароль от аккаунта игрового сервера (Drasl). Это те же данные, что вы используете в лаунчере.
        </p>
        <Panel accent="cyan" className="mt-8 p-6 sm:p-8">
          <LoginForm next={next} />
        </Panel>
        <p className="mt-4 text-xs leading-5 text-muted">
          Пароль передаётся только на сервер авторизации для проверки и не сохраняется на сайте.
        </p>
      </div>
    </Container>
  );
}
