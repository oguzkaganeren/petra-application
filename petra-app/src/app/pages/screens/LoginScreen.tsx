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
export interface LoginProps {}

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
				//return result.accessToken;
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
						onSubmit={(values, formikActions) => {
							// this.props.requestSentHandler();
							setTimeout(() => {
								ControlUserMutation({
									variables: {
										loginDate: '1999-01-08 04:05:06',
										loginIP: '127.0.0.1',
										loginTypeID: 1,
										mail: 'test@test.com',
										name: 'test',
										registerDate: '1999-01-08 04:05:06'
									}
								})
									.then(res => {
										console.log('done');
									})
									.catch(err => alert(err));
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
