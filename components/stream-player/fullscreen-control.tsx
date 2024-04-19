"use client";

import { Hint } from "@/components/hint";
import { Maximize, Minimize } from "lucide-react";

interface FullscreenControlProps {
  isFullScreen: boolean;
  onToggle: () => void;
}

const FullscreenControl = ({
  isFullScreen,
  onToggle,
}: FullscreenControlProps) => {
  const Icon = isFullScreen ? Minimize : Maximize;

  const label = isFullScreen ? "Exit fullscreen" : "Enter fullscreen";
  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
        >
          <Icon className="h-5 w-5" />
        </button>
      </Hint>
    </div>
  );
};

export default FullscreenControl;
