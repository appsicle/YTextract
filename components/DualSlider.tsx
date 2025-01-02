"use client";

import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface DualEndedSliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue?: (value: number) => string;
  parseValue?: (value: string) => number;
}

const defaultFormatValue = (value: number) => {
  const mins = Math.floor(value / 60);
  const secs = value % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const defaultParseValue = (value: string) => {
  const [mins, secs] = value.split(":").map((s) => (s ? parseInt(s, 10) : 0));
  return (isNaN(mins) ? 0 : mins) * 60 + (isNaN(secs) ? 0 : secs);
};

export function DualEndedSlider({
  min,
  max,
  step,
  value,
  onChange,
  formatValue = defaultFormatValue,
  parseValue = defaultParseValue,
}: DualEndedSliderProps) {
  const [inputValues, setInputValues] = useState([
    formatValue(value[0]),
    formatValue(value[1]),
  ]);

  useEffect(() => {
    setInputValues([formatValue(value[0]), formatValue(value[1])]);
  }, [value, formatValue]);

  const handleSliderChange = (newValues: number[]) => {
    onChange([newValues[0], newValues[1]]);
  };

  const handleInputChange = (index: number, inputValue: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = inputValue;
    setInputValues(newInputValues);
  };

  const handleInputBlur = (index: number, inputValue: string) => {
    const newValue = parseValue(inputValue);
    if (isNaN(newValue) || newValue < min || newValue > max) {
      // Reset to previous valid value if input is invalid
      setInputValues([formatValue(value[0]), formatValue(value[1])]);
      return;
    }

    const newValues = [...value] as [number, number];
    newValues[index] = newValue;
    if (index === 0 && newValue > value[1]) newValues[1] = newValue;
    if (index === 1 && newValue < value[0]) newValues[0] = newValue;
    onChange(newValues);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <Input
          type="text"
          value={inputValues[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
          onBlur={(e) => handleInputBlur(0, e.target.value)}
          className="w-24 text-center text-white"
          aria-label="Start value"
        />
        <Input
          type="text"
          value={inputValues[1]}
          onChange={(e) => handleInputChange(1, e.target.value)}
          onBlur={(e) => handleInputBlur(1, e.target.value)}
          className="w-24 text-center text-white"
          aria-label="End value"
        />
      </div>
      <div className="relative pt-1">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
          <div
            style={{ width: `${((value[0] - min) / (max - min)) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-500"
          ></div>
          <div
            style={{ width: `${((value[1] - value[0]) / (max - min)) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
          ></div>
        </div>
        <Slider
          min={min}
          max={max}
          step={step}
          value={value}
          onValueChange={handleSliderChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      <style jsx>{`
        .overflow-hidden > div {
          transition: all 0.2s ease;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}
