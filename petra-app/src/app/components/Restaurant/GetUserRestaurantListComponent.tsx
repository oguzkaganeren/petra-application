import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Icon, List, ListItem, Layout, Text, ButtonGroup, Modal, Spinner } from '@ui-kitten/components';
import { GetUserRestaurantComponent } from '../../generated/components';
import { DeleteRestaurantComponent } from '../../generated/components';
import StarRating from 'react-native-star-rating';
import { Formik } from 'formik';
declare var global: any;

export interface GetUserRestaurantListProps {
	navigation: any;
	route: any;
}

const GetUserRestaurantListComponent: React.FC<GetUserRestaurantListProps> = (props) => {
	const [restaurantList, setRestaurantList] = React.useState([]);
	const [removeItemBool, setRemoveItemBool] = React.useState(false);
	const [deleteItem, setDeleteItem] = React.useState(null);
	const [modalVisible, setModalVisible] = React.useState(false);
	function removeItem(key) {
		setRemoveItemBool(true);
		const items = restaurantList.filter((item, index) => Object.values(item)[0] !== key);
		console.log(items);
		setRestaurantList(items);
	}
	const toggleModal = () => {
		setModalVisible(!modalVisible);
	};
	const renderModalElement = (fprops) => (
		<Layout level="3" style={styles.modalContainer}>
			<Text>Are you sure delete the item?</Text>
			<ButtonGroup style={{ justifyContent: 'center' }}>
				<Button
					icon={accessoryItemIcon}
					appearance="ghost"
					onPress={() => {
						fprops.handleSubmit();
						toggleModal();
					}}
					disabled={fprops.isSubmitting}
				>
					Delete
				</Button>
				<Button
					onPress={() => {
						toggleModal();
					}}
				>
					Cancel
				</Button>
			</ButtonGroup>
		</Layout>
	);
	function deleteRestaurant(item) {
		return (
			<DeleteRestaurantComponent>
				{(DeleteRestaurantMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							name: '',
						}}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								console.log(values.name + ' ');
								DeleteRestaurantMutation({
									variables: {
										restaurantID: deleteItem.key,
									},
								})
									.then((res) => {
										removeItem(deleteItem.key);
										//this.props.navigation.navigate('Home');
									})
									.catch((err) => {
										alert(err);
										console.log('Restaurant:' + values.name);
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
										props.navigation.navigate('EditRestaurantScreen', {
											restaurantID: item.key,
										});
									}}
									disabled={fprops.isSubmitting}
								>
									Edit
								</Button>
								<Button
									onPress={() => {
										toggleModal();
										setDeleteItem(item);
									}}
									icon={accessoryItemIcon}
									appearance="ghost"
								></Button>
								<Modal backdropStyle={styles.backdrop} onBackdropPress={toggleModal} visible={modalVisible}>
									{renderModalElement(fprops)}
								</Modal>
							</Layout>
						)}
					</Formik>
				)}
			</DeleteRestaurantComponent>
		);
	}
	function renderItemAccessory(item) {
		console.log(item.star);
		return global.userTypeID == 5 || global.userTypeID == 4 || global.userTypeID == 2 ? (
			deleteRestaurant(item)
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
				icon={renderItemIcon}
				accessory={() => renderItemAccessory(item)}
				onPress={() => {
					props.navigation.navigate('RestaurantDetailScreen', {
						restaurantID: item.key,
						userID: global.userID,
					});
				}}
			/>
		);
	};
	return (
		<Layout style={{ flex: 1 }}>
			<GetUserRestaurantComponent variables={{ userID: global.userID }}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						restaurantList.splice(0);
						data.Restaurant.map((dat) => {
							if (restaurantList.length > 0) {
								if (restaurantList.every((item) => item.key != dat.restaurantID)) {
									restaurantList.push({
										key: dat.restaurantID,
										title: dat.name,
										//description: dat.description == null ? '' : dat.description,
										star: dat.star,
										companyName: dat.Company.name,
									});
								}
							} else {
								restaurantList.push({
									key: dat.restaurantID,
									title: dat.name,
									//description: dat.description == null ? '' : dat.description,
									star: dat.star,
									companyName: dat.Company.name,
								});
							}
						});
					}
					return <List data={restaurantList} renderItem={renderItem} />;
				}}
			</GetUserRestaurantComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2,
	},
	modalContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 256,
		padding: 16,
		borderRadius: 15,
	},
	backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
});
export default GetUserRestaurantListComponent;
