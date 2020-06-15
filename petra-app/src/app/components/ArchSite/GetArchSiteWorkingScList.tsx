import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Icon, List, ListItem, Layout, Text, ButtonGroup, Modal, Spinner } from '@ui-kitten/components';
import { GetArchSiteWorkingScheduleListComponent } from '../../generated/components';
import { DeleteArchSiteWorkingScComponent } from '../../generated/components';
import { Formik } from 'formik';
declare var global: any;

export interface GetArchSiteWorkingScListProps {
	navigation: any;
	route: any;
	archSiteID: any;
}

const GetArchSiteWorkingScListComponent: React.FC<GetArchSiteWorkingScListProps> = (props) => {
	const [archSiteWorkingList, setArchSiteWorkingList] = React.useState([]);
	const [deleteItem, setDeleteItem] = React.useState(null);
	const [modalVisible, setModalVisible] = React.useState(false);
	const { archSiteID } = props.route.params;
	function removeItem(key) {
		const items = archSiteWorkingList.filter((item, index) => Object.values(item)[0] !== key);
		setArchSiteWorkingList(items);
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
			<DeleteArchSiteWorkingScComponent>
				{(DeleteArchSiteWorkingScMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							name: '',
						}}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								DeleteArchSiteWorkingScMutation({
									variables: {
										archSiteWorkingScID: deleteItem.key,
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
			</DeleteArchSiteWorkingScComponent>
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
			<Text category={'h6'}>Working Schedules</Text>
			<GetArchSiteWorkingScheduleListComponent variables={{ archSiteID: archSiteID }}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						archSiteWorkingList.splice(0);
						data.ArchSiteWorkingSchedule.map((dat) => {
							if (archSiteWorkingList.length > 0) {
								if (archSiteWorkingList.every((item) => item.key != dat.museumWorkingScheduleID)) {
									archSiteWorkingList.push({
										key: dat.archSiteWorkingScheduleID,
										title: formatDate(dat.startDate) + '~' + formatDate(dat.finishDate),
										days: dat.ArchSiteWorkingDaySchedules[0].ArchSiteWorkingDay,
									});
								}
							} else {
								archSiteWorkingList.push({
									key: dat.archSiteWorkingScheduleID,
									title: formatDate(dat.startDate) + '~' + formatDate(dat.finishDate),
									days: dat.ArchSiteWorkingDaySchedules[0].ArchSiteWorkingDay,
								});
							}
						});
					}
					return <List data={archSiteWorkingList} renderItem={renderItem} />;
				}}
			</GetArchSiteWorkingScheduleListComponent>
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
export default GetArchSiteWorkingScListComponent;
