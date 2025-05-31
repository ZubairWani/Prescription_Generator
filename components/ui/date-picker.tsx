// "use client";

// import * as React from "react";
// import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";

// import { cn } from "@/lib/utils"; // Your utility for merging class names
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";

// interface DatePickerProps {
//     date?: Date;
//     onDateChange: (date: Date | undefined) => void;
//     placeholder?: string;
//     className?: string; // To allow custom styling on the button
//     disabled?: (date: Date) => boolean; // To disable specific dates
//     disabledDays?: any; // For react-day-picker's disabled prop flexibility
//     fromDate?: Date;
//     toDate?: Date;
//     // You can add more props from react-day-picker if needed
// }

// export function DatePicker({
//     date,
//     onDateChange,
//     placeholder = "Pick a date",
//     className,
//     disabled,
//     disabledDays,
//     fromDate,
//     toDate
// }: DatePickerProps) {
//     const [isOpen, setIsOpen] = React.useState(false);

//     const handleSelect = (selectedDate: Date | undefined) => {
//         onDateChange(selectedDate);
//         setIsOpen(false); // Close the popover after selecting a date
//     };

//     return (
//         <Popover open={isOpen} onOpenChange={setIsOpen}>
//             <PopoverTrigger asChild>
//                 <Button
//                     variant={"outline"}
//                     className={cn(
//                         "w-[280px] justify-start text-left font-normal",
//                         !date && "text-muted-foreground",
//                         className // Allow parent to pass custom classes
//                     )}
//                 >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {date ? format(date, "PPP") : <span>{placeholder}</span>}
//                 </Button>
//             </PopoverTrigger>
//             <PopoverContent 
//                 className="w-auto p-0" 
//                 align="start"
//                 sideOffset={5}
//             >
//                 <Calendar
//                     mode="single"
//                     selected={date}
//                     onSelect={handleSelect}
//                     initialFocus
//                     disabled={disabled || disabledDays} // Pass through disabled prop
//                     fromDate={fromDate}
//                     toDate={toDate}
//                 />
//             </PopoverContent>
//         </Popover>
//     );
// }







"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils"; // Your utility for merging class names
import { Button } from "@/components/ui/button"; // Assuming this is your themed button
import { Calendar } from "@/components/ui/calendar"; // This will need theming too
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
                        "w-full sm:w-[280px] justify-start text-left font-normal", // Made it full width on small screens
                        "bg-slate-700/50 border-slate-600 hover:border-teal-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30", // Theming
                        "text-slate-100 placeholder:text-slate-400", // Text theming
                        !date && "text-slate-400", // Placeholder text color
                        className 
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4 text-teal-400" /> {/* Icon color */}
                    {date ? format(date, "PPP") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-auto p-0 bg-slate-800 border-slate-700 shadow-2xl rounded-md" // Theming for popover
                align="start"
                sideOffset={5}
            >
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                    initialFocus
                    disabled={disabled || disabledDays}
                    fromDate={fromDate}
                    toDate={toDate}
                    // We'll theme the Calendar component itself next
                />
            </PopoverContent>
        </Popover>
    );
}