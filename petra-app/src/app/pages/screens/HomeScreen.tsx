import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { BottomComponent } from '../../components/Public/BottomComponent';
import { SearchComponent } from '../../components/Public/SearchComponent';

/**
 * Home props
 */
export interface HomeProps {
	navigation: any;
}
/**
 * Home state
 */
export interface HomeState {}

/**
 * Home
 */
export class HomeScreen extends React.Component<HomeProps, HomeState> {
	constructor(props: HomeProps) {
		super(props);
		this.state = {};
	}
	/**
	 * Renders home
	 * @returns
	 */
	render() {
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
		return (
			<Layout style={{ flex: 1 }}>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<Button
						onPress={() => {
							this.props.navigation.navigate('AddCompanyScreen', {
								userID: userID
							});
						}}
					>
						Add Company
					</Button>
					<Button
						onPress={() => {
							this.props.navigation.navigate('AddRestaurantScreen', {
								userID: userID
							});
						}}
					>
						Add Restaurant
					</Button>
					<Button
						onPress={() => {
							this.props.navigation.navigate('RestaurantDetailScreen', {
								userID: userID
							});
						}}
					>
						Restaurant Details
					</Button>
					<Button
						onPress={() => {
							this.props.navigation.navigate('ArchSiteDetailScreen', {
								userID: userID
							});
						}}
					>
						ArchSite Details
					</Button>
					<Button
						onPress={() => {
							this.props.navigation.navigate('MuseumDetailScreen', {
								userID: userID
							});
						}}
					>
						Museum Details
					</Button>
					<Button
						onPress={() => {
							this.props.navigation.navigate('AddHotelScreen', {
								userID: userID
							});
						}}
					>
						Add Hotel
					</Button>
					<Button
						onPress={() => {
							this.props.navigation.navigate('HotelDetailScreen', {
								userID: userID
							});
						}}
					>
						Hotel Details
					</Button>
					<Button
						onPress={() => {
							this.props.navigation.navigate('ArticleDetailScreen', {
								userID: userID
							});
						}}
					>
						Article Details
					</Button>
					<Button
						onPress={() => {
							this.props.navigation.navigate('MapScreen', {
								userID: userID
							});
						}}
					>
						Map Screen
					</Button>
					<Button
						onPress={() => {
							this.props.navigation.navigate('AddTravelGuideScreen', {
								userID: userID
							});
						}}
					>
						Add Travel Guide
					</Button>
					<Layout style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
						<BottomComponent></BottomComponent>
					</Layout>
				</ScrollView>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2
	}
});
