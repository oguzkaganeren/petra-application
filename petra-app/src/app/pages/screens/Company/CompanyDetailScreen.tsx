import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Layout, ButtonGroup, Icon } from '@ui-kitten/components';
import CompanyInfoScreen from '../Company/CompanyInfoScreen';
export interface CompanyDetailProps {
	navigation: any;
	route: any;
}

const CompanyDetailScreen: React.FC<CompanyDetailProps> = (props) => {
	const { userID } = props.route.params;
	const { companyID } = props.route.params;
	const accessoryItemIcon = (style) => <Icon {...style} name="plus-circle-outline" />;
	return (
		<Layout style={{ flex: 1 }}>
			<CompanyInfoScreen navigation={props.navigation} route={props.route} companyID={companyID} />
		</Layout>
	);
};
const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2,
	},
});
export default CompanyDetailScreen;
