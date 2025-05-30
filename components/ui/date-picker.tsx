"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils"; // Your utility for merging class names
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
    date?: Date;
    onDateChange: (date: Date | undefined) => void;
    placeholder?: string;
    className?: string; // To allow custom styling on the button
    disabled?: (date: Date) => boolean; // To disable specific dates
    disabledDays?: any; // For react-day-picker's disabled prop flexibility
    fromDate?: Date;
    toDate?: Date;
    // You can add more props from react-day-picker if needed
}

export function DatePicker({
    date,
    onDateChange,
    placeholder = "Pick a date",
    className,
    disabled,
    disabledDays,
    fromDate,
    toDate
}: DatePickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleSelect = (selectedDate: Date | undefined) => {
        onDateChange(selectedDate);
        setIsOpen(false); // Close the popover after selecting a date
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        className // Allow parent to pass custom classes
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent 
                className="w-auto p-0" 
                align="start"
                sideOffset={5}
            >
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                    initialFocus
                    disabled={disabled || disabledDays} // Pass through disabled prop
                    fromDate={fromDate}
                    toDate={toDate}
                />
            </PopoverContent>
        </Popover>
    );
}