import * as React from 'react';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddHotelComponent } from '../../generated/components';
import { LocationComponent } from '../../components/LocationComponent';
import { GetAllUserCompanyComponent } from '../../components/GetAllUserCompany';
import { GetAllHotelServicePropertyComponent } from '../../components/GetAllHotelServiceProperty';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddHotel props
 */
export interface AddHotelProps {
	navigation: any;
}
/**
 * AddHotel state
 */
export interface AddHotelState {}

/**
 * AddHotel
 */
export class AddHotelScreen extends React.Component<AddHotelProps, AddHotelState> {
	constructor(props: AddHotelProps) {
		super(props);
		this.state = {};
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
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
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
											name: values.name.toString(),
											taxNumber: values.taxNumber.toString(),
											longtitude: values.longtitude,
											latitude: values.latitude,
											address: values.address.toString(),
											companyID: values.companyID,
											hotelServiceProperty: values.hotelServiceProperty
										}
									})
										.then(res => {
											alert(JSON.stringify(res));
											ToastAndroid.show('Company has been added successfully', ToastAndroid.SHORT);

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
									<Input
										label="Address"
										status={props.touched.address && props.errors.address ? 'danger' : 'success'}
										caption={props.touched.address && props.errors.address ? props.errors.address : ''}
										placeholder="your address"
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
