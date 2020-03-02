import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Text, Layout, TabView, Tab } from '@ui-kitten/components';
import { GetAllCitiesComponent } from '../../../components/Public/GetAllCitiesComponent';
import { ArchSiteLocationComponent } from '../../../components/ArchSite/ArchSiteLocationComponent';
import { MuseumLocationComponent } from '../../../components/Museum/MuseumLocationComponent';
import { RestaurantLocationComponent } from '../../../components/Restaurant/RestaurantLocationComponent';
import { HotelLocationComponent } from '../../../components/Hotel/HotelLocationComponent';
import { SearchMapComponent } from '../../../components/Search/SearchMapComponent';
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
			selectedIndex: 0,
			setSelectedIndex: 0
		};
	}

	/**
	 * Renders home
	 * @returns
	 */
	render() {
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
		return (
			<Layout style={{ flex: 1 }}>
				<Text>Please Select a start point and end point</Text>
				<SearchMapComponent
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
