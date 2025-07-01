import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  return (
    <SafeAreaView>
      <Link href="/(auth)/welcome"> home</Link>
    </SafeAreaView>
  );
};

export default SignUp;
