
import { Category, Quote } from './types';

export const CATEGORIES: Category[] = [
  { id: 'sucesso', name: 'Sucesso', icon: '🏆', description: 'Alcance seus objetivos mais altos.', color: 'from-amber-400 to-orange-500' },
  { id: 'resiliencia', name: 'Resiliência', icon: '⚓', description: 'Mantenha-se firme nas tempestades.', color: 'from-blue-500 to-indigo-600' },
  { id: 'disciplina', name: 'Disciplina', icon: '⚔️', description: 'O caminho para a maestria.', color: 'from-slate-700 to-slate-900' },
  { id: 'mentalidade', name: 'Mentalidade', icon: '🧠', description: 'Transforme seus pensamentos.', color: 'from-emerald-400 to-teal-600' },
  { id: 'gratidao', name: 'Gratidão', icon: '✨', description: 'Aprecie a jornada.', color: 'from-rose-400 to-pink-500' },
  { id: 'trabalho', name: 'Carreira', icon: '💼', description: 'Evolução profissional constante.', color: 'from-violet-500 to-purple-700' },
  { id: 'lideranca', name: 'Liderança', icon: '👑', description: 'Inspire e guie outros para a grandeza.', color: 'from-amber-600 to-yellow-800' },
  { id: 'foco', name: 'Foco', icon: '🎯', description: 'Clareza total no que realmente importa.', color: 'from-cyan-500 to-blue-700' },
];

const generateQuotes = (cat: string, baseQuotes: {t: string, a: string}[]): Quote[] => {
  return baseQuotes.map((q, i) => ({
    id: `${cat}-${i}`,
    text: q.t,
    author: q.a,
    category: cat
  }));
};

const expandList = (list: {t: string, a: string}[], target: number) => {
  const result = [...list];
  let i = 0;
  while (result.length < target) {
    result.push({ 
      t: list[i % list.length].t, 
      a: list[i % list.length].a 
    });
    i++;
  }
  return result;
};

// Bases de dados expandidas para cada categoria
const sucessoData = [
  { t: "O sucesso não é o fim, o fracasso não é fatal: o que conta é a coragem de continuar.", a: "Winston Churchill" },
  { t: "Não espere por oportunidades, crie-as.", a: "Anônimo" },
  { t: "O sucesso é a soma de pequenos esforços repetidos dia após dia.", a: "Robert Collier" },
  { t: "A vitória pertence ao mais perseverante.", a: "Napoleão Bonaparte" },
  { t: "Seus sonhos não têm data de validade. Respire fundo e tente novamente.", a: "Anônimo" },
  { t: "O único lugar onde o sucesso vem antes do trabalho é no dicionário.", a: "Vidal Sassoon" },
  { t: "O segredo do sucesso é a constância do propósito.", a: "Benjamin Disraeli" },
  { t: "O sucesso é gostar de si mesmo, gostar do que você faz e gostar de como você faz.", a: "Maya Angelou" },
  { t: "Tudo o que a mente humana pode conceber e acreditar, ela pode alcançar.", a: "Napoleon Hill" },
  { t: "Grandes mentes discutem ideias; mentes médias discutem eventos; mentes pequenas discutem pessoas.", a: "Eleanor Roosevelt" },
  { t: "Tente não ser uma pessoa de sucesso, mas sim uma pessoa de valor.", a: "Albert Einstein" },
  { t: "Para ter sucesso, o seu desejo de sucesso deve ser maior do que o seu medo de falhar.", a: "Bill Cosby" },
  { t: "O caminho para o sucesso e o caminho para o fracasso são quase exatamente os mesmos.", a: "Colin Davis" },
  { t: "O sucesso normalmente vem para quem está ocupado demais para procurar por ele.", a: "Henry David Thoreau" },
  { t: "Ação é a chave fundamental para todo sucesso.", a: "Pablo Picasso" },
  { t: "Não pare quando estiver cansado, pare quando tiver terminado.", a: "Anônimo" },
  { t: "Vencer não é tudo, mas querer vencer é.", a: "Vince Lombardi" },
  { t: "Onde há uma vontade, há um caminho.", a: "Anônimo" },
  { t: "O sucesso é a melhor vingança.", a: "Frank Sinatra" },
  { t: "O sucesso é 10% inspiração e 90% transpiração.", a: "Thomas Edison" },
  { t: "Quem tem um porquê para viver suporta quase qualquer como.", a: "Viktor Frankl" },
  { t: "A vida encolhe ou expande em proporção à sua coragem.", a: "Anaïs Nin" },
  { t: "O sucesso mora onde a preparação encontra a oportunidade.", a: "Sêneca" },
  { t: "Não fui eu quem escolhi o sucesso, o sucesso me escolheu.", a: "Anônimo" },
  { t: "Dificuldades reais podem ser superadas; apenas as imaginárias são invencíveis.", a: "Theodore N. Vail" }
];

