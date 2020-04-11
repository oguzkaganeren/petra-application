import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
/**
 * Home props
 */
export interface RestaurantDetailScreenProps {
	navigation: any;
	route: any;
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
		const { userID } = this.props.route.params;
		const { restaurantID } = this.props.route.params;
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
						this.props.navigation.navigate('AddMenuScreen', {
							userID: userID,
							restaurantID: restaurantID
						});
					}}
				>
					Add Menu
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
							restaurantID: restaurantID
						});
					}}
				>
					Add Restaurant Comment
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddRestaurantWorkingScheduleScreen', {
							userID: userID,
							restaurantID: restaurantID
						});
					}}
				>
					Add Restaurant Working Schedule
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
