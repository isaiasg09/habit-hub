import { View, Text, ScrollView, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Loading } from "../components/Loading";

interface DayParams {
  date: string;
}

interface DayInfoProps {
  possibleHabits: Array<{
    id: string;
    title: string;
  }>;
  completedHabits: string[];
}

export function Day() {
  const route = useRoute();
  const { date } = route.params as DayParams;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const [dayInfo, setDayInfo] = useState<DayInfoProps>();
  const [loading, setLoading] = useState(true);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  function isDatePast() {
    const today = dayjs();
    return parsedDate.isBefore(today, "day");
  }

  async function fetchHabits() {
    try {
      setLoading(true);
      const response = await api.get("day", {
        params: {
          date: date.toString(),
        },
      });

      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro ao carregar os hábitos do dia");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  async function handleToggleHabit(habitId: string) {
    if (completedHabits.includes(habitId)) {
      setCompletedHabits(completedHabits.filter((habit) => habit !== habitId));
    } else {
      setCompletedHabits([...completedHabits, habitId]);
    }

    await api.patch(`/habits/${habitId}/toggle`);

    console.log(completedHabits);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="mt-1 text-white font-extrabold text-4xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={90} />

        <View className="mt-6">
          {dayInfo?.possibleHabits.map((habit) => {
            return (
              <Checkbox
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                key={habit.id}
                onPress={() => handleToggleHabit(habit.id)}
                // disabled={isDatePast()}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
