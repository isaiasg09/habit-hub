import {
  TouchableOpacity,
  View,
  TouchableOpacityProps,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

interface CheckboxProps extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

export function Checkbox({ checked = false, title, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity className='flex-row mb-2 items-center' {...rest}>
      {checked ? (
        <View className='h-8 w-8 bg-green-500 rounded-lg items-center justify-center'>
          <Feather name='check' size={20} color={colors.white} />
        </View>
      ) : (
        <View className='h-8 w-8 bg-zinc-800 rounded-lg border-2 border-zinc-700'></View>
      )}

      <Text className='text-white text-base ml-3'>{title}</Text>
    </TouchableOpacity>
  );
}
