// // "use client"

// // import * as React from "react"
// // import { ChevronLeft, ChevronRight } from "lucide-react"
// // import { DayPicker } from "react-day-picker"

// // import { cn } from "@/lib/utils"
// // import { buttonVariants } from "@/components/ui/button"

// // function Calendar({
// //   className,
// //   classNames,
// //   showOutsideDays = true,
// //   ...props
// // }: React.ComponentProps<typeof DayPicker>) {
// //   return (
// //     <DayPicker
// //       showOutsideDays={showOutsideDays}
// //       className={cn("p-3", className)}
// //       classNames={{
// //         months: "flex flex-col sm:flex-row gap-2",
// //         month: "flex flex-col gap-4",
// //         caption: "flex justify-center pt-1 relative items-center w-full",
// //         caption_label: "text-sm font-medium",
// //         nav: "flex items-center gap-1",
// //         nav_button: cn(
// //           buttonVariants({ variant: "outline" }),
// //           "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
// //         ),
// //         nav_button_previous: "absolute left-1",
// //         nav_button_next: "absolute right-1",
// //         table: "w-full border-collapse space-x-1",
// //         head_row: "flex",
// //         head_cell:
// //           "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
// //         row: "flex w-full mt-2",
// //         cell: cn(
// //           "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
// //           props.mode === "range"
// //             ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
// //             : "[&:has([aria-selected])]:rounded-md"
// //         ),
// //         day: cn(
// //           buttonVariants({ variant: "ghost" }),
// //           "size-8 p-0 font-normal aria-selected:opacity-100"
// //         ),
// //         day_range_start:
// //           "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
// //         day_range_end:
// //           "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
// //         day_selected:
// //           "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
// //         day_today: "bg-accent text-accent-foreground",
// //         day_outside:
// //           "day-outside text-muted-foreground aria-selected:text-muted-foreground",
// //         day_disabled: "text-muted-foreground opacity-50",
// //         day_range_middle:
// //           "aria-selected:bg-accent aria-selected:text-accent-foreground",
// //         day_hidden: "invisible",
// //         ...classNames,
// //       }}
// //       components={{
// //         IconLeft: ({ className, ...props }) => (
// //           <ChevronLeft className={cn("size-4", className)} {...props} />
// //         ),
// //         IconRight: ({ className, ...props }) => (
// //           <ChevronRight className={cn("size-4", className)} {...props} />
// //         ),
// //       }}
// //       {...props}
// //     />
// //   )
// // }

// // export { Calendar }



// "use client"

// import * as React from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { DayPicker } from "react-day-picker"

// import { cn } from "@/lib/utils"
// import { buttonVariants } from "@/components/ui/button"

// function Calendar({
//   className,
//   classNames,
//   showOutsideDays = true,
//   ...props
// }: React.ComponentProps<typeof DayPicker>) {
//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       className={cn("p-3", className)}
//       classNames={{
//         months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
//         month: "space-y-4",
//         caption: "flex justify-center pt-1 relative items-center",
//         caption_label: "text-sm font-medium",
//         nav: "space-x-1 flex items-center",
//         nav_button: cn(
//           buttonVariants({ variant: "outline" }),
//           "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
//         ),
//         nav_button_previous: "absolute left-1",
//         nav_button_next: "absolute right-1",
//         table: "w-full border-collapse space-y-1",
//         head_row: "flex",
//         head_cell:
//           "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] flex items-center justify-center",
//         row: "flex w-full mt-2",
//         cell: cn(
//           "h-9 w-9 relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
//           props.mode === "range"
//             ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
//             : "[&:has([aria-selected])]:rounded-md"
//         ),
//         day: cn(
//           buttonVariants({ variant: "ghost" }),
//           "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
//         ),
//         day_range_start:
//           "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
//         day_range_end:
//           "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
//         day_selected:
//           "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
//         day_today: "bg-accent text-accent-foreground",
//         day_outside:
//           "day-outside text-muted-foreground aria-selected:text-muted-foreground",
//         day_disabled: "text-muted-foreground opacity-50",
//         day_range_middle:
//           "aria-selected:bg-accent aria-selected:text-accent-foreground",
//         day_hidden: "invisible",
//         ...classNames,
//       }}
//       components={{
//         IconLeft: ({ className, ...props }) => (
//           <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
//         ),
//         IconRight: ({ className, ...props }) => (
//           <ChevronRight className={cn("h-4 w-4", className)} {...props} />
//         ),
//       }}
//       {...props}
//     />
//   )
// }

// export { Calendar }







"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button" // Make sure this button is also themed or compatible

export type CalendarProps = React.ComponentProps<typeof DayPicker> // Exporting the type

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) { // Used the exported type
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-slate-800 text-slate-100 rounded-md shadow-lg", className)} // Main calendar background, text, and rounded corners
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-slate-100", // Month/Year label
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }), // Uses your button's outline variant
          "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100",
          "border-slate-600 hover:bg-slate-700 text-slate-300 hover:text-teal-300 focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible:border-teal-500" // Nav button theming
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: // Day headers (Mon, Tue)
          "text-slate-400 rounded-md w-9 font-normal text-[0.8rem] flex items-center justify-center",
        row: "flex w-full mt-2",
        cell: cn( // Base cell styling
          "h-9 w-9 relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-slate-700/60", // Background for cells containing a selected day (light highlight)
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          "[&:has([aria-selected].day-outside)]:bg-slate-700/40", // Outside days when selected
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn( // Default day style
          buttonVariants({ variant: "ghost" }), // Uses your button's ghost variant
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          "text-slate-100 hover:bg-slate-700 hover:text-teal-200 rounded-md focus-visible:ring-1 focus-visible:ring-teal-500"
        ),
        day_range_start: // Start of a selected range
          "day-range-start aria-selected:bg-teal-600 aria-selected:text-teal-50 rounded-l-md",
        day_range_end: // End of a selected range
          "day-range-end aria-selected:bg-teal-600 aria-selected:text-teal-50 rounded-r-md",
        day_selected: // Single selected day
          "bg-teal-600 text-teal-50 hover:bg-teal-500 hover:text-white focus:bg-teal-500 focus:text-white rounded-md shadow-[0_0_0_1.5px_theme(colors.teal.400)]",
        day_today: // Today's date
          "bg-slate-700 text-teal-300 rounded-md font-semibold border border-teal-600/70",
        day_outside: // Dates outside the current month
          "day-outside text-slate-500 opacity-60 aria-selected:text-slate-400 aria-selected:bg-slate-700/30 aria-selected:opacity-70",
        day_disabled: "text-slate-600 opacity-50 cursor-not-allowed",
        day_range_middle: // Days in the middle of a selected range
          "aria-selected:bg-teal-600/30 aria-selected:text-teal-100 rounded-none",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className: iconClassName, ...iconProps }) => ( // Renamed className to avoid conflict
          <ChevronLeft className={cn("h-4 w-4", iconClassName)} {...iconProps} />
        ),
        IconRight: ({ className: iconClassName, ...iconProps }) => ( // Renamed className to avoid conflict
          <ChevronRight className={cn("h-4 w-4", iconClassName)} {...iconProps} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar" // Added display name

export { Calendar }