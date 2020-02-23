import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { BottomNavigation, Text, Icon, Layout } from '@ui-kitten/components';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Polyline } from 'react-native-maps';
import { UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
/**
 * Location props
 */
export interface SearchMapProps {
	marker: any;
}

/**
 * Location state
 */
export interface SearchMapState {
	region: any;
	markers: any;
	errorMessage: String;
	userLoc: any;
	polyCoords: any;
}

/**
 * Location component
 */
export class SearchMapComponent extends React.Component<SearchMapProps, SearchMapState> {
	/**
	 * Creates an instance of Location component.
	 * @param props
	 */
	constructor(props) {
		super(props);

		this.state = {
			region: {
				latitude: 38.411258763601985,
				longitude: 27.124096993356943,
				latitudeDelta: 0.0028816964734517114,
				longitudeDelta: 0.006642155349254608
			},
			errorMessage: '',
			userLoc: null,
			markers: [],
			polyCoords: []
		};
	}
	componentDidMount() {
		const origin = { latitude: 38.4108883, longitude: 27.1232167 };
		const destination = { latitude: 38.41493337952739, longitude: 27.130592465400692 };
		this._getLocationAsync();
		this.getDirections(origin, destination);
	}
	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied'
			});
		}

		let userLoc = await Location.getCurrentPositionAsync({});
		this.setState({ userLoc });
		//console.log(userLoc);
	};
	onRegionChange(region) {
		console.log(region);
		//this.setState({ region });
	}
	_onMarkerPress(markerData) {
		this.props.marker(markerData);
	}
	async getDirections(startPoint, endPoint) {
		try {
			const url =
				'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62483f947f71d8dd4b32bfb185dda3af87e2&start=' +
				startPoint.longitude +
				',' +
				startPoint.latitude +
				'&end=' +
				endPoint.longitude +
				',' +
				endPoint.latitude;

			const resp = await fetch(url);
			const respJson = await resp.json();
			//console.log('-----------');
			//console.log(respJson.features[0].geometry.coordinates);
			if (respJson.features[0].geometry.coordinates.length > 0) {
				const points = respJson.features[0].geometry.coordinates;
				const polyCoords = points.map((point, index) => {
					return {
						latitude: point[1],
						longitude: point[0]
					};
				});
				this.setState({ polyCoords });
			}
			return;
		} catch (error) {
			alert(error);
		}
	}
	/* onMarkerChange = coordinate => {
		const { longitude, latitude } = coordinate;
		this.setState({ marker: coordinate });
		this.props.latitude(latitude);
		this.props.longitude(longitude);
	}; */
	/**
	 * Renders Location component
	 * @returns
	 */
	render() {
		return (
			<Layout style={{ paddingBottom: -25 }}>
				<MapView
					style={styles.mapStyle}
					provider={null}
					//onRegionChange={this.onRegionChange}
					initialRegion={this.state.region}
					showsUserLocation={true}
					followsUserLocation={true}
					showsMyLocationButton={true}
					showsCompass={true}
					mapType={Platform.OS == 'android' ? 'none' : 'standard'}
					userLocationAnnotationTitle="Your position"
				>
					{this.state.markers.map(marker => (
						<Marker
							key={marker.id}
							coordinate={marker.coordinates}
							description={marker.description}
							title={marker.title}
							onPress={this._onMarkerPress.bind(this, marker)}
						/>
					))}

					<Polyline coordinates={this.state.polyCoords} strokeWidth={5} strokeColor="#00a8ff" zIndex={16} />
					<UrlTile
						/**
						 * The url template of the tile server. The patterns {x} {y} {z} will be replaced at runtime
						 * For example, http://c.tile.openstreetmap.org/{z}/{x}/{y}.png
						 */
						urlTemplate={'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png'}
						/**
						 * The maximum zoom level for this tile overlay. Corresponds to the maximumZ setting in
						 * MKTileOverlay. iOS only.
						 */
						zIndex={15}
					/>
				</MapView>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 3
	}
});
