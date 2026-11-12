# Black Belt Center

Site da Black Belt Center, estúdio de lutas em Barra Mansa, RJ. Next.js, TypeScript, Tailwind e Framer Motion.

## Rodar

```bash
npm install
npm run dev
```

```bash
npm run lint
npm run build
```

Antes de publicar, defina `NEXT_PUBLIC_SITE_URL` (veja `.env.example`). O `netlify.toml` já deixa o build pronto para a Netlify.

## Onde fica cada coisa

| Conteúdo | Arquivo |
| --- | --- |
| Endereço, WhatsApp e links reais | `src/content/marca.ts` |
| Grade de aulas | `src/content/horarios.ts` |
| Textos das modalidades | `src/content/modalidades.ts` |
| Turmas infantis | `src/content/criancas.ts` |
| Resultados e eventos | `src/content/competicao.ts` |
| Publicações do mural | `src/content/mural.json` |
| **Dados fictícios** | `src/content/ilustrativo.ts` |

Toda informação real guarda a origem (`Fonte`), com a data do post. Os dados fictícios ficam só em `ilustrativo.ts` e aparecem no site marcados como "ilustrativo".

## Plugar um CMS

As páginas leem o conteúdo apenas por `src/lib/conteudo.ts`, e todas as funções já são assíncronas. Para usar um CMS, troque a implementação dessas funções por chamadas à API, mantendo os tipos de `src/content/tipos.ts`.

## Marca

Cores amostradas do material publicado, em `src/app/globals.css`. Logo vetorizado do logo real, em `src/components/marca/caminhos.ts`.
