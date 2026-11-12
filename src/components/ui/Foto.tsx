import Image from "next/image";

/** Foto com recorte fixo, sem sombra nem cantos arredondados: a mesma secura dos cartazes. */
export function Foto({
  src,
  alt,
  sizes,
  posicao = "center",
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  posicao?: string;
  className?: string;
}) {
  return (
    <div className={`${className.includes("absolute") ? "" : "relative "}overflow-hidden bg-parede ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} style={{ objectFit: "cover", objectPosition: posicao }} />
    </div>
  );
}
