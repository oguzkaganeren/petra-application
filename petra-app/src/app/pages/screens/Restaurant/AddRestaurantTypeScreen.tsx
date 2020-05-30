import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddRestaurantTypeComponent } from '../../../generated/components';
import { Formik } from 'formik';
import Toast from 'react-native-easy-toast';
import * as Yup from 'yup';

export interface AddRestaurantTypeProps {
	navigation: any;
	route: any;
}

const AddRestaurantTypeScreen: React.FC<AddRestaurantTypeProps> = (props) => {
	const { restaurantID } = props.route.params;
	const toastRef = React.useRef();
	return (
		<Layout style={{ flex: 1 }}>
			<AddRestaurantTypeComponent>
				{(AddRestaurantTypeMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							type: '',
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							type: Yup.string()
								.min(2, 'Too Short!')
								.max(50, 'Too Long!')
								.required('Required'),
						})}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								console.log(values.type + ' ');
								AddRestaurantTypeMutation({
									variables: {
										RestaurantType: [
											{
												type: values.type.toString(),
											},
										],
									},
								})
									.then((res) => {
										//alert(JSON.stringify(res));
										toastRef.current.show(values.type + ' added. Redirecting to the previous page...', 500, () => {
											props.navigation.goBack();
										});
									})
									.catch((err) => {
										alert(err);
										console.log('foodType:' + values.type);
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
									label="Restaurant Type"
									placeholder="Enter a Restaurant Type"
									status={props.touched.type && props.errors.type ? 'danger' : 'success'}
									caption={props.touched.type && props.errors.type ? props.errors.type : ''}
									onChangeText={props.handleChange('type')}
									onBlur={props.handleBlur('type')}
									value={props.values.type}
									autoFocus
								/>
								<Toast ref={toastRef} />
								<Button
									onPress={() => {
										props.handleSubmit();
									}}
									disabled={props.isSubmitting}
								>
									Add Restaurant Type
								</Button>
							</Layout>
						)}
					</Formik>
				)}
			</AddRestaurantTypeComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default AddRestaurantTypeScreen;
