import { View } from "react-native";

import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

export function DaysTable() {
  const datesFromYearStart = generateDatesFromYearBeginning();
  const minimumSummaryDatesSizes = 12 * 7;
  const amountOfDaysToFill =
    minimumSummaryDatesSizes - datesFromYearStart.length;

  return (
    <View className='flex-row flex-wrap'>
      {datesFromYearStart.map((date) => {
        return <HabitDay key={date.toISOString()} />;
      })}

      {amountOfDaysToFill > 0 &&
        Array.from({ length: amountOfDaysToFill }).map((_, index) => {
          return (
            <View
              className='bg-zinc-900 rounded-lg border-2 border-zinc-800 m-1 opacity-40'
              style={{ width: DAY_SIZE, height: DAY_SIZE }}
              key={index}
            />
          );
        })}
    </View>
  );
}
