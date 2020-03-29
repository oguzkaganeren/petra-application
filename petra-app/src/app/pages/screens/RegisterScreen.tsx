import * as React from 'react';
import { StyleSheet, Dimensions, ScrollView, Platform } from 'react-native';
import { Button, Layout, Input, Icon, Spinner } from '@ui-kitten/components';
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
	secureTextEntry: boolean;
}

/**
 * Location
 */
export class RegisterScreen extends React.Component<RegisterProps, RegisterState> {
	constructor(props: RegisterProps) {
		super(props);
		this.state = {
			secureTextEntry: true
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
	renderIcon = style => <Icon {...style} name={this.state.secureTextEntry ? 'eye-off' : 'eye'} />;
	renderMailIcon = style => <Icon {...style} name={'email'} />;
	renderEditIcon = style => <Icon {...style} name={'edit-2-outline'} />;
	renderPhoneIcon = style => <Icon {...style} name={'phone-outline'} />;
	/**
	 * Renders
	 * @returns
	 */
	render() {
		const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
		return (
			<Layout style={{ flex: 1 }}>
				<ScrollView>
					<ControlUserComponent>
						{controlUserMutation => (
							<Formik
								//değişkenlerin başlangıç değerleri
								initialValues={{
									secureTextEntry: true,
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
										.matches(phoneRegExp, 'Phone number is not valid')
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
									const IP = Platform.OS === 'web' ? '127.0.0.1' : await Network.getIpAddressAsync();

									setTimeout(() => {
										controlUserMutation({
											variables: {
												controlUser:[
													{
														name: values.name,
														surname: values.surname,
														mail: values.mail,
														password: values.password,
														loginDate: values.loginDate,
														loginIP: IP,
														loginTypeID: values.loginTypeID,
														registerDate: values.registerDate
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
									<Layout style={styles.layout}>
										{props.isSubmitting && <Spinner />}
										<Input
											label="Email"
											icon={this.renderMailIcon}
											status={props.touched.mail && props.errors.mail ? 'danger' : 'success'}
											caption={props.touched.mail && props.errors.mail ? props.errors.mail : ''}
											placeholder="john.doe@example.com"
											onChangeText={props.handleChange('mail')}
											onBlur={props.handleBlur('mail')}
											value={props.values.mail}
											autoFocus
										/>
										<Input
											value={props.values.password}
											placeholder="********"
											label="Password"
											status={props.touched.password && props.errors.password ? 'danger' : 'success'}
											caption={props.touched.password && props.errors.password ? props.errors.password : ''}
											icon={this.renderIcon}
											secureTextEntry={props.values.secureTextEntry}
											onIconPress={() => {
												props.setFieldValue('secureTextEntry', !props.values.secureTextEntry);
												this.setState({ secureTextEntry: !props.values.secureTextEntry });
											}}
											onChangeText={props.handleChange('password')}
											onBlur={props.handleBlur('password')}
										/>
										<Input
											label="Name"
											placeholder="Please Enter your Name"
											icon={this.renderEditIcon}
											status={props.touched.name && props.errors.name ? 'danger' : 'success'}
											caption={props.touched.name && props.errors.name ? props.errors.name : ''}
											onChangeText={props.handleChange('name')}
											onBlur={props.handleBlur('name')}
											value={props.values.name}
										/>
										<Input
											label="Surname"
											icon={this.renderEditIcon}
											placeholder="Please Enter your Surname"
											status={props.touched.surname && props.errors.surname ? 'danger' : 'success'}
											caption={props.touched.surname && props.errors.surname ? props.errors.surname : ''}
											onChangeText={props.handleChange('surname')}
											onBlur={props.handleBlur('surname')}
											value={props.values.surname}
										/>

										<Input
											label="Phone Number"
											icon={this.renderPhoneIcon}
											status={props.touched.phone && props.errors.phone ? 'danger' : 'success'}
											caption={props.touched.phone && props.errors.phone ? props.errors.phone : ''}
											placeholder="0 555 555 55 55"
											onChangeText={props.handleChange('phone')}
											onBlur={props.handleBlur('phone')}
											value={props.values.phone}
										/>
										<Button
											style={{ marginTop: 10 }}
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

const styles: any = StyleSheet.create({
	layout: {
		alignItems: 'center',
		justifyContent: 'center',
		height: Dimensions.get('window').height,
		paddingBottom: Dimensions.get('window').height / 2
	}
});
