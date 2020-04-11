import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Icon, List, ListItem, Layout, Text } from '@ui-kitten/components';
import { GetUserArchSiteComponent } from '../../generated/components';
import { DeleteArchSiteComponent } from '../../generated/components';
import StarRating from 'react-native-star-rating';
import { Formik } from 'formik';
declare var global: any;
/**
 * Home props
 */
export interface GetUserArchSiteListProps {
	navigation: any;
	route: any;
}

/**
 * Home
 */
const GetUserArchSiteList: React.FC<GetUserArchSiteListProps> = props => {
	const [archSiteList, setArchSiteList] = React.useState([]);
	const [removeItemBool, setRemoveItemBool] = React.useState(false);
	function removeItem(key) {
		setRemoveItemBool(true);
		const items = archSiteList.filter((item, index) => Object.values(item)[0] !== key);
		console.log(items);
		setArchSiteList(items);
	}
	function deleteArchSite(item) {
		return (
			<DeleteArchSiteComponent>
				{DeleteArchSiteMutation => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							name: ''
						}}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								console.log(values.name + ' ');
								DeleteArchSiteMutation({
									variables: {
										archSiteID: item.key
									}
								})
									.then(res => {
										removeItem(item.key);
										//this.props.navigation.navigate('Home');
									})
									.catch(err => {
										alert(err);
										console.log('ArchSite:' + values.name);
									});
								formikActions.setSubmitting(false);
							}, 500);
						}}
					>
						{/* Bu kısımda görsel parçalar eklenir */}
						{fprops => (
							<Layout>
								<Button
									appearance="ghost"
									onPress={() => {
										props.navigation.navigate('EditArchSiteScreen', {
											archSiteID: item.key
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
			</DeleteArchSiteComponent>
		);
	}
	function renderItemAccessory(item) {
		console.log(item.star);
		return global.userTypeID == 5 || global.userTypeID == 4 || global.userTypeID == 2 ? (
			deleteArchSite(item)
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
	const renderItemIcon = style => <Icon {...style} name="briefcase-outline" />;
	const accessoryItemIcon = style => <Icon {...style} name="trash-2-outline" />;
	const renderItem = ({ item, index }) => {
		return (
			<ListItem
				key={item.key}
				title={`${item.title}`}
				description={`${item.description}`}
				icon={renderItemIcon}
				accessory={() => renderItemAccessory(item)}
				onPress={() => {
					props.navigation.navigate('ArchSiteDetailScreen', {
						archSiteID: item.key,
						userID: global.userID
					});
				}}
			/>
		);
	};
	return (
		<Layout style={{ flex: 1 }}>
			<GetUserArchSiteComponent variables={{ userID: global.userID }}>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.ArchSite.map(dat => {
							if (archSiteList.length > 0 && !removeItemBool) {
								if (archSiteList.every(item => item.key != dat.archSiteID)) {
									archSiteList.push({
										key: dat.archSiteID,
										title: dat.name,
										description: dat.description == null ? '' : dat.description,
										//star: dat.star,
										companyName: dat.Company.name
									});
								}
							} else if (!removeItemBool) {
								archSiteList.push({
									key: dat.archSiteID,
									title: dat.name,
									description: dat.description == null ? '' : dat.description,
									//star: dat.star,
									companyName: dat.Company.name
								});
							}
						});
					}
					return <List data={archSiteList} renderItem={renderItem} />;
				}}
			</GetUserArchSiteComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2
	}
});
export default GetUserArchSiteList;
