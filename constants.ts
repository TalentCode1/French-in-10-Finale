import { LevelData, Topic, Language } from './types';

export const UI_TEXT = {
  ES: {
    appTitle: "Francés en 10",
    tagline: "Tu tutor personal de francés. Sin registros. A tu ritmo.",
    chooseLevel: "Elige tu nivel",
    back: "Volver",
    startChat: "Empezar Práctica",
    chatPlaceholder: "Escribe en francés o español...",
    tutorName: "David",
    warning: "Advertencia",
    reset: "Reiniciar Sesión",
    topicsTitle: "Temario",
    learningGoal: "Objetivo de aprendizaje",
    levelDesc: {
      A1: "Principiante absoluto. Fundamentos y frases básicas.",
      A2: "Elemental. Rutinas diarias y pasado simple.",
      B1: "Intermedio. Opiniones, planes y situaciones de viaje.",
      B2: "Intermedio alto. Argumentación compleja y fluidez.",
    }
  },
  EN: {
    appTitle: "French in 10",
    tagline: "Your personal French tutor. No sign-up. At your pace.",
    chooseLevel: "Choose your level",
    back: "Back",
    startChat: "Start Practice",
    chatPlaceholder: "Type in French or English...",
    tutorName: "David",
    warning: "Warning",
    reset: "Reset Session",
    topicsTitle: "Curriculum",
    learningGoal: "Learning Goal",
    levelDesc: {
      A1: "Absolute Beginner. Fundamentals and basic phrases.",
      A2: "Elementary. Daily routines and simple past.",
      B1: "Intermediate. Opinions, plans, and travel situations.",
      B2: "Upper Intermediate. Complex argumentation and fluency.",
    }
  }
};

// --- SPANISH DATA ---

const TOPICS_A1_ES: Topic[] = [
  { id: 'a1-1', title: 'Salutations & Présentations', description: 'Saludos formales e informales, presentarse a uno mismo.', objective: 'Aprender a decir "Bonjour", "Je m\'appelle", y preguntar "¿Comment ça va?".' },
  { id: 'a1-2', title: 'Les Nombres & L\'Alphabet', description: 'Contar del 0 al 100 y deletrear nombres.', objective: 'Dominar la pronunciación de números y letras clave.' },
  { id: 'a1-3', title: 'Le Verbe Être & Avoir', description: 'Los dos verbos más importantes en presente.', objective: 'Usar "Je suis" (yo soy/estoy) y "J\'ai" (yo tengo) correctamente.' },
  { id: 'a1-4', title: 'Les Articles Définis et Indéfinis', description: 'Un, une, le, la, les.', objective: 'Diferenciar géneros y números básicos en sustantivos.' },
  { id: 'a1-5', title: 'La Famille & La Description', description: 'Miembros de la familia y adjetivos físicos.', objective: 'Describir a tu familia (alto, bajo, rubio, amable).' },
  { id: 'a1-6', title: 'Les Verbes en -ER (Présent)', description: 'Conjugación regular básica (parler, habiter, aimer).', objective: 'Formar frases simples con verbos regulares.' },
];

const TOPICS_A2_ES: Topic[] = [
  { id: 'a2-1', title: 'Le Passé Composé (Avoir)', description: 'Hablar de acciones terminadas en el pasado.', objective: 'Narrar eventos de ayer usando el auxiliar avoir.' },
  { id: 'a2-2', title: 'La Routine Quotidienne', description: 'Acciones diarias (se lever, se laver) con verbos reflexivos.', objective: 'Describir un día típico.' },
  { id: 'a2-3', title: 'La Nourriture & Les Courses', description: 'Vocabulario de comida y artículos partitivos (du, de la).', objective: 'Hacer compras en un mercado o pedir en un restaurante.' },
  { id: 'a2-4', title: 'Le Futur Proche', description: 'Verbo aller + infinitivo.', objective: 'Hablar de planes inmediatos para el fin de semana.' },
  { id: 'a2-5', title: 'L\'Imparfait (Introduction)', description: 'Descripciones y hábitos en el pasado.', objective: 'Decir cómo "era" algo antes.' },
  { id: 'a2-6', title: 'Les Prépositions de Lieu', description: 'En, au, à la, chez.', objective: 'Ubicar lugares en la ciudad y países.' },
];

