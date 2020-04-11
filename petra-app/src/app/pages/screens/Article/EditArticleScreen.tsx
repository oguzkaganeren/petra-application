import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Layout, Input, Text, Spinner, Icon } from '@ui-kitten/components';
import { UpdateArticleComponent } from '../../../generated/components';
import { GetArticleByIdComponent } from '../../../generated/components';
//import { LocationComponent } from '../../../components/Public/LocationComponent';
//import GetAllUserCompanyComponent from '../../../components/Company/GetAllUserCompany';
//import { GetAllCitiesComponent } from '../../../components/Public/GetAllCitiesComponent';
//import { GetAllCityDistrictsComponent } from '../../../components/Public/GetAllCityDistrictsComponent';
import StarRating from 'react-native-star-rating';
import { Formik } from 'formik';
import * as Yup from 'yup';
declare var global: any;
/**
 * AddHotel props
 */
export interface EditArticleProps {
	navigation: any;
	route: any;
}

/**
 * AddHotel
 */
const EditArticleScreen: React.FC<EditArticleProps> = props => {
	const { articleID } = props.route.params;
	//const [cityID, setCityID] = React.useState(0);
	const [oneTimeRun, setOneTimeRun] = React.useState(true);
	//const [locationID, setLocationID] = React.useState(-1);
	//const [addressID, setAddressID] = React.useState(-1);
	//const [star, setStar] = React.useState(1);
	const accessoryItemIcon = style => <Icon {...style} name="edit-2-outline" />;
	return (
		<Layout style={{ flex: 1 }}>
			<UpdateArticleComponent>
				{UpdateArticleMutation => (
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
								//console.log(locationID);
								UpdateArticleMutation({
									variables: {
										articleID: articleID,
										article: {
											content: values.content,
											editDate: new Date(),
											publishDate: new Date(),
											title: values.title
										}
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
								{oneTimeRun && (
									<GetArticleByIdComponent variables={{ articleID: articleID }}>
										{({ loading, error, data }) => {
											if (loading) return <Text>Loading</Text>;
											if (error) return <Text>error</Text>;

											if (data) {
												data.Article.map(dat => {
													props.values.title = dat.title;
													props.values.content = dat.content;
												});
												setOneTimeRun(false);
											}
											return null;
										}}
									</GetArticleByIdComponent>
								)}
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
			</UpdateArticleComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default EditArticleScreen;
