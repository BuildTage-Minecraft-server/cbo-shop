import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/entities/session";
import { RegisterForm } from "@/features/register-by-drasl";
import { gameServer, routes } from "@/shared/config";
import { safeInternalPath } from "@/shared/lib";
import { ButtonAnchor, Container, Panel } from "@/shared/ui";

export async function RegisterPage({ searchParams }: { searchParams: Promise<{ next?: string | string[] }> }) {
  const params = await searchParams;
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const next = safeInternalPath(rawNext, routes.join);

  const session = await getSession();
  if (session) {
    redirect(next);
  }

  return (
    <Container className="py-12 md:py-20">
      <div className="mx-auto max-w-md">
        <h1 className="font-display text-5xl font-bold uppercase leading-none tracking-wide text-white">Регистрация</h1>
        <p className="mt-4 leading-7 text-body">
          Создайте аккаунт игрового сервера. С ним вы заходите в игру через лаунчер и входите на этот сайт.
        </p>

        {gameServer.registrationEnabled ? (
          <Panel accent="cyan" className="mt-8 p-6 sm:p-8">
            <RegisterForm next={next} />
          </Panel>
        ) : (
          <Panel className="mt-8 p-6 sm:p-8">
            <p className="leading-7 text-body">Регистрация на сайте пока недоступна.</p>
            {gameServer.accountsUrl ? (
              <div className="mt-5">
                <ButtonAnchor href={gameServer.accountsUrl} target="_blank" rel="noopener noreferrer" variant="secondary" icon="user">
                  Создать аккаунт на сервере авторизации
                </ButtonAnchor>
              </div>
            ) : null}
          </Panel>
        )}

        <p className="mt-4 text-xs leading-5 text-muted">
          Создавая аккаунт, вы соглашаетесь с{" "}
          <Link href={routes.privacy} className="text-accent underline underline-offset-4">
            политикой конфиденциальности
          </Link>
          . Пароль передаётся на сервер авторизации для создания аккаунта и не сохраняется на сайте.
        </p>
        <p className="mt-6 text-sm text-body">
          Уже есть аккаунт?{" "}
          <Link href={`${routes.login}?next=${encodeURIComponent(next)}`} className="text-accent underline underline-offset-4">
            Войти
          </Link>
        </p>
      </div>
    </Container>
  );
}
