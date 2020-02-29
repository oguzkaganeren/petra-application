import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddTagComponent } from '../../../generated/components';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddArchSiteType props
 */
export interface AddTagScreenProps {
	navigation: any;
}
/**
 * Location state
 */
export interface AddTagScreenState {}

/**
 * Location
 */
export class AddTagScreen extends React.Component<AddTagScreenProps, AddTagScreenState> {
	constructor(props: AddTagScreenProps) {
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
				<AddTagComponent>
					{AddTagMutation => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								name: ''
							}}
							//Burada girilen değerlerin controlleri sağlanır
							validationSchema={Yup.object({
								name: Yup.string()
									.min(2, 'Too Short!')
									.max(50, 'Too Long!')
									.required('Required')
							})}
							//Kaydet butonuna tıklandığında bu fonksiyon çalışır
							onSubmit={(values, formikActions) => {
								setTimeout(() => {
									console.log(values.name + ' ');
									AddTagMutation({
										variables: {
											name: values.name.toString()
										}
									})
										.then(res => {
											alert(JSON.stringify(res));

											//this.props.navigation.navigate('Home');
										})
										.catch(err => {
											alert(err);
											console.log('ArchSiteType:' + values.name);
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
										label="Tag Name"
										placeholder="Enter a Tag Name"
										status={props.touched.name && props.errors.name ? 'danger' : 'success'}
										caption={props.touched.name && props.errors.name ? props.errors.name : ''}
										onChangeText={props.handleChange('name')}
										onBlur={props.handleBlur('name')}
										value={props.values.name}
										autoFocus
									/>
									<Button
										onPress={() => {
											props.handleSubmit();
										}}
										disabled={props.isSubmitting}
									>
										Add Tag
									</Button>
								</Layout>
							)}
						</Formik>
					)}
				</AddTagComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
