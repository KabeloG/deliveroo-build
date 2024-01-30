import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurant/restaurantSlice";

const PreparingScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 5000);
  }, []);

  return (
    <SafeAreaView
      className="bg-[#00CCBB] flex-1 items-center 
    justify-center"
    >
      <Animatable.Image
        source={require("../assets/acceptingOrder.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-[17px] my-10 text-white font-bold text-center"
      >
        Waiting for {restaurant.title} to accept your order!
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingScreen;
