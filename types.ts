export type Language = 'ES' | 'EN';

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2';

export interface Topic {
  id: string;
  title: string;
  description: string; // Description in the UI language (we will store both or map them)
  objective: string;
}

export interface LevelData {
  id: CEFRLevel;
  title: string;
  description: string;
  color: string;
  topics: Topic[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface AppState {
  currentView: 'HOME' | 'LEVEL' | 'TOPIC_CHAT';
  selectedLevel: CEFRLevel | null;
  selectedTopic: Topic | null;
  uiLanguage: Language;
}
