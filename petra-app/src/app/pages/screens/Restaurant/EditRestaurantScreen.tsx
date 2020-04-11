import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Layout, Input, Text, Spinner, Icon } from '@ui-kitten/components';
import { UpdateRestaurantComponent } from '../../../generated/components';
import { GetRestaurantByIdComponent } from '../../../generated/components';
import { LocationComponent } from '../../../components/Public/LocationComponent';
import GetAllUserCompanyComponent from '../../../components/Company/GetAllUserCompany';
import { GetAllCitiesComponent } from '../../../components/Public/GetAllCitiesComponent';
import { GetAllCityDistrictsComponent } from '../../../components/Public/GetAllCityDistrictsComponent';
import StarRating from 'react-native-star-rating';
import { Formik } from 'formik';
import * as Yup from 'yup';
declare var global: any;
/**
 * AddHotel props
 */
export interface EditRestaurantProps {
	navigation: any;
	route: any;
}

/**
 * AddHotel
 */
const EditRestaurantScreen: React.FC<EditRestaurantProps> = (props) => {
	const { restaurantID } = props.route.params;
	const [cityID, setCityID] = React.useState(0);
	const [oneTimeRun, setOneTimeRun] = React.useState(true);
	const [locationID, setLocationID] = React.useState(-1);
	const [addressID, setAddressID] = React.useState(-1);
	const [star, setStar] = React.useState(1);
	const accessoryItemIcon = (style) => <Icon {...style} name="edit-2-outline" />;
	return (
		<Layout style={{ flex: 1 }}>
			<UpdateRestaurantComponent>
				{(UpdateRestaurantMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							latitude: 0,
							longtitude: 0,
							address: '',
							districtID: 0,
							cityID: 0,
							description: '',
							name: '',
							taxNumber: '',
							companyID: 0,
							//hotelServiceProperty: [],
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
							taxNumber: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
							address: Yup.string().min(5, 'Too Short!').required('Required'),
							//sadece longtitude kontrol etsem yeterli
							longtitude: Yup.number().required('Required'),
						})}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								console.log(locationID);
								UpdateRestaurantMutation({
									variables: {
										restaurantID: restaurantID,
										addressID: addressID,
										locationID: locationID,
										restaurant: {
											name: values.name.toString(),
											taxNumber: values.taxNumber.toString(),
											star: star,
											companyID: values.companyID,
											//description: values.description,
										},
										restaurantLocation: {
											longtitude: values.longtitude,
											latitude: values.latitude,
										},
										restaurantAddress: {
											address: values.address.toString(),
											districtID: values.districtID,
											cityID: values.cityID,
										},
									},
								})
									.then((res) => {
										alert(JSON.stringify(res));

										//this.props.navigation.navigate('Home');
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
								{oneTimeRun && (
									<GetRestaurantByIdComponent variables={{ restaurantID: restaurantID }}>
										{({ loading, error, data }) => {
											if (loading) return <Text>Loading</Text>;
											if (error) return <Text>error</Text>;

											if (data) {
												data.Restaurant.map((dat) => {
													props.values.companyID = dat.companyID;
													props.values.name = dat.name;
													props.values.taxNumber = dat.taxNumber;
													props.values.address = dat.Location.Address.address;
													props.values.cityID = dat.Location.Address.cityID;
													props.values.districtID = dat.Location.Address.districtID;
													//props.values.description = dat.description;
													setAddressID(dat.Location.addressID);
													setLocationID(dat.locationID);
													setStar(dat.star);
													props.values.latitude = dat.Location.latitude;
													props.values.longtitude = dat.Location.longtitude;
												});
												setOneTimeRun(false);
											}
											return null;
										}}
									</GetRestaurantByIdComponent>
								)}
								<Button
									icon={accessoryItemIcon}
									appearance="ghost"
									onPress={() => {
										props.handleSubmit();
									}}
									disabled={props.isSubmitting}
								>
									Edit Hotel
								</Button>
								<Input
									label="Name"
									placeholder="Restaurant Name"
									status={props.touched.name && props.errors.name ? 'danger' : 'success'}
									caption={props.touched.name && props.errors.name ? props.errors.name : ''}
									onChangeText={props.handleChange('name')}
									onBlur={props.handleBlur('name')}
									value={props.values.name}
									autoFocus
								/>
								<Text style={{ color: 'gray' }}>Select your hotel star</Text>
								<StarRating
									containerStyle={{ width: Dimensions.get('window').width / 8 }}
									disabled={false}
									emptyStar={'ios-star-outline'}
									fullStar={'ios-star'}
									halfStar={'ios-star-half'}
									iconSet={'Ionicons'}
									maxStars={5}
									rating={star}
									starSize={25}
									fullStarColor={'orange'}
									selectedStar={(rating) => setStar(rating)}
								/>
								<Input
									label="Tax Number"
									status={props.touched.taxNumber && props.errors.taxNumber ? 'danger' : 'success'}
									caption={props.touched.taxNumber && props.errors.taxNumber ? props.errors.taxNumber : ''}
									placeholder="54-2548568-22"
									onChangeText={props.handleChange('taxNumber')}
									onBlur={props.handleBlur('taxNumber')}
									value={props.values.taxNumber}
								/>
								<GetAllUserCompanyComponent
									label="Select Your Company"
									parentReference={(value) => {
										props.values.companyID = value;
									}}
									userID={parseInt(global.userID)}
								/>
								<GetAllCitiesComponent
									label="Select City"
									parentReference={(value) => {
										props.values.cityID = value;
										setCityID(value);
									}}
								/>
								<GetAllCityDistrictsComponent
									label={cityID != 0 ? 'Select District' : 'Please Select a City First'}
									parentReference={(value) => {
										props.values.districtID = value;
									}}
									cityID={cityID}
								/>

								<Input
									label="Address"
									status={props.touched.address && props.errors.address ? 'danger' : 'success'}
									caption={props.touched.address && props.errors.address ? props.errors.address : ''}
									placeholder="your address"
									multiline={true}
									style={{ minHeight: 50 }}
									onChangeText={props.handleChange('address')}
									onBlur={props.handleBlur('address')}
									value={props.values.address}
								/>
								<Input
									label="Description"
									status={props.touched.address && props.errors.address ? 'danger' : 'success'}
									caption={props.touched.address && props.errors.address ? props.errors.address : ''}
									placeholder="Add your description"
									multiline={true}
									style={{ minHeight: 50 }}
									onChangeText={props.handleChange('description')}
									onBlur={props.handleBlur('description')}
									value={props.values.description}
								/>
								<LocationComponent
									latitude={(value) => {
										props.values.latitude = value;
									}}
									longitude={(value) => {
										props.values.longtitude = value;
									}}
								/>
								{props.touched.longtitude && props.errors.longtitude ? (
									<Text status="danger">{props.errors.longtitude}</Text>
								) : null}
							</Layout>
						)}
					</Formik>
				)}
			</UpdateRestaurantComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default EditRestaurantScreen;
