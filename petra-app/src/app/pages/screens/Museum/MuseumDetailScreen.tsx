import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, ButtonGroup, Icon } from '@ui-kitten/components';

export interface MuseumDetailProps {
	navigation: any;
	route: any;
}

const MuseumDetailScreen: React.FC<MuseumDetailProps> = (props) => {
	const { userID } = props.route.params;
	const { museumID } = props.route.params;
	const accessoryItemIcon = (style) => <Icon {...style} name="plus-circle-outline" />;
	return (
		<Layout style={{ flex: 1 }}>
			<ButtonGroup style={{ justifyContent: 'center' }}>
				<Button
					icon={accessoryItemIcon}
					onPress={() => {
						props.navigation.navigate('AddMuseumWorkingScheduleScreen', {
							userID: userID,
							museumID: museumID,
						});
					}}
				>
					Add Museum Working Schedule
				</Button>
				<Button
					icon={accessoryItemIcon}
					onPress={() => {
						props.navigation.navigate('AddMuseumPriceScreen', {
							userID: userID,
							museumID: museumID,
						});
					}}
				>
					Add Museum Price
				</Button>
			</ButtonGroup>
			{/* <Button
				onPress={() => {
					props.navigation.navigate('AddMuseumCommentScreen', {
						userID: userID,
						museumID: museumID
					});
				}}
			>
				Add Museum Comment
			</Button> */}
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2,
	},
});
export default MuseumDetailScreen;
