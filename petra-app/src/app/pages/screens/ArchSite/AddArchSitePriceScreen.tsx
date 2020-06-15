import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Input, RangeDatepicker, Spinner } from '@ui-kitten/components';
import { AddArchSitePriceComponent } from '../../../generated/components';
import GetASEntranceTypesComponent from '../../../components/ArchSite/GetASEntranceTypesComponent';
import Toast from 'react-native-easy-toast';
import { Formik } from 'formik';
import * as Yup from 'yup';

export interface AddArchSitePriceProps {
	navigation: any;
	route: any;
}
const AddArchSitePriceScreen: React.FC<AddArchSitePriceProps> = (props) => {
	const [theDate, setTheDate] = React.useState(0);
	const toastRef = React.useRef();
	const onSelect = (value) => {
		setTheDate(value);
	};
	const { archSiteID } = props.route.params;
	return (
		<Layout style={{ flex: 1 }}>
			<AddArchSitePriceComponent>
				{(AddArchSitePriceMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							archSiteID: 0,
							price: 0,
							entranceTypeID: 0,
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							price: Yup.number().required('Required'),
						})}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								AddArchSitePriceMutation({
									variables: {
										ArchSitePrice: [
											{
												archSiteID: archSiteID,
												finishDate: theDate.endDate,
												startDate: theDate.startDate,
												price: values.price,
												archSiteEntranceTypeID: values.entranceTypeID,
											},
										],
									},
								})
									.then((res) => {
										//alert(JSON.stringify(res));
										toastRef.current.show('Price added. Redirecting to the previous page...', 500, () => {
											props.navigation.goBack();
										});
									})
									.catch((err) => {
										alert(err);
										//console.log('roomProp:' + values.roomPropRoom);
									});
								formikActions.setSubmitting(false);
							}, 500);
						}}
					>
						{/* Bu kısımda görsel parçalar eklenir */}
						{(props) => (
							<Layout>
								{props.isSubmitting && <Spinner />}

								<GetASEntranceTypesComponent
									label="Select EntranceType"
									parentReference={(value) => {
										props.values.entranceTypeID = value;
									}}
								/>
								<Toast ref={toastRef} />
								<Input
									label="Price(₺)"
									placeholder="Enter price"
									status={props.touched.price && props.errors.price ? 'danger' : 'success'}
									caption={props.touched.price && props.errors.price ? props.errors.price : ''}
									onChangeText={props.handleChange('price')}
									onBlur={props.handleBlur('price')}
									value={props.values.price.toString()}
								/>
								<RangeDatepicker range={theDate} onSelect={(value) => onSelect(value)} />
								<Button
									onPress={() => {
										props.handleSubmit();
									}}
									disabled={props.isSubmitting}
								>
									Add Price
								</Button>
							</Layout>
						)}
					</Formik>
				)}
			</AddArchSitePriceComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default AddArchSitePriceScreen;
