import { View, Text } from "react-native";
import { Link } from "expo-router";
import React from "react";

export default function NotFound() {
  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Text style={{ fontSize: 24, marginBottom: 12 }}>
          404 - Page Not Found
        </Text>
        <Link href="/" style={{ color: "blue", fontSize: 18 }}>
          Go back home
        </Link>
      </View>
    </>
  );
}
