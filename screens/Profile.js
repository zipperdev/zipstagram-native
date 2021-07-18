import React from "react";
import { Text, View } from "react-native";
import { light } from "../shared";

export default function Profile() {
    return <View style={{ backgroundColor: light ? "#FFFFFF" : "#000000", flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Someones Profile</Text>
    </View>;
};