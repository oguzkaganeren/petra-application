import * as React from 'react';
import { Button, Text, Layout } from '@ui-kitten/components';
import { StyleSheet, Image } from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as Google from 'expo-google-app-auth';

const IOS_CLIENT_ID = '29671483454-ca7ar2q60s28c3eab6m83n5rh0hd19b0.apps.googleusercontent.com';
const ANDROID_CLIENT_ID = '29671483454-nqtdad5lh9qibq6q1gjgii5m4dk9sfme.apps.googleusercontent.com';

/**
 * Login props
 * onLogin fonksiyonu firebase auth işlemlerini yapar (LoginContainer içerisinde)
 * onLogin çalıştığında firebaseUser props değeri değişir
 * onRedirect işlemler tamamlandığında Home ekranına yönlendirmek için kullanılır
 * onRedirect userId(veitanınında tutulan userId) değerini gönderir
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
				console.log('LoginScreen.js.js 21 | ', result.user.email);
				/* this.props.navigation.navigate('Profile', {
					username: result.user.givenName
				}); //after Google login redirect to Profile */
				return result.accessToken;
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
			<Button
				onPress={() => {
					this.signInWithGoogle();
					//setTimeout(props.handleSubmit, 0); //The code is important. I love this code.
				}}
			>
				Google sign in
			</Button>
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
