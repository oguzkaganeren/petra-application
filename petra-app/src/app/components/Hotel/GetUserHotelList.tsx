import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Icon, List, ListItem, Layout, Text } from '@ui-kitten/components';
import { GetUserHotelComponent } from '../../generated/components';
import { DeleteHotelComponent } from '../../generated/components';
import StarRating from 'react-native-star-rating';
import { Formik } from 'formik';
declare var global: any;
/**
 * Home props
 */
export interface GetUserHotelListProps {
	navigation: any;
	route: any;
}

/**
 * Home
 */
const GetUserHotelList: React.FC<GetUserHotelListProps> = (props) => {
	const [hotelList, setHotelList] = React.useState([]);
	const [removeItemBool, setRemoveItemBool] = React.useState(false);
	function removeItem(key) {
		setRemoveItemBool(true);
		const items = hotelList.filter((item, index) => Object.values(item)[0] !== key);
		console.log(items);
		setHotelList(items);
	}
	function deleteHotel(item) {
		return (
			<DeleteHotelComponent>
				{(DeleteHotelMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							name: '',
						}}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								console.log(values.name + ' ');
								DeleteHotelMutation({
									variables: {
										hotelID: item.key,
									},
								})
									.then((res) => {
										removeItem(item.key);
										//this.props.navigation.navigate('Home');
									})
									.catch((err) => {
										alert(err);
										console.log('ArchSiteType:' + values.name);
									});
								formikActions.setSubmitting(false);
							}, 500);
						}}
					>
						{/* Bu kısımda görsel parçalar eklenir */}
						{(fprops) => (
							<Layout>
								<Button
									appearance="ghost"
									onPress={() => {
										props.navigation.navigate('EditHotelScreen', {
											hotelID: item.key,
										});
									}}
									disabled={fprops.isSubmitting}
								>
									Edit
								</Button>
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
			</DeleteHotelComponent>
		);
	}
	function renderItemAccessory(item) {
		console.log(item.star);
		return global.userTypeID == 5 || global.userTypeID == 4 || global.userTypeID == 2 ? (
			deleteHotel(item)
		) : (
			<StarRating
				disabled={false}
				emptyStar={'ios-star-outline'}
				fullStar={'ios-star'}
				halfStar={'ios-star-half'}
				iconSet={'Ionicons'}
				maxStars={5}
				rating={item.star}
				starSize={25}
				fullStarColor={'orange'}
			/>
		);
	}
	const renderItemIcon = (style) => <Icon {...style} name="briefcase-outline" />;
	const accessoryItemIcon = (style) => <Icon {...style} name="trash-2-outline" />;
	const renderItem = ({ item, index }) => {
		return (
			<ListItem
				key={item.key}
				title={`${item.title}`}
				description={`${item.description}`}
				icon={renderItemIcon}
				accessory={() => renderItemAccessory(item)}
				onPress={() => {
					props.navigation.navigate('HotelDetailScreen', {
						hotelID: item.key,
					});
				}}
			/>
		);
	};
	return (
		<Layout style={{ flex: 1 }}>
			<GetUserHotelComponent variables={{ userID: global.userID }}>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Hotel.map((dat) => {
							if (hotelList.length > 0 && !removeItemBool) {
								if (hotelList.every((item) => item.key != dat.hotelID)) {
									hotelList.push({
										key: dat.hotelID,
										title: dat.name,
										description: dat.description == null ? '' : dat.description,
										star: dat.star,
										companyName: dat.Company.name,
									});
								}
							} else if (!removeItemBool) {
								hotelList.push({
									key: dat.hotelID,
									title: dat.name,
									description: dat.description == null ? '' : dat.description,
									star: dat.star,
									companyName: dat.Company.name,
								});
							}
						});
					}
					return <List data={hotelList} renderItem={renderItem} />;
				}}
			</GetUserHotelComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2,
	},
});
export default GetUserHotelList;
