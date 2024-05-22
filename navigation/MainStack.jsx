import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppStack from "./AppStack";
import BloodPressure from "../components/Page/BloodPressure"
import BloodSugar from "../components/Page/BloodSugar";
import BMI from "../components/Page/BMI";
import EditProfile from "../components/Page/EditProfile";
import DetailPost from "../components/Page/DetailPost";
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false, // This will hide the header for all screens in this navigator
    }}>
      <Stack.Screen
        name="AppStack"
        component={AppStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="BloodPressure" component={BloodPressure} />
      <Stack.Screen name="BloodSugar" component={BloodSugar} />
      <Stack.Screen name="BMI" component={BMI} />
      <Stack.Screen name="Edit Profile" component={EditProfile} />
      <Stack.Screen name="Detail Post" component={DetailPost}/>
    </Stack.Navigator>
  );
};
export default MainStack;
