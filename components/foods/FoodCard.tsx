import { Food } from '@/types';
import { ChefHat, Flame, Droplet, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FoodCardProps {
  food: Food;
}

export function FoodCard({ food }: FoodCardProps) {
  const effectColor = (effect: string) => {
    switch (effect) {
      case 'good': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'avoid': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-card rounded-xl border p-5 shadow-sm hover:shadow-md transition-all space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-ayur-green-800 flex items-center gap-2">
            {food.emoji} {food.name}
          </h3>
          <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1 font-medium">{food.category}</p>
        </div>
      </div>

      <p className="text-sm text-foreground/90">{food.description}</p>

      <div className="space-y-3 pt-2">
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground mb-1">Qualities & Taste</h4>
          <div className="flex flex-wrap gap-1">
            {food.qualities.map((q, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md">
                {q}
              </span>
            ))}
            {food.taste.map((t, i) => (
              <span key={`t-${i}`} className="text-xs px-2 py-1 border border-primary/20 text-primary rounded-md">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-muted-foreground mb-2">Dosha Effect</h4>
          <div className="grid grid-cols-3 gap-2 text-xs font-medium text-center">
            <div className={cn("rounded-md py-1 border flex flex-col items-center justify-center gap-1", effectColor(food.dosha_effect.vata))}>
              <Wind className="h-3 w-3" />
              <span>Vata {food.dosha_effect.vata}</span>
            </div>
            <div className={cn("rounded-md py-1 border flex flex-col items-center justify-center gap-1", effectColor(food.dosha_effect.pitta))}>
              <Flame className="h-3 w-3" />
              <span>Pitta {food.dosha_effect.pitta}</span>
            </div>
            <div className={cn("rounded-md py-1 border flex flex-col items-center justify-center gap-1", effectColor(food.dosha_effect.kapha))}>
              <Droplet className="h-3 w-3" />
              <span>Kapha {food.dosha_effect.kapha}</span>
            </div>
          </div>
        </div>

        <div className="text-sm space-y-2 pt-2 border-t">
          <div>
            <span className="font-semibold text-ayur-green-800 flex items-center gap-1">
              <ChefHat className="h-3 w-3" /> Preparation:
            </span>
            <span className="text-muted-foreground ml-4 block">{food.preparation}</span>
          </div>
          <div>
            <span className="font-semibold text-amber-700">Precautions:</span>
            <span className="text-muted-foreground ml-1">{food.precautions}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
