import * as React from 'react';
import { StyleSheet, Dimensions, YellowBox, ScrollView } from 'react-native';
import {
	Button,
	Layout,
	Input,
	Spinner,
	TabView,
	Tab,
	ListItem,
	Icon,
	List,
	Text,
	Select,
} from '@ui-kitten/components';
import ASLocationComponent from '../../../components/ArchSite/ASLocationComponent';
import MuseumLocationComponent from '../../../components/Museum/MuseumLocationComponent';
import RestaurantLocationComponent from '../../../components/Restaurant/RestaurantLocationComponent';
import HotelLocationComponent from '../../../components/Hotel/HotelLocationComponent';
import GetAllRegionsComponent from '../../../components/Public/GetAllRegionsComponent';
import { TravelGuideLocationComponent } from '../../../components/TravelGuide/TravelGuideLocationComponent';
import GetAllCitiesComponent from '../../../components/Public/GetAllCitiesComponent';
import { AddTravelGuideComponent } from '../../../generated/components';
import Toast from 'react-native-easy-toast';
import { Formik } from 'formik';
import * as Yup from 'yup';
declare var global: any;
export interface AddTravelGuideProps {
	navigation: any;
	route: any;
	listDataFromSearch?: any;
	costFromSearch?: any;
}

const AddTravelGuideScreen: React.FC<AddTravelGuideProps> = (props) => {
	const [cityID, setCityID] = React.useState(0);
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [selectedOption, setSelectedOption] = React.useState([]);
	const { listDataFromSearch } = props.route.params;
	const { costFromSearch } = props.route.params;
	const [listData, setListData] = React.useState(listDataFromSearch != null ? listDataFromSearch : []);
	const [userID, setUserID] = React.useState();
	const [hotelVariables, setHotelVariables] = React.useState(null);
	const [restaurantVariables, setRestaurantVariables] = React.useState(null);
	const [archSiteVariables, setArchSiteVariables] = React.useState(null);
	const [museumVariables, setMuseumVariables] = React.useState(null);

	const [startEndSelectData, setStartEndSelectData] = React.useState([
		{ text: 'Select Start-End Point', disabled: false },
		{ text: 'Start Point', disabled: false },
		{ text: 'End Point', disabled: false },
	]);
	const [regionID, setRegionID] = React.useState(0);
	const toastRef = React.useRef();
	React.useEffect(() => {
		if (startEndSelectData.length == 1) {
			let tmp = [...selectedOption];
			let trytmp = tmp.map((data) => {
				if (data.text != 'Start Point' || data.text != 'End Point') {
					data.disabled = true;
				}

				return data;
			});
			setStartEndSelectData(trytmp);
		}
	}, [startEndSelectData]);
	React.useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', () => {
			if (userID != global.userID && global.userID != undefined) {
				setUserID(global.userID);
				console.log(listDataFromSearch);
			}
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount
		return unsubscribe;
	}, [props.navigation]);
	YellowBox.ignoreWarnings([
		'VirtualizedLists should never be nested', // TODO: Remove when fixed
	]);

	function addItem(item) {
		// only add if the item doesn't exist in the list
		//console.log(this.state.listData.filter(e => e.type === 'hotel').map(value => value.id));
		if (!(listData.filter((e) => e.id === item.id).length > 0) || item.title == null) {
			setListData(listData.concat([item]));
			setSelectedOption(selectedOption.concat({ text: 'Select Start-End Point', disabled: false }));
		}
	}

	const renderItemArcIcon = (style) => <Icon {...style} name="globe-2-outline" />;
	const renderItemMuseumIcon = (style) => <Icon {...style} name="archive-outline" />;
	const renderItemHotelIcon = (style) => <Icon {...style} name="briefcase-outline" />;
	const renderItemRestIcon = (style) => <Icon {...style} name="award-outline" />;
	const accessoryItemIcon = (style) => <Icon {...style} name="plus-circle-outline" />;

	const renderItemAccessory = (style, index) => {
		return (
			<Select
				data={startEndSelectData}
				selectedOption={selectedOption[index]}
				onSelect={(value) => {
					if (value.text != 'Select Start-End Point') {
						let tmp = [...selectedOption];

						console.log(tmp);
						console.log(value);
						let tmp2 = tmp.map((data) => {
							if (data == value) {
								data.text = 'Select Start-End Point';
							}

							return data;
						});
						console.log(index);
						tmp2[index] = value;
						setSelectedOption(tmp2);
						/*const tmpListData = listData.map((datam) => {
							if (datam.title == value.text) {
								datam.title = '';
							}

							return datam;
						});

						tmpListData[index].title = value.text;
						//console.log(tmpListData);
						setListData(tmpListData);*/
					}
				}}
			/>
		);
	};
	const renderItem = ({ item, index }) => (
		<ListItem
			key={item.id}
			title={
				item.title != null
					? item.title
					: item.coordinates.latitude.toString() + ' ' + item.coordinates.longitude.toString()
			}
			description={item.description}
			icon={
				item.type == 'hotel'
					? renderItemHotelIcon
					: item.type == 'restaurant'
					? renderItemRestIcon
					: item.type == 'archsite'
					? renderItemArcIcon
					: item.type == 'museum'
					? renderItemMuseumIcon
					: null
			}
			accessory={renderItemAccessory}
		/>
	);

	return (
		<Layout style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<AddTravelGuideComponent>
					{(AddTravelGuideMutation) => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								foodTypeID: 0, //Sonra düzeltilecek
								title: '',
								cost: costFromSearch != null ? costFromSearch : 0,
							}}
							//Burada girilen değerlerin controlleri sağlanır
							validationSchema={Yup.object({
								title: Yup.string()
									.min(2, 'Too Short!')
									.max(50, 'Too Long!')
									.required('Required'),
								cost: Yup.number().required('Required'),
							})}
							//Kaydet butonuna tıklandığında bu fonksiyon çalışır
							onSubmit={(values, formikActions) => {
								setTimeout(() => {
									let hotelValues = [];
									let museumValues = [];
									let restaurantValues = [];
									let archSiteValues = [];
									let travelGuideValues = [];
									listData
										.filter((e) => e.type === 'hotel')
										.map((value) => hotelValues.push({ hotelID: value.id.replace('hotel', '') }));
									listData
										.filter((e) => e.type === 'museum')
										.map((value) => museumValues.push({ museumID: value.id.replace('museum', '') }));
									listData
										.filter((e) => e.type === 'restaurant')
										.map((value) => restaurantValues.push({ restaurantID: value.id.replace('restaurant', '') }));
									listData
										.filter((e) => e.type === 'archsite')
										.map((value) => archSiteValues.push({ archSiteID: value.id.replace('archsite', '') }));
									listData
										.filter((e) => e.type === 'travelguide')
										.map((value) =>
											travelGuideValues.push({
												Location: {
													data: { latitude: value.coordinates.latitude, longtitude: value.coordinates.longitude },
												},
												isStartPoint: value.title == 'Start Point' ? true : false,
												isFinalPoint: value.title == 'End Point' ? true : false,
											})
										);
									//console.log(hotelValues);
									AddTravelGuideMutation({
										variables: {
											travelGuide: [
												{
													title: values.title,
													userID: userID,
													creationDate: new Date(),
													cost: values.cost,
													TravelGuideHotels: {
														data: hotelValues,
													},
													TravelGuideMuseums: {
														data: museumValues,
													},
													TravelGuideRestaurants: {
														data: restaurantValues,
													},
													TravelGuideArchSites: {
														data: archSiteValues,
													},
													TravelGuideLocations: {
														data: travelGuideValues,
													},
												},
											],
										},
									})
										.then((res) => {
											//alert(JSON.stringify(res));
											toastRef.current.show(values.title + ' added. Redirecting to the previous page...', 500, () => {
												props.navigation.goBack();
											});
										})
										.catch((err) => {
											alert(err);
										});
									formikActions.setSubmitting(false);
								}, 500);
							}}
						>
							{/* Bu kısımda görsel parçalar eklenir */}
							{(props) => (
								<Layout>
									{props.isSubmitting && <Spinner />}
									<Button
										icon={accessoryItemIcon}
										appearance="ghost"
										onPress={() => {
											props.handleSubmit();
										}}
										disabled={props.isSubmitting}
									>
										Add Travel Guide
									</Button>
									<Toast ref={toastRef} />
									<Input
										label="Title"
										placeholder="Enter a title for your travel guide"
										status={props.touched.title && props.errors.title ? 'danger' : 'success'}
										caption={props.touched.title && props.errors.title ? props.errors.title : ''}
										onChangeText={props.handleChange('title')}
										onBlur={props.handleBlur('title')}
										value={props.values.title}
										autoFocus
									/>
									<Input
										label="Cost"
										placeholder="Enter cost"
										status={props.touched.cost && props.errors.cost ? 'danger' : 'success'}
										caption={props.touched.cost && props.errors.cost ? props.errors.cost : ''}
										onChangeText={props.handleChange('cost')}
										onBlur={props.handleBlur('cost')}
										value={props.values.cost.toString()}
									/>
									<Layout style={styles.cityRegion}>
										<GetAllCitiesComponent
											label="Select City"
											disable={regionID > 0 ? true : false}
											parentReference={(value) => {
												setCityID(value.id);
												setArchSiteVariables({ cityID: value.id });
												setMuseumVariables({ cityID: value.id });
												setRestaurantVariables({ cityID: value.id });
												setHotelVariables({ cityID: value.id });
											}}
										/>
										<Text style={{ paddingTop: 10, paddingLeft: 5, paddingRight: 5 }}>or</Text>
										<GetAllRegionsComponent
											label="Select Region"
											disable={cityID > 0 ? true : false}
											parentReference={(value) => {
												setRegionID(value.id);
												setArchSiteVariables({ regionID: value.id });
												setMuseumVariables({ regionID: value.id });
												setRestaurantVariables({ regionID: value.id });
												setHotelVariables({ regionID: value.id });
											}}
										/>
									</Layout>
									<Text>Select a point</Text>
									<TabView selectedIndex={selectedIndex} onSelect={(value) => setSelectedIndex(value)}>
										<Tab title="Add yours">
											<Layout style={styles.tabContainer}>
												<TravelGuideLocationComponent
													marker={(value) => {
														let item = {
															id: value.id + value.type,
															title: value.title,
															description: value.description,
															coordinates: value.coordinates,
															type: value.type,
														};
														addItem(item);
													}}
												/>
											</Layout>
										</Tab>
										<Tab title="Arch. Sites">
											<Layout style={styles.tabContainer}>
												<ASLocationComponent
													variables={archSiteVariables}
													marker={(value) => {
														/*this.setState({
																latitude: value
															});*/
														let item = {
															id: value.id + value.type,
															title: value.title,
															description: value.description,
															coordinates: value.coordinates,
															type: value.type,
														};
														addItem(item);
													}}
												/>
											</Layout>
										</Tab>
										<Tab title="Museums">
											<Layout style={styles.tabContainer}>
												<MuseumLocationComponent
													variables={museumVariables}
													marker={(value) => {
														let item = {
															id: value.id + value.type,
															title: value.title,
															description: value.description,
															coordinates: value.coordinates,
															type: value.type,
														};
														addItem(item);
													}}
												/>
											</Layout>
										</Tab>
										<Tab title="Restaurants">
											<Layout style={styles.tabContainer}>
												<RestaurantLocationComponent
													variables={restaurantVariables}
													marker={(value) => {
														let item = {
															id: value.id + value.type,
															title: value.title,
															description: value.description,
															coordinates: value.coordinates,
															type: value.type,
														};
														addItem(item);
													}}
												/>
											</Layout>
										</Tab>
										<Tab title="Hotels">
											<Layout style={styles.tabContainer}>
												<HotelLocationComponent
													variables={hotelVariables}
													marker={(value) => {
														let item = {
															id: value.id + value.type,
															title: value.title,
															description: value.description,
															coordinates: value.coordinates,
															type: value.type,
														};
														addItem(item);
													}}
												/>
											</Layout>
										</Tab>
									</TabView>

									<List data={listData} renderItem={renderItem} />
								</Layout>
							)}
						</Formik>
					)}
				</AddTravelGuideComponent>
			</ScrollView>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2,
	},
	cityRegion: {
		flexDirection: 'row',
	},
});
export default AddTravelGuideScreen;
