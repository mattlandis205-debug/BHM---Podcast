
export enum Step {
  INTRO = 'intro',
  BRITISH_PATH = 'british_path',
  PATRIOT_PATH = 'patriot_path',
  LEGAL_PATH = 'legal_path',
  VERDICT = 'verdict',
  AI_CONSULTANT = 'ai_consultant'
}

export interface HistoricalFigure {
  id: string;
  name: string;
  side: 'British' | 'American' | 'Legal';
  story: string;
  outcome: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
