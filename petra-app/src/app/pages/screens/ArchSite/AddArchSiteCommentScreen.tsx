import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddArchSiteCommentComponent } from '../../../generated/components';
import { Formik } from 'formik';
import * as Yup from 'yup';

export interface AddArchSiteCommentProps {
	navigation: any;
	route: any;
}

const AddArchSiteCommentScreen: React.FC<AddArchSiteCommentProps> = props => {
	const { userID } = props.route.params;
	const { archSiteID } = props.route.params;
	return (
		<Layout style={{ flex: 1 }}>
			<AddArchSiteCommentComponent>
				{AddArchSiteCommentMutation => (
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
								AddArchSiteCommentMutation({
									variables: {
										ArchSiteComment: [
											{
												content: values.content,
												date: new Date(),
												archSiteID: archSiteID,
												star: values.star,
												userID: userID
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
										console.log('star:' + values.star);
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
								<Input
									label="Star"
									status={props.touched.star && props.errors.star ? 'danger' : 'success'}
									caption={props.touched.star && props.errors.star ? props.errors.star : ''}
									placeholder="3"
									onChangeText={props.handleChange('star')}
									onBlur={props.handleBlur('star')}
									value={props.values.star.toString()}
								/>
								<Button
									onPress={() => {
										props.handleSubmit();
									}}
									disabled={props.isSubmitting}
								>
									Add ArchSite Comment
								</Button>
							</Layout>
						)}
					</Formik>
				)}
			</AddArchSiteCommentComponent>
		</Layout>
	);
};
export default AddArchSiteCommentScreen;
