import { DoshaQuiz } from '@/components/dosha/DoshaQuiz';

export default function DoshaPage() {
  return (
    <div className="flex-1 overflow-auto p-4 md:p-8 bg-ayur-sage-50/30">
      <div className="max-w-4xl mx-auto pb-12">
        <DoshaQuiz />
      </div>
    </div>
  );
}
