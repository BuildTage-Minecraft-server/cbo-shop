import { routes } from "@/shared/config";
import { ButtonLink, Container } from "@/shared/ui";

export function NotFoundPage() {
  return (
    <Container className="py-24 text-center">
      <p className="font-pixel text-4xl text-neon-pink">404</p>
      <h1 className="mt-6 text-2xl font-bold text-fg">Страница не найдена</h1>
      <p className="mt-3 text-muted">Возможно, ссылка устарела или адрес введён с ошибкой.</p>
      <div className="mt-8">
        <ButtonLink href={routes.home}>На главную</ButtonLink>
      </div>
    </Container>
  );
}
