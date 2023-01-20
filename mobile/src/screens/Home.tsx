import { View, ScrollView } from "react-native";

import { Header } from "../components/Header";
import { DaysTable } from "../components/DaysTable";
import { SettingsButton } from "../components/SettingsButton";
import { WeekDays } from "../components/WeekDays";

export function Home() {
  return (
    <View className='flex-1 bg-background px-8 pt-16 text-white'>
      <Header />

      <WeekDays />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <DaysTable />

        {/* <SettingsButton /> */}
      </ScrollView>
    </View>
  );
}
