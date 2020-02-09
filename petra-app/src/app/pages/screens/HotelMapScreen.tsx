import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { HotelLocationComponent } from '../../components/HotelLocationComponent';
/**
 * Home props
 */
export interface HotelMapProps {
	navigation: any;
}
/**
 * Home state
 */
export interface HotelMapState {
	latitude: number;
	longtitude: number;
}

/**
 * Home
 */
export class HotelMapScreen extends React.Component<HotelMapProps, HotelMapState> {
	constructor(props: HotelMapProps) {
		super(props);
		this.state = {
			longtitude: 0,
			latitude: 0
		};
	}
	/**
	 * Renders home
	 * @returns
	 */
	render() {
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
		return (
			<Layout style={{ flex: 1 }}>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<HotelLocationComponent
						latitude={value => {
							this.setState({
								latitude: value
							});
						}}
						longitude={value => {
							this.setState({
								longtitude: value
							});
						}}
					/>
				</ScrollView>
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
