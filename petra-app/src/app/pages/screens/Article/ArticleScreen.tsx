import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Text, Icon, ButtonGroup } from '@ui-kitten/components';
import { useIsFocused } from '@react-navigation/native';
import GetUserArticleList from '../../../components/Article/GetUserArticleList';

declare var global: any;

export interface ArticleProps {
	navigation: any;
	route: any;
}

const ArticleScreen: React.FC<ArticleProps> = (props) => {
	const [userID, setUserID] = React.useState(-1);
	const accessoryItemIcon = (style) => <Icon {...style} name="plus-circle-outline" />;
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
				<ButtonGroup style={{ justifyContent: 'center' }}>
					<Button
						icon={accessoryItemIcon}
						appearance="ghost"
						onPress={() => {
							props.navigation.navigate('AddArticleScreen', {
								userID: userID,
							});
						}}
					>
						Add Article
					</Button>
					<Button
						icon={accessoryItemIcon}
						onPress={() => {
							props.navigation.navigate('AddTagScreen', {
								userID: userID,
							});
						}}
					>
						Add Tag
					</Button>
				</ButtonGroup>

				<GetUserArticleList navigation={props.navigation} route={props.route} />
			</Layout>
		);
	}
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2,
	},
});
export default ArticleScreen;
