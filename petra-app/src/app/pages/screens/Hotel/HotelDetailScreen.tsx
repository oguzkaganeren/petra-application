import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, ButtonGroup, Icon } from '@ui-kitten/components';
import HotelInfoScreen from '../Hotel/HotelInfoScreen';
export interface HotelDetailProps {
	navigation: any;
	route: any;
}

const HotelDetailScreen: React.FC<HotelDetailProps> = (props) => {
	const { userID } = props.route.params;
	const { hotelID } = props.route.params;
	const accessoryItemIcon = (style) => <Icon {...style} name="plus-circle-outline" />;
	return (
		<Layout style={{ flex: 1 }}>
			<ButtonGroup style={{ justifyContent: 'center' }}>
				<Button
					icon={accessoryItemIcon}
					onPress={() => {
						props.navigation.navigate('AddRoomScreen', {
							userID: userID,
							hotelID: hotelID,
						});
					}}
				>
					Add Hotel Room
				</Button>

				<Button
					icon={accessoryItemIcon}
					onPress={() => {
						props.navigation.navigate('AddHotelRoomPriceScreen', {
							userID: userID,
							hotelID: hotelID,
						});
					}}
				>
					Add Room Price
				</Button>
			</ButtonGroup>
			<HotelInfoScreen navigation={props.navigation} route={props.route} hotelID={hotelID} />
		</Layout>
	);
};
const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2,
	},
});
export default HotelDetailScreen;
