import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Icon, List, ListItem, Layout, Text, ButtonGroup, Modal, Spinner } from '@ui-kitten/components';
import { GetArchSitePriceListComponent } from '../../generated/components';
import { DeleteArchSitePriceComponent } from '../../generated/components';
import { Formik } from 'formik';
declare var global: any;

export interface GetArchSitePricesListProps {
	navigation: any;
	route: any;
	archSiteID: any;
}

const GetArchSitePricesListComponent: React.FC<GetArchSitePricesListProps> = (props) => {
	const [archSitePriceList, setArchSitePriceList] = React.useState([]);
	const [deleteItem, setDeleteItem] = React.useState(null);
	const [modalVisible, setModalVisible] = React.useState(false);
	const { archSiteID } = props.route.params;
	function removeItem(key) {
		const items = archSitePriceList.filter((item, index) => Object.values(item)[0] !== key);
		setArchSitePriceList(items);
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
			<DeleteArchSitePriceComponent>
				{(DeleteArchSitePriceMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							name: '',
						}}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								DeleteArchSitePriceMutation({
									variables: {
										archSitePriceID: deleteItem.key,
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
			</DeleteArchSitePriceComponent>
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
				description={`${item.entranceType + '~' + item.price + '₺'}`}
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
			<Text category={'h6'}>Price List</Text>
			<GetArchSitePriceListComponent variables={{ archSiteID: archSiteID }}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						archSitePriceList.splice(0);
						data.ArchSitePrice.map((dat) => {
							if (archSitePriceList.length > 0) {
								if (archSitePriceList.every((item) => item.key != dat.archSitePriceID)) {
									archSitePriceList.push({
										key: dat.archSitePriceID,
										title: formatDate(dat.startDate) + '~' + formatDate(dat.finishDate),
										price: dat.price,
										entranceType: dat.ArchSiteEntranceType.content,
									});
								}
							} else {
								archSitePriceList.push({
									key: dat.archSitePriceID,
									title: formatDate(dat.startDate) + '~' + formatDate(dat.finishDate),
									price: dat.price,
									entranceType: dat.ArchSiteEntranceType.content,
								});
							}
						});
					}
					return <List data={archSitePriceList} renderItem={renderItem} />;
				}}
			</GetArchSitePriceListComponent>
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
export default GetArchSitePricesListComponent;
