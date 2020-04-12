import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import MuseumLocationComponent from '../../../components/Museum/MuseumLocationComponent';

export interface MuseumMapProps {
	navigation: any;
	route: any;
}

const MuseumMapScreen: React.FC<MuseumMapProps> = props => {
	return (
		<Layout style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<MuseumLocationComponent
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
export default MuseumDetailScreen;
