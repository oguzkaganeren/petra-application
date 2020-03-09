import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { ControlUserComponent } from '../../generated/components';
import * as Network from 'expo-network';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddCompany props
 */
export interface RegisterProps {
	navigation: any;
}
/**
 * Location state
 */
export interface RegisterState {
	cityID: number;
}

/**
 * Location
 */
export class RegisterScreen extends React.Component<RegisterProps, RegisterState> {
	constructor(props: RegisterProps) {
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
		return (
			<Layout style={{ flex: 1 }}>
				<ScrollView>
					<ControlUserComponent>
						{controlUserMutation => (
							<Formik
								//değişkenlerin başlangıç değerleri
								initialValues={{
									loginDate: new Date(),
									loginTypeID: 1,
									mail: '',
									name: '',
									phone: '',
									surname: '',
									password: '',
									registerDate: new Date(),
									accessToken: ''
								}}
								//Burada girilen değerlerin controlleri sağlanır
								validationSchema={Yup.object({
									name: Yup.string()
										.min(2, 'Too Short!')
										.max(50, 'Too Long!')
										.required('Required'),
									surname: Yup.string()
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
									password: Yup.string()
										.min(5, 'Too Short!')
										.required('Required')
								})}
								//Kaydet butonuna tıklandığında bu fonksiyon çalışır
								onSubmit={async (values, formikActions) => {
									const IP = await Network.getIpAddressAsync();
									setTimeout(() => {
										controlUserMutation({
											variables: {
												name: values.name,
												surname: values.surname,
												mail: values.mail,
												password: values.password,
												loginDate: values.loginDate,
												loginIP: IP,
												loginTypeID: values.loginTypeID,
												registerDate: values.registerDate
											}
										})
											.then(res => {
												alert(JSON.stringify(res));

												//this.props.navigation.navigate('Home');
											})
											.catch(err => {
												alert(err);
												console.log('name:' + values.name);
												console.log('tax:' + values.surname);
												console.log('phone:' + values.phone);
												console.log('registerDate:' + values.registerDate);
												console.log('mail:' + values.mail);
												console.log('address:' + values.phone);
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
											placeholder="Please Enter your Name"
											status={props.touched.name && props.errors.name ? 'danger' : 'success'}
											caption={props.touched.name && props.errors.name ? props.errors.name : ''}
											onChangeText={props.handleChange('name')}
											onBlur={props.handleBlur('name')}
											value={props.values.name}
											autoFocus
										/>
										<Input
											label="Surname"
											placeholder="Please Enter your Surname"
											status={props.touched.surname && props.errors.surname ? 'danger' : 'success'}
											caption={props.touched.surname && props.errors.surname ? props.errors.surname : ''}
											onChangeText={props.handleChange('surname')}
											onBlur={props.handleBlur('surname')}
											value={props.values.surname}
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
											label="Password"
											status={props.touched.password && props.errors.password ? 'danger' : 'success'}
											caption={props.touched.password && props.errors.password ? props.errors.password : ''}
											onChangeText={props.handleChange('password')}
											onBlur={props.handleBlur('password')}
											value={props.values.password}
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
										<Button
											onPress={() => {
												props.handleSubmit();
											}}
											disabled={props.isSubmitting}
										>
											Register
										</Button>
									</Layout>
								)}
							</Formik>
						)}
					</ControlUserComponent>
				</ScrollView>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
