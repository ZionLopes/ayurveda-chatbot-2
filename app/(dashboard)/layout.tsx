import { Disclaimer } from '@/components/shared/Disclaimer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Disclaimer />
      <div className="flex-1 flex flex-col min-h-0 bg-background">
        {children}
      </div>
    </div>
  );
}
