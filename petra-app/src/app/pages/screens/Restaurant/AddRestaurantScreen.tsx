import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Layout, Input, Text, Spinner, Datepicker } from '@ui-kitten/components';
import { AddRestaurantComponent, GetUserCompanyComponent } from '../../../generated/components';
import LocationComponent from '../../../components/Public/LocationComponent';
import GetAllUserCompany from '../../../components/Company/GetAllUserCompany';
import GetAllRestaurantTypesComponent from '../../../components/Restaurant/GetAllRestaurantTypesComponent';
import GetAllCitiesComponent from '../../../components/Public/GetAllCitiesComponent';
import GetAllCityDistrictsComponent from '../../../components/Public/GetAllCityDistrictsComponent';
import { Formik } from 'formik';
import * as Yup from 'yup';
import GetAllCuisineTypesComponent from '../../../components/Restaurant/GetAllCuisineTypesComponent';

export interface AddRestaurantProps {
	navigation: any;
	route: any;
}

const AddRestaurantScreen: React.FC<AddRestaurantProps> = props => {
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
				<AddRestaurantComponent>
					{AddRestaurantMutation => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								ISO: '',
								latitude: 0,
								longtitude: 0,
								address: '',
								restaurantTypeID: 0,
								name: '',
								since: new Date(),
								taxNumber: '',
								companyID: 0,
								cuisineTypes: [],
								districtID: 0,
								cityID: 0
							}}
							//Burada girilen değerlerin controlleri sağlanır
							validationSchema={Yup.object({
								name: Yup.string()
									.min(2, 'Too Short!')
									.max(50, 'Too Long!')
									.required('Required'),
								ISO: Yup.string()
									.min(2, 'Too Short!')
									.max(50, 'Too Long!'),
								address: Yup.string()
									.min(5, 'Too Short!')
									.required('Required'),
								taxNumber: Yup.string()
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
											values.restaurantTypeID +
											' ' +
											values.ISO +
											' ' +
											convertDateFormatForQuery(values.since) +
											' ' +
											values.taxNumber +
											' '
									);
									AddRestaurantMutation({
										variables: {
											resta: [
												{
													name: values.name.toString(),
													ISO: values.ISO.toString(),
													since: convertDateFormatForQuery(new Date()), //sonra utc ayarına bak!
													RestaurantAndCuisineTypes: { data: values.cuisineTypes },
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
													restaurantTypeID: values.restaurantTypeID,
													companyID: values.companyID,
													taxNumber: values.taxNumber.toString()
												}
											]
										}
									})
										.then(res => {
											alert(JSON.stringify(res));
										})
										.catch(err => {
											alert(err);
											console.log('name:' + values.name);
											console.log('ISO:' + values.ISO);
											console.log('since:' + values.since);
											console.log('cuisineTypes:' + values.cuisineTypes);
											console.log('RestaurantType:' + values.restaurantTypeID);
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
										Add Restaurant
									</Button>
									<GetAllUserCompany
										label="Select Your Company"
										parentReference={value => {
											props.values.companyID = value;
										}}
										userID={parseInt(userID)}
									/>
									<Input
										label="Restaurant Name"
										placeholder="Enter Your Restaurant Name"
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
									<GetAllRestaurantTypesComponent
										label="Select Restaurant Type"
										parentReference={value => {
											props.values.restaurantTypeID = value;
										}}
									/>

									<Input
										label="ISO Certificate"
										status={props.touched.ISO && props.errors.ISO ? 'danger' : 'success'}
										caption={props.touched.ISO && props.errors.ISO ? props.errors.ISO : ''}
										placeholder="Do you have any certificate?"
										onChangeText={props.handleChange('ISO')}
										onBlur={props.handleBlur('ISO')}
										value={props.values.ISO}
									/>
									<GetAllCuisineTypesComponent
										label="Select Restaurant Cuisine Types"
										parentReference={value => {
											props.values.cuisineTypes = value;
										}}
									/>
									<Input
										label="Tax Number"
										status={props.touched.taxNumber && props.errors.taxNumber ? 'danger' : 'success'}
										caption={props.touched.taxNumber && props.errors.taxNumber ? props.errors.taxNumber : ''}
										placeholder="Enter your Tax Number Please"
										onChangeText={props.handleChange('taxNumber')}
										onBlur={props.handleBlur('taxNumber')}
										value={props.values.taxNumber}
									/>
									<Datepicker date={props.values.since} onSelect={e => props.setFieldValue('since', e)} />
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
				</AddRestaurantComponent>
			</ScrollView>
		</Layout>
	);
};
const styles: any = StyleSheet.create({});
export default AddRestaurantScreen;
