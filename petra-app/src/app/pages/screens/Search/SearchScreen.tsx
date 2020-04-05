import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, Layout, TabView, Tab } from '@ui-kitten/components';
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
			setSelectedIndex: 0,
		};
	}

	/**
	 * Renders home
	 * @returns
	 */
	render() {
		return (
			<Layout style={{ flex: 1 }}>
				<SearchMapComponent navigation={this.props.navigation} route={this.props.route} />
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2,
	},
});
