"use client";

import { useState, useEffect } from "react";
import { CalendarDays, AlertTriangle, Check, ChevronsUpDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

// Predefined duration options
const durationOptions = [
  { value: "1 day", label: "1 day" },
  { value: "3 days", label: "3 days" },
  { value: "5 days", label: "5 days" },
  { value: "7 days", label: "7 days" },
  { value: "10 days", label: "10 days" },
  { value: "14 days", label: "14 days" },
  { value: "21 days", label: "21 days" },
  { value: "1 month", label: "1 month" },
  { value: "2 months", label: "2 months" },
  { value: "3 months", label: "3 months" },
  { value: "PRN", label: "PRN (As needed)" },
  { value: "Until further notice", label: "Until further notice"},
  { value: "custom", label: "Custom..." }
];

interface ICurrentMedicationForDuration {
  duration: string;
}

interface ValidationErrorsForDuration {
  duration?: string;
}

interface DurationSelectorProps {
  isMobile?: boolean; // Kept for potential future use or existing logic elsewhere
  currentMedication: ICurrentMedicationForDuration;
  handleInputChange: (field: "duration", value: string) => void;
  validationErrors: ValidationErrorsForDuration;
}

export function DurationSelector({
  isMobile,
  currentMedication,
  handleInputChange,
  validationErrors,
}: DurationSelectorProps) {
  const [isCustom, setIsCustom] = useState(false);
  const [open, setOpen] = useState(false);
  const [customValue, setCustomValue] = useState("");

  useEffect(() => {
    const currentDuration = currentMedication.duration;
    const isPredefined = durationOptions.some(opt => opt.value === currentDuration && opt.value !== "custom");

    if (currentDuration === "custom") {
      // User selected "Custom..." placeholder, or "custom" was saved.
      // The actual custom input should be empty for the user to type.
      setIsCustom(true);
      setCustomValue(""); 
    } else if (currentDuration && !isPredefined) {
      // An actual custom string like "6 weeks" was provided or saved.
      setIsCustom(true);
      setCustomValue(currentDuration);
    } else { 
      // currentDuration is one of the predefined values, or it's empty/falsy (e.g., "", undefined).
      // In these cases, we are not in "custom" mode.
      setIsCustom(false);
      setCustomValue("");
    }
  }, [currentMedication.duration]);

  const handleSelectDuration = (value: string) => {
    if (value === "custom") {
      setIsCustom(true);
      setCustomValue(""); // Clear custom input for new entry
      // Signify to parent that a custom duration is being entered, actual value is pending.
      // An empty string can represent this pending state.
      handleInputChange("duration", ""); 
    } else {
      setIsCustom(false);
      setCustomValue(""); // Clear any previous custom value if a predefined one is chosen
      handleInputChange("duration", value);
    }
    setOpen(false);
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomValue(e.target.value);
    // To update parent live as user types (can be good for immediate validation, but might be "noisy"):
    // if (isCustom) {
    //   handleInputChange("duration", e.target.value);
    // }
  };

  const handleCustomInputBlur = () => {
    if (isCustom) {
      // Update parent only on blur to reduce re-renders and ensure the final value is sent.
      handleInputChange("duration", customValue.trim());
    }
  };

  const handleCustomInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      handleCustomInputBlur(); // Treat Enter as blur for submitting the custom value
    }
  };

  const getDisplayValue = () => {
    if (isCustom) {
      // If in custom mode and customValue is empty, it means user selected "Custom..." and hasn't typed yet.
      return customValue || "Enter custom duration...";
    }
    const selectedOption = durationOptions.find(opt => opt.value === currentMedication.duration);
    return selectedOption ? selectedOption.label : "Select duration";
  };
  
  const displayValue = getDisplayValue();
  // ID remains as is, assuming isMobile might differentiate instances or has other purpose.
  const id = `duration-selector-${isMobile ? 'mob' : 'desk'}`; 

  return (
    <div className="space-y-1.5 w-full"> {/* Ensure the container takes full width available */}
      <Label htmlFor={id} className="flex items-center text-sm font-medium text-slate-700">
        <CalendarDays className="h-4 w-4 mr-1.5 text-slate-500 flex-shrink-0" /> {/* flex-shrink-0 for icon */}
        Duration*
      </Label>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between font-normal py-2.5 px-3 h-auto min-h-[40px] text-sm", // Added text-sm
              (!currentMedication.duration && !isCustom && !customValue) && "text-muted-foreground", // Refined condition for placeholder text
              validationErrors.duration && "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
            )}
            id={id}
          >
            <span className="truncate">{displayValue}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
            className="w-[--radix-popover-trigger-width] p-0" // max-h and overflow now on CommandList
            style={{ zIndex: 100 }} 
            align="start" // Ensures popover aligns with the start of the trigger
        >
          <Command>
            <CommandInput placeholder="Search or type duration..." className="text-sm"/>
            <CommandList className="max-h-[250px] sm:max-h-[300px]"> {/* Max height for scrollability */}
              <CommandEmpty>No duration found.</CommandEmpty>
              <CommandGroup>
                {durationOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label} 
                    onSelect={() => handleSelectDuration(option.value)}
                    className="cursor-pointer text-sm" // Ensure CommandItem text is also consistently sized
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        (currentMedication.duration === option.value && !isCustom) || // Check against currentMedication for predefined
                        (isCustom && option.value === "custom") // Check if "Custom..." is the active choice for custom mode
                          ? "opacity-100 text-blue-600"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      
      {isCustom && (
        <Input
          type="text" 
          placeholder="e.g., 5 weeks, 3 months"
          value={customValue}
          onChange={handleCustomInputChange}
          onBlur={handleCustomInputBlur}
          onKeyDown={handleCustomInputKeyDown}
          className={cn(
            "mt-2 py-2.5 px-3 text-sm w-full", // Added text-sm and w-full
            validationErrors.duration && "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
          )}
        />
      )}

      {validationErrors.duration && (
        <p className="text-xs text-red-500 flex items-center mt-1">
          <AlertTriangle className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          {validationErrors.duration}
        </p>
      )}
    </div>
  );
}


