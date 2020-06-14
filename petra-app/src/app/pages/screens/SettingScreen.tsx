import * as React from 'react';
import { StyleSheet, Dimensions, ScrollView, Platform, View } from 'react-native';
import { Button, Layout, Input, Icon, Spinner, Text, Datepicker } from '@ui-kitten/components';
import { UpdateUserComponent } from '../../generated/components';
import { GetUserInfoComponent } from '../../generated/components';
import * as Network from 'expo-network';
import Toast from 'react-native-easy-toast';
import { Formik } from 'formik';
import * as Yup from 'yup';
declare var global: any;
export interface SettingProps {
	navigation: any;
}

const SettingScreen: React.FC<SettingProps> = (props) => {
	const [secureTextEntry, setSecureTextEntry] = React.useState(true);
	const toastRef = React.useRef();
	const [userInfo, setUserInfo] = React.useState([]);
	const [userID, setUserID] = React.useState(global.userID);
	const renderIcon = (style) => <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />;
	const renderMailIcon = (style) => <Icon {...style} name={'email'} />;
	const renderEditIcon = (style) => <Icon {...style} name={'edit-2-outline'} />;
	const renderPhoneIcon = (style) => <Icon {...style} name={'phone-outline'} />;
	const CalendarIcon = (style) => <Icon {...style} name="calendar" />;

	const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
	return (
		<Layout style={{ flex: 1 }}>
			<ScrollView>
				<GetUserInfoComponent variables={{ userID: userID }}>
					{({ loading, error, data }) => {
						if (loading) return <Spinner size="giant" />;
						if (error) return <Text>error</Text>;

						if (data) {
							data.User.map((dat) => {
								userInfo.push({
									name: dat.name,
									surname: dat.surname,
									mail: dat.mail,
									profileImageUrl: dat.profileImageUrl,
									phone: dat.Phone != null ? dat.Phone.phone : '',
									birthDate: dat.birthDate,
								});
							});
						}
						return (
							<UpdateUserComponent>
								{(updateUserMutation) => (
									<Formik
										//değişkenlerin başlangıç değerleri
										initialValues={{
											mail: userInfo[0].mail,
											name: userInfo[0].name,
											profileImageUrl: userInfo[0].profileImageUrl,
											birthDate: userInfo[0].birthDate != null ? new Date(userInfo[0].birthDate) : null,
											surname: userInfo[0].surname,
										}}
										//Burada girilen değerlerin controlleri sağlanır
										validationSchema={Yup.object({
											name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
										})}
										//Kaydet butonuna tıklandığında bu fonksiyon çalışır
										onSubmit={async (values, formikActions) => {
											const IP = Platform.OS === 'web' ? '127.0.0.1' : await Network.getIpAddressAsync();

											setTimeout(() => {
												updateUserMutation({
													variables: {
														mail: values.mail,
														updateUser: {
															mail: values.mail,
															name: values.name,
															surname: values.surname,
															profileImageUrl: values.profileImageUrl,
															birthDate: values.birthDate,
														},
													},
												})
													.then((res) => {
														//alert(JSON.stringify(res));
														toastRef.current.show(values.name + ' saved your information.');
													})
													.catch((err) => {
														alert(err);
														console.log('name:' + values.name);
														console.log('tax:' + values.surname);
														console.log('phone:' + values.phone);
														console.log('mail:' + values.mail);
														console.log('address:' + values.phone);
													});
												formikActions.setSubmitting(false);
											}, 500);
										}}
									>
										{/* Bu kısımda görsel parçalar eklenir */}
										{(propsf) => (
											<Layout style={styles.layout}>
												{propsf.isSubmitting && <Spinner />}
												<Input
													label="Email"
													icon={renderMailIcon}
													disabled={true}
													status={propsf.touched.mail && propsf.errors.mail ? 'danger' : 'success'}
													caption={propsf.touched.mail && propsf.errors.mail ? propsf.errors.mail : ''}
													onChangeText={propsf.handleChange('mail')}
													onBlur={propsf.handleBlur('mail')}
													value={propsf.values.mail}
												/>

												<Toast ref={toastRef} position="center" />
												<Input
													label="Name"
													placeholder="Please Enter your Name"
													icon={renderEditIcon}
													status={propsf.touched.name && propsf.errors.name ? 'danger' : 'success'}
													caption={propsf.touched.name && propsf.errors.name ? propsf.errors.name : ''}
													onChangeText={propsf.handleChange('name')}
													onBlur={propsf.handleBlur('name')}
													value={propsf.values.name}
													autoFocus
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
													label="Profile Image Url"
													icon={renderEditIcon}
													placeholder="Please Enter your profile image url"
													status={
														propsf.touched.profileImageUrl && propsf.errors.profileImageUrl ? 'danger' : 'success'
													}
													caption={
														propsf.touched.profileImageUrl && propsf.errors.profileImageUrl
															? propsf.errors.profileImageUrl
															: ''
													}
													onChangeText={propsf.handleChange('profileImageUrl')}
													onBlur={propsf.handleBlur('profileImageUrl')}
													value={propsf.values.profileImageUrl}
												/>
												<Datepicker
													min={new Date(1900, 1, 1)}
													max={new Date(2010, 1, 1)}
													style={{ marginTop: 5, flex: 1 }}
													date={propsf.values.birthDate}
													placeholder="Pick your birthday"
													icon={CalendarIcon}
													onSelect={(e) => propsf.setFieldValue('birthDate', e)}
												/>

												<Button
													style={{ marginTop: 10 }}
													onPress={() => {
														propsf.handleSubmit();
													}}
													disabled={propsf.isSubmitting}
												>
													Save
												</Button>
											</Layout>
										)}
									</Formik>
								)}
							</UpdateUserComponent>
						);
					}}
				</GetUserInfoComponent>
			</ScrollView>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	layout: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 100,
		paddingBottom: Dimensions.get('window').height / 2,
	},
});
export default SettingScreen;
