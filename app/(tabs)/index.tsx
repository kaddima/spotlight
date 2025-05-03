import styles from "@/styles/auth.styles";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Link href={"/(tabs)/notifications"}>Notifications</Link>
      <Link href={"/(tabs)/profile"}>Profile</Link>
      <Link href={"/"}>Feed</Link>
    </View>
  );
}

