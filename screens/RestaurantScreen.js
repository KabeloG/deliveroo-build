import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import {
  StarIcon,
  MapPinIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotal,
} from "../features/basket/basketSlice";
import { setRestaurant } from "../features/restaurant/restaurantSlice";
import BasketModal from "../components/BasketModal";

const RestaurantScreen = () => {
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  return (
    <>
      <ScrollView>
        <StatusBar translucent />
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="w-full h-56 bg-gray-300 p-4"
          />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-12 left-3 bg-gray-100 
        p-2 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">{rating}</Text>

                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500"> · </Text> {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" opacity={0.4} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-gray-500">Nearby</Text> · {address}
                </Text>
              </View>
            </View>

            <Text className="text-[13px] text-gray-500 mt-2 pb-4">
              {short_description}
            </Text>
          </View>

          <TouchableOpacity
            className="flex-row items-center space-x-2 p-4
        border-y border-gray-200"
          >
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
            <Text className="pl-2 flex-1 text-[14px] font-bold">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>

          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>

      {items.length > 0 && (
        <View className="absolute bottom-10 w-full z-20">
          <TouchableOpacity
            className="flex-row mx-5 p-4 bg-[#00CDBD]
      rounded-lg items-center space-x-1"
            onPress={() => setOpenModal(true)}
          >
            <Text
              className="text-white font-extrabold text-lg
        bg-[#01A296] py-1 px-2 rounded-md"
            >
              {items.length}
            </Text>
            <Text
              className="flex-1 text-white text-center font-extrabold
        text-lg"
            >
              View Basket
            </Text>

            <Text className="text-lg text-white font-extrabold">
              R{basketTotal.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {openModal && (
        <BasketModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  );
};

export default RestaurantScreen;
