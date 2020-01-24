import * as React from 'react';
import { Button, Text, Layout } from '@ui-kitten/components';
import { StyleSheet, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Mutation } from 'react-apollo';
import * as Google from 'expo-google-app-auth';
import { ControlUserComponent } from '../../generated/components';
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
export interface LoginState {}

/**
 * Login
 */
export class LoginScreen extends React.Component<LoginProps, LoginState> {
	constructor(props: LoginProps) {
		super(props);
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
	renderSetUserComponent = (
		<Layout>
			<ControlUserComponent>
				{ControlUserMutation => (
					<Formik
						initialValues={{}}
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
											accessToken: result.accessToken
										}
									})
										.then(res => {
											const userID = res.data.insert_User.returning[0].userID;
											this.props.navigation.navigate('HomeScreen', {
												userID: userID,
												name: result.user.givenName,
												mail: result.user.email
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
			{/* <Button
				onPress={() => {
					this.signInWithGoogle();

					//setTimeout(saveRocket(), 0); //The code is important. I love this code.
				}}
			>
				Google sign in
			</Button> */}
		</Layout>
	);
	/**
	 * Renders login
	 * @returns
	 */
	render() {
		return <Layout>{this.renderSetUserComponent}</Layout>;
	}
}

const styles: any = StyleSheet.create({});
