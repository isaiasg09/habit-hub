import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export function SettingsButton() {
  return (
    <View className='flex justify-center items-center'>
      <TouchableOpacity
        className='rounded-full mt-10'
        style={{ width: 40, height: 40 }}
      >
        <AntDesign name='setting' color={"white"} size={40} />
      </TouchableOpacity>
    </View>
  );
}
