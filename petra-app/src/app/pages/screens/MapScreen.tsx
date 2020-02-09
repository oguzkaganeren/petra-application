import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { HotelLocationComponent } from '../../components/HotelLocationComponent';
import { ArchSiteLocationComponent } from '../../components/ArchSiteLocationComponent';
/**
 * Home props
 */
export interface MapProps {
	navigation: any;
}
/**
 * Home state
 */
export interface MapState {
	latitude: number;
	longtitude: number;
}

/**
 * Home
 */
export class MapScreen extends React.Component<MapProps, MapState> {
	constructor(props: MapProps) {
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
					<Button
						onPress={() => {
							this.props.navigation.navigate('HotelMapScreen', {
								userID: userID
							});
						}}
					>
						Hotel Map
					</Button>
					<Button
						onPress={() => {
							this.props.navigation.navigate('ArchSiteMapScreen', {
								userID: userID
							});
						}}
					>
						ArchSite Map
					</Button>
					<Button
						onPress={() => {
							this.props.navigation.navigate('MuseumMapScreen', {
								userID: userID
							});
						}}
					>
						Museum Map
					</Button>
					<Button
						onPress={() => {
							this.props.navigation.navigate('RestaurantMapScreen', {
								userID: userID
							});
						}}
					>
						Restaurant Map
					</Button>
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
