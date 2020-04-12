import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';

export interface ArchSiteDetailProps {
	navigation: any;
	route: any;
}
const ArchSiteDetailScreen: React.FC<ArchSiteDetailProps> = props => {
	const { userID } = props.route.params;
	const { archSiteID } = props.route.params;
	return (
		<Layout style={{ flex: 1 }}>
			<Button
				onPress={() => {
					props.navigation.navigate('AddArchSiteTypeScreen', {
						userID: userID
					});
				}}
			>
				Add ArchSite Type
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddArchSiteScreen', {
						userID: userID
					});
				}}
			>
				Add ArchSite
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddArchSiteCommentScreen', {
						userID: userID,
						archSiteID: archSiteID
					});
				}}
			>
				Add ArchSite Comment
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddArchSiteEntranceTypeScreen', {
						userID: userID
					});
				}}
			>
				Add ArchSite Entrance Type
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddArchSiteWorkingScheduleScreen', {
						userID: userID,
						archSiteID: archSiteID
					});
				}}
			>
				Add ArchSite Working Schedule
			</Button>
			<Button
				onPress={() => {
					props.navigation.navigate('AddArchSitePriceScreen', {
						userID: userID,
						archSiteID: archSiteID
					});
				}}
			>
				Add ArchSite Price
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
export default ArchSiteDetailScreen;
