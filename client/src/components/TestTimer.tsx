import { useState, useEffect, useCallback } from "react";
import { formatTime } from "@/lib/testUtils";

interface TestTimerProps {
  initialTime: number;
  onTimeComplete?: () => void;
  isPaused?: boolean;
  isCountdown?: boolean;
  className?: string;
  showLabel?: boolean;
  labelText?: string;
}

export default function TestTimer({
  initialTime,
  onTimeComplete,
  isPaused = false,
  isCountdown = true,
  className = "",
  showLabel = true,
  labelText
}: TestTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  // Reset timer if initialTime changes
  useEffect(() => {
    setTimeRemaining(initialTime);
  }, [initialTime]);

  const tick = useCallback(() => {
    setTimeRemaining(prev => {
      if (isCountdown) {
        const newTime = prev - 1;
        if (newTime <= 0) {
          if (onTimeComplete) onTimeComplete();
          return 0;
        }
        return newTime;
      } else {
        return prev + 1;
      }
    });
  }, [isCountdown, onTimeComplete]);

  useEffect(() => {
    if (isPaused) return;
    
    const timerInterval = setInterval(tick, 1000);
    return () => clearInterval(timerInterval);
  }, [isPaused, tick]);

  return (
    <div className="text-center">
      <div className={`text-2xl font-bold text-olive-green ${className}`}>
        {formatTime(timeRemaining)}
      </div>
      {showLabel && (
        <div className="text-sm text-gray-500">
          {labelText || (isCountdown ? 'Time remaining' : 'Time elapsed')}
        </div>
      )}
    </div>
  );
}
