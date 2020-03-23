import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddHotelComponent } from '../../../generated/components';
import { LocationComponent } from '../../../components/Public/LocationComponent';
import { GetAllUserCompanyComponent } from '../../../components/Company/GetAllUserCompany';
import { GetAllHotelServicePropertyComponent } from '../../../components/Hotel/GetAllHotelServiceProperty';
import { GetAllCitiesComponent } from '../../../components/Public/GetAllCitiesComponent';
import { GetAllCityDistrictsComponent } from '../../../components/Public/GetAllCityDistrictsComponent';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddHotel props
 */
export interface AddHotelProps {
	navigation: any;
	route: any;
}
/**
 * AddHotel state
 */
export interface AddHotelState {
	cityID: number;
}

/**
 * AddHotel
 */
export class AddHotelScreen extends React.Component<AddHotelProps, AddHotelState> {
	constructor(props: AddHotelProps) {
		super(props);
		this.state = {
			cityID: 0
		};
	}
	convertDateFormatForQuery = (date: Date) => {
		console.log('A date has been picked: ', date);
		let formattedDate =
			date.getFullYear() +
			'-' +
			(date.getMonth() + 1) +
			'-' +
			date.getDate() +
			'T' +
			date.getHours() +
			':' +
			date.getMinutes() +
			':' +
			date.getSeconds();
		return formattedDate;
	};
	/**
	 * Renders
	 * @returns
	 */
	render() {
		const { userID } = this.props.route.params;
		return (
			<Layout style={{ flex: 1 }}>
				<AddHotelComponent>
					{AddHotelMutation => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								latitude: 0,
								longtitude: 0,
								address: '',
								districtID: 0,
								cityID: 0,
								name: '',
								taxNumber: '',
								companyID: 0,
								hotelServiceProperty: []
							}}
							//Burada girilen değerlerin controlleri sağlanır
							validationSchema={Yup.object({
								name: Yup.string()
									.min(2, 'Too Short!')
									.max(50, 'Too Long!')
									.required('Required'),
								taxNumber: Yup.string()
									.min(2, 'Too Short!')
									.max(50, 'Too Long!')
									.required('Required'),
								address: Yup.string()
									.min(5, 'Too Short!')
									.required('Required'),
								//sadece longtitude kontrol etsem yeterli
								longtitude: Yup.number().required('Required')
							})}
							//Kaydet butonuna tıklandığında bu fonksiyon çalışır
							onSubmit={(values, formikActions) => {
								setTimeout(() => {
									AddHotelMutation({
										variables: {
											hotel: [
												{
													name: values.name.toString(),
													taxNumber: values.taxNumber.toString(),
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
													HotelServices: {
														data: values.hotelServiceProperty
													}
												}
											]
										}
									})
										.then(res => {
											alert(JSON.stringify(res));

											//this.props.navigation.navigate('Home');
										})
										.catch(err => {
											alert(err);
											console.log('name:' + values.name);
											console.log('tax:' + values.taxNumber);
											console.log('registerDate:' + values.registerDate);
											console.log('mail:' + values.mail);
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

									<Input
										label="Name"
										placeholder="Hotel Name"
										status={props.touched.name && props.errors.name ? 'danger' : 'success'}
										caption={props.touched.name && props.errors.name ? props.errors.name : ''}
										onChangeText={props.handleChange('name')}
										onBlur={props.handleBlur('name')}
										value={props.values.name}
										autoFocus
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
										parentReference={value => {
											props.values.companyID = value;
										}}
										userID={parseInt(userID)}
									/>
									<GetAllCitiesComponent
										label="Select City"
										parentReference={value => {
											props.values.cityID = value;
											this.setState({ cityID: value });
										}}
									/>
									<GetAllCityDistrictsComponent
										label={this.state.cityID != 0 ? 'Select District' : 'Please Select a City First'}
										parentReference={value => {
											props.values.districtID = value;
										}}
										cityID={this.state.cityID}
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
									<GetAllHotelServicePropertyComponent
										label="Select Hotel Properties"
										parentReference={value => {
											props.values.hotelServiceProperty = value;
										}}
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
									<Button
										onPress={() => {
											props.handleSubmit();
										}}
										disabled={props.isSubmitting}
									>
										Add Hotel
									</Button>
								</Layout>
							)}
						</Formik>
					)}
				</AddHotelComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
