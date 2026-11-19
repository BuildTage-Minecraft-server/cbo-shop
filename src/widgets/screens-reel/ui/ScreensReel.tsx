import { siteConfig } from "@/shared/config";
import { listScreens } from "@/shared/lib/screens";
import { Container, PixelIcon, SectionHeading } from "@/shared/ui";
import { ReelGrid } from "./ReelGrid";

const isDev = process.env.NODE_ENV === "development";
const placeholders = [0, 1, 2, 3, 4, 5] as const;

export async function ScreensReel() {
  const images = await listScreens("gallery");

  return (
    <section id="gallery" className="scroll-mt-24 border-t border-line">
      <Container className="py-12 md:py-20">
        <SectionHeading title="Кадры из игры" description="Матчи, карты и оформление в реальной игре. Нажмите на кадр, чтобы открыть его крупнее." />
        <div className="mt-10">
          {images.length > 0 ? (
            <ReelGrid images={images} alt={`Кадр из игры ${siteConfig.name}`} />
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
              {placeholders.map((index) => (
                <div
                  key={index}
                  className={`flex aspect-video flex-col items-center justify-center gap-3 border border-dashed border-line-strong bg-gradient-to-br from-surface-2 to-ink ${index === 0 ? "sm:col-span-2 md:row-span-2" : ""}`}
                >
                  <PixelIcon name="target" scale={3} className="text-line-strong" />
                  <span className="font-display text-lg uppercase tracking-wider text-muted">Кадр из игры</span>
                  {isDev ? <code className="text-xs text-accent">public/screens/gallery/{index + 1}.webp</code> : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
