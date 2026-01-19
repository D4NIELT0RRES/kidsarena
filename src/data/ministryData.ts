export interface MinistryDay {
  date: string;
  dayOfWeek: "Quinta" | "Domingo";
  theme: string;
  verse: string;
  objective: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  ageGroup: string;
  duration: string;
  materials?: string[];
}

export const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export const ministrySchedule: Record<string, MinistryDay[]> = {
  "Janeiro": [
    { date: "02/01", dayOfWeek: "Quinta", theme: "Deus me criou especial", verse: "Salmo 139:14", objective: "Ensinar que cada criança é única e amada por Deus" },
    { date: "05/01", dayOfWeek: "Domingo", theme: "Jesus é meu amigo", verse: "João 15:15", objective: "Mostrar que Jesus quer ser o melhor amigo de cada criança" },
    { date: "09/01", dayOfWeek: "Quinta", theme: "A Bíblia é a Palavra de Deus", verse: "2 Timóteo 3:16", objective: "Apresentar a Bíblia como o livro mais especial" },
    { date: "12/01", dayOfWeek: "Domingo", theme: "Obedecer é melhor", verse: "Efésios 6:1", objective: "Ensinar sobre obediência aos pais e a Deus" },
    { date: "16/01", dayOfWeek: "Quinta", theme: "Deus cuida de mim", verse: "Salmo 23:1", objective: "Mostrar o cuidado de Deus em todas as áreas" },
    { date: "19/01", dayOfWeek: "Domingo", theme: "Louvar a Deus", verse: "Salmo 150:6", objective: "Incentivar a adoração a Deus" },
    { date: "23/01", dayOfWeek: "Quinta", theme: "Amor ao próximo", verse: "João 13:34", objective: "Ensinar sobre amar uns aos outros" },
    { date: "26/01", dayOfWeek: "Domingo", theme: "Ser grato", verse: "1 Tessalonicenses 5:18", objective: "Cultivar um coração grato" },
    { date: "30/01", dayOfWeek: "Quinta", theme: "A oração", verse: "Filipenses 4:6", objective: "Ensinar a importância de conversar com Deus" },
  ],
  "Fevereiro": [
    { date: "02/02", dayOfWeek: "Domingo", theme: "Deus me ama muito", verse: "João 3:16", objective: "Ensinar sobre o amor incondicional de Deus" },
    { date: "06/02", dayOfWeek: "Quinta", theme: "Noé e a arca", verse: "Gênesis 6:22", objective: "Ensinar sobre obediência e confiança em Deus" },
    { date: "09/02", dayOfWeek: "Domingo", theme: "Davi e Golias", verse: "1 Samuel 17:47", objective: "Mostrar que com Deus vencemos os gigantes" },
    { date: "13/02", dayOfWeek: "Quinta", theme: "Jonas e o grande peixe", verse: "Jonas 2:9", objective: "Ensinar sobre obedecer a Deus na primeira vez" },
    { date: "16/02", dayOfWeek: "Domingo", theme: "Daniel na cova dos leões", verse: "Daniel 6:23", objective: "Mostrar que Deus protege os que confiam Nele" },
    { date: "20/02", dayOfWeek: "Quinta", theme: "Moisés e o Mar Vermelho", verse: "Êxodo 14:14", objective: "Ensinar que Deus abre caminhos impossíveis" },
    { date: "23/02", dayOfWeek: "Domingo", theme: "A criação do mundo", verse: "Gênesis 1:1", objective: "Celebrar que Deus criou tudo lindo" },
    { date: "27/02", dayOfWeek: "Quinta", theme: "Jesus acalma a tempestade", verse: "Marcos 4:39", objective: "Ensinar que Jesus tem poder sobre tudo" },
  ],
  "Março": [
    { date: "02/03", dayOfWeek: "Domingo", theme: "A parábola do filho pródigo", verse: "Lucas 15:24", objective: "Ensinar sobre o amor e perdão de Deus Pai" },
    { date: "06/03", dayOfWeek: "Quinta", theme: "Jesus cura o paralítico", verse: "Marcos 2:5", objective: "Mostrar o poder de Jesus para curar" },
    { date: "09/03", dayOfWeek: "Domingo", theme: "A multiplicação dos pães", verse: "João 6:11", objective: "Ensinar que Jesus supre nossas necessidades" },
    { date: "13/03", dayOfWeek: "Quinta", theme: "Zaqueu", verse: "Lucas 19:10", objective: "Mostrar que Jesus busca os perdidos" },
    { date: "16/03", dayOfWeek: "Domingo", theme: "O bom samaritano", verse: "Lucas 10:37", objective: "Ensinar sobre ajudar o próximo" },
    { date: "20/03", dayOfWeek: "Quinta", theme: "Jesus e as crianças", verse: "Marcos 10:14", objective: "Mostrar que Jesus ama as crianças" },
    { date: "23/03", dayOfWeek: "Domingo", theme: "A ovelha perdida", verse: "Lucas 15:6", objective: "Ensinar que Jesus cuida de cada um" },
    { date: "27/03", dayOfWeek: "Quinta", theme: "Jesus lava os pés dos discípulos", verse: "João 13:14", objective: "Ensinar sobre servir uns aos outros" },
    { date: "30/03", dayOfWeek: "Domingo", theme: "A ressurreição de Jesus", verse: "Mateus 28:6", objective: "Celebrar que Jesus venceu a morte" },
  ],
  "Abril": [
    { date: "03/04", dayOfWeek: "Quinta", theme: "Fruto do Espírito: Amor", verse: "Gálatas 5:22", objective: "Ensinar sobre o amor como fruto do Espírito" },
    { date: "06/04", dayOfWeek: "Domingo", theme: "Fruto do Espírito: Alegria", verse: "Gálatas 5:22", objective: "Cultivar alegria no coração" },
    { date: "10/04", dayOfWeek: "Quinta", theme: "Fruto do Espírito: Paz", verse: "Gálatas 5:22", objective: "Ensinar sobre ter paz com Deus e com os outros" },
    { date: "13/04", dayOfWeek: "Domingo", theme: "Fruto do Espírito: Paciência", verse: "Gálatas 5:22", objective: "Desenvolver paciência" },
    { date: "17/04", dayOfWeek: "Quinta", theme: "Fruto do Espírito: Bondade", verse: "Gálatas 5:22", objective: "Praticar bondade" },
    { date: "20/04", dayOfWeek: "Domingo", theme: "Fruto do Espírito: Fidelidade", verse: "Gálatas 5:22", objective: "Ser fiel em tudo" },
    { date: "24/04", dayOfWeek: "Quinta", theme: "Fruto do Espírito: Mansidão", verse: "Gálatas 5:23", objective: "Ensinar sobre mansidão" },
    { date: "27/04", dayOfWeek: "Domingo", theme: "Fruto do Espírito: Domínio próprio", verse: "Gálatas 5:23", objective: "Ensinar autocontrole" },
  ],
  "Maio": [
    { date: "01/05", dayOfWeek: "Quinta", theme: "Famílias que Deus ama", verse: "Salmo 127:3", objective: "Agradecer pelas famílias" },
    { date: "04/05", dayOfWeek: "Domingo", theme: "Honrar pai e mãe", verse: "Êxodo 20:12", objective: "Ensinar sobre honrar os pais" },
    { date: "08/05", dayOfWeek: "Quinta", theme: "Dia das Mães - Amor de mãe", verse: "Provérbios 31:28", objective: "Celebrar as mães" },
    { date: "11/05", dayOfWeek: "Domingo", theme: "Ana e Samuel", verse: "1 Samuel 1:27", objective: "Mostrar o amor de uma mãe" },
    { date: "15/05", dayOfWeek: "Quinta", theme: "Rute e Noemi", verse: "Rute 1:16", objective: "Ensinar sobre lealdade e amor" },
    { date: "18/05", dayOfWeek: "Domingo", theme: "Maria, mãe de Jesus", verse: "Lucas 1:38", objective: "Mostrar a obediência de Maria" },
    { date: "22/05", dayOfWeek: "Quinta", theme: "A viúva de Sarepta", verse: "1 Reis 17:15", objective: "Ensinar sobre fé e provisão" },
    { date: "25/05", dayOfWeek: "Domingo", theme: "Miriã louva a Deus", verse: "Êxodo 15:20", objective: "Ensinar sobre louvor" },
    { date: "29/05", dayOfWeek: "Quinta", theme: "Débora, a líder", verse: "Juízes 4:4", objective: "Mostrar mulheres usadas por Deus" },
  ],
  "Junho": [
    { date: "01/06", dayOfWeek: "Domingo", theme: "José do Egito - Sonhos", verse: "Gênesis 37:5", objective: "Ensinar que Deus tem planos para nós" },
    { date: "05/06", dayOfWeek: "Quinta", theme: "José do Egito - Perdão", verse: "Gênesis 45:5", objective: "Ensinar sobre perdoar" },
    { date: "08/06", dayOfWeek: "Domingo", theme: "Dia dos Pais - O pai do filho pródigo", verse: "Lucas 15:20", objective: "Mostrar o amor do Pai" },
    { date: "12/06", dayOfWeek: "Quinta", theme: "Abraão, pai da fé", verse: "Gênesis 12:1", objective: "Ensinar sobre fé e obediência" },
    { date: "15/06", dayOfWeek: "Domingo", theme: "Isaque e Jacó", verse: "Gênesis 28:15", objective: "Mostrar a fidelidade de Deus" },
    { date: "19/06", dayOfWeek: "Quinta", theme: "Sansão e sua força", verse: "Juízes 16:28", objective: "Ensinar que a força vem de Deus" },
    { date: "22/06", dayOfWeek: "Domingo", theme: "Elias e os profetas de Baal", verse: "1 Reis 18:39", objective: "Mostrar que só Deus é Deus" },
    { date: "26/06", dayOfWeek: "Quinta", theme: "Eliseu e a sunamita", verse: "2 Reis 4:17", objective: "Ensinar sobre milagres" },
    { date: "29/06", dayOfWeek: "Domingo", theme: "Josué e as muralhas", verse: "Josué 6:20", objective: "Ensinar sobre obedecer a Deus" },
  ],
  "Julho": [
    { date: "03/07", dayOfWeek: "Quinta", theme: "Férias com Jesus", verse: "Mateus 11:28", objective: "Descansar em Jesus" },
    { date: "06/07", dayOfWeek: "Domingo", theme: "Jesus caminha sobre as águas", verse: "Mateus 14:29", objective: "Confiar em Jesus" },
    { date: "10/07", dayOfWeek: "Quinta", theme: "A pesca milagrosa", verse: "Lucas 5:10", objective: "Obedecer a Jesus traz bênçãos" },
    { date: "13/07", dayOfWeek: "Domingo", theme: "Pedro é libertado da prisão", verse: "Atos 12:7", objective: "Deus responde orações" },
    { date: "17/07", dayOfWeek: "Quinta", theme: "Paulo e Silas na prisão", verse: "Atos 16:25", objective: "Louvar em todas as circunstâncias" },
    { date: "20/07", dayOfWeek: "Domingo", theme: "Timóteo, jovem servo", verse: "1 Timóteo 4:12", objective: "Servir a Deus desde cedo" },
    { date: "24/07", dayOfWeek: "Quinta", theme: "Barnabé, o encorajador", verse: "Atos 4:36", objective: "Encorajar uns aos outros" },
    { date: "27/07", dayOfWeek: "Domingo", theme: "Estevão, o corajoso", verse: "Atos 7:55", objective: "Ser corajoso pela fé" },
    { date: "31/07", dayOfWeek: "Quinta", theme: "Filipe e o etíope", verse: "Atos 8:35", objective: "Falar de Jesus aos outros" },
  ],
  "Agosto": [
    { date: "03/08", dayOfWeek: "Domingo", theme: "A armadura de Deus - Cinto", verse: "Efésios 6:14", objective: "Vestir o cinto da verdade" },
    { date: "07/08", dayOfWeek: "Quinta", theme: "A armadura de Deus - Couraça", verse: "Efésios 6:14", objective: "Proteger o coração" },
    { date: "10/08", dayOfWeek: "Domingo", theme: "A armadura de Deus - Calçados", verse: "Efésios 6:15", objective: "Levar paz" },
    { date: "14/08", dayOfWeek: "Quinta", theme: "A armadura de Deus - Escudo", verse: "Efésios 6:16", objective: "O escudo da fé" },
    { date: "17/08", dayOfWeek: "Domingo", theme: "A armadura de Deus - Capacete", verse: "Efésios 6:17", objective: "Proteger a mente" },
    { date: "21/08", dayOfWeek: "Quinta", theme: "A armadura de Deus - Espada", verse: "Efésios 6:17", objective: "A Palavra de Deus" },
    { date: "24/08", dayOfWeek: "Domingo", theme: "Soldados de Cristo", verse: "2 Timóteo 2:3", objective: "Ser forte em Jesus" },
    { date: "28/08", dayOfWeek: "Quinta", theme: "Vitória em Cristo", verse: "Romanos 8:37", objective: "Somos mais que vencedores" },
    { date: "31/08", dayOfWeek: "Domingo", theme: "Celebração - Dia do Kids", verse: "Salmo 127:3", objective: "Celebrar as crianças" },
  ],
  "Setembro": [
    { date: "04/09", dayOfWeek: "Quinta", theme: "Setembro - Mês da Bíblia", verse: "Salmo 119:105", objective: "A Bíblia ilumina nosso caminho" },
    { date: "07/09", dayOfWeek: "Domingo", theme: "Histórias da Bíblia - Adão e Eva", verse: "Gênesis 2:7", objective: "Deus criou o ser humano" },
    { date: "11/09", dayOfWeek: "Quinta", theme: "Histórias da Bíblia - Caim e Abel", verse: "Gênesis 4:7", objective: "Fazer o que é certo" },
    { date: "14/09", dayOfWeek: "Domingo", theme: "Histórias da Bíblia - Torre de Babel", verse: "Gênesis 11:9", objective: "Obedecer a Deus" },
    { date: "18/09", dayOfWeek: "Quinta", theme: "Histórias da Bíblia - Sodoma e Gomorra", verse: "Gênesis 19:16", objective: "Deus salva os justos" },
    { date: "21/09", dayOfWeek: "Domingo", theme: "Primavera - Nova vida em Cristo", verse: "2 Coríntios 5:17", objective: "Somos novas criaturas" },
    { date: "25/09", dayOfWeek: "Quinta", theme: "Crescer como Jesus", verse: "Lucas 2:52", objective: "Crescer em sabedoria" },
    { date: "28/09", dayOfWeek: "Domingo", theme: "Florescer para Deus", verse: "Isaías 35:1", objective: "Produzir frutos para Deus" },
  ],
  "Outubro": [
    { date: "02/10", dayOfWeek: "Quinta", theme: "Semana das crianças - Especial", verse: "Marcos 10:14", objective: "Jesus ama as crianças" },
    { date: "05/10", dayOfWeek: "Domingo", theme: "Semana das crianças - Samuel", verse: "1 Samuel 3:10", objective: "Ouvir a voz de Deus" },
    { date: "09/10", dayOfWeek: "Quinta", theme: "Semana das crianças - Davi pastorzinho", verse: "1 Samuel 16:12", objective: "Deus vê o coração" },
    { date: "12/10", dayOfWeek: "Domingo", theme: "Dia das Crianças - Celebração", verse: "Salmo 8:2", objective: "Da boca dos pequeninos" },
    { date: "16/10", dayOfWeek: "Quinta", theme: "A menina de Naamã", verse: "2 Reis 5:3", objective: "Crianças podem falar de Deus" },
    { date: "19/10", dayOfWeek: "Domingo", theme: "Jesus no templo aos 12 anos", verse: "Lucas 2:49", objective: "Estar na casa de Deus" },
    { date: "23/10", dayOfWeek: "Quinta", theme: "O menino com os pães e peixes", verse: "João 6:9", objective: "Oferecer o que temos a Jesus" },
    { date: "26/10", dayOfWeek: "Domingo", theme: "Josias, o rei menino", verse: "2 Reis 22:2", objective: "Fazer o que é reto" },
    { date: "30/10", dayOfWeek: "Quinta", theme: "Isaque, filho da promessa", verse: "Gênesis 21:3", objective: "Deus cumpre promessas" },
  ],
  "Novembro": [
    { date: "02/11", dayOfWeek: "Domingo", theme: "Gratidão a Deus", verse: "Salmo 100:4", objective: "Entrar com gratidão" },
    { date: "06/11", dayOfWeek: "Quinta", theme: "Os 10 leprosos", verse: "Lucas 17:15", objective: "Voltar para agradecer" },
    { date: "09/11", dayOfWeek: "Domingo", theme: "Ana agradece por Samuel", verse: "1 Samuel 2:1", objective: "Agradecer as bênçãos" },
    { date: "13/11", dayOfWeek: "Quinta", theme: "Deus é bom", verse: "Salmo 136:1", objective: "A bondade de Deus" },
    { date: "16/11", dayOfWeek: "Domingo", theme: "Bênçãos da família", verse: "Salmo 128:1", objective: "Agradecer pela família" },
    { date: "20/11", dayOfWeek: "Quinta", theme: "Bênçãos da igreja", verse: "Salmo 122:1", objective: "Alegria em ir à casa de Deus" },
    { date: "23/11", dayOfWeek: "Domingo", theme: "Bênçãos da salvação", verse: "Efésios 2:8", objective: "Gratidão pela salvação" },
    { date: "27/11", dayOfWeek: "Quinta", theme: "Preparando o Natal - A profecia", verse: "Isaías 9:6", objective: "Jesus foi prometido" },
    { date: "30/11", dayOfWeek: "Domingo", theme: "Preparando o Natal - O anúncio", verse: "Lucas 1:31", objective: "O anjo anuncia a Maria" },
  ],
  "Dezembro": [
    { date: "04/12", dayOfWeek: "Quinta", theme: "A viagem a Belém", verse: "Lucas 2:4", objective: "José e Maria obedecem" },
    { date: "07/12", dayOfWeek: "Domingo", theme: "Jesus nasceu!", verse: "Lucas 2:7", objective: "O nascimento de Jesus" },
    { date: "11/12", dayOfWeek: "Quinta", theme: "Os pastores", verse: "Lucas 2:17", objective: "Os primeiros a visitar Jesus" },
    { date: "14/12", dayOfWeek: "Domingo", theme: "Os anjos cantam", verse: "Lucas 2:14", objective: "Glória a Deus nas alturas" },
    { date: "18/12", dayOfWeek: "Quinta", theme: "A estrela de Belém", verse: "Mateus 2:2", objective: "A estrela guia os magos" },
    { date: "21/12", dayOfWeek: "Domingo", theme: "Os magos e os presentes", verse: "Mateus 2:11", objective: "Presentear Jesus" },
    { date: "25/12", dayOfWeek: "Quinta", theme: "Celebração de Natal", verse: "João 3:16", objective: "Jesus, o maior presente" },
    { date: "28/12", dayOfWeek: "Domingo", theme: "Ano Novo com Jesus", verse: "Jeremias 29:11", objective: "Planos de Deus para o novo ano" },
  ],
};

