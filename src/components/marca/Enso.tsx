import type { SVGProps } from "react";
import { ENSO, NOME } from "./caminhos";

export function Enso(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox={`0 0 ${ENSO.largura} ${ENSO.altura}`} fill="currentColor" aria-hidden="true" {...props}>
      <path d={ENSO.d} fillRule="evenodd" />
    </svg>
  );
}

/** O nome "blackbelt center", sem o ensō. */
export function Nome({ title = "Black Belt Center", ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg viewBox={`0 0 ${NOME.largura} ${NOME.altura}`} role="img" aria-label={title} {...props}>
      <path d={NOME.black} fill="currentColor" fillRule="evenodd" />
      <path d={NOME.belt} fill="var(--logo-belt, var(--color-belt))" fillRule="evenodd" />
      <path d={NOME.center} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

/** O logo completo, na proporção usada nas artes atuais. */
export function LogoCompleto({ title = "Black Belt Center", ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg viewBox={`0 -196 ${NOME.largura} 326`} role="img" aria-label={title} {...props}>
      <path d={ENSO.d} fill="currentColor" fillRule="evenodd" transform="translate(108.45 -191.07) scale(.7)" />
      <path d={NOME.black} fill="currentColor" fillRule="evenodd" />
      <path d={NOME.belt} fill="var(--logo-belt, var(--color-belt))" fillRule="evenodd" />
      <path d={NOME.center} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
