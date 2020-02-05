import * as React from 'react';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import { Button, Layout, Input, Text, Spinner, Datepicker } from '@ui-kitten/components';
import { AddRestaurantComponent } from '../../generated/components';
import { LocationComponent } from '../../components/LocationComponent';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddRestaurant props
 */
export interface AddRestaurantProps {
	navigation: any;
}
/**
 * Location state
 */
export interface AddRestaurantState {}

/**
 * Location
 */
export class AddRestaurantScreen extends React.Component<AddRestaurantProps, AddRestaurantState> {
	constructor(props: AddRestaurantProps) {
		super(props);
		this.state = {};
	}
	convertDateFormatForQuery = (date: Date) => {
		console.log('A date has been picked: ', date);
		let formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

		return formattedDate;
	};
	/**
	 * Renders
	 * @returns
	 */
	render() {
		return (
			<Layout style={{ flex: 1 }}>
				<AddRestaurantComponent>
					{AddRestaurantMutation => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								ISO: '',
								latitude: '',
								longtitude: '',
								address: '',
								RestaurantType: '',
								name: '',
								since: new Date(),
								taxNumber: ''
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
								RestaurantType: Yup.string() //ComboBox Olacak
									.required('Required'),
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
											values.RestaurantType +
											' ' +
											values.ISO +
											' ' +
											this.convertDateFormatForQuery(values.since) +
											' ' +
											values.taxNumber +
											' '
									);
									AddRestaurantMutation({
										variables: {
											name: values.name.toString(),
											ISO: values.ISO.toString(),
											since: this.convertDateFormatForQuery(new Date()), //sonra utc ayarına bak!
											longtitude: parseFloat(values.longtitude),
											latitude: parseFloat(values.latitude),
											address: values.address.toString(),
											RestaurantType: values.RestaurantType,
											CompanyID: 2,
											taxNumber: values.taxNumber.toString()
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
											console.log('ISO:' + values.ISO);
											console.log('since:' + values.since);
											console.log('RestaurantType:' + values.RestaurantType);
											console.log('long:' + values.longtitude);
											console.log('lat:' + values.latitude);
											console.log('address:' + values.address);
											console.log('taxNumber:' + values.taxNumber);
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
										label="Restaurant Type"
										status={props.touched.RestaurantType && props.errors.RestaurantType ? 'danger' : 'success'}
										caption={
											props.touched.RestaurantType && props.errors.RestaurantType ? props.errors.RestaurantType : ''
										}
										placeholder="Enter Your Restaurant Type"
										onChangeText={props.handleChange('RestaurantType')}
										onBlur={props.handleBlur('RestaurantType')}
										value={props.values.RestaurantType}
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
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
