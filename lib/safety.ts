export const EMERGENCY_KEYWORDS = [
  'chest pain', 'heart attack', 'stroke', 'bleeding heavily',
  'can\'t breathe', 'shortness of breath', 'suicide', 'kill myself',
  'unconscious', 'seizure', 'poison', 'overdose'
];

export function checkEmergency(text: string): boolean {
  const lowerText = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

export const EMERGENCY_RESPONSE = "It sounds like you may be experiencing a medical emergency. Please seek immediate medical attention or contact your local emergency services (like 911). Do not delay care to try a home or Ayurvedic remedy.";
