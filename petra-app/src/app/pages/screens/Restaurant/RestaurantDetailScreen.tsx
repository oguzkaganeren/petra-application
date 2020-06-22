import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Icon, ButtonGroup } from '@ui-kitten/components';
import RestaurantInfoScreen from '../../screens/Restaurant/RestaurantInfoScreen';
export interface RestaurantDetailScreenProps {
	navigation: any;
	route: any;
}

const RestaurantDetailScreen: React.FC<RestaurantDetailScreenProps> = (props) => {
	const { userID } = props.route.params;
	const { restaurantID } = props.route.params;
	const accessoryItemIcon = (style) => <Icon {...style} name="plus-circle-outline" />;
	return (
		<Layout style={{ flex: 1 }}>
			<Layout style={{ flexDirection: 'row' }}>
				<Button
					icon={accessoryItemIcon}
					appearance="ghost"
					style={{ flex: 1 }}
					onPress={() => {
						props.navigation.navigate('AddMenuScreen', {
							userID: userID,
							restaurantID: restaurantID,
						});
					}}
				>
					Add Menu
				</Button>

				{/* 	<Button
				onPress={() => {
					props.navigation.navigate('AddRestaurantCommentScreen', {
						userID: userID,
						restaurantID: restaurantID
					});
				}}
			>
				Add Restaurant Comment
			</Button> */}
				<Button
					icon={accessoryItemIcon}
					appearance="ghost"
					style={{ flex: 1 }}
					onPress={() => {
						props.navigation.navigate('AddRestaurantWorkingScheduleScreen', {
							userID: userID,
							restaurantID: restaurantID,
						});
					}}
				>
					Add Restaurant Working Schedule
				</Button>
			</Layout>
			<RestaurantInfoScreen navigation={props.navigation} route={props.route} restaurantID={restaurantID} />
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2,
	},
});
export default RestaurantDetailScreen;
