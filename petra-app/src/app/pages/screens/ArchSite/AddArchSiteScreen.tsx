import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Layout, Input, Text, Spinner, Datepicker } from '@ui-kitten/components';
import { AddArchSiteComponent, GetUserCompanyComponent } from '../../../generated/components';
import LocationComponent from '../../../components/Public/LocationComponent';
import GetAllUserCompanyComponent from '../../../components/Company/GetAllUserCompany';
import GetASTypesComponent from '../../../components/ArchSite/GetASTypesComponent';
import GetAllCitiesComponent from '../../../components/Public/GetAllCitiesComponent';
import GetAllCityDistrictsComponent from '../../../components/Public/GetAllCityDistrictsComponent';
import { Formik } from 'formik';
import * as Yup from 'yup';

export interface AddArchSiteProps {
	navigation: any;
	route: any;
}
const AddArchSiteScreen: React.FC<AddArchSiteProps> = props => {
	const [cityID, setCityID] = React.useState(0);

	const convertDateFormatForQuery = (date: Date) => {
		console.log('A date has been picked: ', date);
		let formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

		return formattedDate;
	};
	const { userID } = props.route.params;
	return (
		<Layout style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<AddArchSiteComponent>
					{AddArchSiteMutation => (
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
								cityID: 0
							}}
							//Burada girilen değerlerin controlleri sağlanır
							validationSchema={Yup.object({
								name: Yup.string()
									.min(2, 'Too Short!')
									.max(50, 'Too Long!')
									.required('Required'),
								age: Yup.number().required('Required'),
								address: Yup.string()
									.min(5, 'Too Short!')
									.required('Required'),
								altitude: Yup.number().required('Required'),
								description: Yup.string()
									.min(5, 'Too Short!')
									.required('Required'),
								destruction: Yup.string()
									.min(5, 'Too Short!')
									.required('Required'),
								diameter: Yup.number().required('Required'),
								period: Yup.string()
									.min(5, 'Too Short!')
									.required('Required'),
								//sadece longtitude kontrol etsem yeterli
								longtitude: Yup.number().required('Required')
							})}
							//Kaydet butonuna tıklandığında bu fonksiyon çalışır
							onSubmit={(values, formikActions) => {
								setTimeout(() => {
									console.log(
										values.name +
											' ' +
											values.address +
											' ' +
											values.altitude +
											' ' +
											values.description +
											' ' +
											values.destruction +
											' ' +
											values.diameter +
											' ' +
											values.period +
											' '
									);
									AddArchSiteMutation({
										variables: {
											arch: [
												{
													name: values.name.toString(),
													age: parseInt(values.age.toString()),
													altitude: values.altitude,
													description: values.description, //sonra utc ayarına bak!
													Location: {
														data: {
															longtitude: values.longtitude,
															latitude: values.latitude,
															Address: {
																data: {
																	address: values.address.toString(),
																	districtID: values.districtID,
																	cityID: values.cityID
																}
															}
														}
													},
													companyID: values.companyID,
													ArchSiteTypeArchSites: { data: [{ archSiteTypeID: values.archSiteTypeID }] },
													destruction: values.destruction,
													diameter: values.diameter,
													period: values.period
												}
											]
											/* name: values.name.toString(),
												age: parseInt(values.age.toString()),
												altitude: values.altitude,
												description: values.description, //sonra utc ayarına bak!
												longtitude: parseFloat(values.longtitude),
												latitude: parseFloat(values.latitude),
												address: values.address.toString(),
												companyID: values.companyID,
												archSiteTypeID: values.archSiteTypeID,
												destruction: values.destruction,
												diameter: values.diameter,
												period: values.period */
										}
									})
										.then(res => {
											alert(JSON.stringify(res));
										})
										.catch(err => {
											alert(err);
											console.log('name:' + values.name);
											console.log('address:' + values.address);
											console.log('altitude:' + values.altitude);
											console.log('archSiteTypeID:' + values.archSiteTypeID);
											console.log('description:' + values.description);
											console.log('destruction:' + values.destruction);
											console.log('diameter:' + values.diameter);
											console.log('period:' + values.period);
											console.log('long:' + values.longtitude);
											console.log('lat:' + values.latitude);
											console.log('address:' + values.address);
										});
									formikActions.setSubmitting(false);
								}, 500);
							}}
						>
							{/* Bu kısımda görsel parçalar eklenir */}
							{props => (
								<Layout>
									{props.isSubmitting && <Spinner />}

									<Button
										onPress={() => {
											props.handleSubmit();
										}}
										disabled={props.isSubmitting}
									>
										Add ArchSite
									</Button>
									<GetAllUserCompanyComponent
										label="Select Your Company"
										parentReference={value => {
											props.values.companyID = value;
										}}
										userID={parseInt(userID)}
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
									<GetAllCitiesComponent
										label="Select City"
										parentReference={value => {
											props.values.cityID = value;
											setCityID(value);
										}}
									/>
									<GetAllCityDistrictsComponent
										label={cityID != 0 ? 'Select District' : 'Please Select a City First'}
										parentReference={value => {
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
									<GetASTypesComponent
										label="Select ArchSite Type"
										parentReference={value => {
											props.values.archSiteTypeID = value;
										}}
									/>
									<Input
										label="Altitude"
										status={props.touched.altitude && props.errors.altitude ? 'danger' : 'success'}
										caption={props.touched.altitude && props.errors.altitude ? props.errors.altitude : ''}
										placeholder="Enter the altitude of the ArchSite"
										onChangeText={props.handleChange('altitude')}
										onBlur={props.handleBlur('altitude')}
										value={props.values.altitude.toString()}
									/>
									<Input
										label="Diameter"
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
										label="Description"
										status={props.touched.description && props.errors.description ? 'danger' : 'success'}
										caption={props.touched.description && props.errors.description ? props.errors.description : ''}
										placeholder="Enter the Description of the Archsite"
										onChangeText={props.handleChange('description')}
										onBlur={props.handleBlur('description')}
										value={props.values.description}
									/>

									<LocationComponent
										latitude={value => {
											props.values.latitude = value;
										}}
										longitude={value => {
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
				</AddArchSiteComponent>
			</ScrollView>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default AddArchSiteScreen;
