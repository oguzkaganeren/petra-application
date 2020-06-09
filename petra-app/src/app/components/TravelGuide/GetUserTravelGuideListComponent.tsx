import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, View } from 'react-native';
import { Button, Icon, List, ListItem, Layout, Text, ButtonGroup, Modal } from '@ui-kitten/components';
import { GetUserTravelGuideComponent } from '../../generated/components';
import { DeleteTravelGuideComponent } from '../../generated/components';
import * as Linking from 'expo-linking';
import { Formik } from 'formik';
declare var global: any;

export interface GetUserTravelGuideListProps {
	navigation: any;
	route: any;
}

const GetUserTravelGuideListComponent: React.FC<GetUserTravelGuideListProps> = (props) => {
	const [travelGuideList, setTravelGuideList] = React.useState([]);
	const [redirectUrl, setRedirectUrl] = React.useState('');
	const [tmpTitle, setTmpTitle] = React.useState('');
	const [removeItemBool, setRemoveItemBool] = React.useState(false);
	const [modalVisible, setModalVisible] = React.useState(false);
	const [shareModalVisible, setShareModalVisible] = React.useState(false);
	function removeItem(key) {
		setRemoveItemBool(true);
		const items = travelGuideList.filter((item, index) => Object.values(item)[0] !== key);
		console.log(items);
		setTravelGuideList(items);
	}
	const toggleModal = () => {
		setModalVisible(!modalVisible);
	};
	const shareToggleModal = () => {
		setShareModalVisible(!shareModalVisible);
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
	function deleteTravelGuide(item) {
		return (
			<Layout style={styles.accessory}>
				<Button
					onPress={() => {
						let redirectUrl = Linking.makeUrl('travelguide', { id: item.key });
						setRedirectUrl(redirectUrl);
						setTmpTitle(item.title);
						shareToggleModal();
					}}
					icon={shareIcon}
					appearance="ghost"
				></Button>
				<Modal backdropStyle={styles.backdrop} onBackdropPress={shareToggleModal} visible={shareModalVisible}>
					<Layout level="3" style={styles.modalContainer}>
						<Text category="h6">Share {tmpTitle} guide</Text>
						<View style={styles.alternativeContainer}>
							<Text style={{ margin: 8 }} appearance="alternative">
								{redirectUrl}
							</Text>
						</View>
					</Layout>
				</Modal>
				<DeleteTravelGuideComponent>
					{(DeleteTravelGuideMutation) => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								name: '',
							}}
							//Kaydet butonuna tıklandığında bu fonksiyon çalışır
							onSubmit={(values, formikActions) => {
								setTimeout(() => {
									console.log(values.name + ' ');
									DeleteTravelGuideMutation({
										variables: {
											travelGuideID: item.key,
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
									<Button onPress={toggleModal} icon={accessoryItemIcon} appearance="ghost"></Button>
									<Modal backdropStyle={styles.backdrop} onBackdropPress={toggleModal} visible={modalVisible}>
										{renderModalElement(fprops)}
									</Modal>
								</Layout>
							)}
						</Formik>
					)}
				</DeleteTravelGuideComponent>
			</Layout>
		);
	}
	function renderItemAccessory(item) {
		console.log(item.star);
		return global.userTypeID != 0 ? deleteTravelGuide(item) : null;
	}
	const renderItemIcon = (style) => <Icon {...style} name="briefcase-outline" />;
	const accessoryItemIcon = (style) => <Icon {...style} name="trash-2-outline" />;
	const shareIcon = (style) => <Icon {...style} name="share-outline" />;
	const renderItem = ({ item, index }) => {
		return (
			<ListItem
				key={item.key}
				title={`${item.title}`}
				description={`${item.description.split('T')[0]}`}
				icon={renderItemIcon}
				accessory={() => renderItemAccessory(item)}
				onPress={() => {
					props.navigation.navigate('TravelGuideDetailScreen', {
						travelGuideID: item.key,
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
						data.TravelGuide.map((dat) => {
							if (travelGuideList.length > 0 && !removeItemBool) {
								if (travelGuideList.every((item) => item.key != dat.travelGuideID)) {
									travelGuideList.push({
										key: dat.travelGuideID,
										title: dat.title,
										description: dat.creationDate,
										cost: dat.cost,
									});
								}
							} else if (!removeItemBool) {
								travelGuideList.push({
									key: dat.travelGuideID,
									title: dat.title,
									description: dat.creationDate,
									cost: dat.cost,
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
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
	},
	accessory: {
		flexDirection: 'row',
	},
	alternativeContainer: {
		borderRadius: 4,
		margin: 8,
		backgroundColor: '#3366FF',
	},
});
export default GetUserTravelGuideListComponent;
