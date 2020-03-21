import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { BottomComponent } from '../../../components/Public/BottomComponent';
/**
 * Home props
 */
export interface ArticleDetailScreenProps {
	navigation: any;
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
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
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
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddArticleScreen', {
							userID: userID
						});
					}}
				>
					Add Article
				</Button>

				<Layout style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
					<BottomComponent></BottomComponent>
				</Layout>
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
