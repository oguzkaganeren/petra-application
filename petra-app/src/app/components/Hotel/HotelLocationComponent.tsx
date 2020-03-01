import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Button, Text, Icon, Layout } from '@ui-kitten/components';
import { GetHotelLocationComponent } from '../../generated/components';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
/**
 * Location props
 */
export interface HotelLocationProps {
	marker: any;
}

/**
 * Location state
 */
export interface HotelLocationState {
	region: any;
	markers: any;
	mapStyle: any;
}

/**
 * Location component
 */
export class HotelLocationComponent extends React.Component<HotelLocationProps, HotelLocationState> {
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
	onRegionChange(region) {
		console.log(region);
		this.setState({ region });
	}
	_onMarkerPress(markerData) {
		this.props.marker(markerData);
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
		let markers = [];
		return (
			<Layout>
				<GetHotelLocationComponent>
					{({ loading, error, data }) => {
						if (loading) return <Text>Loading</Text>;
						if (error) return <Text>error</Text>;

						if (data) {
							data.Hotel.map(dat => {
								if (this.state.markers.length > 0) {
									if (this.state.markers.every(item => item.id !== dat.hotelID)) {
										this.state.markers.push({
											id: dat.hotelID,
											title: dat.name,
											description: dat.Location.Address.address,
											coordinates: { latitude: dat.Location.latitude, longitude: dat.Location.longtitude },
											type: 'hotel'
										});
									}
								} else {
									this.state.markers.push({
										id: dat.hotelID,
										title: dat.name,
										description: dat.Location.Address.address,
										coordinates: { latitude: dat.Location.latitude, longitude: dat.Location.longtitude },
										type: 'hotel'
									});
								}
							});
							return (
								<MapView
									style={styles.mapStyle}
									provider={PROVIDER_GOOGLE}
									customMapStyle={this.state.mapStyle}
									initialRegion={this.state.region}
								>
									{this.state.markers.map((marker, index) => (
										<MapView.Marker
											key={marker.id}
											coordinate={marker.coordinates}
											description={marker.description}
											ref={marker => (markers[index] = marker)}
											title={marker.title}
											onPress={event => {
												markers[index].showCallout();
											}}
										>
											<MapView.Callout onPress={console.log('clicked')}>
												<View style={{ padding: 10 }}>
													<Text>{marker.title}</Text>
													<Text>{marker.description}</Text>
													<Button onPress={this._onMarkerPress.bind(this, marker)}>Ekle</Button>
													<Button status="success">Detay</Button>
												</View>
											</MapView.Callout>
										</MapView.Marker>
									))}
								</MapView>
							);
						}
					}}
				</GetHotelLocationComponent>
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
