import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Text, RangeDatepicker, Spinner } from '@ui-kitten/components';
import { AddRestaurantWorkingScheduleComponent } from '../../../generated/components';
import GetAllDayComponent from '../../../components/Public/GetAllDayComponent';
import TimePicker from 'react-native-simple-time-picker';
import Toast from 'react-native-easy-toast';
import { Formik } from 'formik';
import * as Yup from 'yup';

export interface AddRestaurantWorkingScheduleProps {
	navigation: any;
	route: any;
}
const AddRestaurantWorkingScheduleScreen: React.FC<AddRestaurantWorkingScheduleProps> = (props) => {
	const [theDate, setTheDate] = React.useState({});
	const toastRef = React.useRef();
	const onSelect = (value) => {
		setTheDate(value);
	};
	const { userID } = props.route.params;
	const { restaurantID } = props.route.params;
	return (
		<Layout style={{ flex: 1 }}>
			<AddRestaurantWorkingScheduleComponent>
				{(AddRestaurantWorkingScheduleMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							dayID: 0,
							openHour: 0,
							openMinute: 0,
							closeHour: 0,
							closeMinute: 0,
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							dayID: Yup.number().required('Required'),
						})}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								AddRestaurantWorkingScheduleMutation({
									variables: {
										RestaurantWorkingSchedule: [
											{
												restaurantID: restaurantID,
												startDate: theDate.startDate,
												finishDate: theDate.endDate,
												RestaurantWorkingDaySchedules: {
													data: [
														{
															RestaurantWorkingDay: {
																data: {
																	closeHour: values.closeHour + ':' + values.closeMinute + ':' + '00',
																	openHour: values.openHour + ':' + values.openMinute + ':' + '00',
																	dayID: values.dayID,
																},
															},
														},
													],
												},
											},
										],
									},
								})
									.then((res) => {
										//alert(JSON.stringify(res));
										toastRef.current.show('Working Schedule added. Redirecting to the previous page...', 500, () => {
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

								<RangeDatepicker range={theDate} onSelect={(value) => onSelect(value)} />
								<GetAllDayComponent
									label="Select Day"
									parentReference={(value) => {
										props.values.dayID = value;
									}}
								/>
								<Text>Open Hours</Text>
								<TimePicker
									selectedHours={props.values.openHour}
									selectedMinutes={props.values.openMinute}
									onChange={(hours, minutes) => {
										props.values.openHour = hours;
										props.values.openMinute = minutes;
									}}
								/>
								<Text>Close Hours</Text>
								<TimePicker
									selectedHours={props.values.closeHour}
									selectedMinutes={props.values.closeMinute}
									onChange={(hours, minutes) => {
										props.values.closeHour = hours;
										props.values.closeMinute = minutes;
									}}
								/>
								<Toast ref={toastRef} />
								<Button
									onPress={() => {
										props.handleSubmit();
									}}
									disabled={props.isSubmitting}
								>
									Add Working Schedule
								</Button>
							</Layout>
						)}
					</Formik>
				)}
			</AddRestaurantWorkingScheduleComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default AddRestaurantWorkingScheduleScreen;
