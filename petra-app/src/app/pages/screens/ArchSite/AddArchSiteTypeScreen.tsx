import * as React from 'react';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddArchSiteTypeComponent } from '../../../generated/components';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddArchSiteType props
 */
export interface AddArchSiteTypeProps {
	navigation: any;
}
/**
 * Location state
 */
export interface AddArchSiteTypeState {}

/**
 * Location
 */
export class AddArchSiteTypeScreen extends React.Component<AddArchSiteTypeProps, AddArchSiteTypeState> {
	constructor(props: AddArchSiteTypeProps) {
		super(props);
		this.state = {};
	}

	/**
	 * Renders
	 * @returns
	 */
	render() {
		return (
			<Layout style={{ flex: 1 }}>
				<AddArchSiteTypeComponent>
					{AddArchSiteTypeMutation => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								typeName: ''
							}}
							//Burada girilen değerlerin controlleri sağlanır
							validationSchema={Yup.object({
								typeName: Yup.string()
									.min(2, 'Too Short!')
									.max(50, 'Too Long!')
									.required('Required')
							})}
							//Kaydet butonuna tıklandığında bu fonksiyon çalışır
							onSubmit={(values, formikActions) => {
								setTimeout(() => {
									console.log(values.typeName + ' ');
									AddArchSiteTypeMutation({
										variables: {
											name: values.typeName.toString()
										}
									})
										.then(res => {
											alert(JSON.stringify(res));
											ToastAndroid.show('Company has been added successfully', ToastAndroid.SHORT);

											//this.props.navigation.navigate('Home');
										})
										.catch(err => {
											alert(err);
											console.log('ArchSiteType:' + values.typeName);
										});
									formikActions.setSubmitting(false);
								}, 500);
							}}
						>
							{/* Bu kısımda görsel parçalar eklenir */}
							{props => (
								<Layout>
									{props.isSubmitting && <Spinner />}

									<Input
										label="ArchSite Type"
										placeholder="Enter a ArchSite Type"
										status={props.touched.typeName && props.errors.typeName ? 'danger' : 'success'}
										caption={props.touched.typeName && props.errors.typeName ? props.errors.typeName : ''}
										onChangeText={props.handleChange('typeName')}
										onBlur={props.handleBlur('typeName')}
										value={props.values.typeName}
										autoFocus
									/>
									<Button
										onPress={() => {
											props.handleSubmit();
										}}
										disabled={props.isSubmitting}
									>
										Add ArchSite Type
									</Button>
								</Layout>
							)}
						</Formik>
					)}
				</AddArchSiteTypeComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
