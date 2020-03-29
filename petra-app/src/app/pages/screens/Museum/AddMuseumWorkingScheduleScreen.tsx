import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Text, RangeDatepicker, Spinner } from '@ui-kitten/components';
import { AddMuseumWorkingScheduleComponent } from '../../../generated/components';
import { GetAllDayComponent } from '../../../components/Public/GetAllDayComponent';
import { GetAllUserMuseumComponent } from '../../../components/Museum/GetAllUserMuseum';
import TimePicker from 'react-native-simple-time-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddRestaurant props
 */
export interface AddMuseumWorkingScheduleProps {
	navigation: any;
	route: any;
}
/**
 * Location state
 */
export interface AddMuseumWorkingScheduleState {
	theDate: any;
	showOpenHour: boolean;
	showCloseHour: boolean;
}

/**
 * Location
 */
export class AddMuseumWorkingScheduleScreen extends React.Component<
	AddMuseumWorkingScheduleProps,
	AddMuseumWorkingScheduleState
> {
	constructor(props: AddMuseumWorkingScheduleProps) {
		super(props);
		this.state = {
			theDate: {},
			showCloseHour: false,
			showOpenHour: false
		};
		/**
		 * {"roomPropRoom": [{"roomPropertyID": 1},{"roomPropertyID": 2}]}
		 */
	}
	onSelect = value => {
		this.setState({ theDate: value });
	};
	/**
	 * Renders
	 * @returns
	 */
	render() {
		const { userID } = this.props.route.params;
		return (
			<Layout style={{ flex: 1 }}>
				<AddMuseumWorkingScheduleComponent>
					{AddMuseumWorkingScheduleMutation => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								museumID: 0,
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
									console.log(this.state.theDate.endDate);
									console.log(this.state.theDate.startDate);
									console.log();
									console.log(values.openHour);
									console.log(values.closeHour);
									AddMuseumWorkingScheduleMutation({
										variables: {
											MuseumWorkingSchedule: [
												{
													museumID: values.museumID,
													startDate: this.state.theDate.startDate,
													finishDate: this.state.theDate.endDate,
													MuseumWorkingDaySchedules: {
														data: [
															{
																MuseumWorkingDay: {
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

											//this.props.navigation.navigate('Home');
										})
										.catch(err => {
											alert(err);
										});
									formikActions.setSubmitting(false);
								}, 500);
							}}
						>
							{/* Bu kısımda görsel parçalar eklenir */}
							{props => (
								<Layout>
									{props.isSubmitting && <Spinner />}
									<GetAllUserMuseumComponent
										label="Select Museum"
										parentReference={value => {
											props.values.museumID = value;
										}}
										userID={parseInt(userID)}
									/>
									<RangeDatepicker range={this.state.theDate} onSelect={this.onSelect} />
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
				</AddMuseumWorkingScheduleComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
