import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { BottomComponent } from '../../../components/Public/BottomComponent';
/**
 * Home props
 */
export interface HotelDetailScreenProps {
	navigation: any;
	route: any;
}
/**
 * Home state
 */
export interface HotelDetailScreenState {}

/**
 * Home
 */
export class HotelDetailScreen extends React.Component<HotelDetailScreenProps, HotelDetailScreenState> {
	constructor(props: HotelDetailScreenProps) {
		super(props);
		this.state = {};
	}
	/**
	 * Renders ArchSite Detail Screen
	 * @returns
	 */
	render() {
		const { userID } = this.props.route.params;
		const { hotelID } = this.props.route.params;
		return (
			<Layout style={{ flex: 1 }}>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddRoomPropertyScreen', {
							userID: userID,
							hotelID: hotelID,
						});
					}}
				>
					Add Hotel Room Property
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddRoomScreen', {
							userID: userID,
							hotelID: hotelID,
						});
					}}
				>
					Add Hotel Room
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddHotelServicePropertyScreen', {
							userID: userID,
							hotelID: hotelID,
						});
					}}
				>
					Add Hotel Service
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddHotelRoomPriceScreen', {
							userID: userID,
							hotelID: hotelID,
						});
					}}
				>
					Add Room Price
				</Button>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2,
	},
});
