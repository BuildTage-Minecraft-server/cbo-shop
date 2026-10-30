import { routes } from "@/shared/config";
import { ButtonLink, Container, Frame, Panel } from "@/shared/ui";

export function NotFoundPage() {
  return (
    <Container className="py-14 md:py-24">
      <div className="mx-auto max-w-lg">
        <Frame accent="pink">
          <Panel accent="pink" bar="top" className="p-8 text-center">
            <p className="pixel-shadow font-pixel text-5xl text-hud-pink">404</p>
            <h1 className="pixel-shadow mt-6 font-pixel text-[32px] uppercase leading-tight text-white">Страница не найдена</h1>
            <p className="mt-3 text-body">Возможно, ссылка устарела или адрес введён с ошибкой.</p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href={routes.home}>На главную</ButtonLink>
            </div>
          </Panel>
        </Frame>
      </div>
    </Container>
  );
}