export const activities: Activity[] = [
  {
    id: "1",
    name: "Caça ao Tesouro Bíblico",
    description: "Esconda versículos pela sala e as crianças devem encontrar e montar o versículo do dia.",
    ageGroup: "3-6 anos",
    duration: "15 min",
    materials: ["Papéis coloridos", "Canetas", "Fita adesiva"]
  },
  {
    id: "2",
    name: "Estátua do Louvor",
    description: "Coloque uma música de louvor. Quando pausar, todos viram estátua. Quem se mexer senta.",
    ageGroup: "2-6 anos",
    duration: "10 min",
    materials: ["Caixa de som", "Músicas de louvor infantil"]
  },
  {
    id: "3",
    name: "Desenho do Tema",
    description: "As crianças desenham o que aprenderam na ministração. Depois cada uma explica seu desenho.",
    ageGroup: "2-6 anos",
    duration: "15 min",
    materials: ["Folhas", "Giz de cera", "Lápis de cor"]
  },
  {
    id: "4",
    name: "Teatro de Fantoches",
    description: "Conte a história bíblica do dia usando fantoches simples feitos de meias ou papel.",
    ageGroup: "2-6 anos",
    duration: "10 min",
    materials: ["Fantoches", "Mesa/caixa para teatrinho"]
  },
  {
    id: "5",
    name: "Corrida do Versículo",
    description: "Divida em times. Cada time deve correr e colar as palavras do versículo na ordem certa.",
    ageGroup: "4-6 anos",
    duration: "10 min",
    materials: ["Palavras do versículo impressas", "Fita adesiva"]
  },
  {
    id: "6",
    name: "Passa a Bola do Louvor",
    description: "Em círculo, passam a bola enquanto toca louvor. Quando para, quem está com a bola ora/louva.",
    ageGroup: "3-6 anos",
    duration: "10 min",
    materials: ["Bola colorida", "Músicas de louvor"]
  },
  {
    id: "7",
    name: "Massinha da Criação",
    description: "As crianças modelam elementos da criação ou personagens da história do dia.",
    ageGroup: "2-5 anos",
    duration: "15 min",
    materials: ["Massinha de modelar", "Palitos", "Forminhas"]
  },
  {
    id: "8",
    name: "Dança das Cores",
    description: "Cada cor representa uma ação (vermelho=pular, azul=girar). Mostre cores e todos fazem a ação.",
    ageGroup: "2-5 anos",
    duration: "10 min",
    materials: ["Cartões coloridos"]
  },
  {
    id: "9",
    name: "Quebra-cabeça Bíblico",
    description: "Montar quebra-cabeça com cena da história do dia. Pode fazer com desenho cortado.",
    ageGroup: "3-6 anos",
    duration: "15 min",
    materials: ["Quebra-cabeça ou desenho cortado"]
  },
  {
    id: "10",
    name: "Bolinha de Sabão da Oração",
    description: "Cada bolinha é uma oração que sobe ao céu. Crianças falam pedidos enquanto sopram.",
    ageGroup: "2-6 anos",
    duration: "10 min",
    materials: ["Bolhas de sabão"]
  },
  {
    id: "11",
    name: "Circuito da Fé",
    description: "Monte um circuito com obstáculos simples. A cada estação, fale sobre o tema.",
    ageGroup: "3-6 anos",
    duration: "15 min",
    materials: ["Cones", "Bambolês", "Cordas"]
  },
  {
    id: "12",
    name: "Carimbos das Mãozinhas",
    description: "Fazer arte com carimbo das mãos relacionada ao tema (ex: pomba, coração, arco-íris).",
    ageGroup: "2-4 anos",
    duration: "15 min",
    materials: ["Tinta guache lavável", "Folhas grandes", "Avental"]
  },
];

