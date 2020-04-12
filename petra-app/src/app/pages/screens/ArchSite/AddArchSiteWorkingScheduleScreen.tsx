import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Text, RangeDatepicker, Spinner } from '@ui-kitten/components';
import { AddArchSiteWorkingScheduleComponent } from '../../../generated/components';
import GetAllDayComponent from '../../../components/Public/GetAllDayComponent';
import TimePicker from 'react-native-simple-time-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';

export interface AddArchSiteWorkingScheduleProps {
	navigation: any;
	route: any;
}

const AddArchSiteWorkingScheduleScreen: React.FC<AddArchSiteWorkingScheduleProps> = props => {
	const [theDate, setTheDate] = React.useState({});

	const onSelect = value => {
		setTheDate(value);
	};

	const { userID } = props.route.params;
	const { archSiteID } = props.route.params;
	return (
		<Layout style={{ flex: 1 }}>
			<AddArchSiteWorkingScheduleComponent>
				{AddArchSiteWorkingScheduleMutation => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							archSiteID: 0,
							dayID: 0,
							openHour: 0,
							openMinute: 0,
							closeHour: 0,
							closeMinute: 0
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							dayID: Yup.number().required('Required')
						})}
						//Kaydet butonuna tıklandığında bu fonksiyon çalışır
						onSubmit={(values, formikActions) => {
							setTimeout(() => {
								AddArchSiteWorkingScheduleMutation({
									variables: {
										ArchSiteWorkingSchedule: [
											{
												archSiteID: archSiteID,
												startDate: theDate.startDate,
												finishDate: theDate.endDate,
												ArchSiteWorkingDaySchedules: {
													data: [
														{
															ArchSiteWorkingDay: {
																data: {
																	closeHour: values.closeHour + ':' + values.closeMinute + ':' + '00',
																	openHour: values.openHour + ':' + values.openMinute + ':' + '00',
																	dayID: values.dayID
																}
															}
														}
													]
												}
											}
										]
									}
								})
									.then(res => {
										alert(JSON.stringify(res));
									})
									.catch(err => {
										alert(err);
										//console.log('roomProp:' + values.roomPropRoom);
									});
								formikActions.setSubmitting(false);
							}, 500);
						}}
					>
						{/* Bu kısımda görsel parçalar eklenir */}
						{props => (
							<Layout>
								{props.isSubmitting && <Spinner />}

								<RangeDatepicker range={theDate} onSelect={value => onSelect(value)} />
								<GetAllDayComponent
									label="Select Day"
									parentReference={value => {
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
			</AddArchSiteWorkingScheduleComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default AddArchSiteWorkingScheduleScreen;
