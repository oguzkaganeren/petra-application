import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Layout, Input, Text, Spinner, Icon } from '@ui-kitten/components';
import { UpdateArticleComponent } from '../../../generated/components';
import { GetArticleByIdComponent } from '../../../generated/components';
import Toast from 'react-native-easy-toast';
import { Formik } from 'formik';
import * as Yup from 'yup';
declare var global: any;

export interface EditArticleProps {
	navigation: any;
	route: any;
}

const EditArticleScreen: React.FC<EditArticleProps> = (props) => {
	const { articleID } = props.route.params;
	const [oneTimeRun, setOneTimeRun] = React.useState(true);
	const toastRef = React.useRef();
	const accessoryItemIcon = (style) => <Icon {...style} name="edit-2-outline" />;
	return (
		<Layout style={{ flex: 1 }}>
			<UpdateArticleComponent>
				{(UpdateArticleMutation) => (
					<Formik
						//değişkenlerin başlangıç değerleri
						initialValues={{
							userID: '',
							tags: [],
							content: '',
							title: '',
							imageUrl: '',
						}}
						//Burada girilen değerlerin controlleri sağlanır
						validationSchema={Yup.object({
							title: Yup.string()
								.min(1, 'Too Short!')
								.max(50, 'Too Long!')
								.required('Required'),
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
											title: values.title,
											imageUrl: values.imageUrl,
										},
									},
								})
									.then((res) => {
										//alert(JSON.stringify(res));
										toastRef.current.show(values.title + ' updated. Redirecting to the previous page...', 500, () => {
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
									<GetArticleByIdComponent variables={{ articleID: articleID }}>
										{({ loading, error, data }) => {
											if (loading) return <Text>Loading</Text>;
											if (error) return <Text>error</Text>;

											if (data) {
												data.Article.map((dat) => {
													props.values.title = dat.title;
													props.values.content = dat.content;
													props.values.imageUrl = dat.imageUrl;
												});
												setOneTimeRun(false);
											}
											return null;
										}}
									</GetArticleByIdComponent>
								)}
								<Toast ref={toastRef} />
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
								<Input
									label="Image Url"
									placeholder="Enter Image Url of Article"
									status={props.touched.imageUrl && props.errors.imageUrl ? 'danger' : 'success'}
									caption={props.touched.imageUrl && props.errors.imageUrl ? props.errors.imageUrl : ''}
									onChangeText={props.handleChange('imageUrl')}
									onBlur={props.handleBlur('imageUrl')}
									value={props.values.imageUrl}
								/>
								<Button
									onPress={() => {
										props.handleSubmit();
									}}
									disabled={props.isSubmitting}
								>
									Edit Article
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
