import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgressBar";
import clsx from "clsx";
import { X } from "phosphor-react";

interface HabitDayProps {
  completed: number;
  amount: number;
}

export function HabitDay({ completed, amount }: HabitDayProps) {
  const completedPercentage = Math.round((completed / amount) * 100);

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10 border-2 rounded-lg transition-all hover:brightness-150 active:scale-90",
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
          }
        )}
      />

      <Popover.Portal>
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 text-white flex flex-col animate-[scaleUp_.2s_ease-in-out]'>
          <div className='flex items-start justify-between'>
            <div className='flex flex-col'>
              <span className='font-semibold text-zinc-400'>sexta-feira</span>
              <span className='mt-1 font-bold leading-tight text-3xl'>
                20/01
              </span>
            </div>

            <Popover.Close className='rounded-2xl text-zinc-400 transition-all hover:text-zinc-200'>
              <X size={24} aria-label='Close' />
            </Popover.Close>
          </div>

          <ProgressBar progress={completedPercentage} />

          {/* <Popover.Arrow height={8} width={16} className="fill-zinc-900"/> */}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
