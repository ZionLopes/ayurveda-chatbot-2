import type { Herb } from '@/types';

export const herbs: Herb[] = [
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    sanskrit_name: 'Withania somnifera',
    category: 'adaptogen',
    description: 'Ashwagandha, known as the "Indian Ginseng" or "Winter Cherry", is one of the most important herbs in Ayurveda. Its name in Sanskrit means "smell of horse" — referring both to its unique smell and its ability to impart the strength and vigor of a horse.',
    traditional_uses: [
      'Supporting healthy stress response and mental clarity',
      'Promoting vitality and physical stamina',
      'Supporting healthy thyroid function',
      'Promoting restful sleep',
      'Supporting healthy immune function',
      'Traditionally used as a Rasayana (rejuvenating tonic)',
    ],
    dosha_effect: { vata: 'balances', pitta: 'neutral', kapha: 'balances' },
    common_forms: ['Root powder', 'Capsules', 'Churna (powder)', 'Medicated ghee', 'Ashwagandha milk (Ksheerapaka)'],
    safety_precautions: [
      'Not recommended during pregnancy',
      'May interact with thyroid medications',
      'Use with caution in autoimmune conditions',
      'May have sedative effects when combined with sedative medications',
      'Consult a practitioner before use if you have a medical condition',
    ],
    drug_interactions: [
      'Thyroid medications (levothyroxine)',
      'Immunosuppressants',
      'Sedatives and sleep medications',
      'Blood pressure medications',
    ],
    when_to_consult: 'Consult a qualified Ayurvedic practitioner or healthcare professional before use if pregnant, breastfeeding, taking prescription medications, or managing a chronic health condition.',
    tags: ['adaptogen', 'stress', 'energy', 'sleep', 'immunity', 'rasayana'],
    images: [
      {
        title: 'Ashwagandha Plant',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Illustration_Withania_somnifera0.jpg/320px-Illustration_Withania_somnifera0.jpg',
        source_url: 'https://commons.wikimedia.org/wiki/File:Illustration_Withania_somnifera0.jpg',
        source_name: 'Wikimedia Commons',
        license: 'Public Domain',
        attribution: 'Franz Eugen Köhler, Köhler\'s Medizinal-Pflanzen',
        category: 'Herbs',
        description: 'Botanical illustration of Withania somnifera (Ashwagandha)',
      }
    ],
    references: [
      {
        title: 'Ashwagandha — NCCIH',
        description: 'National Center for Complementary and Integrative Health overview of Ashwagandha research and safety.',
        url: 'https://www.nccih.nih.gov/health/ashwagandha',
        source: 'NCCIH (NIH)',
        type: 'medical_reference',
        tags: ['ashwagandha', 'adaptogen'],
      },
      {
        title: 'Ashwagandha on PubMed',
        description: 'Peer-reviewed research on Withania somnifera.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=ashwagandha+withania+somnifera',
        source: 'PubMed / NIH',
        type: 'research_paper',
        tags: ['ashwagandha', 'research'],
      }
    ]
  },
  {
    id: 'turmeric',
    name: 'Turmeric',
    sanskrit_name: 'Curcuma longa (Haridra)',
    category: 'spice-herb',
    description: 'Turmeric (Haridra) is one of Ayurveda\'s most versatile herbs, revered for thousands of years as a culinary spice, dye, cosmetic, and traditional medicine. Its active compound curcumin has been extensively studied in modern science.',
    traditional_uses: [
      'Supporting healthy inflammatory response',
      'Promoting digestive health and Agni (digestive fire)',
      'Traditional skin care and complexion support',
      'Supporting liver and blood purification (Raktashodhana)',
      'Wound care and antiseptic use',
      'Supporting respiratory health',
    ],
    dosha_effect: { vata: 'balances', pitta: 'neutral', kapha: 'balances' },
    common_forms: ['Fresh root', 'Dried powder', 'Golden milk (Haldi doodh)', 'Capsules', 'Paste'],
    safety_precautions: [
      'High doses may cause digestive upset',
      'May have blood-thinning effects in large amounts',
      'Use with caution before surgery',
      'People with gallbladder problems should consult a doctor',
      'May interact with certain medications at supplement doses',
    ],
    drug_interactions: [
      'Blood thinners (warfarin, aspirin)',
      'Diabetes medications',
      'Acid-reducing medications',
    ],
    when_to_consult: 'Culinary use is generally safe for most people. Consult a healthcare professional before taking turmeric supplements, especially if on blood thinners or other medications.',
    tags: ['anti-inflammatory', 'digestive', 'skin', 'spice', 'liver'],
    images: [
      {
        title: 'Turmeric Root and Powder',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Curcuma_longa_roots.jpg/320px-Curcuma_longa_roots.jpg',
        source_url: 'https://commons.wikimedia.org/wiki/File:Curcuma_longa_roots.jpg',
        source_name: 'Wikimedia Commons',
        license: 'CC BY-SA 3.0',
        attribution: 'Simon A. Eugster',
        category: 'Herbs',
        description: 'Turmeric rhizomes showing vibrant orange color',
      }
    ],
    references: [
      {
        title: 'Turmeric — NCCIH',
        description: 'NIH overview of turmeric and curcumin research.',
        url: 'https://www.nccih.nih.gov/health/turmeric',
        source: 'NCCIH (NIH)',
        type: 'medical_reference',
        tags: ['turmeric', 'curcumin'],
      }
    ]
  },
  {
    id: 'tulsi',
    name: 'Tulsi',
    sanskrit_name: 'Ocimum tenuiflorum (Holy Basil)',
    category: 'adaptogen',
    description: 'Tulsi, or Holy Basil, is considered the "Queen of Herbs" in Ayurveda. It is sacred in Hindu tradition and has been used for thousands of years for its medicinal and spiritual properties. Tulsi is classified as an adaptogen — helping the body adapt to stress.',
    traditional_uses: [
      'Respiratory health — coughs, colds, bronchitis',
      'Adaptogenic support for stress and anxiety',
      'Immune system support',
      'Digestive health and bloating',
      'Fever and infection support',
      'Oral health and dental hygiene',
    ],
    dosha_effect: { vata: 'balances', pitta: 'neutral', kapha: 'balances' },
    common_forms: ['Fresh leaves', 'Tulsi tea (herbal infusion)', 'Essential oil', 'Capsules', 'Tincture'],
    safety_precautions: [
      'May have blood-thinning properties in large amounts',
      'May lower blood sugar — monitor if diabetic',
      'Avoid high doses during pregnancy',
      'May affect fertility (traditional use)',
      'Essential oil should not be taken internally without guidance',
    ],
    drug_interactions: [
      'Blood thinners',
      'Diabetes medications',
      'Barbiturates (sedatives)',
    ],
    when_to_consult: 'Tulsi tea is generally safe. Consult a healthcare professional before taking tulsi supplements if pregnant, diabetic, or taking medications.',
    tags: ['respiratory', 'immune', 'adaptogen', 'stress', 'sacred', 'anti-bacterial'],
    images: [
      {
        title: 'Tulsi (Holy Basil) Plant',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Ocimum_tenuiflorum3.jpg/320px-Ocimum_tenuiflorum3.jpg',
        source_url: 'https://commons.wikimedia.org/wiki/File:Ocimum_tenuiflorum3.jpg',
        source_name: 'Wikimedia Commons',
        license: 'CC BY-SA 3.0',
        attribution: 'Wikimedia Commons',
        category: 'Herbs',
        description: 'Tulsi (Holy Basil) plant with characteristic purple stems',
      }
    ],
    references: [
      {
        title: 'Ministry of AYUSH — Tulsi',
        description: 'Government of India Ayush resources on Tulsi.',
        url: 'https://www.ayush.gov.in/',
        source: 'Ministry of AYUSH',
        type: 'official_government',
        tags: ['tulsi', 'ayush'],
      }
    ]
  }
];

export const getHerbById = (id: string): Herb | undefined =>
  herbs.find((h) => h.id === id);

export const getHerbsByTag = (tag: string): Herb[] =>
  herbs.filter((h) => h.tags.includes(tag));