const TOPICS_B1_ES: Topic[] = [
  { id: 'b1-1', title: 'Passé Composé vs Imparfait', description: 'La alternancia en la narración.', objective: 'Contar una historia compleja distinguiendo eventos y contexto.' },
  { id: 'b1-2', title: 'Le Futur Simple', description: 'Proyectos a largo plazo y predicciones.', objective: 'Hacer predicciones sobre el futuro del mundo.' },
  { id: 'b1-3', title: 'L\'Hypothèse (Si + Présent/Futur)', description: 'Condiciones reales.', objective: 'Expresar consecuencias: "Si tengo tiempo, iré".' },
  { id: 'b1-4', title: 'Exprimer son Opinion', description: 'Verbos de opinión y subjuntivo básico.', objective: 'Debatir temas simples: "Je pense que...", "Il faut que...".' },
  { id: 'b1-5', title: 'Les Pronoms Relatifs (Qui, Que, Où)', description: 'Conectar frases para mayor fluidez.', objective: 'Dar definiciones complejas de objetos o personas.' },
];

const TOPICS_B2_ES: Topic[] = [
  { id: 'b2-1', title: 'Le Subjonctif (Usage Avancé)', description: 'Sentimientos, duda, necesidad.', objective: 'Expresar matices subjetivos complejos.' },
  { id: 'b2-2', title: 'La Voix Passive', description: 'Enfocarse en la acción más que en el sujeto.', objective: 'Analizar noticias o hechos históricos.' },
  { id: 'b2-3', title: 'Le Conditionnel Passé', description: 'Arrepentimientos y reproches.', objective: 'Expresar lo que "habría" sucedido.' },
  { id: 'b2-4', title: 'Le Discours Rapporté', description: 'Transmitir palabras de otros en el pasado.', objective: 'Relatar una conversación o entrevista.' },
  { id: 'b2-5', title: 'Les Connecteurs Logiques', description: 'Estructurar un argumento (Cependant, En revanche).', objective: 'Escribir o hablar de forma cohesiva y persuasiva.' },
];

// --- ENGLISH DATA ---

const TOPICS_A1_EN: Topic[] = [
  { id: 'a1-1', title: 'Salutations & Présentations', description: 'Formal and informal greetings, introducing yourself.', objective: 'Learn to say "Bonjour", "Je m\'appelle", and ask "Comment ça va?".' },
  { id: 'a1-2', title: 'Les Nombres & L\'Alphabet', description: 'Counting from 0 to 100 and spelling names.', objective: 'Master the pronunciation of key numbers and letters.' },
  { id: 'a1-3', title: 'Le Verbe Être & Avoir', description: 'The two most important verbs in the present tense.', objective: 'Use "Je suis" (I am) and "J\'ai" (I have) correctly.' },
  { id: 'a1-4', title: 'Les Articles Définis et Indéfinis', description: 'Un, une, le, la, les.', objective: 'Differentiate basic genders and numbers in nouns.' },
  { id: 'a1-5', title: 'La Famille & La Description', description: 'Family members and physical adjectives.', objective: 'Describe your family (tall, short, blond, kind).' },
  { id: 'a1-6', title: 'Les Verbes en -ER (Présent)', description: 'Basic regular conjugation (parler, habiter, aimer).', objective: 'Form simple sentences with regular verbs.' },
];

