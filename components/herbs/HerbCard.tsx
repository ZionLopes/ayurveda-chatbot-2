import { Herb } from '@/types';
import { AlertTriangle, Book, Leaf, Pill } from 'lucide-react';
import Image from 'next/image';

interface HerbCardProps {
  herb: Herb;
}

export function HerbCard({ herb }: HerbCardProps) {
  return (
    <div className="bg-card rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-all">
      {herb.images && herb.images.length > 0 && (
        <div className="relative w-full h-48 bg-muted">
          <Image 
            src={herb.images[0].image_url}
            alt={herb.images[0].title}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
            <h3 className="text-xl font-bold text-white">{herb.name}</h3>
            <p className="text-white/80 text-sm italic">{herb.sanskrit_name}</p>
          </div>
        </div>
      )}
      
      {!herb.images?.length && (
        <div className="p-4 bg-primary/10 border-b">
          <h3 className="text-xl font-bold text-primary">{herb.name}</h3>
          <p className="text-muted-foreground text-sm italic">{herb.sanskrit_name}</p>
        </div>
      )}

      <div className="p-5 space-y-4">
        <div>
          <p className="text-sm text-foreground/90">{herb.description}</p>
        </div>

        <div className="flex gap-2 text-xs font-medium">
          <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
            Vata {herb.dosha_effect.vata}
          </span>
          <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
            Pitta {herb.dosha_effect.pitta}
          </span>
          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 border border-green-200">
            Kapha {herb.dosha_effect.kapha}
          </span>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold flex items-center gap-2 text-ayur-green-800">
            <Leaf className="h-4 w-4" /> Traditional Uses
          </h4>
          <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
            {herb.traditional_uses.map((use, i) => (
              <li key={i}>{use}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold flex items-center gap-2 text-ayur-green-800">
            <Pill className="h-4 w-4" /> Common Forms
          </h4>
          <div className="flex flex-wrap gap-1">
            {herb.common_forms.map((form, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md">
                {form}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t">
          <h4 className="text-sm font-semibold flex items-center gap-2 text-amber-700">
            <AlertTriangle className="h-4 w-4" /> Safety & Precautions
          </h4>
          <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
            {herb.safety_precautions.map((prec, i) => (
              <li key={i}>{prec}</li>
            ))}
          </ul>
          <p className="text-xs text-amber-600 mt-2 font-medium bg-amber-50 p-2 rounded-md">
            {herb.when_to_consult}
          </p>
        </div>
      </div>
    </div>
  );
}
