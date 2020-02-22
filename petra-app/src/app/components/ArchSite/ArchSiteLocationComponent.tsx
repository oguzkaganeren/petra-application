import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { BottomNavigation, Text, Icon, Layout } from '@ui-kitten/components';
import { GetArchSiteLocationComponent } from '../../generated/components';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
/**
 * Location props
 */
export interface ArchSiteLocationProps {
	marker: any;
}

/**
 * Location state
 */
export interface ArchSiteLocationState {
	region: any;
	markers: any;
	mapStyle: any;
}

/**
 * Location component
 */
export class ArchSiteLocationComponent extends React.Component<ArchSiteLocationProps, ArchSiteLocationState> {
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
		console.log(markerData);
		this.props.marker(markerData);
	}
	/**
	 * Renders Location component
	 * @returns
	 */
	render() {
		return (
			<Layout>
				<GetArchSiteLocationComponent>
					{({ loading, error, data }) => {
						if (loading) return <Text>Loading</Text>;
						if (error) return <Text>error</Text>;

						if (data) {
							data.ArchSite.map(dat => {
								if (this.state.markers.length > 0) {
									if (this.state.markers.every(item => item.id !== dat.archSiteID)) {
										this.state.markers.push({
											id: dat.archSiteID,
											title: dat.name,
											description: dat.Location.Address.address,
											coordinates: { latitude: dat.Location.latitude, longitude: dat.Location.longtitude },
											type: 'archsite'
										});
									}
								} else {
									this.state.markers.push({
										id: dat.archSiteID,
										title: dat.name,
										description: dat.Location.Address.address,
										coordinates: { latitude: dat.Location.latitude, longitude: dat.Location.longtitude },
										type: 'archsite'
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
							);
						}
					}}
				</GetArchSiteLocationComponent>
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
