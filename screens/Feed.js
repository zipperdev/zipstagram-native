import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { gql, useQuery } from "@apollo/client";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { light } from "../shared";

const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            ...PhotoFragment
            user {
                username
                avatar
            }
            caption
            isMine
            comments {
                ...CommentFragment
            }
            createdAt
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`;

export default function Feed({ navigation }) {
    const { data, loading } = useQuery(FEED_QUERY);
    const renderPhoto = ({ item: photo }) => {
        return <View style={{ flex: 1 }}>
            <Text style={{ color: light ? "#000000" : "#FFFFFF" }}>{photo.caption}</Text>
        </View>
    };
    return <ScreenLayout loading={loading}>
        <FlatList data={data?.seeFeed} renderItem={renderPhoto} keyExtractor={photo => "" + photo.id} />
    </ScreenLayout>
};