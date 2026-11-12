import { post, reel } from "./fontes";
import type { Modalidade } from "./tipos";

/** Textos adaptados das legendas publicadas; cada trecho guarda o post de origem. */
export const modalidades: Modalidade[] = [
  {
    slug: "karate",
    nome: "Karatê",
    frase: "Kihon é a base de tudo.",
    fraseFonte: reel("DZNyjusR3Yg", "2026-06-05"),
    resumo:
      "Disciplina, respeito e evolução: é isso que o karatê ensina todos os dias. Cada golpe carrega foco, cada movimento carrega aprendizado e cada aula é um passo a mais.",
    resumoFonte: reel("DXHNmBDkW1T", "2026-04-14"),
    pontos: [
      {
        titulo: "Rotação do quadril",
        texto: "Kihon em Zenkutsu-dachi, sem deslocamentos desnecessários e sem perder a estabilidade da base.",
        fonte: reel("DZNyjusR3Yg", "2026-06-05"),
      },
      {
        titulo: "Gyaku Zuki",
        texto: "Socar, qualquer pessoa pode. Transformar um soco em técnica precisa depende de conhecimento, coordenação e técnica.",
        fonte: reel("Db_tEndRikz", "2026-08-13"),
      },
      {
        titulo: "Três zonas de combate",
        texto: "Distância verde, amarela e vermelha para treinar reflexo, tempo de reação e leitura de luta.",
        fonte: reel("DV9aHvUEQqm", "2026-03-16"),
      },
      {
        titulo: "Kata",
        texto: "Os movimentos ganham forma, ritmo e propósito. É ali que técnica e disciplina se encontram.",
        fonte: reel("DXh_NO6kcRq", "2026-04-24"),
      },
      {
        titulo: "Go no sen",
        texto: "Manter a distância, neutralizar o ataque e responder com precisão.",
        fonte: reel("DRU-m44kS_l", "2025-11-21"),
      },
    ],
    equipe: {
      texto: "Somos filiados à JKA, Japan Karate Association, e realizamos exames de faixa na nossa sede, em Barra Mansa.",
      fonte: reel("Db_tEndRikz", "2026-08-13"),
    },
    ensina: [
      { nome: "Sensei Walace de Freitas", papel: "3º Dan JKA", fonte: post("DZnUYkYxNrz", "2026-06-15") },
    ],
    recorte: "/midia/recortes/karate.webp",
    recorteLargura: 827,
    recorteAltura: 915,
    foto: "/midia/fotos/brasileiro-3.webp",
    fotoAlt: "Atleta em base de karatê no Campeonato Brasileiro de 2026, em Belém",
    clipe: "/midia/clipes/karate.mp4",
    clipeCapa: "/midia/clipes/karate.webp",
  },
  {
    slug: "jiu-jitsu",
    nome: "Jiu-Jitsu",
    frase: "Técnica não se improvisa. Se constrói.",
    fraseFonte: reel("DWHD68Ska3G", "2026-03-20"),
    resumo:
      "Muito além da força, a evolução acontece através da técnica, da repetição e da disciplina. É nos treinos que se constroem confiança, raciocínio rápido e preparo para qualquer desafio.",
    resumoFonte: reel("DbWZVfCRa-3", "2026-07-28"),
    pontos: [
      {
        titulo: "Finalização partindo da guarda",
        texto: "Execução, raciocínio, controle, tempo certo e precisão em cada movimento.",
        fonte: reel("DagHGB0RsbY", "2026-07-07"),
      },
      {
        titulo: "Armlock",
        texto: "Não é aplicado de qualquer forma: existe leitura, tempo, pressão e adaptação.",
        fonte: reel("DWHD68Ska3G", "2026-03-20"),
      },
      {
        titulo: "Rolamento",
        texto: "Cada tentativa desenvolve coordenação, consciência corporal e confiança.",
        fonte: reel("DTWEzvvEQSP", "2026-01-10"),
      },
    ],
    equipe: {
      texto: "Em parceria com a equipe Pagels Jiu-Jitsu.",
      fonte: reel("Demz7FURP_3", "2026-10-17"),
    },
    ensina: [
      { nome: "Renê Andrade", papel: "Turmas pela manhã", fonte: reel("Demz7FURP_3", "2026-10-17") },
      { nome: "Raquel Marques", papel: "Jiu-Jitsu Feminino", fonte: reel("Demz7FURP_3", "2026-10-17") },
      { nome: "Professor Maquinho", papel: "Jiu-Jitsu Infantil", fonte: reel("DYkkiFpRGdD", "2026-05-20") },
    ],
    recorte: "/midia/recortes/jiu-jitsu.webp",
    recorteLargura: 1147,
    recorteAltura: 956,
    foto: "/midia/capas/DagHGB0RsbY.webp",
    fotoAlt: "Dois alunos de quimono preto treinando guarda no tatame branco, vistos de cima",
    clipe: "/midia/clipes/jiu-jitsu.mp4",
    clipeCapa: "/midia/clipes/jiu-jitsu.webp",
  },
  {
    slug: "muay-thai",
    nome: "Muay Thai",
    frase: "Antes da força, vem a técnica.",
    fraseFonte: reel("Dbbd08sxhG0", "2026-07-30"),
    resumo:
      "Antes da velocidade, vem o controle. E antes de atacar, é preciso saber se defender. Aulas para diferentes níveis, de quem está começando a quem já treina.",
    resumoFonte: reel("DdbgfITx40S", "2026-09-18"),
    destaque: {
      texto:
        "Aos 49 anos, convivendo com hérnia de disco, dores na lombar e problemas no joelho, a Vanda poderia ter escolhido ficar parada. Escolheu lutar.",
      fonte: reel("DZvKFeiRinY", "2026-06-18"),
    },
    pontos: [
      {
        titulo: "Leitura de tempo",
        texto: "Encaixar o pisão na coxa exige precisão, estratégia e controle da distância.",
        fonte: reel("DalUaKYRfqm", "2026-07-09"),
      },
      {
        titulo: "Aproximação",
        texto: "Circular o oponente, entrar sem ser percebido e aproximar já atacando.",
        fonte: reel("DWkEs0WESs5", "2026-03-31"),
      },
      {
        titulo: "Esquiva com saída",
        texto: "Defende, sai do golpe, cria ângulo e contra-ataca.",
        fonte: reel("DVv5ic7EVbv", "2026-03-11"),
      },
    ],
    recorte: "/midia/recortes/muay-thai.webp",
    recorteLargura: 860,
    recorteAltura: 1000,
    foto: "/midia/capas/DalUaKYRfqm.webp",
    fotoAlt: "Aula de Muay Thai: professora aplica chute na coxa de um aluno diante do logo da Black Belt",
    clipe: "/midia/clipes/muay-thai.mp4",
    clipeCapa: "/midia/clipes/muay-thai.webp",
  },
  {
    slug: "boxe",
    nome: "Boxe",
    frase: "Treine para pensar dois golpes à frente.",
    fraseFonte: reel("DcwypJYRKls", "2026-09-01"),
    resumo:
      "Uma ótima opção para quem quer sair da rotina, melhorar o condicionamento e aprender algo novo. Do fundamento às técnicas mais avançadas, mesmo que você nunca tenha treinado.",
    resumoFonte: reel("DfK3hvpOU4l", "2026-10-31"),
    pontos: [
      {
        titulo: "Esquiva pra dentro",
        texto: "Enquanto o adversário espera a esquiva mais comum, você já saiu da linha do golpe e respondeu.",
        fonte: reel("DY0Gz5pxAGN", "2026-05-26"),
      },
      {
        titulo: "Falsa oportunidade",
        texto: "Variar a guarda, induzir a leitura errada e transformar a iniciativa dele em contra-golpe.",
        fonte: reel("DZF1XXIxSJL", "2026-06-02"),
      },
      {
        titulo: "Jab no corpo",
        texto: "Serve para baixar a guarda, tirar o ar e abrir caminho.",
        fonte: reel("DVO0XdSEXi_", "2026-02-26"),
      },
      {
        titulo: "Recuar sem perder a base",
        texto: "Recuar com a base firme, controlar a distância e golpear em movimento.",
        fonte: reel("DVgnnhKkVHP", "2026-03-05"),
      },
    ],
    recorte: "/midia/recortes/boxe.webp",
    recorteLargura: 842,
    recorteAltura: 943,
    foto: "/midia/capas/DZF1XXIxSJL.webp",
    fotoAlt: "Dois alunos em treino de boxe na sala preta, um deles defendendo um direto",
    clipe: "/midia/clipes/boxe.mp4",
    clipeCapa: "/midia/clipes/boxe.webp",
  },
  {
    slug: "krav-maga",
    nome: "Krav Maga",
    frase: "Preparação para a vida real.",
    fraseFonte: reel("DdB3ipIxdfO", "2026-09-08"),
    resumo:
      "Você desenvolve confiança, atenção, condicionamento físico e capacidade de reação para lidar com situações inesperadas. E não precisa ter experiência para começar.",
    resumoFonte: reel("DdB3ipIxdfO", "2026-09-08"),
    aviso: {
      texto:
        "O objetivo do treinamento não é incentivar o confronto, mas desenvolver consciência, preparo, controle emocional e técnicas de defesa pessoal para situações de risco.",
      fonte: reel("DcW0-rDxqHi", "2026-08-22"),
    },
    pontos: [
      {
        titulo: "Defesa contra objeto",
        texto: "Um chute como recurso para criar oportunidade de reação e neutralizar a ameaça.",
        fonte: reel("DcW0-rDxqHi", "2026-08-22"),
      },
      {
        titulo: "Pegada na camisa",
        texto: "Controle da pegada e alavanca para realizar a imobilização.",
        fonte: reel("DbJbOMwRKVe", "2026-07-23"),
      },
      {
        titulo: "Golpe de cima para baixo",
        texto: "Defesa para quando o agressor ataca com um objeto, como um bastão ou uma barra.",
        fonte: reel("Daas378xb5L", "2026-07-05"),
      },
      {
        titulo: "Torção no punho",
        texto: "Giro, alavanca e saída segura quando seguram o seu braço.",
        fonte: reel("DSBGlq2kROt", "2025-12-08"),
      },
    ],
    recorte: "/midia/recortes/krav-maga.webp",
    recorteLargura: 904,
    recorteAltura: 955,
    foto: "/midia/capas/Daas378xb5L.webp",
    fotoAlt: "Professor de quimono branco demonstra defesa de Krav Maga diante do logo da Black Belt",
    clipe: "/midia/clipes/krav-maga.mp4",
    clipeCapa: "/midia/clipes/krav-maga.webp",
  },
  {
    slug: "taekwondo",
    nome: "Taekwondo",
    frase: "Contra-atacar não é força. É tempo, leitura e precisão.",
    fraseFonte: reel("DT-4An_kQRH", "2026-01-26"),
    resumo:
      "Cada movimento desenvolve controle, disciplina e confiança. Você aprende a proteger a si mesmo, manter a calma e agir com segurança em qualquer situação.",
    resumoFonte: reel("DUoqY78kUd4", "2026-02-11"),
    pontos: [
      {
        titulo: "Titchagui",
        texto: "Não é só um chute: é uma resposta inteligente ao ataque do adversário.",
        fonte: reel("DT-4An_kQRH", "2026-01-26"),
      },
      {
        titulo: "Saída no triângulo",
        texto: "Sair no ângulo, quebrar a base e tirar o alvo da linha de ataque.",
        fonte: reel("DT01vVmkfjM", "2026-01-22"),
      },
      {
        titulo: "Defesa de perna",
        texto: "Bloqueia, neutraliza e tira a base do ataque. No mesmo tempo, já responde.",
        fonte: reel("DVbPBRWEZW8", "2026-03-03"),
      },
      {
        titulo: "Defesa pessoal",
        texto: "Um chute rápido, direto e eficaz para neutralizar uma ameaça e ganhar tempo.",
        fonte: reel("DW4sHVlkokF", "2026-04-08"),
      },
    ],
    equipe: {
      texto: "Em parceria com a Equipe Liberdade Taekwondo.",
      fonte: reel("DW4sHVlkokF", "2026-04-08"),
    },
    recorte: "/midia/recortes/taekwondo.webp",
    recorteLargura: 1136,
    recorteAltura: 1007,
    foto: "/midia/capas/DVbPBRWEZW8.webp",
    fotoAlt: "Aluno aplica chute alto de Taekwondo diante da parede branca com o logo da Black Belt",
    clipe: "/midia/clipes/taekwondo.mp4",
    clipeCapa: "/midia/clipes/taekwondo.webp",
  },
];
