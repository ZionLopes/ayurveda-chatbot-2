import type { QuizQuestion, DoshaType } from '@/types';

export const doshaInfo = {
  vata: {
    name: 'Vata',
    elements: 'Air + Space (Ether)',
    emoji: '🌬️',
    color: 'from-blue-400 to-purple-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    description: 'Vata is the dosha of movement, creativity, and change. It governs all movement in the body — from breathing to digestion to nerve impulses.',
    characteristics: [
      'Light, thin body frame',
      'Enthusiastic and creative',
      'Quick to learn, quick to forget',
      'Variable appetite and digestion',
      'Tendency toward dry skin and hair',
      'Light, interrupted sleep',
      'Tendency toward worry and anxiety when imbalanced',
    ],
    balancing: [
      'Establish regular daily routines',
      'Warm, nourishing, oily foods',
      'Gentle, grounding exercises like yoga and walking',
      'Warm sesame oil self-massage (Abhyanga)',
      'Adequate rest and regular sleep schedule',
      'Warm, calm, and stable environments',
    ],
    foods: {
      favor: ['Warm cooked grains', 'Root vegetables', 'Dairy (warm)', 'Sweet fruits', 'Nuts', 'Ghee', 'Warming spices'],
      reduce: ['Raw vegetables', 'Dry foods', 'Carbonated drinks', 'Cold foods and drinks', 'Bitter greens'],
    },
  },
  pitta: {
    name: 'Pitta',
    elements: 'Fire + Water',
    emoji: '🔥',
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    description: 'Pitta is the dosha of transformation, intelligence, and metabolism. It governs digestion, metabolism, body temperature, and mental understanding.',
    characteristics: [
      'Medium, muscular build',
      'Sharp intellect and focused mind',
      'Strong appetite and digestion',
      'Leadership qualities',
      'Warm body temperature, prone to sweating',
      'Moderate sleep, often waking at night',
      'Tendency toward irritability and anger when imbalanced',
    ],
    balancing: [
      'Cool, calming, and sweet foods',
      'Avoid excessive heat, sun, and spicy food',
      'Cooling exercises — swimming, walking in nature',
      'Coconut oil self-massage',
      'Time in nature, near water',
      'Moonlight walks and relaxation practices',
    ],
    foods: {
      favor: ['Sweet fruits', 'Dairy (cooling)', 'Cucumber', 'Leafy greens', 'Cooling spices (coriander, fennel)', 'Coconut', 'Sweet grains'],
      reduce: ['Spicy foods', 'Fermented foods', 'Alcohol', 'Red meat', 'Coffee', 'Sour foods', 'Heating spices'],
    },
  },
  kapha: {
    name: 'Kapha',
    elements: 'Earth + Water',
    emoji: '🌊',
    color: 'from-green-400 to-teal-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    description: 'Kapha is the dosha of structure, stability, and nourishment. It governs the body\'s structure, lubrication, and immunity.',
    characteristics: [
      'Larger, strong body frame',
      'Calm, steady, and patient nature',
      'Slow to learn, but retains well',
      'Steady appetite, slow digestion',
      'Smooth, oily, thick skin',
      'Heavy, prolonged sleep',
      'Tendency toward attachment and lethargy when imbalanced',
    ],
    balancing: [
      'Stimulating, vigorous exercise',
      'Light, warm, and dry foods',
      'New experiences and variety',
      'Dry brushing (Garshana) massage',
      'Wake up early and avoid daytime sleep',
      'Regular fasting or light eating practices',
    ],
    foods: {
      favor: ['Light vegetables', 'Legumes', 'Spicy and bitter foods', 'Honey (small amounts)', 'Ginger tea', 'Light grains'],
      reduce: ['Heavy dairy', 'Fried foods', 'Sweets', 'Red meat', 'Cold foods', 'Excessive oil', 'Bananas', 'Wheat'],
    },
  },
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'body_frame',
    question: 'How would you describe your natural body frame?',
    category: 'Body Type',
    options: [
      { label: 'Thin, light, difficulty gaining weight', value: 'a', dosha_weight: { vata: 3, pitta: 0, kapha: 0 } },
      { label: 'Medium, muscular, moderate build', value: 'b', dosha_weight: { vata: 0, pitta: 3, kapha: 0 } },
      { label: 'Larger, solid, easy to gain weight', value: 'c', dosha_weight: { vata: 0, pitta: 0, kapha: 3 } },
    ],
  },
  {
    id: 'skin_type',
    question: 'How would you describe your skin?',
    category: 'Skin',
    options: [
      { label: 'Dry, rough, thin, cool to touch', value: 'a', dosha_weight: { vata: 3, pitta: 0, kapha: 0 } },
      { label: 'Warm, reddish, sensitive, prone to rashes', value: 'b', dosha_weight: { vata: 0, pitta: 3, kapha: 0 } },
      { label: 'Smooth, oily, thick, soft', value: 'c', dosha_weight: { vata: 0, pitta: 0, kapha: 3 } },
    ],
  },
  {
    id: 'appetite',
    question: 'How is your typical appetite?',
    category: 'Digestion',
    options: [
      { label: 'Variable — sometimes hungry, sometimes not', value: 'a', dosha_weight: { vata: 3, pitta: 0, kapha: 0 } },
      { label: 'Strong — very hungry if meals are skipped', value: 'b', dosha_weight: { vata: 0, pitta: 3, kapha: 0 } },
      { label: 'Consistent but moderate — can skip meals', value: 'c', dosha_weight: { vata: 0, pitta: 0, kapha: 3 } },
    ],
  }
];

export function calculateDoshaProfile(answers: Record<string, string>): { vata: number; pitta: number; kapha: number; dominant: DoshaType } {
  const totals = { vata: 0, pitta: 0, kapha: 0 };

  quizQuestions.forEach((q) => {
    const answer = answers[q.id];
    const option = q.options.find((o) => o.value === answer);
    if (option) {
      totals.vata += option.dosha_weight.vata;
      totals.pitta += option.dosha_weight.pitta;
      totals.kapha += option.dosha_weight.kapha;
    }
  });

  const total = totals.vata + totals.pitta + totals.kapha || 1;
  const vata = Math.round((totals.vata / total) * 100);
  const pitta = Math.round((totals.pitta / total) * 100);
  const kapha = 100 - vata - pitta;

  let dominant: DoshaType = 'vata';
  if (totals.pitta >= totals.vata && totals.pitta >= totals.kapha) dominant = 'pitta';
  else if (totals.kapha >= totals.vata && totals.kapha >= totals.pitta) dominant = 'kapha';

  return { vata, pitta, kapha, dominant };
}
