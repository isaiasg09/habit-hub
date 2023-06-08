import {
  TouchableOpacity,
  View,
  TouchableOpacityProps,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, { SlideInLeft, ZoomOut } from "react-native-reanimated";
import colors from "tailwindcss/colors";
import clsx from "clsx";

interface CheckboxProps extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

export function Checkbox({
  checked = false,
  title,
  disabled,
  ...rest
}: CheckboxProps) {
  return (
    <TouchableOpacity
      className="flex-row mb-2 items-center"
      {...rest}
      disabled={disabled}
    >
      {checked ? (
        <Animated.View
          entering={SlideInLeft}
          exiting={ZoomOut}
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-zinc-800 rounded-lg border-2 border-zinc-700"></View>
      )}

      <Text
        className={clsx("text-white text-base ml-3", {
          "text-zinc-600": disabled,
        })}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
