import { icons } from "@/constants";
import { Ride } from "@/types/type";
import { Text, View, Image } from "react-native";

const RideCard = ({
  ride: {
    destination_longitude,
    destination_latitude,
    origin_address,
    destination_address,
    created_at,
    ride_time,
    driver,
    payment_status,
  },
}: {
  ride: Ride;
}) => {
  return (
    <View className="flex flex-row items-center justify-centerbg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-row items-center jsutify-between p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />

          <View className=" flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2 ">
              <Image source={icons.to} className="w-5 h-5" />
              <Text numberOfLines={1} className="text-md font-JakartaMedium">
                {origin_address}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-2 ">
              <Image source={icons.point} className="w-5 h-5" />
              <Text numberOfLines={1} className="text-md font-JakartaMedium">
                {destination_address}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;
