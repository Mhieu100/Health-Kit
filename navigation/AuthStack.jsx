import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../components/Auth/OnboardingScreen";
import LoginScreen from "../components/Auth/LoginScreen";
import SignUpScreen from "../components/Auth/SignUpScreen";
import FaceId from "../components/Face_ID/Login";
import FaceId_SignUp from "../components/Face_ID/Register";

const Stack = createNativeStackNavigator();
const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, // This will hide the header for all screens in this navigator
    }}
  >
    <Stack.Screen
      name="Onboarding"
      component={OnboardingScreen}
      options={{ title: "Welcome" }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ title: "Login" }}
    />
    <Stack.Screen
      name="Register"
      component={SignUpScreen}
      options={{ title: "Register" }}
    />

    <Stack.Screen
      name="FaceId"
      component={FaceId}
      options={{ title: "FaceId" }}
    />
    <Stack.Screen
      name="FaceId_SignUp"
      component={FaceId_SignUp}
      options={{ title: "FaceId_SignUp" }}
    />
  </Stack.Navigator>
);
export default AuthStack