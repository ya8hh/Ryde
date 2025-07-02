import { icons, images } from "@/constants";
import {
  Text,
  ScrollView,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };
  const onPressVerify = async () => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (completeSignUp.status === "complete") {
        // create a database user
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className="flex-1 bg-white">
          <View className="flex-1 bg-white">
            <View className="relative w-full h-[250px]">
              <Image
                source={images.signUpCar}
                className="z-0 w-full h-[250px]"
              />
              <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                Create Your Account
              </Text>
            </View>
            <View className="p-5">
              <InputField
                label="Name"
                placeholder="Enter Your Name"
                icon={icons.person}
                value={form.name}
                onChangeText={(value: string) =>
                  setForm({ ...form, name: value })
                }
              />
              <InputField
                label="Email"
                placeholder="Enter Your Email"
                icon={icons.email}
                value={form.email}
                onChangeText={(value: string) =>
                  setForm({ ...form, email: value })
                }
              />
              <InputField
                label="Password"
                placeholder="Enter Your Password"
                icon={icons.lock}
                value={form.password}
                secureTextEntry={true}
                onChangeText={(value: string) =>
                  setForm({ ...form, password: value })
                }
              />

              <CustomButton
                title="Sign up"
                onPress={onSignUpPress}
                className="mt-6"
              />
              {/* 0Auth for google sign in  */}
              <OAuth />
              <Link
                href="/(auth)/sign-in"
                className="mt-10 text-lg text-center text-general-200 "
              >
                <Text>Already have an account?</Text>
                <Text className="text-primary-500 ml-2">Login</Text>
              </Link>
            </View>
            {/* verification modal  */}
            <ReactNativeModal
              onModalHide={() => {
                if (verification.state === "success") setShowSuccessModal(true);
              }}
              isVisible={verification.state === "pending"}
            >
              <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                <Text className="text-2xl font-JakartaExtraBold mb-2">
                  Verification
                </Text>
                <Text className="font-Jakarta mb-5">
                  We ve sent a verification code to {form.email}
                </Text>
                <InputField
                  label="Code"
                  icon={icons.lock}
                  value={verification.code}
                  keyboardType="numeric"
                  placeholder="12345"
                  onChangeText={(code) =>
                    setVerification({ ...verification, code })
                  }
                />
                {verification.error && (
                  <Text className="text-red-500 text-sm mt-1">
                    {verification.error}
                  </Text>
                )}
                <CustomButton
                  className="mt-5 bg-success-500"
                  title="Verify Email"
                  onPress={onPressVerify}
                />
              </View>
            </ReactNativeModal>
            {/* this below modal shows when verification is done through email */}
            <ReactNativeModal isVisible={showSuccessModal}>
              <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                <Image
                  source={images.check}
                  className="w-[110px ] h-[110px ] mx-auto my-5"
                />
                <Text className="text-3xl font-JakartaBold text-center">
                  Verified
                </Text>
                <Text className="text-base text-gray font-Jakarta text-center mt-2">
                  You have successfully verified your account
                </Text>
                <CustomButton
                  className="mt-5"
                  title="Browse Home"
                  onPress={() => {
                    setShowSuccessModal(false);
                    router.push("/(root)/(tabs)/home");
                  }}
                />
              </View>
            </ReactNativeModal>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
