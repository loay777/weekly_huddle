import { Progress } from "@/components/ui/progress";

interface ProgressCounterProps {
  current: number;
  total: number;
}

export function ProgressCounter({ current, total }: ProgressCounterProps) {
  const progress = (current / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-[#859ef4]">
        <span>Progress</span>
        <span>{current}/{total}</span>
      </div>
      <Progress 
        value={progress} 
        className="w-[200px] bg-[#5b5b6c]" 
        indicatorClassName="bg-[#0b3eea]" 
      />
    </div>
  );
}