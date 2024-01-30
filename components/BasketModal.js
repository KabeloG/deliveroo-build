import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures-plus";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurant/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basket/basketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";

const BasketModal = ({ openModal, setOpenModal }) => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  const deliveryFee = 5.99;

  return (
    <GestureRecognizer
      style={{ flex: 1 }}
      onSwipeDown={() => setOpenModal(false)}
    >
      <Modal visible={openModal} animationType="slide" transparent>
        <View className="bg-gray-100 h-full rounded-t-3xl mt-3">
          <View className="w-12 bg-gray-400 h-1 mx-auto rounded-lg mt-5" />

          <View className="border-b border-[#00CCBB] bg-white shadow-sm mt-5 py-5">
            <View>
              <Text className="text-center font-bold text-lg">Basket</Text>
              <Text className="text-center text-gray-400">
                {restaurant.title}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center bg-white px-4 py-3 my-5 space-x-4 shadow-2xl">
            <Image
              source={{
                uri: "https://links.papareact.com/wru",
              }}
              className="h-7 w-7 bg-gray-300 rounded-full p-4"
            />
            <Text className="flex-1">Deliver in 50-75 min</Text>

            <TouchableOpacity>
              <Text className="text-[#00CCBB]">Change</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="divide-y divide-gray-200">
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <View
                key={key}
                className="flex-row items-center space-x-3 bg-white py-2 px-5"
              >
                <Text className="text-[#00CCBB]">{items.length} x</Text>
                <Image
                  source={{ uri: urlFor(items[0]?.image).url() }}
                  className="h-12 w-12 rounded-full"
                />

                <Text className="flex-1">{items[0]?.name}</Text>

                <Text className="text-gray-600">
                  R{items[0]?.price.toFixed(2)}
                </Text>

                <TouchableOpacity
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  <Text className="text-[#00CCBB] text-xs">Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View className="p-5 bg-white space-y-4">
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Subtotal</Text>
              <Text className="text-gray-400">R{basketTotal.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-400">Delivery Fee</Text>
              <Text className="text-gray-400">R{deliveryFee}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text>Order Total</Text>
              <Text className="font-extrabold">
                R{(basketTotal + deliveryFee).toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              className="bg-[#00CCBB] rounded-lg p-4"
              onPress={() => navigation.navigate("Preparing")}
            >
              <Text className="text-white text-center text-lg font-bold">
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GestureRecognizer>
  );
};

export default BasketModal;
