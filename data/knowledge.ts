import type { KnowledgeArticle } from '@/types';

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: 'prakriti',
    title: 'Prakriti — Your Natural Constitution',
    category: 'concepts',
    overview: 'Prakriti is the unique psychophysical constitution determined at conception. It remains constant throughout your life and forms the basis of Ayurvedic personalized wellness.',
    content: 'In Ayurveda, every individual is understood to be unique. Prakriti (Sanskrit: प्रकृति) refers to your inherent nature — the unique combination of the three doshas (Vata, Pitta, and Kapha) that was determined at the time of your conception. This constitutional blueprint governs your physical characteristics, mental tendencies, emotional responses, and susceptibility to certain health challenges.\n\nUnlike your current health state (Vikriti), Prakriti never changes. Understanding your Prakriti helps you make informed choices about diet, lifestyle, and wellness practices that are most harmonious with your individual nature.',
    traditional_perspective: 'Classical Ayurvedic texts like Charaka Samhita describe seven main constitutional types: Vata, Pitta, Kapha, Vata-Pitta, Pitta-Kapha, Vata-Kapha, and Sama (equal balance of all three). A qualified Ayurvedic physician (Vaidya) traditionally determines Prakriti through pulse diagnosis (Nadi Pariksha), physical examination, and detailed questioning.',
    modern_view: 'The concept of individual constitution has parallels in modern personalized medicine. While the specific Ayurvedic framework differs from conventional science, the principle that individuals have unique responses to diet, environment, and treatment is gaining recognition in integrative medicine.',
    precautions: 'Dosha quizzes and online assessments can give a general indication but are not a substitute for assessment by a qualified Ayurvedic practitioner.',
    when_to_consult: 'Visit a qualified Ayurvedic physician (Vaidya) for an accurate Prakriti assessment, especially if making significant lifestyle or dietary changes.',
    tags: ['prakriti', 'constitution', 'dosha', 'foundational'],
    references: [
      {
        title: 'National Institute of Ayurveda',
        description: 'India\'s premier Ayurveda research and education institution.',
        url: 'https://nia.nic.in/',
        source: 'NIA',
        type: 'official_government',
        tags: ['ayurveda', 'education'],
      },
    ],
  },
  {
    id: 'dinacharya',
    title: 'Dinacharya — Ayurvedic Daily Routine',
    category: 'lifestyle',
    overview: 'Dinacharya is the Ayurvedic science of daily routine. Following a consistent daily rhythm aligned with natural cycles is considered foundational to health and wellbeing.',
    content: 'Dinacharya (Sanskrit: दिनचर्या) literally means "daily conduct" or "daily routine". Ayurveda teaches that aligning our daily activities with the natural rhythms of the day — and the corresponding shifts in dosha dominance — optimizes our digestion, energy, mental clarity, and overall wellbeing.\n\n**Traditional Dinacharya Practices:**\n- Wake early (Brahma Muhurta) — approximately 90 minutes before sunrise\n- Eliminate naturally (bowel movement)\n- Oil pulling (Gandusha/Kavala) — swishing oil in the mouth\n- Tongue scraping (Jihva Nirlekhana)\n- Brushing teeth with Neem or herbal preparations\n- Nasal oiling (Nasya)\n- Warm water or herbal tea\n- Self-massage with warm oil (Abhyanga)\n- Yoga and pranayama\n- Meditation\n- Breakfast\n- Main meal at midday (when Agni/digestion is strongest)\n- Light evening meal\n- Early, consistent bedtime',
    traditional_perspective: 'Classical texts prescribe specific daily practices for physical hygiene, mental clarity, and spiritual connection. Sushruta Samhita and Charaka Samhita provide detailed guidance on Dinacharya.',
    modern_view: 'Many Dinacharya practices align with modern chronobiology — the science of biological rhythms. Regular sleep schedules, morning light exposure, and timing meals with natural light cycles are now recognized as important for metabolic health.',
    tags: ['dinacharya', 'routine', 'lifestyle', 'morning', 'foundational'],
    references: [
      {
        title: 'Ministry of AYUSH',
        description: 'Government of India ministry for Ayurveda, Yoga, Unani, Siddha and Homeopathy.',
        url: 'https://www.ayush.gov.in/',
        source: 'Ministry of AYUSH',
        type: 'official_government',
        tags: ['ayurveda', 'government'],
      },
    ],
  }
];

export const getArticleById = (id: string) =>
  knowledgeArticles.find((a) => a.id === id);

export const getArticlesByCategory = (category: string) =>
  knowledgeArticles.filter((a) => a.category === category);
