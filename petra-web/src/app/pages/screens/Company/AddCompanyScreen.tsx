import * as React from 'react';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddCompanyComponent } from '../../../generated/components';
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
export interface AddCompanyState {
	cityID: number;
}

/**
 * Location
 */
export class AddCompanyScreen extends React.Component<AddCompanyProps, AddCompanyState> {
	constructor(props: AddCompanyProps) {
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
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
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
									address: '',
									phone: '',
									districtID: 0,
									cityID: 0
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
									phone: Yup.string()
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
												company: [
													{
														name: values.name.toString(),
														taxNumber: values.taxNumber.toString(),
														registerDate: this.convertDateFormatForQuery(new Date()), //sonra utc ayarına bak!
														mail: values.mail.toString(),
														CompanyPhones: { data: [{ Phone: { data: { phone: values.phone.toString() } } }] },
														CompanyUsers: { data: [{ userID: userID }] },
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
														}
													}
												]
												/* name: values.name.toString(),
											taxNumber: values.taxNumber.toString(),
											registerDate: this.convertDateFormatForQuery(new Date()), //sonra utc ayarına bak!
											mail: values.mail.toString(),
											phone: values.phone.toString(),
											longtitude: values.longtitude,
											latitude: values.latitude,
											address: values.address.toString(),
											userID: userID */
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
												console.log('phone:' + values.phone);
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
											label="Phone Number"
											status={props.touched.phone && props.errors.phone ? 'danger' : 'success'}
											caption={props.touched.phone && props.errors.phone ? props.errors.phone : ''}
											placeholder="54-2548568-22"
											onChangeText={props.handleChange('phone')}
											onBlur={props.handleBlur('phone')}
											value={props.values.phone}
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

