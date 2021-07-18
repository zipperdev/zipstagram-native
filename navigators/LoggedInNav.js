import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavFactory from "./StackNavFactory";
import TabIcon from "../components/nav/TabIcon";
import { light } from "../shared";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
    return <Tabs.Navigator tabBarOptions={{
        activeTintColor: light ? "#262626" : "#FFFFFF", 
        inactiveTintColor: light ? "#B3B3B3" : "#AAAAAA", 
        showLabel: false, 
        style: {
            elevation: 0, 
            shadowOpacity: 0, 
            borderBottomColor: light ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)", 
            backgroundColor: light ? "#FFFFFF" : "#000000"
        }
    }}>
        <Tabs.Screen name="Feed" options={{
            tabBarIcon: ({ focused, color }) => <TabIcon iconName={"home"} color={color} focused={focused} />
        }}>
            {() => <StackNavFactory screenName="Feed" />}
        </Tabs.Screen>
        <Tabs.Screen name="Search" options={{
            tabBarIcon: ({ focused, color }) => <TabIcon iconName={"search"} color={color} focused={focused} />
        }}>
            {() => <StackNavFactory screenName="Search" />}
        </Tabs.Screen>
        <Tabs.Screen name="Camera" component={View} options={{
            tabBarIcon: ({ focused, color }) => <TabIcon iconName={"add-circle"} color={color} focused={focused} type={"big"} />
        }} />
        <Tabs.Screen name="Notifications" options={{
            tabBarIcon: ({ focused, color }) => <TabIcon iconName={"heart"} color={color} focused={focused} />
        }}>
            {() => <StackNavFactory screenName="Notifications" />}
        </Tabs.Screen>
        <Tabs.Screen name="Me" options={{
            tabBarIcon: ({ focused, color }) => <TabIcon iconName={"person"} color={color} focused={focused} />
        }}>
            {() => <StackNavFactory screenName="Me" />}
        </Tabs.Screen>
    </Tabs.Navigator>
};