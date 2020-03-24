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

//const [controlUser, { data }] = useMutation(CONTROL_USER);

/**
 * Login props
 */
export interface LoginProps {
	navigation: any;
}

/**
 * Login state
 */
export interface LoginState {
	userID: number;
	accessToken: string;
	secureTextEntry: boolean;
}
declare var global: any;
global.userID = -1;
/**
 * Login
 */
export class LoginScreen extends React.Component<LoginProps, LoginState> {
	constructor(props: LoginProps) {
		super(props);
		this.state = {
			userID: 0,
			accessToken: '',
			secureTextEntry: true
		};
		this.controlUser();
	}

	signInWithGoogle = async () => {
		try {
			const result = await Google.logInAsync({
				iosClientId: IOS_CLIENT_ID,
				androidClientId: ANDROID_CLIENT_ID,
				scopes: ['profile', 'email']
			});

			if (result.type === 'success') {
				//console.log('LoginScreen.js.js 21 | ', result.user.email);
				/* this.props.navigation.navigate('Profile', {
					username: result.user.givenName
				}); //after Google login redirect to Profile */
				return result;
			} else {
				return { cancelled: true };
			}
		} catch (e) {
			console.log('LoginScreen | Error with login', e);
			return { error: true };
		}
	};
	renderIcon = style => <Icon {...style} name={this.state.secureTextEntry ? 'eye-off' : 'eye'} />;
	renderMailIcon = style => <Icon {...style} name={'email'} />;
	renderSetUserComponent = (
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
								password: Yup.string()
									.min(5, 'Too Short!')
									.required('Required')
							})}
							onSubmit={async (values, formikActions) => {
								// this.props.requestSentHandler();
								const result = await this.signInWithGoogle();
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
												this.props.navigation.navigate('HomeScreen', {
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
							password: Yup.string()
								.min(5, 'Too Short!')
								.required('Required')
						})}
						onSubmit={async (values, formikActions) => {
							// this.props.requestSentHandler();

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
										this.props.navigation.navigate('HomeScreen', {
											userID: userID
										});
									})
									.catch(err => alert(err));
								formikActions.setSubmitting(false);
							}, 500);
						}}
					>
						{props => (
							<Layout>
								<Input
									value={props.values.mail}
									placeholder="asd@asd.com"
									label="Mail address"
									icon={this.renderMailIcon}
									status={props.touched.mail && props.errors.mail ? 'danger' : 'success'}
									caption={props.touched.mail && props.errors.mail ? props.errors.mail : ''}
									onChangeText={props.handleChange('mail')}
									onBlur={props.handleBlur('mail')}
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
								<Button
									status="primary"
									onPress={() => {
										props.handleSubmit();
									}}
								>
									Login
								</Button>
								<Button
									status="warning"
									onPress={() => {
										this.props.navigation.navigate('RegisterScreen');
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
	controlUser = () => {
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
		return this.renderSetUserComponent;
	};
	/**
	 * Renders login
	 * @returns
	 */
	render() {
		return <Layout>{this.state.accessToken.length == 0 ? this.renderSetUserComponent : null}</Layout>;
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
