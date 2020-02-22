import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, TabView, Tab } from '@ui-kitten/components';
import { GetAllCitiesComponent } from '../../../components/Public/GetAllCitiesComponent';
import { ArchSiteLocationComponent } from '../../../components/ArchSite/ArchSiteLocationComponent';
import { MuseumLocationComponent } from '../../../components/Museum/MuseumLocationComponent';
import { RestaurantLocationComponent } from '../../../components/Restaurant/RestaurantLocationComponent';
import { HotelLocationComponent } from '../../../components/Hotel/HotelLocationComponent';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
/**
 * Home props
 */
export interface SearchProps {
	navigation: any;
}
/**
 * Home state
 */
export interface SearchState {
	cityID: number;
	errorMessage: String;
	userLoc: any;
	selectedIndex: number;
	setSelectedIndex: number;
}

/**
 * Home
 */
export class SearchScreen extends React.Component<SearchProps, SearchState> {
	constructor(props: SearchProps) {
		super(props);
		this.state = {
			cityID: 0,
			errorMessage: '',
			selectedIndex: 0,
			setSelectedIndex: 0,
			userLoc: null
		};
	}
	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied'
			});
		}

		let userLoc = await Location.getCurrentPositionAsync({});
		this.setState({ userLoc });
		console.log(userLoc);
	};
	/**
	 * Renders home
	 * @returns
	 */
	render() {
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
		return (
			<Layout style={{ flex: 1 }}>
				<GetAllCitiesComponent
					label="Where from"
					parentReference={value => {
						this.setState({ cityID: value });
					}}
				/>
				<Button appearance="outline" onPress={this._getLocationAsync}>
					Current my location
				</Button>
				<GetAllCitiesComponent
					label="Target"
					parentReference={value => {
						this.setState({ cityID: value });
					}}
				/>
				<TabView
					selectedIndex={this.state.selectedIndex}
					onSelect={value => {
						this.setState({ setSelectedIndex: value });
					}}
				>
					<Tab title="Yours">
						<Layout style={styles.tabContainer}></Layout>
					</Tab>
					<Tab title="Arch. Sites">
						<Layout style={styles.tabContainer}>
							<ArchSiteLocationComponent
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
						</Layout>
					</Tab>
					<Tab title="Museums">
						<Layout style={styles.tabContainer}>
							<MuseumLocationComponent
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
						</Layout>
					</Tab>
					<Tab title="Restaurants">
						<Layout style={styles.tabContainer}>
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
						</Layout>
					</Tab>
					<Tab title="Hotels">
						<Layout style={styles.tabContainer}>
							<HotelLocationComponent
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
						</Layout>
					</Tab>
				</TabView>
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
