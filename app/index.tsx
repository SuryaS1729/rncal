import Calc from "@/components/Calc";
import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import { Colors } from "@/utils/Colors";

export default function Index() {
  return (
    <>
      <StatusBar backgroundColor={Colors.gray} barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }}/>
      <Calc></Calc>
    </>
  );
}
