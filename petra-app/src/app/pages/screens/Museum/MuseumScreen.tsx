import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Text, Icon } from '@ui-kitten/components';
//import { BottomComponent } from '../../components/Public/BottomComponent';
import { useIsFocused } from '@react-navigation/native';
import GetUserMuseumList from '../../../components/Museum/GetUserMuseumList';

declare var global: any;
/**
 * Home props
 */
export interface MuseumProps {
	navigation: any;
	route: any;
}

/**
 * Home
 */
const MuseumScreen: React.FC<MuseumProps> = props => {
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
						props.navigation.navigate('AddMuseumScreen', {
							userID: userID
						});
					}}
				>
					Add Museum
				</Button>
				<GetUserMuseumList navigation={props.navigation} route={props.route} />
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
export default MuseumScreen;
