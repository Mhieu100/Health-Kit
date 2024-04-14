import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppStack from "./AppStack";
import BloodPressure from "../components/Page/BloodPressure"
import BloodSugar from "../components/Page/BloodSugar";
import BMI from "../components/Page/BMI";
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AppStack"
        component={AppStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="BloodPressure" component={BloodPressure} />
      <Stack.Screen name="BloodSugar" component={BloodSugar} />
      <Stack.Screen name="BMI" component={BMI} />
    </Stack.Navigator>
  );
};
export default MainStack;
