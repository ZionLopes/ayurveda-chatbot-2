'use client';

import { useState } from 'react';
import { quizQuestions, calculateDoshaProfile, doshaInfo } from '@/data/doshas';
import { DoshaProfile } from '@/types';
import { createClient } from '@/lib/supabase';
import { Check, ChevronRight, Activity, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function DoshaQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<DoshaProfile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const supabase = createClient();

  const handleSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateAndSaveResult();
    }
  };

  const calculateAndSaveResult = async () => {
    setIsSubmitting(true);
    const profile = calculateDoshaProfile(answers);
    setResult(profile);

    if (user) {
      try {
        await supabase.from('dosha_assessments').insert({
          user_id: user.id,
          answers,
          results: profile,
        });

        await supabase.from('users').update({
          dosha_profile: profile
        }).eq('id', user.id);
      } catch (e) {
        console.error('Error saving dosha profile', e);
      }
    }
    setIsSubmitting(false);
  };

  const restartQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
  };

  if (result) {
    const dominantInfo = doshaInfo[result.dominant];
    
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-serif font-bold text-ayur-green-900">Your Indicative Profile</h2>
          <p className="text-muted-foreground">Based on your answers, here is your dosha breakdown.</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {(['vata', 'pitta', 'kapha'] as const).map(d => (
            <div key={d} className={`p-4 rounded-xl border text-center ${result.dominant === d ? 'border-primary ring-2 ring-primary/20 shadow-md' : 'bg-card'}`}>
              <span className="text-2xl mb-2 block">{doshaInfo[d].emoji}</span>
              <h3 className="font-bold capitalize">{d}</h3>
              <p className="text-2xl font-semibold mt-2">{result[d]}%</p>
            </div>
          ))}
        </div>

        <div className={`rounded-2xl border p-8 ${dominantInfo.bgColor} ${dominantInfo.borderColor}`}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">{dominantInfo.emoji}</span>
            <div>
              <h3 className={`text-2xl font-bold ${dominantInfo.textColor}`}>Dominant Dosha: {dominantInfo.name}</h3>
              <p className="text-sm font-medium opacity-80">{dominantInfo.elements}</p>
            </div>
          </div>
          
          <p className="leading-relaxed mb-6">{dominantInfo.description}</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-3 flex items-center gap-2"><Check className="h-4 w-4 text-green-600"/> Balancing Lifestyle</h4>
              <ul className="space-y-2 text-sm">
                {dominantInfo.balancing.map((b, i) => <li key={i} className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"/>{b}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Dietary Guidelines</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="font-semibold text-green-700 block mb-1">Favor:</span>
                  <p>{dominantInfo.foods.favor.join(', ')}</p>
                </div>
                <div>
                  <span className="font-semibold text-red-700 block mb-1">Reduce:</span>
                  <p>{dominantInfo.foods.reduce.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg text-sm text-amber-800 text-center">
          <strong>Note:</strong> This assessment provides a general indication for educational purposes. It is not a medical diagnosis.
        </div>
        
        <div className="text-center pt-4">
          <button onClick={restartQuiz} className="text-primary hover:underline text-sm font-medium">Retake Quiz</button>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestionIndex];
  const hasAnswered = !!answers[currentQ.id];
  const progress = ((currentQuestionIndex) / quizQuestions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-ayur-green-900">Dosha Assessment</h2>
        <p className="text-muted-foreground">Discover your unique mind-body constitution (Prakriti)</p>
      </div>

      <div className="bg-secondary/30 h-2 rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="bg-card rounded-xl border p-6 shadow-sm">
        <div className="mb-6 flex justify-between items-center text-sm font-medium text-muted-foreground">
          <span className="uppercase tracking-wider">{currentQ.category}</span>
          <span>Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-6">{currentQ.question}</h3>
        
        <div className="space-y-3">
          {currentQ.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(currentQ.id, option.value)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                answers[currentQ.id] === option.value 
                  ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                  : 'hover:border-primary/50 hover:bg-secondary/20'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!hasAnswered || isSubmitting}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Calculating...' : currentQuestionIndex === quizQuestions.length - 1 ? 'See Results' : 'Next'}
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
