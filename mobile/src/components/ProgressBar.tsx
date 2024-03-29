import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  LightSpeedInLeft,
} from "react-native-reanimated";
import { View } from "react-native";
import { useEffect } from "react";

interface ProgressBarProps {
  progress?: number;
}

export function ProgressBar({ progress = 0 }) {
  const sharedProgress = useSharedValue(progress);

  useEffect(() => {
    sharedProgress.value = withTiming(progress, config);
  }, [progress]);

  const config = {
    duration: 300,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    };
  });

  return (
    <Animated.View
      entering={LightSpeedInLeft.duration(500)}
      className="w-full h-3 rounded-xl bg-zinc-700 mt-4"
    >
      <Animated.View
        className="h-3 rounded-xl bg-violet-600 transition-all duration-200"
        entering={LightSpeedInLeft.duration(700).delay(300)}
        style={style}
      />
    </Animated.View>
  );
}
