import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { BottomComponent } from '../../../components/Public/BottomComponent';
/**
 * Home props
 */
export interface MuseumDetailScreenProps {
	navigation: any;
	route: any;
}
/**
 * Home state
 */
export interface MuseumDetailScreenState {}

/**
 * Home
 */
export class MuseumDetailScreen extends React.Component<MuseumDetailScreenProps, MuseumDetailScreenState> {
	constructor(props: MuseumDetailScreenProps) {
		super(props);
		this.state = {};
	}
	/**
	 * Renders ArchSite Detail Screen
	 * @returns
	 */
	render() {
		const { userID } = this.props.route.params;
		const { museumID } = this.props.route.params;
		return (
			<Layout style={{ flex: 1 }}>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddMuseumTypeScreen', {
							userID: userID
						});
					}}
				>
					Add Museum Type
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddMuseumScreen', {
							userID: userID
						});
					}}
				>
					Add Museum
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddMuseumCommentScreen', {
							userID: userID,
							museumID: museumID
						});
					}}
				>
					Add Museum Comment
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddMuseumEntranceTypeScreen', {
							userID: userID
						});
					}}
				>
					Add Museum Entrance Type
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddMuseumWorkingScheduleScreen', {
							userID: userID,
							museumID: museumID
						});
					}}
				>
					Add Museum Working Schedule
				</Button>
				<Button
					onPress={() => {
						this.props.navigation.navigate('AddMuseumPriceScreen', {
							userID: userID,
							museumID: museumID
						});
					}}
				>
					Add Museum Price
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
