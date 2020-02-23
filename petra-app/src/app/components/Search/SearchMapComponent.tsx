import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { BottomNavigation, Text, Icon, Layout } from '@ui-kitten/components';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapViewDirections from 'react-native-maps-directions';
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
	mapStyle: any;
	errorMessage: String;
	userLoc: any;
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
				latitude: 38.4237,
				longitude: 27.1428,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			},
			errorMessage: '',
			userLoc: null,
			markers: [],
			mapStyle: [
				{
					elementType: 'geometry',
					stylers: [
						{
							color: '#ebe3cd'
						}
					]
				},
				{
					elementType: 'labels.text.fill',
					stylers: [
						{
							color: '#523735'
						}
					]
				},
				{
					elementType: 'labels.text.stroke',
					stylers: [
						{
							color: '#f5f1e6'
						}
					]
				},
				{
					featureType: 'administrative',
					elementType: 'geometry',
					stylers: [
						{
							visibility: 'off'
						}
					]
				},
				{
					featureType: 'administrative',
					elementType: 'geometry.stroke',
					stylers: [
						{
							color: '#c9b2a6'
						}
					]
				},
				{
					featureType: 'administrative.land_parcel',
					elementType: 'geometry.stroke',
					stylers: [
						{
							color: '#dcd2be'
						}
					]
				},
				{
					featureType: 'administrative.land_parcel',
					elementType: 'labels.text.fill',
					stylers: [
						{
							color: '#ae9e90'
						}
					]
				},
				{
					featureType: 'landscape.natural',
					elementType: 'geometry',
					stylers: [
						{
							color: '#dfd2ae'
						}
					]
				},
				{
					featureType: 'poi',
					stylers: [
						{
							visibility: 'off'
						}
					]
				},
				{
					featureType: 'poi',
					elementType: 'geometry',
					stylers: [
						{
							color: '#dfd2ae'
						}
					]
				},
				{
					featureType: 'poi',
					elementType: 'labels.text.fill',
					stylers: [
						{
							color: '#93817c'
						}
					]
				},
				{
					featureType: 'poi.park',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#a5b076'
						}
					]
				},
				{
					featureType: 'poi.park',
					elementType: 'labels.text.fill',
					stylers: [
						{
							color: '#447530'
						}
					]
				},
				{
					featureType: 'road',
					elementType: 'geometry',
					stylers: [
						{
							color: '#f5f1e6'
						}
					]
				},
				{
					featureType: 'road',
					elementType: 'labels.icon',
					stylers: [
						{
							visibility: 'off'
						}
					]
				},
				{
					featureType: 'road.arterial',
					elementType: 'geometry',
					stylers: [
						{
							color: '#fdfcf8'
						}
					]
				},
				{
					featureType: 'road.highway',
					elementType: 'geometry',
					stylers: [
						{
							color: '#f8c967'
						}
					]
				},
				{
					featureType: 'road.highway',
					elementType: 'geometry.stroke',
					stylers: [
						{
							color: '#e9bc62'
						}
					]
				},
				{
					featureType: 'road.highway.controlled_access',
					elementType: 'geometry',
					stylers: [
						{
							color: '#e98d58'
						}
					]
				},
				{
					featureType: 'road.highway.controlled_access',
					elementType: 'geometry.stroke',
					stylers: [
						{
							color: '#db8555'
						}
					]
				},
				{
					featureType: 'road.local',
					elementType: 'labels.text.fill',
					stylers: [
						{
							color: '#806b63'
						}
					]
				},
				{
					featureType: 'transit',
					stylers: [
						{
							visibility: 'off'
						}
					]
				},
				{
					featureType: 'transit.line',
					elementType: 'geometry',
					stylers: [
						{
							color: '#dfd2ae'
						}
					]
				},
				{
					featureType: 'transit.line',
					elementType: 'labels.text.fill',
					stylers: [
						{
							color: '#8f7d77'
						}
					]
				},
				{
					featureType: 'transit.line',
					elementType: 'labels.text.stroke',
					stylers: [
						{
							color: '#ebe3cd'
						}
					]
				},
				{
					featureType: 'transit.station',
					elementType: 'geometry',
					stylers: [
						{
							color: '#dfd2ae'
						}
					]
				},
				{
					featureType: 'water',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#b9d3c2'
						}
					]
				},
				{
					featureType: 'water',
					elementType: 'labels.text.fill',
					stylers: [
						{
							color: '#92998d'
						}
					]
				}
			]
		};
	}
	componentDidMount() {
		this._getLocationAsync();
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
		console.log(userLoc);
	};
	onRegionChange(region) {
		console.log(region);
		this.setState({ region });
	}
	_onMarkerPress(markerData) {
		this.props.marker(markerData);
	}
	/*  async getDirections(startLoc, destinationLoc) {
        try {
             const resp = await fetch(`http://www.mapquestapi.com/directions/v2/route?key=uL4rvVLz5lqGMyPuOrDHAHV91ttOSHV9&from=38.410888,27.123216&to=38.414933,27.130592`);
             const respJson = await resp.json();
             if (respJson.routes.length > 0) {
                 const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
                 const coords = points.map((point, index) => {
                     return {
                         latitude: point[0],
                         longitude: point[1],
                     };
                 });
                 this.setState({ coords });
             }
             return;
         } catch (error) {
             alert(error);
         }
 } */
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
		const origin = { latitude: 38.4108883, longitude: 27.1232167 };
		const destination = { latitude: 38.41493337952739, longitude: 27.130592465400692 };
		return (
			<Layout>
				<MapView
					style={styles.mapStyle}
					provider={PROVIDER_GOOGLE}
					customMapStyle={this.state.mapStyle}
					initialRegion={this.state.region}
					showsUserLocation={true}
					followsUserLocation={true}
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