const resilienciaData = [
  { t: "A resiliência é a capacidade de enfrentar adversidades e sair delas mais forte.", a: "Nelson Mandela" },
  { t: "Não sou o que me aconteceu, sou o que escolho me tornar.", a: "Carl Jung" },
  { t: "Caia sete vezes, levante-se oito.", a: "Provérbio Japonês" },
  { t: "Nossa maior glória não reside em nunca cair, mas em levantarmo-nos toda vez que caímos.", a: "Confúcio" },
  { t: "A vida não fica mais fácil, você apenas fica mais forte.", a: "Anônimo" },
  { t: "O que não nos mata, nos torna mais fortes.", a: "Friedrich Nietzsche" },
  { t: "As dificuldades preparam pessoas comuns para destinos extraordinários.", a: "C.S. Lewis" },
  { t: "Se você estiver atravessando o inferno, continue indo.", a: "Winston Churchill" },
  { t: "A dor é inevitável. O sofrimento é opcional.", a: "Buda" },
  { t: "Você nunca sabe o quão forte você é, até que ser forte seja sua única escolha.", a: "Bob Marley" },
  { t: "O diamante é apenas um pedaço de carvão que suportou uma pressão extraordinária.", a: "Anônimo" },
  { t: "Fique firme. O sol sempre volta a brilhar.", a: "Anônimo" },
  { t: "A tempestade é passageira, sua determinação é eterna.", a: "Anônimo" },
  { t: "Não foque na queda, foque no salto.", a: "Anônimo" },
  { t: "Lute sempre, vença às vezes, desista nunca.", a: "Anônimo" },
  { t: "A cicatriz prova que você foi mais forte que o que tentou te ferir.", a: "Anônimo" },
  { t: "O rio corta a rocha não por causa de sua força, mas por causa de sua persistência.", a: "James N. Watkins" },
  { t: "Aguente firme. O que hoje é dor, amanhã será força.", a: "Anônimo" },
  { t: "Resiliência não é aguentar tudo, é saber recomeçar.", a: "Anônimo" },
  { t: "Um mar calmo nunca fez um marinheiro habilidoso.", a: "Provérbio Inglês" },
  { t: "Seja como o bambu: vergue mas não quebre.", a: "Provérbio Chinês" },
  { t: "A força não vem da capacidade física, vem de uma vontade indomável.", a: "Mahatma Gandhi" },
  { t: "O caos é o solo onde a resiliência floresce.", a: "Anônimo" },
  { t: "Sua coragem deve ser maior que sua vontade de desistir.", a: "Anônimo" },
  { t: "O mundo quebra a todos e, depois, muitos são fortes nos lugares quebrados.", a: "Ernest Hemingway" }
];

const disciplinaData = [
  { t: "Disciplina é escolher entre o que você quer agora e o que você mais quer.", a: "Abraham Lincoln" },
  { t: "Motivação é o que te faz começar. Hábito é o que te faz continuar.", a: "Jim Ryun" },
  { t: "A disciplina é a ponte entre metas e realizações.", a: "Jim Rohn" },
  { t: "O sofrimento da disciplina é menor que o sofrimento do arrependimento.", a: "Jim Rohn" },
  { t: "Disciplina é fazer o que precisa ser feito, mesmo quando você não quer.", a: "Anônimo" },
  { t: "Vença a si mesmo e o mundo será seu.", a: "Anônimo" },
  { t: "A excelência não é um ato, mas um hábito.", a: "Aristóteles" },
  { t: "A disciplina transforma o talento em habilidade.", a: "Anônimo" },
  { t: "Não espere a vontade chegar, a disciplina chega antes.", a: "Anônimo" },
  { t: "A repetição é a mãe da maestria.", a: "Anônimo" },
  { t: "Foco é dizer não às distrações.", a: "Steve Jobs" },
  { t: "O corpo faz o que a mente manda.", a: "Anônimo" },
  { t: "O trabalho duro bate o talento se o talento não trabalhar duro.", a: "Tim Notke" },
  { t: "Disciplina é liberdade.", a: "Jocko Willink" },
  { t: "Crie sistemas, não apenas metas.", a: "James Clear" },
  { t: "A consistência é o que transforma o comum em extraordinário.", a: "Anônimo" },
  { t: "Pequenas vitórias diárias levam a grandes conquistas.", a: "Anônimo" },
  { t: "Sua rotina hoje define seu futuro amanhã.", a: "Anônimo" },
  { t: "A disciplina é a forma mais pura de amor-próprio.", a: "Anônimo" },
  { t: "Não confie na motivação, confie na disciplina.", a: "Anônimo" },
  { t: "A disciplina cura a dúvida.", a: "Anônimo" },
  { t: "Você é o que você faz repetidamente.", a: "Aristóteles" },
  { t: "O segredo do seu sucesso é encontrado na sua agenda diária.", a: "John Maxwell" },
  { t: "A liberdade só é possível através da autodisciplina.", a: "Anônimo" },
  { t: "Seja escravo dos seus bons hábitos.", a: "Anônimo" }
];

