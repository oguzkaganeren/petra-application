import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Button, Text, Icon, Layout } from '@ui-kitten/components';
import { GetHotelLocationComponent } from '../../generated/components';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export interface HotelLocationProps {
	marker: any;
}

const HotelLocationComponent: React.FC<HotelLocationProps> = props => {
	const [markers, setMarkers] = React.useState([]);
	const [markerRefs, setMarkerRefs] = React.useState([]);
	const [region, setRegion] = React.useState({
		latitude: 38.4237,
		longitude: 27.1428,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	});
	function _onMarkerPress(markerData) {
		props.marker(markerData);
	}

	return (
		<Layout>
			<GetHotelLocationComponent>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Hotel.map(dat => {
							if (markers.length > 0) {
								if (markers.every(item => item.id !== dat.hotelID)) {
									markers.push({
										id: dat.hotelID,
										title: dat.name,
										description: dat.Location.Address.address,
										coordinates: { latitude: dat.Location.latitude, longitude: dat.Location.longtitude },
										type: 'hotel'
									});
								}
							} else {
								markers.push({
									id: dat.hotelID,
									title: dat.name,
									description: dat.Location.Address.address,
									coordinates: { latitude: dat.Location.latitude, longitude: dat.Location.longtitude },
									type: 'hotel'
								});
							}
						});
						return (
							<MapView style={styles.mapStyle} provider={PROVIDER_GOOGLE} initialRegion={region}>
								{markers.map((marker, index) => (
									<MapView.Marker
										key={marker.id}
										coordinate={marker.coordinates}
										description={marker.description}
										ref={marker => (markerRefs[index] = marker)}
										title={marker.title}
										onPress={event => {
											markerRefs[index].showCallout();
										}}
									>
										<MapView.Callout onPress={console.log('clicked')}>
											<View style={{ padding: 10 }}>
												<Text>{marker.title}</Text>
												<Text>{marker.description}</Text>
												<Button onPress={_onMarkerPress.bind(this, marker)}>Ekle</Button>
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
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 3
	}
});
export default HotelLocationComponent;
