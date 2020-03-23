import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Text, Layout, TabView, Tab } from '@ui-kitten/components';
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
	route: any;
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
		return (
			<Layout style={{ flex: 1 }}>
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
