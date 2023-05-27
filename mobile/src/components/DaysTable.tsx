import { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { api } from "../lib/axios";

import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { Loading } from "./Loading";
import dayjs from "dayjs";

type SummaryProps = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function DaysTable() {
  const datesFromYearStart = generateDatesFromYearBeginning();
  const minimumSummaryDatesSizes = 12 * 7;
  const amountOfDaysToFill =
    minimumSummaryDatesSizes - datesFromYearStart.length;

  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryProps | null>(null);

  async function fetchData() {
    try {
      setLoading(true);

      const response = await api.get("summary");
      setSummary(response.data);
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar o sumario de dias");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {summary && (
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => {
            const dayWithHabits = summary.find((day) => {
              return dayjs(date).isSame(day.date, "day");
            });

            return (
              <HabitDay
                key={date.toISOString()}
                onPress={() => navigate("day", { date: date.toISOString() })}
                date={date}
                amountOfHabits={dayWithHabits?.amount}
                amountCompleted={dayWithHabits?.completed}
              />
            );
          })}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => {
              return (
                <View
                  className="bg-zinc-900 rounded-lg border-2 border-zinc-800 m-1 opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                  key={index}
                />
              );
            })}
        </View>
      )}
    </>
  );
}