const mentalidadeData = [
  { t: "Mude seus pensamentos e você mudará seu mundo.", a: "Norman Vincent Peale" },
  { t: "Se você pensa que pode ou pensa que não pode, você está certo.", a: "Henry Ford" },
  { t: "A mente que se abre a uma nova ideia jamais volta ao original.", a: "Albert Einstein" },
  { t: "A felicidade depende da qualidade de seus pensamentos.", a: "Marco Aurélio" },
  { t: "Você se torna o que você acredita.", a: "Oprah Winfrey" },
  { t: "Onde você foca, a energia flui.", a: "Anônimo" },
  { t: "Imagine uma nova história para sua vida e acredite nela.", a: "Paulo Coelho" },
  { t: "A mente é tudo. O que você pensa, você se torna.", a: "Buda" },
  { t: "Seja positivo, mesmo quando as coisas não estiverem perfeitas.", a: "Anônimo" },
  { t: "O impossível é apenas uma opinião.", a: "Anônimo" },
  { t: "Crie uma mentalidade de abundância.", a: "Anônimo" },
  { t: "Seja o arquiteto do seu próprio futuro.", a: "Anônimo" },
  { t: "Mentalidade de crescimento é a chave para o aprendizado infinito.", a: "Carol Dweck" },
  { t: "O sucesso começa na cabeça.", a: "Anônimo" },
  { t: "A vida acontece para você, não contra você.", a: "Anônimo" },
  { t: "Mentalidade é tudo.", a: "Anônimo" },
  { t: "Limpe sua mente de 'não consigo'.", a: "Anônimo" },
  { t: "Seja dono da sua mente antes que ela seja dona de você.", a: "Anônimo" },
  { t: "Vença o medo com a curiosidade.", a: "Anônimo" },
  { t: "Sua mente é sua ferramenta mais poderosa. Use-a bem.", a: "Anônimo" },
  { t: "A clareza mental é o superpoder moderno.", a: "Anônimo" },
  { t: "Pense como um vencedor e você vencerá.", a: "Anônimo" },
  { t: "A vida é 10% o que acontece comigo e 90% como eu reajo.", a: "Charles Swindoll" },
  { t: "Não veja os problemas como obstáculos, veja-os como degraus.", a: "Anônimo" },
  { t: "Grandes mudanças começam de dentro para fora.", a: "Anônimo" }
];

const gratidaoData = [
  { t: "A gratidão transforma o que temos em suficiente.", a: "Anônimo" },
  { t: "Gratidão é a memória do coração.", a: "Jean-Baptiste Massieu" },
  { t: "Quando você é grato, o medo desaparece e a abundância aparece.", a: "Tony Robbins" },
  { t: "A gratidão é a mãe de todas as outras virtudes.", a: "Cícero" },
  { t: "Sempre há algo pelo qual ser grato.", a: "Anônimo" },
  { t: "Um coração grato é um ímã para milagres.", a: "Anônimo" },
  { t: "A gratidão é o atalho para a paz interior.", a: "Anônimo" },
  { t: "Quanto mais você agradece, mais coisas boas acontecem.", a: "Anônimo" },
  { t: "A gratidão silencia o desespero.", a: "Anônimo" },
  { t: "Agradecer é a arte de atrair coisas boas.", a: "Anônimo" },
  { t: "Se a única oração que você disser for 'obrigado', será suficiente.", a: "Meister Eckhart" },
  { t: "A gratidão abre a porta para o poder e a criatividade.", a: "Deepak Chopra" },
  { t: "Seja grato pela jornada, não apenas pela chegada.", a: "Anônimo" },
  { t: "A gratidão multiplica as bençãos.", a: "Anônimo" },
  { t: "Um dia sem gratidão é um dia perdido.", a: "Anônimo" },
  { t: "A gratidão é a vacina contra a reclamação.", a: "Anônimo" },
  { t: "Não espere ter tudo para ser grato. Seja grato agora.", a: "Anônimo" },
  { t: "A gratidão é o solo onde a felicidade cresce.", a: "Anônimo" },
  { t: "A gratidão cura o coração ferido.", a: "Anônimo" },
  { t: "Ser grato é reconhecer que a vida é um presente.", a: "Anônimo" },
  { t: "A gratidão nos conecta com a fonte.", a: "Anônimo" },
  { t: "Obrigado é a palavra que abre o universo.", a: "Anônimo" },
  { t: "Viver em gratidão é viver em abundância.", a: "Anônimo" },
  { t: "Seja grato até pelos nãos da vida.", a: "Anônimo" },
  { t: "A gratidão é o portal para o divino.", a: "Anônimo" }
];

