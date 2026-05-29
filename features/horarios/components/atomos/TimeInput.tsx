import { useState, useEffect } from "react";



export default function TimeInput({
  time,
  disabled,
  isOcupado,
  onSave,
}: {
  time: string;
  disabled: boolean;
  isOcupado: boolean;
  onSave: (value: string) => void;
}) {
  const [tempTime, setTempTime] = useState(time);

  useEffect(() => {
    setTempTime(time);
  }, [time]);

  return (
    <input
      type="time"
      value={tempTime}
      disabled={disabled}
      onChange={(e) => setTempTime(e.target.value)}
      onBlur={() => onSave(tempTime)}
      className={`bg-transparent text-sm py-1.5 pl-3 outline-none w-[90px]
        ${
          isOcupado
            ? "line-through text-red-400/70 cursor-not-allowed"
            : "text-cream-label"
        }`}
    />
  );
}