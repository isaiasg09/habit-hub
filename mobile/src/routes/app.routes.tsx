import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from "../screens/Home";
import { Day } from "../screens/Day";
import { New } from "../screens/New";

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='home' component={Home} />
      <Screen name='day' component={Day} />
      <Screen name='new' component={New} />
    </Navigator>
  );
}
