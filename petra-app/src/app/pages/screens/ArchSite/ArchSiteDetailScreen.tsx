import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
/**
 * Home props
 */
export interface ArchSiteDetailScreenProps {
	navigation: any;
	route: any;
}
/**
 * Home state
 */
export interface ArchSiteDetailScreenState {}

/**
 * Home
 */
export class ArchSiteDetailScreen extends React.Component<ArchSiteDetailScreenProps, ArchSiteDetailScreenState> {
	constructor(props: ArchSiteDetailScreenProps) {
		super(props);
		this.state = {};
	}
	/**
	 * Renders ArchSite Detail Screen
	 * @returns
	 */
	render() {
		const { userID } = this.props.route.params;
		const { archSiteID } = this.props.route.params;
		return (
			<Layout style={{ flex: 1 }}>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddArchSiteTypeScreen', {
							userID: userID
						});
					}}
				>
					Add ArchSite Type
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddArchSiteScreen', {
							userID: userID
						});
					}}
				>
					Add ArchSite
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddArchSiteCommentScreen', {
							userID: userID,
							archSiteID: archSiteID
						});
					}}
				>
					Add ArchSite Comment
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddArchSiteEntranceTypeScreen', {
							userID: userID
						});
					}}
				>
					Add ArchSite Entrance Type
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddArchSiteWorkingScheduleScreen', {
							userID: userID,
							archSiteID: archSiteID
						});
					}}
				>
					Add ArchSite Working Schedule
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddArchSitePriceScreen', {
							userID: userID,
							archSiteID: archSiteID
						});
					}}
				>
					Add ArchSite Price
				</Button>
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
