import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Icon, List, ListItem, Layout, Text, ButtonGroup, Modal, Spinner } from '@ui-kitten/components';
import { GetUserCompanyComponent } from '../../generated/components';
import { DeleteCompanyComponent } from '../../generated/components';
import { Formik } from 'formik';
import StarRating from 'react-native-star-rating';

declare var global: any;

export interface GetUserCompanyListProps {
	navigation: any;
	route: any;
}

const GetUserCompanyList: React.FC<GetUserCompanyListProps> = (props) => {
	const [companyList, setCompanyList] = React.useState([]);
	const [removeItemBool, setRemoveItemBool] = React.useState(false);
	const [deleteItem, setDeleteItem] = React.useState(null);
	const [modalVisible, setModalVisible] = React.useState(false);
	function removeItem(key) {
		setRemoveItemBool(true);
		const items = companyList.filter((item, index) => Object.values(item)[0] !== key);
		console.log(items);
		setCompanyList(items);
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
	function deleteCompany(item) {
		return (
			<DeleteCompanyComponent>
				{(DeleteCompanyMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							name: '',
						}}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								console.log(values.name + ' ');
								DeleteCompanyMutation({
									variables: {
										companyID: deleteItem.key,
									},
								})
									.then((res) => {
										removeItem(deleteItem.key);
										//this.props.navigation.navigate('Home');
									})
									.catch((err) => {
										alert(err);
										console.log('Company:' + values.name);
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
										props.navigation.navigate('EditCompanyScreen', {
											companyID: item.key,
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
			</DeleteCompanyComponent>
		);
	}
	function renderItemAccessory(item) {
		console.log(item.star);
		return global.userTypeID == 5 || global.userTypeID == 4 || global.userTypeID == 2 ? (
			deleteCompany(item)
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
					props.navigation.navigate('CompanyDetailScreen', {
						companyID: item.key,
					});
				}}
			/>
		);
	};
	return (
		<Layout style={{ flex: 1 }}>
			<GetUserCompanyComponent variables={{ userID: global.userID }}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						companyList.splice(0);
						data.Company.map((dat) => {
							if (companyList.length > 0) {
								if (companyList.every((item) => item.key != dat.companyID)) {
									companyList.push({
										key: dat.companyID,
										title: dat.name,
										description: dat.description == null ? '' : dat.description,
										faxNumber: dat.faxNumber == null ? '' : dat.faxNumber,
										taxNumber: dat.taxNumber == null ? '' : dat.taxNumber,
										mail: dat.mail,
										registerDate: dat.registerDate,
									});
								}
							} else {
								companyList.push({
									key: dat.companyID,
									title: dat.name,
									description: dat.description == null ? '' : dat.description,
									faxNumber: dat.faxNumber == null ? '' : dat.faxNumber,
									taxNumber: dat.taxNumber == null ? '' : dat.taxNumber,
									mail: dat.mail,
									registerDate: dat.registerDate,
								});
							}
						});
					}
					return <List data={companyList} renderItem={renderItem} />;
				}}
			</GetUserCompanyComponent>
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
export default GetUserCompanyList;
