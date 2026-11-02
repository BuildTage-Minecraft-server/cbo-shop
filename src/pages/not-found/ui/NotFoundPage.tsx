import { routes } from "@/shared/config";
import { ButtonLink, Container } from "@/shared/ui";

export function NotFoundPage() {
  return (
    <Container className="py-16 md:py-28">
      <div className="mx-auto max-w-lg">
        <p className="font-display text-[120px] font-bold leading-none text-accent">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-tight tracking-wide text-white">Страница не найдена</h1>
        <p className="mt-3 leading-7 text-body">Возможно, ссылка устарела или адрес введён с ошибкой.</p>
        <div className="mt-8">
          <ButtonLink href={routes.home}>На главную</ButtonLink>
        </div>
      </div>
    </Container>
  );
}
