import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Text, Icon, ButtonGroup } from '@ui-kitten/components';
import GetUserRestaurantList from '../../../components/Restaurant/GetUserRestaurantListComponent';

declare var global: any;

export interface RestaurantProps {
	navigation: any;
	route: any;
}

const RestaurantScreen: React.FC<RestaurantProps> = (props) => {
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
				<Layout style={{ flexDirection: 'row' }}>
					<Button
						icon={accessoryItemIcon}
						appearance="ghost"
						style={{ flex: 1 }}
						onPress={() => {
							props.navigation.navigate('AddRestaurantScreen', {
								userID: userID,
							});
						}}
					>
						Add Restaurant
					</Button>
					<Button
						icon={accessoryItemIcon}
						style={{ flex: 1 }}
						appearance="ghost"
						onPress={() => {
							props.navigation.navigate('AddRestaurantTypeScreen', {
								userID: userID,
							});
						}}
					>
						Add Restaurant Type
					</Button>
					<Button
						icon={accessoryItemIcon}
						style={{ flex: 1 }}
						appearance="ghost"
						onPress={() => {
							props.navigation.navigate('AddFoodTypeScreen', {
								userID: userID,
							});
						}}
					>
						Add Food Type
					</Button>
					<Button
						icon={accessoryItemIcon}
						style={{ flex: 1 }}
						appearance="ghost"
						onPress={() => {
							props.navigation.navigate('AddFoodScreen', {
								userID: userID,
							});
						}}
					>
						Add Food
					</Button>
					<Button
						icon={accessoryItemIcon}
						style={{ flex: 1 }}
						appearance="ghost"
						onPress={() => {
							props.navigation.navigate('AddRestaurantCuisineTypeScreen', {
								userID: userID,
							});
						}}
					>
						Add Cuisine Type
					</Button>
				</Layout>

				<GetUserRestaurantList navigation={props.navigation} route={props.route} />
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
export default RestaurantScreen;
