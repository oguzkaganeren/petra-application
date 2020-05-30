import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, ButtonGroup, Icon } from '@ui-kitten/components';
import ArchSiteInfoScreen from '../ArchSite/ArchSiteInfoScreen';
export interface ArchSiteDetailProps {
	navigation: any;
	route: any;
}
const ArchSiteDetailScreen: React.FC<ArchSiteDetailProps> = (props) => {
	const { userID } = props.route.params;
	const { archSiteID } = props.route.params;
	const accessoryItemIcon = (style) => <Icon {...style} name="plus-circle-outline" />;
	return (
		<Layout style={{ flex: 1 }}>
			{/* 	<Button
				onPress={() => {
					props.navigation.navigate('AddArchSiteCommentScreen', {
						userID: userID,
						archSiteID: archSiteID
					});
				}}
			>
				Add ArchSite Comment
			</Button> */}
			<ButtonGroup style={{ justifyContent: 'center' }}>
				<Button
					icon={accessoryItemIcon}
					onPress={() => {
						props.navigation.navigate('AddArchSiteWorkingScheduleScreen', {
							userID: userID,
							archSiteID: archSiteID,
						});
					}}
				>
					Add ArchSite Working Schedule
				</Button>
				<Button
					icon={accessoryItemIcon}
					onPress={() => {
						props.navigation.navigate('AddArchSitePriceScreen', {
							userID: userID,
							archSiteID: archSiteID,
						});
					}}
				>
					Add ArchSite Price
				</Button>
			</ButtonGroup>
			<ArchSiteInfoScreen navigation={props.navigation} route={props.route} archSiteID={archSiteID} />
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2,
	},
});
export default ArchSiteDetailScreen;
