import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import HotelLocationComponent from '../../../components/Hotel/HotelLocationComponent';

export interface HotelMapProps {
	navigation: any;
	route: any;
}

const HotelMapScreen: React.FC<HotelMapProps> = props => {
	return (
		<Layout style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<HotelLocationComponent
					marker={value => {
						let item = {
							id: value.id,
							title: value.title,
							description: value.description,
							coordinates: value.coordinates,
							type: value.type
						};
					}}
				/>
			</ScrollView>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2
	}
});
export default HotelMapScreen;
