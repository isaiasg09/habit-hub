import dayjs from "dayjs";
import {
  TouchableOpacity,
  Dimensions,
  TouchableOpacityProps,
  Text,
} from "react-native";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface HabitDayProps extends TouchableOpacityProps {
  date: Date;
}

export function HabitDay({ date, ...rest }: HabitDayProps) {
  const today = dayjs().startOf("day").toDate();

  const isDateToday = date.getTime() === today.getTime();


  return (
    <TouchableOpacity
      className={`bg-zinc-900 rounded-lg border-2  m-1 ${isDateToday ? 'border-zinc-400' : 'border-zinc-800'} `}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.5}
      {...rest}
    >
    </TouchableOpacity>
  );
}
