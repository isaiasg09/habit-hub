import { View, Text, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Loading } from "../components/Loading";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";

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
  const { navigate } = useNavigation();

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");
  const [loading, setLoading] = useState(true);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const [possibleHabits, setPossibleHabits] = useState<
    Array<{
      id: string;
      title: string;
    }>
  >([]);
  const [amountAccomplishedPercentage, setAmountAccomplishedPercentage] =
    useState(0);

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
      setCompletedHabits(response.data.completedHabits);
      setPossibleHabits(response.data.possibleHabits);

      setAmountAccomplishedPercentage(
        response.data.possibleHabits.length > 0
          ? generateProgressPercentage(
              response.data.possibleHabits.length,
              response.data.completedHabits.length
            )
          : 0
      );
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
    let newCompletedHabits;
    if (completedHabits.includes(habitId)) {
      newCompletedHabits = completedHabits.filter((habit) => habit !== habitId);
    } else {
      newCompletedHabits = [...completedHabits, habitId];
    }

    setCompletedHabits(newCompletedHabits);

    setAmountAccomplishedPercentage(
      possibleHabits.length > 0
        ? generateProgressPercentage(
            possibleHabits.length,
            newCompletedHabits.length
          )
        : 0
    );

    await api.patch(`/habits/${habitId}/toggle`);
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

        <ProgressBar progress={amountAccomplishedPercentage} />

        <View className="mt-6">
          {possibleHabits.length > 0 ? (
            possibleHabits.map((habit) => {
              return (
                <Checkbox
                  title={habit.title}
                  checked={completedHabits.includes(habit.id)}
                  key={habit.id}
                  onPress={() => handleToggleHabit(habit.id)}
                  disabled={isDatePast()}
                />
              );
            })
          ) : (
            <Text className="text-white fsont-semibold text-base">
              Ainda não há habitos para esse dia.{" "}
              <Text
                className="text-violet-400 underline ml-3"
                onPress={() => navigate("new")}
              >
                Comece criando um hábito.
              </Text>
            </Text>
          )}

          {isDatePast() && possibleHabits.length > 0 && (
            <Text className="text-white font-semibold text-base mt-6">
              Você não pode alterar os hábitos de um dia que já passou.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
