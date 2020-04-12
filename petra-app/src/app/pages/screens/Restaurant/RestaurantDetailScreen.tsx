import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';

export interface RestaurantDetailScreenProps {
	navigation: any;
	route: any;
}

const RestaurantDetailScreen: React.FC<RestaurantDetailScreenProps> = props => {
	const { userID } = props.route.params;
	const { restaurantID } = props.route.params;
	return (
		<Layout style={{ flex: 1 }}>
			<Button
				onPress={() => {
					props.navigation.navigate('AddRestaurantTypeScreen', {
						userID: userID
					});
				}}
			>
				Add Restaurant Type
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddFoodTypeScreen', {
						userID: userID
					});
				}}
			>
				Add Food Type
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddFoodScreen', {
						userID: userID
					});
				}}
			>
				Add Food
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddMenuScreen', {
						userID: userID,
						restaurantID: restaurantID
					});
				}}
			>
				Add Menu
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddRestaurantCuisineTypeScreen', {
						userID: userID
					});
				}}
			>
				Add Cuisine Type
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddRestaurantCommentScreen', {
						userID: userID,
						restaurantID: restaurantID
					});
				}}
			>
				Add Restaurant Comment
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddRestaurantWorkingScheduleScreen', {
						userID: userID,
						restaurantID: restaurantID
					});
				}}
			>
				Add Restaurant Working Schedule
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
export default RestaurantDetailScreen;
