import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CalendarProps {
  values: { date: string; count: number }[];
}

const panelColors = [
  "#f5f3ff", // Level 0 - Lightest purple
  "#c4b5fd",
  "#a78bfa",
  "#8b5cf6",
  "#7c3aed", // Level 6 - Darkest purple
];

export function GitHubCalendar({ values = [] }: CalendarProps) {
  const getColor = (count: number) => {
    if (count === 0) return panelColors[0];
    if (count <= 3) return panelColors[1];
    if (count <= 6) return panelColors[2];
    if (count <= 9) return panelColors[3];
    return panelColors[4];
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const days = ["Mon", "", "Wed", "", "Fri", "", ""];

  // Generate dates for the entire year
  const generateYearDates = () => {
    const year = new Date().getFullYear();
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    const dates = [];

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split("T")[0];
      const existingValue = values.find((v) => v.date === dateString);
      dates.push({
        date: dateString,
        count: existingValue ? existingValue.count : 0,
      });
    }

    return dates;
  };

  const yearDates = generateYearDates();

  // Calculate the number of weeks
  const weeksCount = Math.ceil(yearDates.length / 7);

  return (
    <ScrollArea className="w-full overflow-x-scroll">
      <div className="">
        <div className="flex mb-2 text-xs text-gray-500">
          <div className="w-8" /> {/* Spacer for day labels */}
          {months.map((month, index) => (
            <div
              key={month}
              style={{ width: `${(100 / 12) * (index === 11 ? 1 : 1)}%` }}
              className="text-start"
            >
              {month}
            </div>
          ))}
        </div>
        <div className="flex ">
          <div className="flex flex-col mr-2 text-xs text-gray-500 items-start justify-around h-[116px]">
            {days.map((day, index) => (
              <div key={index} className="h-3 leading-3">
                {day}
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            {Array.from({ length: weeksCount }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {yearDates
                  .slice(weekIndex * 7, (weekIndex + 1) * 7)
                  .map((value, dayIndex) => (
                    <div
                      key={value.date}
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: getColor(value.count) }}
                      title={`${value.date}: ${value.count} contributions`}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
