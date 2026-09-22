export type Language = 'en' | 'hi' | 'mr';
export type DoshaType = 'vata' | 'pitta' | 'kapha';
export type MessageRole = 'user' | 'assistant';
export type ItemType = 'herb' | 'food' | 'article' | 'message';
export type ReferenceType = 'official_government' | 'research_paper' | 'medical_reference' | 'ayurveda_reference' | 'image_source' | 'educational_resource';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  language: Language;
  dosha_profile?: DoshaProfile;
  role: 'user' | 'admin';
  created_at: string;
}

export interface DoshaProfile {
  vata: number;
  pitta: number;
  kapha: number;
  dominant: DoshaType;
}

export interface Chat {
  id: string;
  user_id: string;
  title: string;
  language: Language;
  created_at: string;
  updated_at: string;
  message_count?: number;
}

export interface Message {
  id: string;
  chat_id: string;
  role: MessageRole;
  content: string;
  images?: ImageReference[];
  references?: Reference[];
  research?: Reference[];
  safety_notice?: string;
  created_at: string;
}

export interface ImageReference {
  id?: string;
  title: string;
  image_url: string;
  source_url: string;
  source_name: string;
  license?: string;
  attribution?: string;
  category: string;
  description?: string;
  tags?: string[];
}

export interface Reference {
  id?: string;
  title: string;
  description: string;
  url: string;
  source: string;
  type: ReferenceType;
  category?: string;
  publication_date?: string;
  tags?: string[];
}

export interface DoshaAssessment {
  id: string;
  user_id: string;
  answers: QuizAnswer[];
  results: DoshaProfile;
  created_at: string;
}

export interface QuizAnswer {
  question_id: string;
  value: string;
  dosha_weight: Record<DoshaType, number>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  category: string;
  options: QuizOption[];
}

export interface QuizOption {
  label: string;
  value: string;
  dosha_weight: Record<DoshaType, number>;
}

export interface Herb {
  id: string;
  name: string;
  sanskrit_name: string;
  description: string;
  traditional_uses: string[];
  dosha_effect: {
    vata: 'balances' | 'increases' | 'neutral';
    pitta: 'balances' | 'increases' | 'neutral';
    kapha: 'balances' | 'increases' | 'neutral';
  };
  common_forms: string[];
  safety_precautions: string[];
  drug_interactions: string[];
  when_to_consult: string;
  images: ImageReference[];
  references: Reference[];
  tags: string[];
  category: string;
}

export interface Food {
  id: string;
  name: string;
  category: 'fruits' | 'vegetables' | 'grains' | 'spices' | 'dairy' | 'nuts' | 'beverages' | 'legumes';
  qualities: string[];
  taste: string[];
  dosha_effect: {
    vata: 'good' | 'avoid' | 'moderate';
    pitta: 'good' | 'avoid' | 'moderate';
    kapha: 'good' | 'avoid' | 'moderate';
  };
  preparation: string;
  precautions: string;
  description: string;
  emoji?: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: 'doshas' | 'concepts' | 'lifestyle' | 'therapies' | 'herbs' | 'diet';
  subcategory?: string;
  overview: string;
  content: string;
  traditional_perspective: string;
  modern_view?: string;
  precautions?: string;
  when_to_consult?: string;
  tags: string[];
  references: Reference[];
}

export interface SavedItem {
  id: string;
  user_id: string;
  type: ItemType;
  item_id: string;
  data: Record<string, unknown>;
  saved_at: string;
}

export interface Feedback {
  id: string;
  user_id: string;
  message_id?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  created_at: string;
}

export interface AdminStats {
  total_users: number;
  total_chats: number;
  total_messages: number;
  popular_questions: { question: string; count: number }[];
  most_viewed_herbs: { herb: string; count: number }[];
  feedback_summary: { avg_rating: number; total: number };
  safety_flags: number;
}

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

export interface StreamChunk {
  type: 'text' | 'images' | 'references' | 'research' | 'safety' | 'done' | 'error';
  data: string | ImageReference[] | Reference[] | null;
}
