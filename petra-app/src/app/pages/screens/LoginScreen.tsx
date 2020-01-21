import * as React from 'react';
import { Button, Text, Layout } from '@ui-kitten/components';
import { StyleSheet, Image } from 'react-native';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import * as Google from 'expo-google-app-auth';

const IOS_CLIENT_ID = '29671483454-ca7ar2q60s28c3eab6m83n5rh0hd19b0.apps.googleusercontent.com';
const ANDROID_CLIENT_ID = '29671483454-nqtdad5lh9qibq6q1gjgii5m4dk9sfme.apps.googleusercontent.com';

const ADD_TODO = gql`
	mutation MyMutation(
		$loginDate: timestamptz
		$loginIP: inet
		$loginTypeID: Int
		$mail: String
		$name: String
		$registerDate: timestamptz
		$userTypeID: Int
	) {
		__typename
		insert_User(
			objects: {
				loginDate: $loginDate
				loginIP: $loginIP
				loginTypeID: $loginTypeID
				mail: $mail
				name: $name
				registerDate: $registerDate
				userTypeID: $userTypeID
			}
			on_conflict: { constraint: User_mail_key, update_columns: loginDate, where: {} }
		) {
			returning {
				userID
			}
		}
	}
`;

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
