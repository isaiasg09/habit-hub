import { useId } from "react";
import { View } from "react-native";

import { DAY_SIZE } from "../components/HabitDay";
import Animated, { FlipInEasyX } from "react-native-reanimated";

export function WeekDays() {
  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

  return (
    <View className="flex-row mt-6 mb-2">
      {weekDays.map((weekDay) => {
        return (
          <Animated.Text
            entering={FlipInEasyX.duration(1000)}
            key={useId()}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Animated.Text>
        );
      })}
    </View>
  );
}
