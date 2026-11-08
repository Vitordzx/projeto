/* =====================================================================
   CONFIGURAÇÃO DA BARBEARIA
   ---------------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar para entregar o site
   a uma barbearia nova. Troque os textos, preços, fotos e contatos.
   Não precisa mexer no HTML, CSS ou no main.js.
   ===================================================================== */

window.BARBEARIA = {
  // ---------- Identidade ----------
  nome: "Fio & Navalha",
  sigla: "F&N",                      // aparece no logo e no selo girando
  desde: 2016,
  cidade: "São Paulo",

  // Título gigante do topo. Cada item é uma linha.
  // Coloque *asteriscos* em volta da palavra que deve ficar em itálico dourado.
  heroTitulo: ["Corte", "com *assinatura*", "própria."],
  heroTexto:
    "Barbearia clássica com técnica de agora. Corte, barba na toalha quente e um café enquanto você espera.",

  // Frase grande da seção "manifesto" (as palavras acendem com o scroll).
  manifesto:
    "Aqui ninguém sai *igual* a ninguém. Cada corte começa numa conversa e termina no espelho, com aquele *detalhe* que só quem é do ofício percebe.",

  // ---------- Cores (opcional) ----------
  cores: {
    fundo: "#0f0d0b",
    destaque: "#c98a4b",   // dourado/cobre
    listra: "#b5372b",     // vermelho do poste de barbeiro
  },

  // ---------- Contato ----------
  whatsapp: "5511999999999",         // DDI + DDD + número, só números
  instagram: "fioenavalha",          // sem @
  telefoneExibicao: "(11) 99999-9999",
  endereco: "Rua Augusta, 1200 · Consolação · São Paulo/SP",
  mapsLink: "https://maps.google.com/?q=Rua+Augusta+1200+Sao+Paulo",

  // ---------- Horários ----------
  // Texto que aparece no site:
  horariosTexto: [
    { dias: "Segunda a sexta", horas: "09h às 20h" },
    { dias: "Sábado", horas: "08h às 18h" },
    { dias: "Domingo", horas: "Fechado" },
  ],
  // Usado pra montar os horários do agendamento.
  // 0 = domingo ... 6 = sábado. null = fechado. [abre, fecha] em horas.
  funcionamento: {
    0: null,
    1: [9, 20],
    2: [9, 20],
    3: [9, 20],
    4: [9, 20],
    5: [9, 20],
    6: [8, 18],
  },
  intervaloMinutos: 30,   // de quanto em quanto tempo abre um horário
  diasParaAgendar: 14,    // quantos dias à frente o cliente pode escolher

  // ---------- Números ----------
  numeros: [
    { valor: 18000, sufixo: "+", rotulo: "cortes feitos" },
    { valor: 4.9, sufixo: "", rotulo: "nota no Google", decimais: 1 },
    { valor: 4, sufixo: "", rotulo: "barbeiros na casa" },
  ],

  // ---------- Serviços ----------
  servicos: [
    { nome: "Corte", descricao: "Tesoura e máquina, lavagem e finalização.", preco: 60, duracao: 40 },
    { nome: "Barba", descricao: "Toalha quente, navalha e balm hidratante.", preco: 45, duracao: 30 },
    { nome: "Corte + Barba", descricao: "O combo completo, com desconto.", preco: 95, duracao: 70, destaque: true },
    { nome: "Pigmentação", descricao: "Preenchimento natural de barba ou cabelo.", preco: 40, duracao: 20 },
    { nome: "Sobrancelha", descricao: "Acabamento na navalha ou na linha.", preco: 20, duracao: 10 },
    { nome: "Luzes / Platinado", descricao: "Descoloração com tratamento incluso.", preco: 150, duracao: 120 },
  ],

  // ---------- Barbeiros ----------
  // foto: caminho de uma imagem (ex.: "img/rafael.jpg"). Se deixar vazio,
  // aparece um cartão com as iniciais.
  barbeiros: [
    { nome: "Rafael Moura", cargo: "Fundador · Degradê", foto: "" },
    { nome: "Diego Santos", cargo: "Barba & navalha", foto: "" },
    { nome: "Lucas Ferreira", cargo: "Cortes clássicos", foto: "" },
    { nome: "Bruno Lima", cargo: "Química & platinado", foto: "" },
  ],

  // ---------- Galeria ----------
  // Coloque as fotos na pasta img/ e liste aqui. Sem fotos, aparecem
  // cartões ilustrados no lugar.
  fotos: [
    // "img/galeria-1.jpg",
    // "img/galeria-2.jpg",
  ],

  // ---------- Depoimentos ----------
  depoimentos: [
    { texto: "Melhor degradê que já fiz. Saí de lá e marquei o próximo na hora.", autor: "Thiago R.", origem: "Google" },
    { texto: "Ambiente top, café bom e o Diego faz a barba como ninguém.", autor: "Marcos A.", origem: "Instagram" },
    { texto: "Pontuais, caprichosos e o preço é justo. Virei cliente fixo.", autor: "Felipe C.", origem: "Google" },
  ],
};
