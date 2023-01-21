import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgressBar";
import clsx from "clsx";
import { Check, X } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";

interface HabitDayProps {
  completed?: number;
  amount?: number;
  date: Date;
}

export function HabitDay({ completed = 0, amount = 0, date }: HabitDayProps) {
  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayOfWeek = dayjs(date).format("dddd");
  const dayAndMonth = dayjs(date).format("DD/MM");

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
          {/* <Popover.Arrow height={8} width={16} className="fill-zinc-900"/> */}

          <div className='flex items-start justify-between'>
            <div className='flex flex-col'>
              <span className='font-semibold text-zinc-400 lowercase'>
                {dayOfWeek}
              </span>
              <span className='mt-1 font-bold leading-tight text-3xl'>
                {dayAndMonth}
              </span>
            </div>

            <Popover.Close className='rounded-2xl text-zinc-400 transition-all hover:text-zinc-200'>
              <X size={24} aria-label='Close' />
            </Popover.Close>
          </div>

          <ProgressBar progress={completedPercentage} />

          <div className='mt-5 flex flex-col gap-3'>
            <Checkbox.Root className='flex items-center gap-3 group'>
              <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
                <Checkbox.Indicator>
                  <Check size={20} className='text-white' />
                </Checkbox.Indicator>
              </div>

              <span className='text-white font-semibold text-xl leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                Accept terms and conditions.
              </span>
            </Checkbox.Root>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
