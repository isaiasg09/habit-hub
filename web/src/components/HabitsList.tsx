import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import dayjs from "dayjs";

interface HabitsListProps {
  date: Date;
  onCompletedChanged: (completed: number, amount: number) => void;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export function HabitsList({ date, onCompletedChanged }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  useEffect(() => {
    api
      .get("day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => {
        setHabitsInfo(response.data);
        handleNewHabit(response.data);
      });
  }, []);

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`);

    const isHabitAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });

    onCompletedChanged(
      completedHabits.length,
      habitsInfo!.possibleHabits.length
    );
  }

  // function to delete a habit when the button is clicked
  async function handleDeleteHabit(habitId: string) {
    await api.delete(`/habits/${habitId}`);

    const updatedHabitList = habitsInfo!.possibleHabits.filter(
      (habit) => habit.id !== habitId
    );

    // check if habit was completed to change the progress bar
    const isHabitAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = habitsInfo!.completedHabits;
    }

    setHabitsInfo({
      possibleHabits: updatedHabitList,
      completedHabits: completedHabits,
    });

    onCompletedChanged(
      completedHabits.length,
      habitsInfo!.possibleHabits.length
    );
  }

  function handleNewHabit(habitsInfo: HabitsInfo) {
    const completedHabits = habitsInfo.completedHabits;

    onCompletedChanged(
      completedHabits.length,
      habitsInfo!.possibleHabits.length
    );
  }

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  return (
    <div className="mt-5 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
          <div
            className="flex items-center justify-between gap-3 group focus:outline-none disabled:cursor-not-allowed disabled:brightness-50"
            key={habit.id}
          >
            <Checkbox.Root
              className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed disabled:brightness-50"
              key={habit.id}
              disabled={isDateInPast}
              checked={habitsInfo.completedHabits.includes(habit.id)}
              onCheckedChange={() => handleToggleHabit(habit.id)}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-all  group-focus:ring-2 group-focus:ring-blue-700 group-focus:ring-offset-darkbg">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="text-white font-semibold text-xl leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                {habit.title}
              </span>
            </Checkbox.Root>

            <button
              className="text-3xl hover:scale-125 hover:text-red-600 transform transition-all focus:outline-none disabled:cursor-not-allowed disabled:brightness-50"
              onClick={() => handleDeleteHabit(habit.id)}
              disabled={isDateInPast}
            >
              -
            </button>
          </div>
        );
      })}
    </div>
  );
}
