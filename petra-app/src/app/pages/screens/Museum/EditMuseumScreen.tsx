import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Layout, Input, Text, Spinner, Icon } from '@ui-kitten/components';
import { UpdateMuseumComponent } from '../../../generated/components';
import { GetMuseumByIdComponent } from '../../../generated/components';
import LocationComponent from '../../../components/Public/LocationComponent';
import GetAllUserCompanyComponent from '../../../components/Company/GetAllUserCompany';
import GetAllCitiesComponent from '../../../components/Public/GetAllCitiesComponent';
import GetAllCityDistrictsComponent from '../../../components/Public/GetAllCityDistrictsComponent';
import Toast from 'react-native-easy-toast';
import { Formik } from 'formik';
import * as Yup from 'yup';
declare var global: any;

export interface EditMuseumProps {
	navigation: any;
	route: any;
}

const EditMuseumScreen: React.FC<EditMuseumProps> = (props) => {
	const { museumID } = props.route.params;
	const [cityID, setCityID] = React.useState(0);
	const [oneTimeRun, setOneTimeRun] = React.useState(true);
	const [locationID, setLocationID] = React.useState(-1);
	const [addressID, setAddressID] = React.useState(-1);
	const toastRef = React.useRef();
	const accessoryItemIcon = (style) => <Icon {...style} name="edit-2-outline" />;
	return (
		<Layout style={{ flex: 1 }}>
			<UpdateMuseumComponent>
				{(UpdateMuseumMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							altitude: 0.0,
							companyID: 0,
							description: '',
							name: '',
							address: '',
							latitude: 0,
							districtID: 0,
							cityID: 0,
							longtitude: 0,
							travelTime: 0,
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							name: Yup.string()
								.min(2, 'Too Short!')
								.max(50, 'Too Long!')
								.required('Required'),
							address: Yup.string()
								.min(5, 'Too Short!')
								.required('Required'),
							altitude: Yup.number().required('Required'),
							description: Yup.string()
								.min(5, 'Too Short!')
								.required('Required'),
							travelTime: Yup.number().required('Required'),
							//sadece longtitude kontrol etsem yeterli
							longtitude: Yup.number().required('Required'),
						})}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								console.log(locationID);
								UpdateMuseumMutation({
									variables: {
										museumID: museumID,
										addressID: addressID,
										locationID: locationID,
										museum: {
											name: values.name.toString(),
											companyID: values.companyID,
											description: values.description,
											averageTime: values.travelTime,
										},
										museumLocation: {
											longtitude: values.longtitude,
											latitude: values.latitude,
										},
										museumAddress: {
											address: values.address.toString(),
											districtID: values.districtID,
											cityID: values.cityID,
										},
									},
								})
									.then((res) => {
										//alert(JSON.stringify(res));
										toastRef.current.show(values.name + ' updated. Redirecting to the previous page...', 500, () => {
											props.navigation.goBack();
										});
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
									<GetMuseumByIdComponent variables={{ museumID: museumID }}>
										{({ loading, error, data }) => {
											if (loading) return <Text>Loading</Text>;
											if (error) return <Text>error</Text>;

											if (data) {
												data.Museum.map((dat) => {
													props.values.companyID = dat.companyID;
													props.values.name = dat.name;
													props.values.address = dat.Location.Address.address;
													props.values.cityID = dat.Location.Address.cityID;
													props.values.districtID = dat.Location.Address.districtID;
													props.values.description = dat.description;
													setAddressID(dat.Location.addressID);
													setLocationID(dat.locationID);
													props.values.latitude = dat.Location.latitude;
													props.values.longtitude = dat.Location.longtitude;
												});
												setOneTimeRun(false);
											}
											return null;
										}}
									</GetMuseumByIdComponent>
								)}
								<Button
									icon={accessoryItemIcon}
									appearance="ghost"
									onPress={() => {
										props.handleSubmit();
									}}
									disabled={props.isSubmitting}
								>
									Edit Museum
								</Button>
								<Input
									label="Name"
									placeholder="Museum Name"
									status={props.touched.name && props.errors.name ? 'danger' : 'success'}
									caption={props.touched.name && props.errors.name ? props.errors.name : ''}
									onChangeText={props.handleChange('name')}
									onBlur={props.handleBlur('name')}
									value={props.values.name}
									autoFocus
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
										props.values.cityID = value.id;
										setCityID(value.id);
									}}
								/>
								<GetAllCityDistrictsComponent
									label={cityID != 0 ? 'Select District' : 'Please Select a City First'}
									parentReference={(value) => {
										props.values.districtID = value;
									}}
									cityID={cityID}
								/>
								<Toast ref={toastRef} />
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
									label="TravelTime"
									status={props.touched.travelTime && props.errors.travelTime ? 'danger' : 'success'}
									caption={props.touched.travelTime && props.errors.travelTime ? props.errors.travelTime : ''}
									placeholder="Average Travel Time"
									onChangeText={props.handleChange('travelTime')}
									onBlur={props.handleBlur('travelTime')}
									value={props.values.travelTime.toString()}
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
			</UpdateMuseumComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default EditMuseumScreen;
