import { redirect } from "next/navigation";
import { getSession } from "@/entities/session";
import { LoginForm } from "@/features/auth-by-drasl";
import { routes } from "@/shared/config";
import { safeInternalPath } from "@/shared/lib";
import { Container, Frame, Panel, TitleOrnament } from "@/shared/ui";

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
        <Frame>
          <Panel accent="cyan" bar="top" className="p-6 sm:p-8">
            <p className="font-pixel text-base uppercase tracking-widest text-neon-cyan">Вход</p>
            <h1 className="pixel-shadow mt-2 font-pixel text-[32px] uppercase leading-tight text-white">Аккаунт сервера</h1>
            <TitleOrnament />
            <p className="mt-5 text-sm text-body">
              Введите ник и пароль от аккаунта игрового сервера (Drasl). Это те же данные, что вы используете в лаунчере.
            </p>
            <div className="mt-6">
              <LoginForm next={next} />
            </div>
            <p className="mt-6 text-xs text-muted">
              Пароль передаётся только на сервер авторизации для проверки и не сохраняется на сайте.
            </p>
          </Panel>
        </Frame>
      </div>
    </Container>
  );
}
