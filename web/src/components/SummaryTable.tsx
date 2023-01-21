import { useEffect, useId, useState } from "react";
import { HabitDay } from "./HabitDay";
import { generateDatesFromYearBeginning } from "../util/generate-dates-from-year-beginning";
import { api } from "../lib/axios";
import dayjs from "dayjs";

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function SummaryTable() {
  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
  const summaryDate = generateDatesFromYearBeginning();
  const minimunSummaryDateSize = 18 * 7; // 18 weeks
  const amountOfDaysToFill = minimunSummaryDateSize - summaryDate.length;

  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get("summary").then((response) => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className='w-full flex'>
      <div className='grid grid-rows-7 grid-flow-row gap-3'>
        {weekDays.map((weekDay) => {
          return (
            <div
              className='text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center'
              key={useId()}
            >
              {weekDay}
            </div>
          );
        })}
      </div>

      <div className='grid grid-rows-7 grid-flow-col gap-3'>
        {summaryDate.map((date) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, "day");
          });

          return (
            <HabitDay
              key={date.toString()}
              completed={dayInSummary?.completed}
              amount={dayInSummary?.amount}
              date={date}
            />
          );
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => {
            return (
              <div
                className='w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg cursor-not-allowed opacity-40'
                key={index}
              ></div>
            );
          })}
      </div>
    </div>
  );
}
