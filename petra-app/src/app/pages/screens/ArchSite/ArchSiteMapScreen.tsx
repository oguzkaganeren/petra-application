import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { ArchSiteLocationComponent } from '../../../components/ArchSite/ArchSiteLocationComponent';
/**
 * Home props
 */
export interface ArchSiteMapProps {
	navigation: any;
}
/**
 * Home state
 */
export interface ArchSiteMapState {
	latitude: number;
	longtitude: number;
}

/**
 * Home
 */
export class ArchSiteMapScreen extends React.Component<ArchSiteMapProps, ArchSiteMapState> {
	constructor(props: ArchSiteMapProps) {
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
