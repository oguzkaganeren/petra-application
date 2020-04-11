import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Icon, List, ListItem, Layout, Text } from '@ui-kitten/components';
import { GetUserTravelGuideComponent } from '../../generated/components';
import { DeleteTravelGuideComponent } from '../../generated/components';
import { Formik } from 'formik';
declare var global: any;
/**
 * Home props
 */
export interface GetUserTravelGuideListProps {
	navigation: any;
	route: any;
}

/**
 * Home
 */
const GetUserTravelGuideList: React.FC<GetUserTravelGuideListProps> = props => {
	const [travelGuideList, setTravelGuideList] = React.useState([]);
	const [removeItemBool, setRemoveItemBool] = React.useState(false);
	function removeItem(key) {
		setRemoveItemBool(true);
		const items = travelGuideList.filter((item, index) => Object.values(item)[0] !== key);
		console.log(items);
		setTravelGuideList(items);
	}
	function deleteTravelGuide(item) {
		return (
			<DeleteTravelGuideComponent>
				{DeleteTravelGuideMutation => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							name: ''
						}}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								console.log(values.name + ' ');
								DeleteTravelGuideMutation({
									variables: {
										travelGuideID: item.key
									}
								})
									.then(res => {
										removeItem(item.key);
										//this.props.navigation.navigate('Home');
									})
									.catch(err => {
										alert(err);
										console.log('ArchSiteType:' + values.name);
									});
								formikActions.setSubmitting(false);
							}, 500);
						}}
					>
						{/* Bu kısımda görsel parçalar eklenir */}
						{fprops => (
							<Layout>
								<Button
									icon={accessoryItemIcon}
									appearance="ghost"
									onPress={() => {
										fprops.handleSubmit();
									}}
									disabled={fprops.isSubmitting}
								></Button>
							</Layout>
						)}
					</Formik>
				)}
			</DeleteTravelGuideComponent>
		);
	}
	function renderItemAccessory(item) {
		console.log(item.star);
		return global.userTypeID != 0 ? deleteTravelGuide(item) : null;
	}
	const renderItemIcon = style => <Icon {...style} name="briefcase-outline" />;
	const accessoryItemIcon = style => <Icon {...style} name="trash-2-outline" />;
	const renderItem = ({ item, index }) => {
		return (
			<ListItem
				key={item.key}
				title={`${item.title}`}
				description={`${item.description.split('T')[0]}`}
				icon={renderItemIcon}
				accessory={() => renderItemAccessory(item)}
				onPress={() => {
					props.navigation.navigate('HotelDetailScreen', {
						hotelID: item.key
					});
				}}
			/>
		);
	};
	return (
		<Layout style={{ flex: 1 }}>
			<GetUserTravelGuideComponent variables={{ userID: global.userID }}>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.TravelGuide.map(dat => {
							if (travelGuideList.length > 0 && !removeItemBool) {
								if (travelGuideList.every(item => item.key != dat.travelGuideID)) {
									travelGuideList.push({
										key: dat.travelGuideID,
										title: dat.title,
										description: dat.creationDate,
										cost: dat.cost
									});
								}
							} else if (!removeItemBool) {
								travelGuideList.push({
									key: dat.travelGuideID,
									title: dat.title,
									description: dat.creationDate,
									cost: dat.cost
								});
							}
						});
					}
					return <List data={travelGuideList} renderItem={renderItem} />;
				}}
			</GetUserTravelGuideComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2
	}
});
export default GetUserTravelGuideList;
