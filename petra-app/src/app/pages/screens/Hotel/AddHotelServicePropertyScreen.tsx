import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddHotelServicePropertyComponent } from '../../../generated/components';
import { Formik } from 'formik';
import Toast from 'react-native-easy-toast';
import * as Yup from 'yup';

export interface AddHotelServicePropertyProps {
	navigation: any;
	route: any;
}

const AddHotelServicePropertyScreen: React.FC<AddHotelServicePropertyProps> = (props) => {
	const toastRef = React.useRef();
	return (
		<Layout style={{ flex: 1 }}>
			<AddHotelServicePropertyComponent>
				{(AddHotelServicePropertyMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							content: '',
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							content: Yup.string()
								.min(2, 'Too Short!')
								.max(50, 'Too Long!')
								.required('Required'),
						})}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								AddHotelServicePropertyMutation({
									variables: {
										HotelServiceProperty: [
											{
												content: values.content.toString(),
											},
										],
									},
								})
									.then((res) => {
										//alert(JSON.stringify(res));
										toastRef.current.show(values.content + ' added. Redirecting to the previous page...', 500, () => {
											props.navigation.goBack();
										});
									})
									.catch((err) => {
										alert(err);
										console.log('foodType:' + values.content);
									});
								formikActions.setSubmitting(false);
							}, 500);
						}}
					>
						{/* Bu kısımda görsel parçalar eklenir */}
						{(props) => (
							<Layout>
								{props.isSubmitting && <Spinner />}

								<Input
									label="Service Property"
									placeholder="Enter a Service Property"
									status={props.touched.content && props.errors.content ? 'danger' : 'success'}
									caption={props.touched.content && props.errors.content ? props.errors.content : ''}
									onChangeText={props.handleChange('content')}
									onBlur={props.handleBlur('content')}
									value={props.values.content}
									autoFocus
								/>
								<Toast ref={toastRef} />
								<Button
									onPress={() => {
										props.handleSubmit();
									}}
									disabled={props.isSubmitting}
								>
									Add Service Property
								</Button>
							</Layout>
						)}
					</Formik>
				)}
			</AddHotelServicePropertyComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default AddHotelServicePropertyScreen;
