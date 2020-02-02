import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon, Layout } from '@ui-kitten/components';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
/**
 * Location props
 */
export interface LocationComponentProps {
	latitude: number;
	longitude: any;
}

/**
 * Location state
 */
export interface LocationComponentState {
	region: any;
	marker: any;
}

/**
 * Location component
 */
export class LocationComponent extends React.Component<LocationComponentProps, LocationComponentState> {
	/**
	 * Creates an instance of Location component.
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {
			region: {
				latitude: 38.4237,
				longitude: 27.1428,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			},
			marker: null
		};
	}
	onRegionChange(region) {
		console.log(region);
		this.setState({ region });
	}
	onMarkerChange = coordinate => {
		this.props.latitude(42);
		//this.setState({ marker: coordinate });

		//this.props.longitude(this.state.marker.longitude);
	};
	/**
	 * Renders Location component
	 * @returns
	 */
	render() {
		return (
			<MapView
				style={styles.mapStyle}
				initialRegion={this.state.region}
				onPress={e => {
					this.onMarkerChange(e.nativeEvent.coordinate);
				}}
			>
				{/* eğer marker null değilse gösterir */}
				{this.state.marker && <Marker coordinate={this.state.marker} />}
			</MapView>
		);
	}
}

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 3
	}
});
