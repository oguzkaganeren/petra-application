import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { MuseumLocationComponent } from '../../components/MuseumLocationComponent';
/**
 * Home props
 */
export interface MuseumMapProps {
	navigation: any;
}
/**
 * Home state
 */
export interface MuseumMapState {
	latitude: number;
	longtitude: number;
}

/**
 * Home
 */
export class MuseumMapScreen extends React.Component<MuseumMapProps, MuseumMapState> {
	constructor(props: MuseumMapProps) {
		super(props);
		this.state = {
			longtitude: 0,
			latitude: 0
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
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<MuseumLocationComponent
						latitude={value => {
							this.setState({
								latitude: value
							});
						}}
						longitude={value => {
							this.setState({
								longtitude: value
							});
						}}
					/>
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
