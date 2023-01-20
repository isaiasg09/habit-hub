import { View, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";

interface DayParams {
  date: string;
}

export function Day() {
  const route = useRoute();
  const { date } = route.params as DayParams;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />

        <Text className='mt-6 text-zinc-400 font-semibold text-base lowercase'>
          {dayOfWeek}
        </Text>

        <Text className='mt-1 text-white font-extrabold text-4xl'>
          {dayAndMonth}
        </Text>

        <ProgressBar progress={90} />

        <View className='mt-6'>
          <Checkbox title="Drink water" checked={false} />
          <Checkbox title="Walk" checked={true} />
        </View>
      </ScrollView>
    </View>
  );
}