export const notices = [
  {
    id: "1",
    title: "Chegue com antecedência",
    description: "Chegue pelo menos 15 minutos antes para preparar a sala, o lanche e orar pela ministração.",
    icon: "clock",
    priority: "high"
  },
  {
    id: "2",
    title: "Ore pela sua dupla/trio",
    description: "Antes do culto, ore com sua dupla ou trio. Peça sabedoria e unção para ministrar.",
    icon: "heart",
    priority: "high"
  },
  {
    id: "3",
    title: "Ministre com amor",
    description: "Cada criança é especial. Trate todas com carinho, paciência e muito amor.",
    icon: "sparkles",
    priority: "medium"
  },
  {
    id: "4",
    title: "Prepare o material",
    description: "Separe todo o material necessário para a atividade antes das crianças chegarem.",
    icon: "package",
    priority: "medium"
  },
  {
    id: "5",
    title: "Mantenha a sala organizada",
    description: "Após o culto, organize a sala, lave os copos e deixe tudo pronto para o próximo encontro.",
    icon: "home",
    priority: "low"
  },
  {
    id: "6",
    title: "Registro de presença",
    description: "Anote a presença das crianças e qualquer observação importante sobre elas.",
    icon: "clipboard",
    priority: "medium"
  },
  {
    id: "7",
    title: "Comunicação com os pais",
    description: "Ao entregar a criança, compartilhe brevemente o que foi ministrado e como ela participou.",
    icon: "message",
    priority: "medium"
  },
  {
    id: "8",
    title: "Cuidados com segurança",
    description: "Nunca deixe as crianças sozinhas. A porta deve estar sempre visível e os pais identificados.",
    icon: "shield",
    priority: "high"
  }
];
