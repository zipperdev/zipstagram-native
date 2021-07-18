import React from "react";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";

function TabIcon({ iconName, color, focused, type }) {
    return <Ionicons 
        name={focused ? iconName : `${iconName}-outline`} 
        color={color} 
        size={type === "big" ? 26 : type === "small" ? 22 : 22} 
    />;
};

TabIcon.propTypes = {
    iconName: PropTypes.string.isRequired, 
    color: PropTypes.string.isRequired, 
    focused: PropTypes.bool.isRequired, 
    type: PropTypes.string, 
};

export default TabIcon;