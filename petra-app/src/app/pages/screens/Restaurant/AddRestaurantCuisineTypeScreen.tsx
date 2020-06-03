import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddRestaurantCuisineTypeComponent } from '../../../generated/components';
import { Formik } from 'formik';
import Toast from 'react-native-easy-toast';
import * as Yup from 'yup';

export interface AddRestaurantCuisineTypeProps {
	navigation: any;
	route: any;
}

const AddRestaurantCuisineTypeScreen: React.FC<AddRestaurantCuisineTypeProps> = (props) => {
	const toastRef = React.useRef();
	return (
		<Layout style={{ flex: 1 }}>
			<AddRestaurantCuisineTypeComponent>
				{(AddRestaurantCuisineTypeMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							name: '',
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							name: Yup.string()
								.min(2, 'Too Short!')
								.max(50, 'Too Long!')
								.required('Required'),
						})}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								AddRestaurantCuisineTypeMutation({
									variables: {
										RestaurantCuisineType: [
											{
												name: values.name,
											},
										],
									},
								})
									.then((res) => {
										//alert(JSON.stringify(res));
										toastRef.current.show(values.name + ' added. Redirecting to the previous page...', 500, () => {
											props.navigation.goBack();
										});
										//this.props.navigation.navigate('Home');
									})
									.catch((err) => {
										alert(err);
										console.log('name:' + values.name);
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
									label="Cuisine Type"
									placeholder="Enter Cuisine Type "
									status={props.touched.name && props.errors.name ? 'danger' : 'success'}
									caption={props.touched.name && props.errors.name ? props.errors.name : ''}
									onChangeText={props.handleChange('name')}
									onBlur={props.handleBlur('name')}
									value={props.values.name}
									autoFocus
								/>
								<Toast ref={toastRef} />
								<Button
									onPress={() => {
										props.handleSubmit();
									}}
									disabled={props.isSubmitting}
								>
									Add Cuisine Type
								</Button>
							</Layout>
						)}
					</Formik>
				)}
			</AddRestaurantCuisineTypeComponent>
		</Layout>
	);
};
export default AddRestaurantCuisineTypeScreen;
