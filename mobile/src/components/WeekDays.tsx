import { useId } from "react";
import { View, Text } from "react-native";

import { DAY_SIZE } from "../components/HabitDay";

export function WeekDays() {
  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

  return (
    <View className='flex-row mt-6 mb-2'>
      {weekDays.map((weekDay) => {
        return (
          <Text
            key={useId()}
            className='text-zinc-400 text-xl font-bold text-center mx-1'
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        );
      })}
    </View>
  );
}
