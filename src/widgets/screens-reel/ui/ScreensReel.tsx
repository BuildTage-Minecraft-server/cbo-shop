import { siteConfig } from "@/shared/config";
import { listScreens } from "@/shared/lib/screens";
import { Container, PixelIcon, SectionHeading } from "@/shared/ui";
import { ReelGrid } from "./ReelGrid";

const isDev = process.env.NODE_ENV === "development";

export async function ScreensReel() {
  const images = await listScreens("gallery");
  if (images.length === 0 && !isDev) return null;

  return (
    <section id="gallery" className="scroll-mt-24 border-t border-line">
      <Container className="py-12 md:py-20">
        <SectionHeading title="Кадры из игры" description="Настоящие матчи, карты и оформление. Нажмите на кадр, чтобы открыть его крупнее." />
        <div className="mt-10">
          {images.length > 0 ? (
            <ReelGrid images={images} alt={`Кадр из игры ${siteConfig.name}`} />
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className={`flex aspect-video flex-col items-center justify-center gap-3 border border-dashed border-line-strong bg-gradient-to-br from-surface-2 to-ink ${index === 0 ? "sm:col-span-2 md:row-span-2" : ""}`}
                >
                  <PixelIcon name="target" scale={3} className="text-line-strong" />
                  <code className="px-4 text-center text-xs text-accent">public/screens/gallery/{index + 1}.webp</code>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
