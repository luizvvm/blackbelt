import { linkWhatsapp, MENSAGEM_PADRAO } from "@/content/marca";

function IconeWhatsapp() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.93 9.93 0 1 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.08.8.83-3-.2-.31a8.22 8.22 0 1 1 6.95 3.84Zm4.5-6.15c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.13-.17.24-.64.8-.78.96-.14.17-.29.19-.53.06a6.7 6.7 0 0 1-1.99-1.23 7.5 7.5 0 0 1-1.38-1.72c-.14-.24-.01-.37.11-.5.11-.1.25-.28.37-.42.12-.14.16-.24.25-.4.08-.17.04-.31-.03-.44-.06-.12-.55-1.33-.76-1.82-.2-.47-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.31c-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.6.19 1.13.16 1.56.1.47-.07 1.46-.6 1.66-1.17.2-.57.2-1.07.15-1.17-.06-.1-.23-.17-.47-.29Z" />
    </svg>
  );
}

export function BotaoWhatsapp({
  rotulo = "Agendar aula experimental",
  mensagem = MENSAGEM_PADRAO,
  className = "botao botao-belt",
}: {
  rotulo?: string;
  mensagem?: string;
  className?: string;
}) {
  return (
    <a href={linkWhatsapp(mensagem)} target="_blank" rel="noopener noreferrer" className={className}>
      <IconeWhatsapp />
      {rotulo}
    </a>
  );
}
