import React from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";
import { createStackNavigator } from "@react-navigation/stack";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";
import Profile from "../screens/Profile";
import Photo from "../screens/Photo";
import { light } from "../shared";

const Stack = createStackNavigator();

function StackNavFactory({ screenName }) {
    return <Stack.Navigator headerMode="screen" screenOptions={{
        headerBackTitleVisible: false, 
        headerTintColor: light ? "#000000" : "#FFFFFF", 
        headerStyle: {
            elevation: 1, 
            shadowColor: light ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)", 
            backgroundColor: light ? "#FFFFFF" : "#000000"
        }
    }}>
        {screenName === "Feed" ? (
            <Stack.Screen name={"Feed"} component={Feed} options={{
                headerTitle: () => <Image resizeMode="contain" style={{
                    maxWidth: "34%", 
                    alignSelf: "center"
                }} source={light ? require("../assets/logo_dark.png") : require("../assets/logo_light.png")} />
            }} />
        ) : null}
        {screenName === "Search" ? (
            <Stack.Screen name={"Search"} component={Search} />
        ) : null}
        {screenName === "Notifications" ? (
            <Stack.Screen name={"Notifications"} component={Notifications} />
        ) : null}
        {screenName === "Me" ? (
            <Stack.Screen name={"Me"} component={Me} />
        ) : null}
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Photo" component={Photo} />
    </Stack.Navigator>;
};

StackNavFactory.propTypes = {
    screenName: PropTypes.string
};

export default StackNavFactory;