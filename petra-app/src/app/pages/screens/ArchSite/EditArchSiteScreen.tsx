import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Layout, Input, Text, Spinner, Icon } from '@ui-kitten/components';
import { UpdateArchSiteComponent } from '../../../generated/components';
import { GetArchSiteByIdComponent } from '../../../generated/components';
import LocationComponent from '../../../components/Public/LocationComponent';
import GetAllUserCompanyComponent from '../../../components/Company/GetAllUserCompany';
import GetAllCitiesComponent from '../../../components/Public/GetAllCitiesComponent';
import GetAllCityDistrictsComponent from '../../../components/Public/GetAllCityDistrictsComponent';
import Toast from 'react-native-easy-toast';
import { Formik } from 'formik';
import * as Yup from 'yup';
declare var global: any;

export interface EditArchSiteProps {
	navigation: any;
	route: any;
}

const EditArchSiteScreen: React.FC<EditArchSiteProps> = (props) => {
	const { archSiteID } = props.route.params;
	const [cityID, setCityID] = React.useState(0);
	const [oneTimeRun, setOneTimeRun] = React.useState(true);
	const [locationID, setLocationID] = React.useState(-1);
	const [addressID, setAddressID] = React.useState(-1);
	const toastRef = React.useRef();
	return (
		<Layout style={{ flex: 1 }}>
			<UpdateArchSiteComponent>
				{(UpdateArchSiteMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							archSiteTypeID: 0,
							age: 0,
							altitude: 0.0,
							companyID: 0,
							description: '',
							destruction: '',
							diameter: 0.0,
							name: '',
							period: '',
							address: '',
							latitude: 0,
							longtitude: 0,
							districtID: 0,
							cityID: 0,
							travelTime: 0,
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
							age: Yup.number().required('Required'),
							address: Yup.string().min(5, 'Too Short!').required('Required'),
							altitude: Yup.number().required('Required'),
							description: Yup.string().min(5, 'Too Short!').required('Required'),
							destruction: Yup.string().min(5, 'Too Short!').required('Required'),
							diameter: Yup.number().required('Required'),
							period: Yup.string().min(5, 'Too Short!').required('Required'),
							travelTime: Yup.number().required('Required'),
							//sadece longtitude kontrol etsem yeterli
							longtitude: Yup.number().required('Required'),
						})}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								console.log(locationID);
								UpdateArchSiteMutation({
									variables: {
										archSiteID: archSiteID,
										addressID: addressID,
										locationID: locationID,
										archSite: {
											name: values.name.toString(),
											companyID: values.companyID,
											description: values.description,
											averageTime: values.travelTime,
										},
										archSiteLocation: {
											longtitude: values.longtitude,
											latitude: values.latitude,
										},
										archSiteAddress: {
											address: values.address.toString(),
											districtID: values.districtID,
											cityID: values.cityID,
										},
									},
								})
									.then((res) => {
										alert(JSON.stringify(res));
										toastRef.current.show(
											values.name.toString() + ' edited. Redirecting to the previous page...',
											500,
											() => {
												props.navigation.goBack();
											}
										);
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
									<GetArchSiteByIdComponent variables={{ archSiteID: archSiteID }}>
										{({ loading, error, data }) => {
											if (loading) return <Spinner size="giant" />;
											if (error) return <Text>error</Text>;

											if (data) {
												data.ArchSite.map((dat) => {
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
													props.values.age = dat.age;
													props.values.altitude = dat.altitude;
													props.values.destruction = dat.destruction;
													props.values.diameter = dat.diameter;
												});
												setOneTimeRun(false);
											}
											return null;
										}}
									</GetArchSiteByIdComponent>
								)}
								<Button
									onPress={() => {
										props.handleSubmit();
									}}
									disabled={props.isSubmitting}
								>
									Edit ArchSite
								</Button>
								<GetAllUserCompanyComponent
									label="Select Your Company"
									parentReference={(value) => {
										props.values.companyID = value;
									}}
									userID={parseInt(global.userID)}
								/>
								<Input
									label="ArchSite Name"
									placeholder="Enter Your ArchSite Name"
									status={props.touched.name && props.errors.name ? 'danger' : 'success'}
									caption={props.touched.name && props.errors.name ? props.errors.name : ''}
									onChangeText={props.handleChange('name')}
									onBlur={props.handleBlur('name')}
									value={props.values.name}
									autoFocus
								/>
								<Toast ref={toastRef} />
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
								<Input
									label="Address"
									status={props.touched.address && props.errors.address ? 'danger' : 'success'}
									caption={props.touched.address && props.errors.address ? props.errors.address : ''}
									placeholder="your address"
									onChangeText={props.handleChange('address')}
									onBlur={props.handleBlur('address')}
									value={props.values.address}
								/>
								<Input
									label="Age"
									status={props.touched.age && props.errors.age ? 'danger' : 'success'}
									caption={props.touched.age && props.errors.age ? props.errors.age : ''}
									placeholder="ArchSite Age"
									onChangeText={props.handleChange('age')}
									onBlur={props.handleBlur('age')}
									value={props.values.age.toString()}
								/>

								<Input
									label="Altitude(M)"
									status={props.touched.altitude && props.errors.altitude ? 'danger' : 'success'}
									caption={props.touched.altitude && props.errors.altitude ? props.errors.altitude : ''}
									placeholder="Enter the altitude of the ArchSite"
									onChangeText={props.handleChange('altitude')}
									onBlur={props.handleBlur('altitude')}
									value={props.values.altitude.toString()}
								/>
								<Input
									label="Diameter(M)"
									status={props.touched.diameter && props.errors.diameter ? 'danger' : 'success'}
									caption={props.touched.diameter && props.errors.diameter ? props.errors.diameter : ''}
									placeholder="Enter the diameter of the ArchSite"
									onChangeText={props.handleChange('diameter')}
									onBlur={props.handleBlur('diameter')}
									value={props.values.diameter.toString()}
								/>
								<Input
									label="Period"
									status={props.touched.period && props.errors.period ? 'danger' : 'success'}
									caption={props.touched.period && props.errors.period ? props.errors.period : ''}
									placeholder="Enter the period of the ArchSite"
									onChangeText={props.handleChange('period')}
									onBlur={props.handleBlur('period')}
									value={props.values.period.toString()}
								/>
								<Input
									label="Destruction"
									status={props.touched.destruction && props.errors.destruction ? 'danger' : 'success'}
									caption={props.touched.destruction && props.errors.destruction ? props.errors.destruction : ''}
									placeholder="Enter the Destruction of the Archsite"
									onChangeText={props.handleChange('destruction')}
									onBlur={props.handleBlur('destruction')}
									value={props.values.destruction}
								/>
								<Input
									label="TravelTime(m)"
									status={props.touched.travelTime && props.errors.travelTime ? 'danger' : 'success'}
									caption={props.touched.travelTime && props.errors.travelTime ? props.errors.travelTime : ''}
									placeholder="Average Travel Time"
									onChangeText={props.handleChange('travelTime')}
									onBlur={props.handleBlur('travelTime')}
									value={props.values.travelTime.toString()}
								/>
								<Input
									label="Description"
									status={props.touched.description && props.errors.description ? 'danger' : 'success'}
									caption={props.touched.description && props.errors.description ? props.errors.description : ''}
									placeholder="Enter the Description of the Archsite"
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
			</UpdateArchSiteComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default EditArchSiteScreen;
