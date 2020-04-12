import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import RestaurantLocationComponent from '../../../components/Restaurant/RestaurantLocationComponent';

export interface RestaurantMapProps {
	navigation: any;
	route: any;
}

const RestaurantMapScreen: React.FC<RestaurantMapProps> = props => {
	const { userID } = props.route.params;
	return (
		<Layout style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<RestaurantLocationComponent
					marker={value => {
						/*this.setState({
																latitude: value
															});*/
						//console.log(value);
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
export default RestaurantMapScreen;
