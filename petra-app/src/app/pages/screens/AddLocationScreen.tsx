import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
const GOOGLE_MAPS_APIKEY = 'AIzaSyAgKSmJ7NF2Q9ixPLv-J_Z4gDIYavm31Vw';
/**
 * Location props
 */
export interface LocationProps {
	navigation: any;
}
/**
 * Location state
 */
export interface LocationState {
	region: any;
	markers: any;
}

/**
 * Location
 */
export class AddLocationScreen extends React.Component<LocationProps, LocationState> {
	constructor(props: LocationProps) {
		super(props);
		this.state = {
			region: {
				latitude: 38.4237,
				longitude: 27.1428,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			},
			markers: [
				{
					latlng: {
						latitude: 38.4237,
						longitude: 27.1428
					},
					title: 'test',
					description: 'deneme'
				}
			]
		};
	}
	onRegionChange(region) {
		this.setState({ region });
	}
	/**
	 * Renders home
	 * @returns
	 */
	render() {
		return (
			<Layout style={{ flex: 1 }}>
				{/* initialRegion şimdilik Izmir'i göstermektedir, kullanıcı lokasyon açarsa bulunduğu konumu göstermeli */}
				<MapView style={styles.mapStyle} region={this.state.region} onRegionChange={this.onRegionChange.bind(this)}>
					{this.state.markers.map(marker => (
						<Marker coordinate={marker.latlng} title={marker.title} description={marker.description} />
					))}
				</MapView>
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
