import type { MetadataRoute } from "next";
import { obterModalidades } from "@/lib/conteudo";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const modalidades = await obterModalidades();
  const rotas = ["", "/modalidades", "/horarios", "/criancas", "/mulheres", "/competicao", "/mural", "/planos", "/contato"];
  return [
    ...rotas.map((r) => ({ url: `${base}${r}` })),
    ...modalidades.map((m) => ({ url: `${base}/modalidades/${m.slug}` })),
  ];
}
