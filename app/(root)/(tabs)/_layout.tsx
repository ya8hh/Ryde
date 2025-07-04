import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { View, Image, ImageSourcePropType } from "react-native";
const TabsLayout = () => {
  const TabIcon = ({
    source,
    focused,
  }: {
    source: ImageSourcePropType;
    focused: boolean;
  }) => (
    <View
      className={`flex rounded-full w-12 h-12 flex-row justify-center items-center rounded- ${focused ? "bg-general-300" : ""}`}
    >
      <View
        className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`}
      >
        <Image
          source={source}
          tintColor="white"
          resizeMode="contain"
          className=" w-7 h-7"
        />
      </View>
    </View>
  );
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          paddingBottom: 20, // ios only
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.list} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.chat} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
