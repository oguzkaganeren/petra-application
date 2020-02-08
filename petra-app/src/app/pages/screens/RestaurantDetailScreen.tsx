import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { BottomComponent } from '../../components/BottomComponent';
import { SearchComponent } from '../../components/SearchComponent';
/**
 * Home props
 */
export interface RestaurantDetailScreenProps {
	navigation: any;
}
/**
 * Home state
 */
export interface RestaurantDetailScreenState {}

/**
 * Home
 */
export class RestaurantDetailScreen extends React.Component<RestaurantDetailScreenProps, RestaurantDetailScreenState> {
	constructor(props: RestaurantDetailScreenProps) {
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
						this.props.navigation.navigate('AddRestaurantTypeScreen', {
							userID: userID
						});
					}}
				>
					Add Restaurant Type
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddFoodTypeScreen', {
							userID: userID
						});
					}}
				>
					Add Food Type
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddFoodScreen', {
							userID: userID
						});
					}}
				>
					Add Food
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddRestaurantCuisineTypeScreen', {
							userID: userID
						});
					}}
				>
					Add Cuisine Type
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddRestaurantCommentScreen', {
							userID: userID,
							restaurantID: 1 // Değişecek
						});
					}}
				>
					Add Restaurant Comment
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
