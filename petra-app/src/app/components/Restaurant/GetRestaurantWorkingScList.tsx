import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Icon, List, ListItem, Layout, Text, ButtonGroup, Modal, Spinner } from '@ui-kitten/components';
import { GetRestaurantWorkingScheduleListComponent } from '../../generated/components';
import { DeleteRestaurantWorkingScComponent } from '../../generated/components';
import { Formik } from 'formik';
declare var global: any;

export interface GetRestaurantWorkingScListProps {
	navigation: any;
	route: any;
	restaurantID: any;
}

const GetRestaurantWorkingScListComponent: React.FC<GetRestaurantWorkingScListProps> = (props) => {
	const [restaurantWorkingList, setRestaurantWorkingList] = React.useState([]);
	const [deleteItem, setDeleteItem] = React.useState(null);
	const [modalVisible, setModalVisible] = React.useState(false);
	const { restaurantID } = props.route.params;
	function removeItem(key) {
		const items = restaurantWorkingList.filter((item, index) => Object.values(item)[0] !== key);
		setRestaurantWorkingList(items);
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
			<DeleteRestaurantWorkingScComponent>
				{(DeleteRestaurantWorkingScMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							name: '',
						}}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								DeleteRestaurantWorkingScMutation({
									variables: {
										restaurantWorkingScID: deleteItem.key,
									},
								})
									.then((res) => {
										console.log('test' + deleteItem.key);
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
			</DeleteRestaurantWorkingScComponent>
		);
	}
	function renderItemAccessory(item) {
		console.log(item.star);
		return global.userTypeID == 5 || global.userTypeID == 4 || global.userTypeID == 2 ? deleteRestaurant(item) : null;
	}
	const renderItemIcon = (style) => <Icon {...style} name="clock-outline" />;
	const accessoryItemIcon = (style) => <Icon {...style} name="trash-2-outline" />;
	const renderItem = ({ item, index }) => {
		return (
			<ListItem
				key={item.key}
				title={`${item.title}`}
				description={`${
					item.days.Day.name + ' ' + item.days.openHour.split('+')[0] + '~' + item.days.closeHour.split('+')[0]
				}`}
				icon={renderItemIcon}
				accessory={() => renderItemAccessory(item)}
				onPress={() => {}}
			/>
		);
	};
	function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	}
	return (
		<Layout style={{ flex: 1 }}>
			<GetRestaurantWorkingScheduleListComponent variables={{ restaurantID: restaurantID }}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						restaurantWorkingList.splice(0);
						data.RestaurantWorkingSchedule.map((dat) => {
							if (restaurantWorkingList.length > 0) {
								if (restaurantWorkingList.every((item) => item.key != dat.restaurantWorkingScheduleID)) {
									restaurantWorkingList.push({
										key: dat.restaurantWorkingScheduleID,
										title: formatDate(dat.startDate) + '~' + formatDate(dat.finishDate),
										days: dat.RestaurantWorkingDaySchedules[0].RestaurantWorkingDay,
									});
								}
							} else {
								restaurantWorkingList.push({
									key: dat.restaurantWorkingScheduleID,
									title: formatDate(dat.startDate) + '~' + formatDate(dat.finishDate),
									days: dat.RestaurantWorkingDaySchedules[0].RestaurantWorkingDay,
								});
							}
						});
					}
					return <List data={restaurantWorkingList} renderItem={renderItem} />;
				}}
			</GetRestaurantWorkingScheduleListComponent>
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
export default GetRestaurantWorkingScListComponent;
