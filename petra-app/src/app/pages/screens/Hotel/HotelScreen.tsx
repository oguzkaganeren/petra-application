import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Text, Icon } from '@ui-kitten/components';
import GetUserHotelList from '../../../components/Hotel/GetUserHotelList';
declare var global: any;
/**
 * props
 */
export interface HotelProps {
	navigation: any;
	route: any;
}

/**
 *
 */
const HotelScreen: React.FC<HotelProps> = props => {
	const [userID, setUserID] = React.useState(-1);
	const accessoryItemIcon = style => <Icon {...style} name="plus-circle-outline" />;
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
				<Button
					icon={accessoryItemIcon}
					appearance="ghost"
					onPress={() => {
						props.navigation.navigate('AddHotelScreen', {});
					}}
				>
					Add Hotel
				</Button>
				<GetUserHotelList navigation={props.navigation} route={props.route} />
			</Layout>
		);
	}
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2
	}
});
export default HotelScreen;
