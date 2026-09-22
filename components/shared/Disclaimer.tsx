import { ShieldAlert } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="w-full bg-amber-50 border-b border-amber-200">
      <div className="container px-4 py-2.5 flex items-center justify-center gap-2 text-center">
        <ShieldAlert className="h-3.5 w-3.5 text-amber-600 shrink-0" />
        <p className="text-xs text-amber-800">
          <strong>Disclaimer:</strong> AyurVeda AI is for <strong>educational purposes only</strong> and does not replace advice from a qualified healthcare professional. Always consult a doctor for medical concerns.
        </p>
      </div>
    </div>
  );
}
