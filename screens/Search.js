import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { light } from "../shared";

export default function Search({ navigation }) {
    return <View style={{ backgroundColor: light ? "#FFFFFF" : "#000000", flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
            <Text style={{ color: light ? "#000000" : "#FFFFFF" }}>Photo</Text>
        </TouchableOpacity>
    </View>;
};