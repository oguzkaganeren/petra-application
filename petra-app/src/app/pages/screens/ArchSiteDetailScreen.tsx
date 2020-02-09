import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { BottomComponent } from '../../components/BottomComponent';
/**
 * Home props
 */
export interface ArchSiteDetailScreenProps {
	navigation: any;
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
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
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
							archSiteID: 1 //Değişecek
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
							userID: userID
						});
					}}
				>
					Add ArchSite Working Schedule
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
