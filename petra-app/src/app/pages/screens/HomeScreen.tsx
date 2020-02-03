import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { BottomComponent } from '../../components/BottomComponent';
import { SearchComponent } from '../../components/SearchComponent';
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
		this.state = {
			selectedTab: 0
		};
		this.updateIndex = this.updateIndex.bind(this);
	}
	updateIndex(selectedIndex) {
		this.setState({ selectedTab: selectedIndex });
	}
	/**
	 * Renders home
	 * @returns
	 */
	render() {
		const { selectedTab } = this.state;
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
		return (
			<Layout style={{ flex: 1 }}>
				<SearchComponent></SearchComponent>
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
				<Layout style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
					<BottomComponent></BottomComponent>
				</Layout>
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
