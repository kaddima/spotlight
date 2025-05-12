import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/contants/theme";
import { feedStyles as fs } from "@/styles/feed.styles";

export default function Index() {
	const { signOut } = useAuth();

	return (
		<View style={fs.container}>
			<SignedIn>
				<View style={fs.header}>
					<Text style={fs.headerTitle}>Spotlight</Text>
					<TouchableOpacity onPress={() => signOut()}>
						<Ionicons name="log-out-outline" size={24} color={COLORS.grey} />
					</TouchableOpacity>
				</View>
			</SignedIn>
			<SignedOut>
				<Link href={"/(auth)/sign-in"}>
					<Text>Sign in</Text>
				</Link>
				<Link href={"/(auth)/sign-up"}>
					<Text>Sign up</Text>
				</Link>
			</SignedOut>
		</View>
	);
}
