import type { Food } from '@/types';

export const foods: Food[] = [
  // Fruits
  { id: 'mango', name: 'Mango', category: 'fruits', qualities: ['Sweet', 'Heavy', 'Cooling'], taste: ['Sweet', 'Sour'], dosha_effect: { vata: 'good', pitta: 'moderate', kapha: 'moderate' }, preparation: 'Eat ripe and fresh. Avoid combining with dairy in large amounts.', precautions: 'Unripe mango may aggravate Pitta. Avoid excess in Kapha conditions.', description: 'The king of fruits in Ayurveda, ripe mango is considered nourishing and energizing.', emoji: '🥭' },
  { id: 'pomegranate', name: 'Pomegranate', category: 'fruits', qualities: ['Sweet', 'Astringent', 'Light'], taste: ['Sweet', 'Sour', 'Astringent'], dosha_effect: { vata: 'good', pitta: 'good', kapha: 'good' }, preparation: 'Fresh juice or seeds. Best consumed in season.', precautions: 'Generally tridoshic and very well tolerated.', description: 'Pomegranate is considered tridoshic (balances all three doshas) and is revered for its blood-purifying and digestive properties.', emoji: '🍎' },
  { id: 'banana', name: 'Banana', category: 'fruits', qualities: ['Sweet', 'Heavy', 'Cooling'], taste: ['Sweet'], dosha_effect: { vata: 'good', pitta: 'good', kapha: 'avoid' }, preparation: 'Eat ripe. Avoid raw or unripe. Best not combined with milk in Ayurveda.', precautions: 'Heavy to digest. Avoid in congestion, cough, or Kapha imbalance.', description: 'Ripe bananas are nourishing and grounding, excellent for Vata types.', emoji: '🍌' },
  { id: 'lemon', name: 'Lemon', category: 'fruits', qualities: ['Sour', 'Light', 'Hot'], taste: ['Sour'], dosha_effect: { vata: 'good', pitta: 'avoid', kapha: 'good' }, preparation: 'Fresh lemon in warm water is a classic Ayurvedic morning tonic.', precautions: 'May aggravate Pitta conditions like acid reflux or skin inflammation.', description: 'Lemon stimulates digestive fire (Agni) and is used in many traditional preparations.', emoji: '🍋' },
  // Vegetables
  { id: 'sweet_potato', name: 'Sweet Potato', category: 'vegetables', qualities: ['Sweet', 'Heavy', 'Warm', 'Nourishing'], taste: ['Sweet'], dosha_effect: { vata: 'good', pitta: 'good', kapha: 'moderate' }, preparation: 'Cooked — baked, steamed, or roasted. Add warming spices.', precautions: 'Heavy for digestion. Eat in moderate amounts for Kapha.', description: 'Grounding and nourishing, especially beneficial for Vata dosha.', emoji: '🍠' },
  { id: 'spinach', name: 'Spinach', category: 'vegetables', qualities: ['Light', 'Dry', 'Slightly Warm'], taste: ['Bitter', 'Astringent'], dosha_effect: { vata: 'moderate', pitta: 'good', kapha: 'good' }, preparation: 'Best cooked. Add ghee or oil for Vata. Avoid raw in excess.', precautions: 'Oxalates in raw spinach may affect absorption — cooking reduces this.', description: 'Bitter leafy greens are highly valued in Ayurveda for liver and blood health.', emoji: '🌿' },
  { id: 'ginger_root', name: 'Ginger (Fresh)', category: 'vegetables', qualities: ['Pungent', 'Hot', 'Light'], taste: ['Pungent', 'Sweet (after digestion)'], dosha_effect: { vata: 'good', pitta: 'moderate', kapha: 'good' }, preparation: 'Fresh ginger tea, in cooking, or with lemon and honey.', precautions: 'Use in moderation for Pitta types. Avoid with ulcers or inflammatory conditions.', description: 'Called the "universal medicine" in Ayurveda. Excellent digestive and warming herb-food.', emoji: '🫚' },
  // Grains
  { id: 'rice', name: 'Basmati Rice', category: 'grains', qualities: ['Sweet', 'Light', 'Cooling'], taste: ['Sweet'], dosha_effect: { vata: 'good', pitta: 'good', kapha: 'moderate' }, preparation: 'Cooked with water or as Khichadi with split mung beans.', precautions: 'White rice can elevate blood sugar — combine with vegetables and protein.', description: 'Basmati rice is considered the most sattvic and easily digestible grain in Ayurveda.', emoji: '🍚' }
];

export const getFoodsByDosha = (dosha: string): Food[] =>
  foods.filter((f) => {
    const effect = f.dosha_effect[dosha as keyof typeof f.dosha_effect];
    return effect === 'good';
  });

export const getFoodsByCategory = (category: string): Food[] =>
  foods.filter((f) => f.category === category);
