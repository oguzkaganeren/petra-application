import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Text, Icon, ButtonGroup } from '@ui-kitten/components';

import GetUserASListComponent from '../../../components/ArchSite/GetUserASListComponent';

declare var global: any;

export interface ArchSiteProps {
	navigation: any;
	route: any;
}

const ArchSiteScreen: React.FC<ArchSiteProps> = (props) => {
	const [userID, setUserID] = React.useState(-1);
	const accessoryItemIcon = (style) => <Icon {...style} name="plus-circle-outline" />;
	React.useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', () => {
			if (userID != global.userID && global.userID != undefined) {
				setUserID(global.userID);
			}
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount
		return unsubscribe;
	}, [props.navigation]);
	if (userID == -1) {
		return (
			<Layout style={{ flex: 1 }}>
				<Text>Unregistered Page</Text>
			</Layout>
		);
	} else {
		return (
			<Layout style={{ flex: 1 }}>
				<Layout style={{ flexDirection: 'row' }}>
					<Button
						icon={accessoryItemIcon}
						appearance="ghost"
						style={{ flex: 1 }}
						onPress={() => {
							props.navigation.navigate('AddArchSiteScreen', {
								userID: userID,
							});
						}}
					>
						Add ArchSite
					</Button>
					<Button
						icon={accessoryItemIcon}
						appearance="ghost"
						style={{ flex: 1 }}
						onPress={() => {
							props.navigation.navigate('AddArchSiteTypeScreen', {
								userID: userID,
							});
						}}
					>
						Add ArchSite Type
					</Button>
					<Button
						icon={accessoryItemIcon}
						appearance="ghost"
						style={{ flex: 1 }}
						onPress={() => {
							props.navigation.navigate('AddArchSiteEntranceTypeScreen', {
								userID: userID,
							});
						}}
					>
						Add ArchSite Entrance Type
					</Button>
				</Layout>

				<GetUserASListComponent navigation={props.navigation} route={props.route} />
			</Layout>
		);
	}
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2,
	},
});
export default ArchSiteScreen;
