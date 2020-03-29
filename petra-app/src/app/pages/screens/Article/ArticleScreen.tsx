import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { useIsFocused } from '@react-navigation/native';
declare var global: any;
/**
 * Home props
 */
export interface ArticleProps {
	navigation: any;
	route: any;
}

/**
 * Home
 */
const ArticleScreen: React.FC<ArticleProps> = props => {
	const [userID, setUserID] = React.useState(-1);
	React.useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', () => {
			if (userID != global.userID && global.userID != undefined) {
				setUserID(global.userID);
			}
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount
		return unsubscribe;
	}, [props.navigation]);
	if (userID == -1) {
		return (
			<Layout style={{ flex: 1 }}>
				<Text>Unregistered Page</Text>
			</Layout>
		);
	} else {
		return (
			<Layout style={{ flex: 1 }}>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<Text>Article ile ilgili şeyler</Text>
				</ScrollView>
			</Layout>
		);
	}
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2
	}
});
export default ArticleScreen;