import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon, Layout } from '@ui-kitten/components';
import MapView from 'react-native-maps';

export interface LocationComponentProps {
	latitude: any;
	longitude: any;
}

const LocationComponent: React.FC<LocationComponentProps> = props => {
	const [marker, setMarker] = React.useState(null);
	const [region, setRegion] = React.useState({
		latitude: 38.4237,
		longitude: 27.1428,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	});

	const onMarkerChange = event => {
		let longitude;
		let latitude;
		if (Platform.OS === 'web') {
			latitude = event.latLng.lat();
			longitude = event.latLng.lng();
		} else {
			latitude = event.nativeEvent.coordinate.latitude;
			longitude = event.nativeEvent.coordinate.longitude;
		}

		setMarker({ longitude, latitude });
		props.latitude(latitude);
		props.longitude(longitude);
	};
	return (
		<MapView
			style={styles.mapStyle}
			initialRegion={region}
			onPress={e => {
				onMarkerChange(e);
			}}
		>
			{/* eğer marker null değilse gösterir */}
			{marker && <MapView.Marker coordinate={marker} />}
		</MapView>
	);
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 3
	}
});
export default LocationComponent;