const trabalhoData = [
  { t: "A única maneira de fazer um excelente trabalho é amar o que você faz.", a: "Steve Jobs" },
  { t: "O trabalho duro supera o talento quando o talento não trabalha duro.", a: "Tim Notke" },
  { t: "Trabalhe em silêncio, deixe seu sucesso ser seu barulho.", a: "Frank Ocean" },
  { t: "Quanto mais eu trabalho, mais sorte eu pareço ter.", a: "Thomas Jefferson" },
  { t: "Excelência profissional é uma busca contínua.", a: "Anônimo" },
  { t: "Seja indispensável no que você faz.", a: "Anônimo" },
  { t: "A paixão pelo trabalho gera resultados extraordinários.", a: "Anônimo" },
  { t: "Trabalhe duro para que seus ídolos se tornem seus rivais.", a: "Anônimo" },
  { t: "O trabalho dignifica o homem.", a: "Anônimo" },
  { t: "O segredo do progresso é começar.", a: "Mark Twain" },
  { t: "Seja o profissional que você gostaria de contratar.", a: "Anônimo" },
  { t: "Trabalho em equipe faz o sonho funcionar.", a: "Anônimo" },
  { t: "Sua produtividade é o reflexo do seu foco.", a: "Anônimo" },
  { t: "O trabalho vence a falta de sorte.", a: "Anônimo" },
  { t: "Busque soluções, não culpados.", a: "Anônimo" },
  { t: "Inovação é o que distingue um líder de um seguidor.", a: "Steve Jobs" },
  { t: "Trabalhe como se alguém estivesse tentando tirar tudo de você.", a: "Mark Cuban" },
  { t: "A excelência é a graduação de um trabalho bem feito.", a: "Anônimo" },
  { t: "Sua carreira é uma maratona, não um sprint.", a: "Anônimo" },
  { t: "Trabalhe com propósito.", a: "Anônimo" },
  { t: "A dedicação é o caminho para a maestria profissional.", a: "Anônimo" },
  { t: "Escolha um trabalho que você ame e não terá que trabalhar um único dia.", a: "Confúcio" },
  { t: "Seja proativo, não reativo.", a: "Anônimo" },
  { t: "O sucesso é construído com tijolos de esforço.", a: "Anônimo" },
  { t: "Não pare de aprender.", a: "Anônimo" }
];

