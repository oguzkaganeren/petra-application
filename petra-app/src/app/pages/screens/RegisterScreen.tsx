import * as React from 'react';
import { StyleSheet, Dimensions, ScrollView, Platform } from 'react-native';
import { Button, Layout, Input, Icon, Spinner } from '@ui-kitten/components';
import { ControlUserComponent } from '../../generated/components';
import * as Network from 'expo-network';
import { Formik } from 'formik';
import * as Yup from 'yup';

export interface RegisterProps {
	navigation: any;
}

const RegisterScreen: React.FC<RegisterProps> = props => {
	const [secureTextEntry, setSecureTextEntry] = React.useState(true);

	const convertDateFormatForQuery = (date: Date) => {
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
	const renderIcon = style => <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />;
	const renderMailIcon = style => <Icon {...style} name={'email'} />;
	const renderEditIcon = style => <Icon {...style} name={'edit-2-outline'} />;
	const renderPhoneIcon = style => <Icon {...style} name={'phone-outline'} />;

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
											controlUser: [
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
							{propsf => (
								<Layout style={styles.layout}>
									{propsf.isSubmitting && <Spinner />}
									<Input
										label="Email"
										icon={renderMailIcon}
										status={propsf.touched.mail && propsf.errors.mail ? 'danger' : 'success'}
										caption={propsf.touched.mail && propsf.errors.mail ? propsf.errors.mail : ''}
										placeholder="john.doe@example.com"
										onChangeText={propsf.handleChange('mail')}
										onBlur={propsf.handleBlur('mail')}
										value={propsf.values.mail}
										autoFocus
									/>
									<Input
										value={propsf.values.password}
										placeholder="********"
										label="Password"
										status={propsf.touched.password && propsf.errors.password ? 'danger' : 'success'}
										caption={propsf.touched.password && propsf.errors.password ? propsf.errors.password : ''}
										icon={renderIcon}
										secureTextEntry={propsf.values.secureTextEntry}
										onIconPress={() => {
											propsf.setFieldValue('secureTextEntry', !propsf.values.secureTextEntry);
											setSecureTextEntry(!propsf.values.secureTextEntry);
										}}
										onChangeText={propsf.handleChange('password')}
										onBlur={propsf.handleBlur('password')}
									/>
									<Input
										label="Name"
										placeholder="Please Enter your Name"
										icon={renderEditIcon}
										status={propsf.touched.name && propsf.errors.name ? 'danger' : 'success'}
										caption={propsf.touched.name && propsf.errors.name ? propsf.errors.name : ''}
										onChangeText={propsf.handleChange('name')}
										onBlur={propsf.handleBlur('name')}
										value={propsf.values.name}
									/>
									<Input
										label="Surname"
										icon={renderEditIcon}
										placeholder="Please Enter your Surname"
										status={propsf.touched.surname && propsf.errors.surname ? 'danger' : 'success'}
										caption={propsf.touched.surname && propsf.errors.surname ? propsf.errors.surname : ''}
										onChangeText={propsf.handleChange('surname')}
										onBlur={propsf.handleBlur('surname')}
										value={propsf.values.surname}
									/>

									<Input
										label="Phone Number"
										icon={renderPhoneIcon}
										status={propsf.touched.phone && propsf.errors.phone ? 'danger' : 'success'}
										caption={propsf.touched.phone && propsf.errors.phone ? propsf.errors.phone : ''}
										placeholder="0 555 555 55 55"
										onChangeText={propsf.handleChange('phone')}
										onBlur={propsf.handleBlur('phone')}
										value={propsf.values.phone}
									/>
									<Button
										style={{ marginTop: 10 }}
										onPress={() => {
											propsf.handleSubmit();
										}}
										disabled={propsf.isSubmitting}
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
};

const styles: any = StyleSheet.create({
	layout: {
		alignItems: 'center',
		justifyContent: 'center',
		height: Dimensions.get('window').height,
		paddingBottom: Dimensions.get('window').height / 2
	}
});
export default RegisterScreen;
