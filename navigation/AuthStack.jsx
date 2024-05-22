import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../components/Auth/OnboardingScreen";
import LoginScreen from "../components/Auth/LoginScreen";
import SignUpScreen from "../components/Auth/SignUpScreen";

const Stack = createNativeStackNavigator();
const AuthStack = () => (
  <Stack.Navigator 
  screenOptions={{
    headerShown: false, // This will hide the header for all screens in this navigator
  }}>
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
  </Stack.Navigator>
);
export default AuthStack