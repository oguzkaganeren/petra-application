import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { BottomComponent } from '../../components/BottomComponent';
/**
 * Home props
 */
export interface HotelDetailScreenProps {
	navigation: any;
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
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
		return (
			<Layout style={{ flex: 1 }}>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddRoomPropertyScreen', {
							userID: userID
						});
					}}
				>
					Add Hotel Room Property
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
