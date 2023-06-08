import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Animated, { FadeIn, SlideInLeft } from "react-native-reanimated";
import colors from "tailwindcss/colors";
import { Feather } from "@expo/vector-icons";

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [title, setTitle] = useState("");

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  async function handleCreateNewhabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        return Alert.alert(
          "Novo hábito - Erro",
          "Informe o nome do habito e a recorrência"
        );
      }

      await api.post("/habits", { title, weekDays });

      setTitle("");
      setWeekDays([]);

      Alert.alert("Novo hábito", "Novo hábito criado com sucesso!");
    } catch (error) {
      Alert.alert("Ops", "Não foi possivel criar o novo hábito!");
      console.log(error);
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />

        <Animated.Text
          entering={SlideInLeft.duration(800)}
          className="mt-6 text-white font-extrabold text-3xl"
        >
          Criar hábito
        </Animated.Text>
        <Animated.Text
          entering={SlideInLeft.duration(700).delay(200)}
          className="mt-6 text-white font-semibold text-base"
        >
          Qual o seu novo comprometimento?
        </Animated.Text>

        <Animated.View entering={SlideInLeft.duration(500).delay(250)}>
          <TextInput
            placeholder="Go to gym, sleep 8h, read a book..."
            placeholderTextColor={colors.zinc[500]}
            cursorColor="white"
            className="h-14 pl-4 rounded-lg mt-3 text-lg bg-zinc-800 text-white border-2 border-zinc-700 focus:border-green-600"
            onChangeText={setTitle}
            value={title}
          />
        </Animated.View>

        <Animated.Text
          entering={FadeIn.duration(400).delay(300)}
          className="font-semibol mt-4 mb-3 text-white text-base"
        >
          Qual a recorrência?
        </Animated.Text>

        <Animated.View entering={FadeIn.duration(500).delay(400)}>
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
        </Animated.View>

        <Animated.View entering={FadeIn.duration(900).delay(500)}>
          <TouchableOpacity
            className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-lg mt-6"
            activeOpacity={0.7}
            onPress={handleCreateNewhabit}
          >
            <Feather name="check" size={20} color={colors.white} />

            <Text className="font-semibold text-base text-white ml-2">
              Confirmar
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
