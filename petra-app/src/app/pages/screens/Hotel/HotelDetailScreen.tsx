import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';

export interface HotelDetailProps {
	navigation: any;
	route: any;
}

const HotelDetailScreen: React.FC<HotelDetailProps> = props => {
	const { userID } = props.route.params;
	const { hotelID } = props.route.params;
	return (
		<Layout style={{ flex: 1 }}>
			<Button
				onPress={() => {
					props.navigation.navigate('AddRoomPropertyScreen', {
						userID: userID,
						hotelID: hotelID
					});
				}}
			>
				Add Hotel Room Property
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddRoomScreen', {
						userID: userID,
						hotelID: hotelID
					});
				}}
			>
				Add Hotel Room
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddHotelServicePropertyScreen', {
						userID: userID,
						hotelID: hotelID
					});
				}}
			>
				Add Hotel Service
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddHotelRoomPriceScreen', {
						userID: userID,
						hotelID: hotelID
					});
				}}
			>
				Add Room Price
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
export default HotelDetailScreen;
