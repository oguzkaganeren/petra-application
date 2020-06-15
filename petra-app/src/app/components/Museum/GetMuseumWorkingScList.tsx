import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Icon, List, ListItem, Layout, Text, ButtonGroup, Modal, Spinner } from '@ui-kitten/components';
import { GetMuseumWorkingScheduleListComponent } from '../../generated/components';
import { DeleteMuseumWorkingScComponent } from '../../generated/components';
import { Formik } from 'formik';
declare var global: any;

export interface GetMuseumWorkingScListProps {
	navigation: any;
	route: any;
	museumID: any;
}

const GetMuseumWorkingScListComponent: React.FC<GetMuseumWorkingScListProps> = (props) => {
	const [museumWorkingList, setMuseumWorkingList] = React.useState([]);
	const [deleteItem, setDeleteItem] = React.useState(null);
	const [modalVisible, setModalVisible] = React.useState(false);
	const { museumID } = props.route.params;
	function removeItem(key) {
		const items = museumWorkingList.filter((item, index) => Object.values(item)[0] !== key);
		setMuseumWorkingList(items);
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
	function deleteMuseumWS(item) {
		return (
			<DeleteMuseumWorkingScComponent>
				{(DeleteMuseumWorkingScMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							name: '',
						}}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								DeleteMuseumWorkingScMutation({
									variables: {
										museumWorkingScID: deleteItem.key,
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
			</DeleteMuseumWorkingScComponent>
		);
	}
	function renderItemAccessory(item) {
		console.log(item.star);
		return global.userTypeID == 5 || global.userTypeID == 4 || global.userTypeID == 2 ? deleteMuseumWS(item) : null;
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
			<Text category={'h6'}>Working Schedule List</Text>
			<GetMuseumWorkingScheduleListComponent variables={{ museumID: museumID }}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						museumWorkingList.splice(0);
						data.MuseumWorkingSchedule.map((dat) => {
							if (museumWorkingList.length > 0) {
								if (museumWorkingList.every((item) => item.key != dat.museumWorkingScheduleID)) {
									museumWorkingList.push({
										key: dat.museumWorkingScheduleID,
										title: formatDate(dat.startDate) + '~' + formatDate(dat.finishDate),
										days: dat.MuseumWorkingDaySchedules[0].MuseumWorkingDay,
									});
								}
							} else {
								museumWorkingList.push({
									key: dat.museumWorkingScheduleID,
									title: formatDate(dat.startDate) + '~' + formatDate(dat.finishDate),
									days: dat.MuseumWorkingDaySchedules[0].MuseumWorkingDay,
								});
							}
						});
					}
					return <List data={museumWorkingList} renderItem={renderItem} />;
				}}
			</GetMuseumWorkingScheduleListComponent>
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
export default GetMuseumWorkingScListComponent;
