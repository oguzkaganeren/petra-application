import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import ASLocationComponent from '../../../components/ArchSite/ASLocationComponent';

export interface ArchSiteMapProps {
	navigation: any;
	route: any;
}
const ArchSiteMapScreen: React.FC<ArchSiteMapProps> = props => {
	const [longtitude, setLongtitude] = React.useState(0);
	const [latitude, setLatitude] = React.useState(0);

	const { userID } = props.route.params;
	return (
		<Layout style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<ASLocationComponent
					marker={value => {
						/*this.setState({
																latitude: value
															});*/
						let item = {
							id: value.id,
							title: value.title,
							description: value.description,
							coordinates: value.coordinates,
							type: value.type
						};
						//this.addItem(item);
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
export default ArchSiteMapScreen;
