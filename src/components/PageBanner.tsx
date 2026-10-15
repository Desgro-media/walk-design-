import Image from "next/image";

/** Photo banner at the top of inner pages. `data-hero` lets the header stay transparent while it is on screen. */
export function PageBanner({
  image,
  alt,
  eyebrow,
  title,
  position = "50% 50%",
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  position?: string;
}) {
  return (
    <section data-hero className="relative w-full h-[52svh] min-h-[340px] sm:h-[58svh] overflow-hidden bg-[#121110]">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover"
        style={{ objectPosition: position }}
      />
      <div className="absolute inset-0 bg-[#1A1816]/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/35" />
      <div className="absolute bottom-10 sm:bottom-14 left-6 sm:left-10 md:left-14 lg:left-20 right-6 text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
        <p className="text-[11px] tracking-[0.24em] uppercase font-light text-white/80">{eyebrow}</p>
        <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-light tracking-tight">{title}</h1>
      </div>
    </section>
  );
}
