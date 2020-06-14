import * as React from 'react';
import { Button, Text, Layout, Icon, Input } from '@ui-kitten/components';
import { StyleSheet, AsyncStorage, Dimensions, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { ControlLoginMailUserComponent } from '../../generated/components';
import * as Network from 'expo-network';

export interface LoginProps {
	navigation: any;
}

declare var global: any;
global.userID = -1;

const LoginScreen: React.FC<LoginProps> = (props) => {
	const [userID, setUserID] = React.useState(0);
	const [accessToken, setAccessToken] = React.useState('');
	const [secureTextEntry, setSecureTextEntry] = React.useState(true);

	const renderIcon = (style) => <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />;
	const renderMailIcon = (style) => <Icon {...style} name={'email'} />;
	const renderSetUserComponent = (
		<Layout style={styles.layout}>
			<ControlLoginMailUserComponent>
				{(ControlLoginMailUserMutation) => (
					<Formik
						initialValues={{
							secureTextEntry: true,
							password: '12345',
							mail: 'oguz@eren.com',
						}}
						validationSchema={Yup.object({
							mail: Yup.string().email('Invalid email').required('Required'),
							password: Yup.string(), //.min(5, 'Too Short!'),
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
										password: values.password,
									},
								})
									.then((res) => {
										const userID = res.data.update_User.returning[0].userID;
										const userTypeID = res.data.update_User.returning[0].userTypeID;
										global.userID = userID;
										global.userTypeID = userTypeID;
										props.navigation.navigate('HomeScreen', {
											userID: userID,
										});
									})
									.catch((err) => alert(err));
								formikActions.setSubmitting(false);
							}, 500);
						}}
					>
						{(propsf) => (
							<Layout>
								<Input
									value={propsf.values.mail}
									placeholder="asd@asd.com"
									defaultValue="oguz@eren.com"
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
									onPress={() => {
										propsf.handleSubmit();
									}}
								>
									Login
								</Button>
								<Button
									status="warning"
									appearance="ghost"
									style={{ marginTop: 10 }}
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

	return <Layout>{accessToken.length == 0 ? renderSetUserComponent : null}</Layout>;
};

const styles: any = StyleSheet.create({
	layout: {
		alignItems: 'center',
		justifyContent: 'center',
		height: Dimensions.get('window').height,
		paddingBottom: Dimensions.get('window').height / 2,
	},
});
export default LoginScreen;
