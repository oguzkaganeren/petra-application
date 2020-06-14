import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Layout, Input, Text, Spinner, Icon } from '@ui-kitten/components';
import { UpdateCompanyComponent } from '../../../generated/components';
import { GetCompanyByIdComponent } from '../../../generated/components';
import Toast from 'react-native-easy-toast';
import LocationComponent from '../../../components/Public/LocationComponent';

import { Formik } from 'formik';
import * as Yup from 'yup';
declare var global: any;

export interface EditCompanyProps {
	navigation: any;
	route: any;
}

const EditCompanyScreen: React.FC<EditCompanyProps> = (props) => {
	const { companyID } = props.route.params;
	const [cityID, setCityID] = React.useState(0);
	const [oneTimeRun, setOneTimeRun] = React.useState(true);
	const [locationID, setLocationID] = React.useState(-1);
	const [addressID, setAddressID] = React.useState(-1);
	const toastRef = React.useRef();
	const accessoryItemIcon = (style) => <Icon {...style} name="edit-2-outline" />;
	return (
		<Layout style={{ flex: 1 }}>
			<UpdateCompanyComponent>
				{(UpdateCompanyMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							name: '',
							taxNumber: '',
							registerDate: '',
							mail: '',
							longtitude: 0,
							latitude: 0,
							address: '',
							phone: '',
							districtID: 0,
							cityID: 0,
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
							taxNumber: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
							phone: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
							mail: Yup.string().email('Invalid email').required('Required'),
							address: Yup.string().min(5, 'Too Short!').required('Required'),
							//sadece longtitude kontrol etsem yeterli
							longtitude: Yup.number().required('Required'),
						})}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								console.log(locationID);
								UpdateCompanyMutation({
									variables: {
										companyID: companyID,
										addressID: addressID,
										locationID: locationID,
										company: {
											name: values.name.toString(),
											taxNumber: values.taxNumber.toString(),
											mail: values.mail,
										},
										companyLocation: {
											longtitude: values.longtitude,
											latitude: values.latitude,
										},
										companyAddress: {
											address: values.address.toString(),
											districtID: values.districtID,
											cityID: values.cityID,
										},
									},
								})
									.then((res) => {
										//alert(JSON.stringify(res));
										toastRef.current.show(values.name + ' updated. Redirecting to the previous page...', 500, () => {
											props.navigation.goBack();
										});
									})
									.catch((err) => {
										alert(err);
									});
								formikActions.setSubmitting(false);
							}, 500);
						}}
					>
						{/* Bu kısımda görsel parçalar eklenir */}
						{(props) => (
							<Layout>
								{props.isSubmitting && <Spinner />}
								{oneTimeRun && (
									<GetCompanyByIdComponent variables={{ companyID: companyID }}>
										{({ loading, error, data }) => {
											if (loading) return <Spinner size="giant" />;
											if (error) return <Text>error</Text>;

											if (data) {
												data.Company.map((dat) => {
													props.values.name = dat.name;
													props.values.taxNumber = dat.taxNumber;
													props.values.address = dat.Location.Address.address;
													props.values.cityID = dat.Location.Address.cityID;
													props.values.districtID = dat.Location.Address.districtID;
													setAddressID(dat.Location.addressID);
													setLocationID(dat.locationID);
													props.values.latitude = dat.Location.latitude;
													props.values.longtitude = dat.Location.longtitude;
												});
												setOneTimeRun(false);
											}
											return null;
										}}
									</GetCompanyByIdComponent>
								)}
								<Button
									icon={accessoryItemIcon}
									appearance="ghost"
									onPress={() => {
										props.handleSubmit();
									}}
									disabled={props.isSubmitting}
								>
									Edit Company
								</Button>
								<Toast ref={toastRef} />
								<Input
									label="Name"
									placeholder="Company Name"
									status={props.touched.name && props.errors.name ? 'danger' : 'success'}
									caption={props.touched.name && props.errors.name ? props.errors.name : ''}
									onChangeText={props.handleChange('name')}
									onBlur={props.handleBlur('name')}
									value={props.values.name}
									autoFocus
								/>
								<Input
									label="Tax Number"
									status={props.touched.taxNumber && props.errors.taxNumber ? 'danger' : 'success'}
									caption={props.touched.taxNumber && props.errors.taxNumber ? props.errors.taxNumber : ''}
									placeholder="54-2548568-22"
									onChangeText={props.handleChange('taxNumber')}
									onBlur={props.handleBlur('taxNumber')}
									value={props.values.taxNumber}
								/>
								<Input
									label="Address"
									status={props.touched.address && props.errors.address ? 'danger' : 'success'}
									caption={props.touched.address && props.errors.address ? props.errors.address : ''}
									placeholder="your address"
									multiline={true}
									style={{ minHeight: 50 }}
									onChangeText={props.handleChange('address')}
									onBlur={props.handleBlur('address')}
									value={props.values.address}
								/>
								<Input
									label="Email"
									status={props.touched.mail && props.errors.mail ? 'danger' : 'success'}
									caption={props.touched.mail && props.errors.mail ? props.errors.mail : ''}
									placeholder="john.doe@example.com"
									onChangeText={props.handleChange('mail')}
									onBlur={props.handleBlur('mail')}
									value={props.values.mail}
								/>
								<Input
									label="Phone Number"
									status={props.touched.phone && props.errors.phone ? 'danger' : 'success'}
									caption={props.touched.phone && props.errors.phone ? props.errors.phone : ''}
									placeholder="54-2548568-22"
									onChangeText={props.handleChange('phone')}
									onBlur={props.handleBlur('phone')}
									value={props.values.phone}
								/>
								<LocationComponent
									latitude={(value) => {
										props.values.latitude = value;
									}}
									longitude={(value) => {
										props.values.longtitude = value;
									}}
								/>
								{props.touched.longtitude && props.errors.longtitude ? (
									<Text status="danger">{props.errors.longtitude}</Text>
								) : null}
							</Layout>
						)}
					</Formik>
				)}
			</UpdateCompanyComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default EditCompanyScreen;
