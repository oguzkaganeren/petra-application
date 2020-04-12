import * as React from 'react';
import { Button, Text, Layout, Icon, Input } from '@ui-kitten/components';
import { StyleSheet, AsyncStorage, Dimensions, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as Google from 'expo-google-app-auth';
import { ControlUserComponent } from '../../generated/components';
import { ControlLoginMailUserComponent } from '../../generated/components';
import * as Network from 'expo-network';

const IOS_CLIENT_ID = '29671483454-ca7ar2q60s28c3eab6m83n5rh0hd19b0.apps.googleusercontent.com';
const ANDROID_CLIENT_ID = '29671483454-nqtdad5lh9qibq6q1gjgii5m4dk9sfme.apps.googleusercontent.com';

export interface LoginProps {
	navigation: any;
}

declare var global: any;
global.userID = -1;

const LoginScreen: React.FC<LoginProps> = props => {
	const [userID, setUserID] = React.useState(0);
	const [accessToken, setAccessToken] = React.useState('');
	const [secureTextEntry, setSecureTextEntry] = React.useState(true);

	const signInWithGoogle = async () => {
		try {
			const result = await Google.logInAsync({
				iosClientId: IOS_CLIENT_ID,
				androidClientId: ANDROID_CLIENT_ID,
				scopes: ['profile', 'email']
			});

			if (result.type === 'success') {
				return result;
			} else {
				return { cancelled: true };
			}
		} catch (e) {
			console.log('LoginScreen | Error with login', e);
			return { error: true };
		}
	};
	const renderIcon = style => <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />;
	const renderMailIcon = style => <Icon {...style} name={'email'} />;
	const renderSetUserComponent = (
		<Layout style={styles.layout}>
			{/**sadece mobile kısmında google login gözükecek */}
			{Platform.OS !== 'web' && (
				<ControlUserComponent>
					{ControlUserMutation => (
						<Formik
							initialValues={{}}
							validationSchema={Yup.object({
								mail: Yup.string()
									.email('Invalid email')
									.required('Required'),
								password: Yup.string() //.min(5, 'Too Short!').required('Required'),
							})}
							onSubmit={async (values, formikActions) => {
								const result = await signInWithGoogle();
								const IP = await Network.getIpAddressAsync();
								setTimeout(() => {
									if (result.type === 'success') {
										console.log(result.accessToken);
										ControlUserMutation({
											variables: {
												loginDate: new Date(),
												loginIP: IP,
												loginTypeID: 1,
												mail: result.user.email,
												name: result.user.givenName,
												registerDate: new Date(),
												password: '0',
												accessToken: result.accessToken
											}
										})
											.then(res => {
												const userID = res.data.insert_User.returning[0].userID;
												const userTypeID = res.data.insert_User.returning[0].userTypeID;
												AsyncStorage.multiSet([['userID', userID.toString()]]);
												global.userID = userID;
												global.userTypeID = userTypeID;
												props.navigation.navigate('HomeScreen', {
													userID: userID
												});
											})
											.catch(err => alert(err));
									} else {
										console.log('Login error');
									}

									formikActions.setSubmitting(false);
								}, 500);
							}}
						>
							{props => (
								<Button
									onPress={() => {
										props.handleSubmit();
									}}
								>
									Google Login
								</Button>
							)}
						</Formik>
					)}
				</ControlUserComponent>
			)}
			<ControlLoginMailUserComponent>
				{ControlLoginMailUserMutation => (
					<Formik
						initialValues={{
							secureTextEntry: true,
							password: '',
							mail: ''
						}}
						validationSchema={Yup.object({
							mail: Yup.string()
								.email('Invalid email')
								.required('Required'),
							password: Yup.string() //.min(5, 'Too Short!'),
							//.required('Required')
						})}
						onSubmit={async (values, formikActions) => {
							const IP = Platform.OS === 'web' ? '127.0.0.1' : await Network.getIpAddressAsync();
							setTimeout(() => {
								ControlLoginMailUserMutation({
									variables: {
										loginDate: new Date(),
										loginIP: IP,
										loginTypeID: Platform.OS === 'web' ? 2 : 1, //eğer web'den giriyorsa 2 idsi gidecektir
										mail: values.mail,
										password: values.password
									}
								})
									.then(res => {
										const userID = res.data.update_User.returning[0].userID;
										const userTypeID = res.data.update_User.returning[0].userTypeID;
										global.userID = userID;
										global.userTypeID = userTypeID;
										props.navigation.navigate('HomeScreen', {
											userID: userID
										});
									})
									.catch(err => alert(err));
								formikActions.setSubmitting(false);
							}, 500);
						}}
					>
						{propsf => (
							<Layout>
								<Input
									value={propsf.values.mail}
									placeholder="asd@asd.com"
									label="Mail address"
									icon={renderMailIcon}
									status={propsf.touched.mail && propsf.errors.mail ? 'danger' : 'success'}
									caption={propsf.touched.mail && propsf.errors.mail ? propsf.errors.mail : ''}
									onChangeText={propsf.handleChange('mail')}
									onBlur={propsf.handleBlur('mail')}
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
								<Button
									status="primary"
									onPress={() => {
										propsf.handleSubmit();
									}}
								>
									Login
								</Button>
								<Button
									status="warning"
									onPress={() => {
										props.navigation.navigate('RegisterScreen');
									}}
								>
									Register
								</Button>
							</Layout>
						)}
					</Formik>
				)}
			</ControlLoginMailUserComponent>
		</Layout>
	);
	/**
	 * To SignOUT!!!!!
	 * let keys = ['userID', 'accessToken'];
		AsyncStorage.multiRemove(keys, (err) => {
			console.log('Local storage user info removed!');
		});
	 */
	const controlUser = () => {
		AsyncStorage.multiGet(['userID', 'accessToken']).then(data => {
			let userID = data[0][1];
			let accessToken = data[1][1];

			/*if (accessToken !== null) {
				this.setState({ userID: parseInt(userID, 10), accessToken: accessToken });
				this.props.navigation.navigate('HomeScreen', {
					userID: userID,
					accessToken: accessToken
				});
			} else {
				return this.renderSetUserComponent;
			}*/
		});
		return renderSetUserComponent;
	};

	return <Layout>{accessToken.length == 0 ? renderSetUserComponent : null}</Layout>;
};

const styles: any = StyleSheet.create({
	layout: {
		alignItems: 'center',
		justifyContent: 'center',
		height: Dimensions.get('window').height,
		paddingBottom: Dimensions.get('window').height / 2
	}
});
export default LoginScreen;
