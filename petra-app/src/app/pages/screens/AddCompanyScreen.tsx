import * as React from 'react';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddCompanyComponent } from '../../generated/components';
import { LocationComponent } from '../../components/LocationComponent';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddCompany props
 */
export interface AddCompanyProps {
	navigation: any;
}
/**
 * Location state
 */
export interface AddCompanyState {}

/**
 * Location
 */
export class AddCompanyScreen extends React.Component<AddCompanyProps, AddCompanyState> {
	constructor(props: AddCompanyProps) {
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
		return (
			<Layout style={{ flex: 1 }}>
				<AddCompanyComponent>
					{AddCompanyMutation => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								name: '',
								taxNumber: '',
								registerDate: '',
								mail: '',
								longtitude: 0,
								latitude: 0,
								address: ''
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
								mail: Yup.string()
									.email('Invalid email')
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
									AddCompanyMutation({
										variables: {
											name: values.name.toString(),
											taxNumber: values.taxNumber.toString(),
											registerDate: this.convertDateFormatForQuery(new Date()), //sonra utc ayarına bak!
											mail: values.mail.toString(),
											longtitude: values.longtitude,
											latitude: values.latitude,
											address: values.address.toString()
										}
									})
										.then(res => {
											//alert(JSON.stringify(res));
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
										placeholder="Limited Cmd."
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
									<Input
										label="Email"
										status={props.touched.mail && props.errors.mail ? 'danger' : 'success'}
										caption={props.touched.mail && props.errors.mail ? props.errors.mail : ''}
										placeholder="john.doe@example.com"
										onChangeText={props.handleChange('mail')}
										onBlur={props.handleBlur('mail')}
										value={props.values.mail}
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
									<LocationComponent
										latitude={props.handleChange('latitude')}
										longitude={props.handleChange('longitude')}
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
										Add Company
									</Button>
								</Layout>
							)}
						</Formik>
					)}
				</AddCompanyComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
