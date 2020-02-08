import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon, Layout } from '@ui-kitten/components';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
/**
 * Location props
 */
export interface GetAllMarkerProps {
	latitude: any;
	longitude: any;
}

/**
 * Location state
 */
export interface GetAllMarkerState {
	region: any;
	marker: any;
}

/**
 * Location component
 */
export class GetAllMarkerComponent extends React.Component<GetAllMarkerProps, GetAllMarkerState> {
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
		const { longitude, latitude } = coordinate;
		this.setState({ marker: coordinate });
		this.props.latitude(latitude);
		this.props.longitude(longitude);
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
