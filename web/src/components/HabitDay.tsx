import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgressBar";
import clsx from "clsx";
import { X } from "phosphor-react";
import dayjs from "dayjs";
import { HabitsList } from "./HabitsList";
import { useState } from "react";

interface HabitDayProps {
  defaultCompleted?: number;
  amount?: number;
  date: Date;
}

export function HabitDay({
  defaultCompleted = 0,
  amount = 0,
  date,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted);
  const [completedPercentage, setCompletedPercentage] = useState(
    amount > 0 ? Math.round((completed / amount) * 100) : 0
  );

  const dayOfWeek = dayjs(date).format("dddd");
  const dayAndMonth = dayjs(date).format("DD/MM");

  function handleCompletedChanged(completed: number, amount: number) {
    setCompletedPercentage(
      amount > 0 ? Math.round((completed / amount) * 100) : 0
    );
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10 border-2 rounded-lg transition-all hover:brightness-150 active:scale-90 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-darkbg",
          {
            "bg-zinc-900 border-zinc-800": completedPercentage === 0,
            "bg-blue-900 border-blue-700":
              completedPercentage > 0 && completedPercentage < 20,
            "bg-blue-800 border-blue-600":
              completedPercentage >= 20 && completedPercentage < 40,
            "bg-blue-700 border-blue-500":
              completedPercentage >= 40 && completedPercentage < 60,
            "bg-blue-600 border-blue-500":
              completedPercentage >= 60 && completedPercentage < 80,
            "bg-blue-500 border-blue-400": completedPercentage >= 80,
            "border-zinc-300": date.toDateString() == new Date().toDateString(),
          }
        )}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 text-white flex flex-col animate-[scaleUp_.2s_ease-in-out]">
          {/* <Popover.Arrow height={8} width={16} className="fill-zinc-900"/> */}

          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-semibold text-zinc-400 lowercase">
                {dayOfWeek}
              </span>
              <span className="mt-1 font-bold leading-tight text-3xl">
                {dayAndMonth}
              </span>
            </div>

            <Popover.Close className="rounded-2xl text-zinc-400 transition-all hover:text-zinc-200">
              <X size={24} aria-label="Close" />
            </Popover.Close>
          </div>

          <ProgressBar progress={completedPercentage} />

          <HabitsList date={date} onCompletedChanged={handleCompletedChanged} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
