import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import colors from "tailwindcss/colors";
import { Feather } from "@expo/vector-icons";

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado",
];

export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />

        <Text className='mt-6 text-white font-extrabold text-3xl'>
          Create habit
        </Text>
        <Text className='mt-6 text-white font-semibold text-base'>
          What's your new habit name?
        </Text>

        <TextInput
          placeholder='Go to gym, sleep 8h, read a book...'
          placeholderTextColor={colors.zinc[500]}
          cursorColor='white'
          className='h-14 pl-4 rounded-lg mt-3 text-lg bg-zinc-800 text-white border-2 border-zinc-700 focus:border-green-600'
        />

        <Text className='font-semibol mt-4 mb-3 text-white text-base'>
          What's the frequency?
        </Text>

        {availableWeekDays.map((weekDay, index) => {
          return (
            <Checkbox
              title={weekDay}
              key={weekDay + index}
              checked={weekDays.includes(index)}
              onPress={() => handleToggleWeekDay(index)}
            />
          );
        })}

        <TouchableOpacity
          className='w-full h-14 flex-row items-center justify-center bg-green-600 rounded-lg mt-6'
          activeOpacity={0.7}
        >
          <Feather name='check' size={20} color={colors.white} />

          <Text className='font-semibold text-base text-white ml-2'>
            Confirm
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
