import { cn } from "@/lib/utils";

interface LiveBadegeProps {
  className?: string;
}

const LiveBadge = ({ className }: LiveBadegeProps) => {
  return <div className={cn(
    "bg-rose-500 text-center p-0.5 px-1.5 rounded-md uppercase text-[10px] border borback font-semibold tracking-wide ",className
  )}>Live</div>;
};

export default LiveBadge;
