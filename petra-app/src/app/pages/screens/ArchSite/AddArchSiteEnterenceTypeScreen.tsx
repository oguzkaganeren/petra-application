import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddArchSiteEntranceTypeComponent } from '../../../generated/components';
import { Formik } from 'formik';
import * as Yup from 'yup';

export interface AddArchSiteEntranceTypeProps {
	navigation: any;
	route: any;
}
const AddArchSiteEntranceTypeScreen: React.FC<AddArchSiteEntranceTypeProps> = props => {
	const { userID } = props.route.params;
	const { archSiteID } = props.route.params;
	return (
		<Layout style={{ flex: 1 }}>
			<AddArchSiteEntranceTypeComponent>
				{AddArchSiteEntranceTypeMutation => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							content: '',
							star: 0
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							content: Yup.string()
								.min(2, 'Too Short!')
								.max(50, 'Too Long!')
								.required('Required'),
							star: Yup.number().required('Required')
						})}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								AddArchSiteEntranceTypeMutation({
									variables: {
										ArchSiteEntranceType: [
											{
												content: values.content
											}
										]
									}
								})
									.then(res => {
										alert(JSON.stringify(res));
									})
									.catch(err => {
										alert(err);
										console.log('content:' + values.content);
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
									label="Content"
									placeholder="Enter your comment"
									status={props.touched.content && props.errors.content ? 'danger' : 'success'}
									caption={props.touched.content && props.errors.content ? props.errors.content : ''}
									onChangeText={props.handleChange('content')}
									onBlur={props.handleBlur('content')}
									value={props.values.content}
									autoFocus
								/>

								<Button
									onPress={() => {
										props.handleSubmit();
									}}
									disabled={props.isSubmitting}
								>
									Add ArchSite Entrance Type
								</Button>
							</Layout>
						)}
					</Formik>
				)}
			</AddArchSiteEntranceTypeComponent>
		</Layout>
	);
};
export default AddArchSiteEntranceTypeScreen;
