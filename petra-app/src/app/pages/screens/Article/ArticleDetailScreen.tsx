import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
/**
 * Home props
 */
export interface ArticleDetailScreenProps {
	navigation: any;
	route: any;
}
/**
 * Home state
 */
export interface ArticleDetailScreenState {}

/**
 * Home
 */
export class ArticleDetailScreen extends React.Component<ArticleDetailScreenProps, ArticleDetailScreenState> {
	constructor(props: ArticleDetailScreenProps) {
		super(props);
		this.state = {};
	}
	/**
	 * Renders Restaurant Detail Screen
	 * @returns
	 */
	render() {
		const { userID } = this.props.route.params;
		return (
			<Layout style={{ flex: 1 }}>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddTagScreen', {
							userID: userID
						});
					}}
				>
					Add Tag
				</Button>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2
	}
});
