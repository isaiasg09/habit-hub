import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

import Logo from "../assets/logo.svg";
import Animated, { FadeIn } from "react-native-reanimated";

export function Header() {
  const { navigate } = useNavigation();

  return (
    <Animated.View
      entering={FadeIn.duration(600).delay(100)}
      className="w-full flex-row items-center justify-between"
    >
      <Logo />

      <TouchableOpacity
        className="flex-row h-11 border border-violet-500 px-2 rounded-full items-center justify-center"
        onPress={() => navigate("new")}
      >
        <Feather name="plus" color={colors.violet[500]} size={25} />
      </TouchableOpacity>
    </Animated.View>
  );
}
