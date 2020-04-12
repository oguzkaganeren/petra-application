import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';

export interface MuseumDetailProps {
	navigation: any;
	route: any;
}

const MuseumDetailScreen: React.FC<MuseumDetailProps> = props => {
	const { userID } = props.route.params;
	const { museumID } = props.route.params;
	return (
		<Layout style={{ flex: 1 }}>
			<Button
				onPress={() => {
					props.navigation.navigate('AddMuseumTypeScreen', {
						userID: userID
					});
				}}
			>
				Add Museum Type
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddMuseumScreen', {
						userID: userID
					});
				}}
			>
				Add Museum
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddMuseumCommentScreen', {
						userID: userID,
						museumID: museumID
					});
				}}
			>
				Add Museum Comment
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddMuseumEntranceTypeScreen', {
						userID: userID
					});
				}}
			>
				Add Museum Entrance Type
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddMuseumWorkingScheduleScreen', {
						userID: userID,
						museumID: museumID
					});
				}}
			>
				Add Museum Working Schedule
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddMuseumPriceScreen', {
						userID: userID,
						museumID: museumID
					});
				}}
			>
				Add Museum Price
			</Button>
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
