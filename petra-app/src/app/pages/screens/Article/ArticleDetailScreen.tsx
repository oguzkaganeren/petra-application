import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';

export interface ArticleDetailScreenProps {
	navigation: any;
	route: any;
}
const ArticleDetailScreen: React.FC<ArticleDetailScreenProps> = props => {
	const { userID } = props.route.params;
	return (
		<Layout style={{ flex: 1 }}>
			<Button
				onPress={() => {
					props.navigation.navigate('AddTagScreen', {
						userID: userID
					});
				}}
			>
				Add Tag
			</Button>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2
	}
});
export default ArticleDetailScreen;
