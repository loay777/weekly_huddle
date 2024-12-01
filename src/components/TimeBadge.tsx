import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

export function TimeBadge() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Badge className="bg-[#18181b] hover:bg-[#212128] text-white w-64 text-md gap-1">
      
      <Calendar  color='#859ef4' className="w-4 h-4" />{time.toLocaleDateString()}  <Clock color='#859ef4' className="ml-3 w-4 h-4" />{time.toLocaleTimeString()}
    </Badge>
  );
}