const TOPICS_A2_EN: Topic[] = [
  { id: 'a2-1', title: 'Le Passé Composé (Avoir)', description: 'Talking about completed actions in the past.', objective: 'Narrate yesterday\'s events using the auxiliary avoir.' },
  { id: 'a2-2', title: 'La Routine Quotidienne', description: 'Daily actions (se lever, se laver) using reflexive verbs.', objective: 'Describe a typical day.' },
  { id: 'a2-3', title: 'La Nourriture & Les Courses', description: 'Food vocabulary and partitive articles (du, de la).', objective: 'Shop at a market or order in a restaurant.' },
  { id: 'a2-4', title: 'Le Futur Proche', description: 'Verb aller + infinitive.', objective: 'Talk about immediate plans for the weekend.' },
  { id: 'a2-5', title: 'L\'Imparfait (Introduction)', description: 'Descriptions and habits in the past.', objective: 'Say how something "used to be".' },
  { id: 'a2-6', title: 'Les Prépositions de Lieu', description: 'En, au, à la, chez.', objective: 'Locate places in the city and countries.' },
];

const TOPICS_B1_EN: Topic[] = [
  { id: 'b1-1', title: 'Passé Composé vs Imparfait', description: 'Alternating tenses in narration.', objective: 'Tell a complex story distinguishing between events and context.' },
  { id: 'b1-2', title: 'Le Futur Simple', description: 'Long-term projects and predictions.', objective: 'Make predictions about the future of the world.' },
  { id: 'b1-3', title: 'L\'Hypothèse (Si + Présent/Futur)', description: 'Real conditions.', objective: 'Express consequences: "If I have time, I will go".' },
  { id: 'b1-4', title: 'Exprimer son Opinion', description: 'Opinion verbs and basic subjunctive.', objective: 'Debate simple topics: "Je pense que...", "Il faut que...".' },
  { id: 'b1-5', title: 'Les Pronoms Relatifs (Qui, Que, Où)', description: 'Connecting phrases for fluidity.', objective: 'Give complex definitions of objects or people.' },
];

const TOPICS_B2_EN: Topic[] = [
  { id: 'b2-1', title: 'Le Subjonctif (Usage Avancé)', description: 'Feelings, doubt, necessity.', objective: 'Express complex subjective nuances.' },
  { id: 'b2-2', title: 'La Voix Passive', description: 'Focusing on the action rather than the subject.', objective: 'Analyze news or historical facts.' },
  { id: 'b2-3', title: 'Le Conditionnel Passé', description: 'Regrets and reproaches.', objective: 'Express what "would have" happened.' },
  { id: 'b2-4', title: 'Le Discours Rapporté', description: 'Conveying others\' words in the past.', objective: 'Relate a conversation or interview.' },
  { id: 'b2-5', title: 'Les Connecteurs Logiques', description: 'Structuring an argument (Cependant, En revanche).', objective: 'Write or speak cohesively and persuasively.' },
];

export const getCurriculum = (language: Language): LevelData[] => {
  const isEs = language === 'ES';
  
  return [
    { 
      id: 'A1', 
      title: isEs ? 'Niveau A1' : 'Level A1', 
      description: isEs ? 'Débutant' : 'Beginner', 
      color: 'bg-emerald-500', 
      topics: isEs ? TOPICS_A1_ES : TOPICS_A1_EN 
    },
    { 
      id: 'A2', 
      title: isEs ? 'Niveau A2' : 'Level A2', 
      description: isEs ? 'Élémentaire' : 'Elementary', 
      color: 'bg-blue-500', 
      topics: isEs ? TOPICS_A2_ES : TOPICS_A2_EN 
    },
    { 
      id: 'B1', 
      title: isEs ? 'Niveau B1' : 'Level B1', 
      description: isEs ? 'Intermédiaire' : 'Intermediate', 
      color: 'bg-indigo-500', 
      topics: isEs ? TOPICS_B1_ES : TOPICS_B1_EN 
    },
    { 
      id: 'B2', 
      title: isEs ? 'Niveau B2' : 'Level B2', 
      description: isEs ? 'Avancé' : 'Advanced', 
      color: 'bg-purple-600', 
      topics: isEs ? TOPICS_B2_ES : TOPICS_B2_EN 
    },
  ];
};