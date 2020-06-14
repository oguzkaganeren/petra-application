import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Icon, List, ListItem, Layout, Text, ButtonGroup, Modal } from '@ui-kitten/components';
import { GetUserArticleComponent } from '../../generated/components';
import { DeleteArticleComponent } from '../../generated/components';
import StarRating from 'react-native-star-rating';
import { Formik } from 'formik';
declare var global: any;

export interface GetUserArticleListProps {
	navigation: any;
	route: any;
}

const GetUserArticleList: React.FC<GetUserArticleListProps> = (props) => {
	const [articleList, setArticleList] = React.useState([]);
	const [removeItemBool, setRemoveItemBool] = React.useState(false);
	const [modalVisible, setModalVisible] = React.useState(false);
	function removeItem(key) {
		setRemoveItemBool(true);
		const items = articleList.filter((item, index) => Object.values(item)[0] !== key);
		console.log(items);
		setArticleList(items);
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
	function deleteArticle(item) {
		return (
			<DeleteArticleComponent>
				{(DeleteArticleMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							name: '',
						}}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								console.log(values.name + ' ');
								DeleteArticleMutation({
									variables: {
										articleID: item.key,
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
										props.navigation.navigate('EditArticleScreen', {
											articleID: item.key,
										});
									}}
									disabled={fprops.isSubmitting}
								>
									Edit
								</Button>
								<Button onPress={toggleModal} icon={accessoryItemIcon} appearance="ghost"></Button>
								<Modal backdropStyle={styles.backdrop} onBackdropPress={toggleModal} visible={modalVisible}>
									{renderModalElement(fprops)}
								</Modal>
							</Layout>
						)}
					</Formik>
				)}
			</DeleteArticleComponent>
		);
	}
	function renderItemAccessory(item) {
		console.log(item.star);
		return global.userTypeID == 5 || global.userTypeID == 4 || global.userTypeID == 2 ? (
			deleteArticle(item)
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
					props.navigation.navigate('ArticleDetailScreen', {
						articleID: item.key,
					});
				}}
			/>
		);
	};
	return (
		<Layout style={{ flex: 1 }}>
			<GetUserArticleComponent variables={{ userID: global.userID }}>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Article.map((dat) => {
							if (articleList.length > 0 && !removeItemBool) {
								if (articleList.every((item) => item.key != dat.articleID)) {
									articleList.push({
										key: dat.articleID,
										title: dat.title,
										content: dat.content,
									});
								}
							} else if (!removeItemBool) {
								articleList.push({
									key: dat.articleID,
									title: dat.title,
									content: dat.content,
								});
							}
						});
					}
					return <List data={articleList} renderItem={renderItem} />;
				}}
			</GetUserArticleComponent>
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
export default GetUserArticleList;
