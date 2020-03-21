import * as React from 'react';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import { Button, Layout, Input, Text, Spinner } from '@ui-kitten/components';
import { AddArticleComponent } from '../../../generated/components';
import { GetAllTagsComponent } from '../../../components/Article/GetAllTags';
import { Formik } from 'formik';
import * as Yup from 'yup';
/**
 * AddRestaurant props
 */
export interface AddArticleProps {
	navigation: any;
}
/**
 * Location state
 */
export interface AddArticleState {}

/**
 * Location
 */
export class AddArticleScreen extends React.Component<AddArticleProps, AddArticleState> {
	constructor(props: AddArticleProps) {
		super(props);
		this.state = {};
		/**
		 * {"roomPropRoom": [{"roomPropertyID": 1},{"roomPropertyID": 2}]}
		 */
	}

	/**
	 * Renders
	 * @returns
	 */
	render() {
		const userID = this.props.navigation.getParam('userID', 'NO-ID');
		return (
			<Layout style={{ flex: 1 }}>
				<AddArticleComponent>
					{AddArticleMutation => (
						<Formik
							//değişkenlerin başlangıç değerleri
							initialValues={{
								userID: '',
								tags: [],
								content: '',
								title: ''
							}}
							//Burada girilen değerlerin controlleri sağlanır
							validationSchema={Yup.object({
								title: Yup.string()
									.min(1, 'Too Short!')
									.max(50, 'Too Long!')
									.required('Required')
							})}
							//Kaydet butonuna tıklandığında bu fonksiyon çalışır
							onSubmit={(values, formikActions) => {
								setTimeout(() => {
									AddArticleMutation({
										variables: {
											content: values.content,
											articleTags: values.tags,
											userID: userID,
											editDate: new Date(),
											publishDate: new Date(),
											title: values.title
										}
									})
										.then(res => {
											alert(JSON.stringify(res));
											ToastAndroid.show('Article has been added successfully', ToastAndroid.SHORT);

											//this.props.navigation.navigate('Home');
										})
										.catch(err => {
											alert(err);
											console.log('Tags:' + values.tags);
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
										label="Title"
										placeholder="Enter a Title"
										status={props.touched.title && props.errors.title ? 'danger' : 'success'}
										caption={props.touched.title && props.errors.title ? props.errors.title : ''}
										onChangeText={props.handleChange('title')}
										onBlur={props.handleBlur('title')}
										value={props.values.title}
									/>
									<Input
										label="Content"
										placeholder="Enter Content of Article"
										status={props.touched.content && props.errors.content ? 'danger' : 'success'}
										caption={props.touched.content && props.errors.content ? props.errors.content : ''}
										onChangeText={props.handleChange('content')}
										onBlur={props.handleBlur('content')}
										value={props.values.content}
									/>
									<GetAllTagsComponent
										label="Select Tags"
										parentReference={value => {
											props.values.tags = value;
										}}
									/>
									<Button
										onPress={() => {
											props.handleSubmit();
										}}
										disabled={props.isSubmitting}
									>
										Add Room
									</Button>
								</Layout>
							)}
						</Formik>
					)}
				</AddArticleComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
