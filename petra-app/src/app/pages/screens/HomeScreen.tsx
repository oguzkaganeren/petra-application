import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { BottomComponent } from '../../components/Public/BottomComponent';
import { useIsFocused } from '@react-navigation/native';
declare var global: any;
/**
 * Home props
 */
export interface HomeProps {
	navigation: any;
	route: any;
}

/**
 * Home
 */
const HomeScreen: React.FC<HomeProps> = props => {
	const [userID, setUserID] = React.useState(-1);
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
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<Button
						onPress={() => {
							props.navigation.navigate('AddCompanyScreen', {
								userID: userID
							});
						}}
					>
						Add Company
					</Button>
					<Button
						onPress={() => {
							props.navigation.navigate('AddRestaurantScreen', {
								userID: userID
							});
						}}
					>
						Add Restaurant
					</Button>
					<Button
						onPress={() => {
							props.navigation.navigate('RestaurantDetailScreen', {
								userID: userID
							});
						}}
					>
						Restaurant Details
					</Button>
					<Button
						onPress={() => {
							props.navigation.navigate('ArchSiteDetailScreen', {
								userID: userID
							});
						}}
					>
						ArchSite Details
					</Button>
					<Button
						onPress={() => {
							props.navigation.navigate('MuseumDetailScreen', {
								userID: userID
							});
						}}
					>
						Museum Details
					</Button>
					<Button
						onPress={() => {
							props.navigation.navigate('AddHotelScreen', {
								userID: userID
							});
						}}
					>
						Add Hotel
					</Button>
					<Button
						onPress={() => {
							props.navigation.navigate('HotelDetailScreen', {
								userID: userID
							});
						}}
					>
						Hotel Details
					</Button>
					<Button
						onPress={() => {
							props.navigation.navigate('ArticleDetailScreen', {
								userID: userID
							});
						}}
					>
						Article Details
					</Button>
					<Button
						onPress={() => {
							props.navigation.navigate('MapScreen', {
								userID: userID
							});
						}}
					>
						Map Screen
					</Button>
					<Button
						onPress={() => {
							props.navigation.navigate('AddTravelGuideScreen', {
								userID: userID
							});
						}}
					>
						Add Travel Guide
					</Button>
					<Button
						onPress={() => {
							props.navigation.navigate('SearchScreen', {
								userID: userID
							});
						}}
					>
						Show Search Screen
					</Button>
					<Layout style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
						<BottomComponent></BottomComponent>
					</Layout>
				</ScrollView>
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
export default HomeScreen;
