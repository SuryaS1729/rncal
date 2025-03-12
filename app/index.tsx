import Calc from "@/components/Calc";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <>
    <Stack.Screen options={{ title: "Calcu" }}/>
    <Calc></Calc>
    </>
  );
}