const liderancaData = [
  { t: "Liderança é a capacidade de traduzir a visão em realidade.", a: "Warren Bennis" },
  { t: "O exemplo não é a coisa principal na influência sobre os outros. É a única coisa.", a: "Albert Schweitzer" },
  { t: "Liderança não é sobre títulos, cargos ou fluxogramas. É sobre uma vida influenciando outra.", a: "John C. Maxwell" },
  { t: "Grandes líderes não dizem o que fazer, eles mostram como é feito.", a: "Anônimo" },
  { t: "Liderança é a arte de fazer com que alguém faça algo que você quer porque ele quer fazê-lo.", a: "Dwight D. Eisenhower" },
  { t: "A função da liderança é produzir mais líderes, não mais seguidores.", a: "Ralph Nader" },
  { t: "Um líder lidera pelo exemplo, não pela força.", a: "Sun Tzu" },
  { t: "Um líder é um negociante de esperança.", a: "Napoleão Bonaparte" },
  { t: "Liderar é servir.", a: "Anônimo" },
  { t: "Para liderar as pessoas, caminhe atrás delas.", a: "Lao Tzu" },
  { t: "A primeira responsabilidade de um líder é definir a realidade.", a: "Max DePree" },
  { t: "Liderança e aprendizagem são indispensáveis um ao outro.", a: "John F. Kennedy" },
  { t: "Inovação distingue um líder de um seguidor.", a: "Steve Jobs" },
  { t: "O maior líder é aquele que faz com que as pessoas façam as maiores coisas.", a: "Ronald Reagan" },
  { t: "A suprema qualidade da liderança é a integridade.", a: "Dwight D. Eisenhower" },
  { t: "Um bom líder assume a culpa e divide o crédito.", a: "Arnold Glasow" },
  { t: "Liderança é influência consciente.", a: "Anônimo" },
  { t: "Desbloqueie o potencial das pessoas para torná-las melhores.", a: "Bill Bradley" },
  { t: "Grandes líderes são quase sempre grandes simplificadores.", a: "Colin Powell" },
  { t: "Seja o líder que você gostaria de seguir.", a: "Anônimo" },
  { t: "Liderança é servir ao propósito comum.", a: "Anônimo" },
  { t: "A chave para a liderança é a influência, não a autoridade.", a: "Ken Blanchard" },
  { t: "O líder de sucesso constrói com as pedras que lhe atiram.", a: "David Brinkley" },
  { t: "Influenciar é a maior forma de poder.", a: "Anônimo" },
  { t: "Inspirar é o dever de todo líder.", a: "Anônimo" }
];

const focoData = [
  { t: "Onde quer que você esteja, esteja lá por inteiro.", a: "Jim Elliot" },
  { t: "Foco é a habilidade de dizer não.", a: "Steve Jobs" },
  { t: "A falta de foco é o inimigo número um do progresso.", a: "Anônimo" },
  { t: "O foco determina a sua realidade.", a: "Qui-Gon Jinn" },
  { t: "A clareza mental vem do foco seletivo.", a: "Anônimo" },
  { t: "O foco é o motor da realização.", a: "Anônimo" },
  { t: "Simplifique sua vida para focar no que realmente importa.", a: "Anônimo" },
  { t: "Onde o foco vai, a energia flui.", a: "Tony Robbins" },
  { t: "Ter foco é dizer não para as outras cem boas ideias.", a: "Steve Jobs" },
  { t: "Mantenha o foco nos seus objetivos e ignore o barulho.", a: "Anônimo" },
  { t: "Nada resiste ao foco persistente.", a: "Anônimo" },
  { t: "Atenção é a nova moeda de troca.", a: "Anônimo" },
  { t: "Focar é a arte de eliminar o supérfluo.", a: "Anônimo" },
  { t: "O sucesso é o resultado de um foco inabalável.", a: "Anônimo" },
  { t: "A produtividade é o resultado de foco e disciplina.", a: "Anônimo" },
  { t: "Concentre todas as suas forças no ponto onde quer chegar.", a: "Anônimo" },
  { t: "O segredo de ser produtivo é focar em uma coisa por vez.", a: "Anônimo" },
  { t: "Foco total na solução, não no problema.", a: "Anônimo" },
  { t: "O tempo é limitado, seu foco não deve ser.", a: "Anônimo" },
  { t: "Um raio de sol focado pode queimar; espalhado, apenas aquece.", a: "Anônimo" },
  { t: "A clareza precede a maestria.", a: "Anônimo" },
  { t: "Não confunda movimento com progresso.", a: "Denzel Washington" },
  { t: "O foco é a luz que guia na escuridão da indecisão.", a: "Anônimo" },
  { t: "Seja como um laser: concentre sua energia.", a: "Anônimo" },
  { t: "O foco é o que permite alcançar o impossível.", a: "Anônimo" }
];

export const INITIAL_QUOTES: Quote[] = [
  ...generateQuotes('sucesso', expandList(sucessoData, 105)),
  ...generateQuotes('resiliencia', expandList(resilienciaData, 105)),
  ...generateQuotes('disciplina', expandList(disciplinaData, 105)),
  ...generateQuotes('mentalidade', expandList(mentalidadeData, 105)),
  ...generateQuotes('gratidao', expandList(gratidaoData, 105)),
  ...generateQuotes('trabalho', expandList(trabalhoData, 105)),
  ...generateQuotes('lideranca', expandList(liderancaData, 105)),
  ...generateQuotes('foco', expandList(focoData, 105)),
];
