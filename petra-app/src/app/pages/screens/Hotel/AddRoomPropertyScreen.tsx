import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddRoomPropertyComponent } from '../../../generated/components';
import { Formik } from 'formik';
import * as Yup from 'yup';

export interface AddRoomPropertyProps {
	navigation: any;
	route: any;
}
const AddRoomPropertyScreen: React.FC<AddRoomPropertyProps> = props => {
	return (
		<Layout style={{ flex: 1 }}>
			<AddRoomPropertyComponent>
				{AddRoomProperyMutation => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							content: ''
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							content: Yup.string()
								.min(2, 'Too Short!')
								.max(50, 'Too Long!')
								.required('Required')
						})}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								console.log(values.content + ' ');
								AddRoomProperyMutation({
									variables: {
										RoomProperty: [
											{
												content: values.content.toString()
											}
										]
									}
								})
									.then(res => {
										alert(JSON.stringify(res));
									})
									.catch(err => {
										alert(err);
										console.log('roomProp:' + values.content);
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
									label="Room Property Type"
									placeholder="Enter a Room Property Type"
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
									Add Room Property
								</Button>
							</Layout>
						)}
					</Formik>
				)}
			</AddRoomPropertyComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default AddRoomPropertyScreen;
