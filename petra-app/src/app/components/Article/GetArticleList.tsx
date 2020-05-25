import * as React from 'react';
import { StyleSheet, Dimensions, Image, View } from 'react-native';
import { Icon, Card, List, Layout, Text } from '@ui-kitten/components';
import Carousel from 'react-native-looped-carousel';
import { GetArticleListComponent } from '../../generated/components';

declare var global: any;

export interface GetArticleListProps {}

const GetArticleList: React.FC<GetArticleListProps> = (props) => {
	const [articleList, setArticleList] = React.useState([]);
	function renderItemAccessory(item) {
		return <Text appearance="hint">{item.publishDate.split('T')[0]}</Text>;
	}
	const renderItemIcon = (style) => <Icon {...style} name="bulb-outline" />;
	const CustomHeader = (item) => (
		<React.Fragment>
			<Image style={styles.headerImage} source={{ uri: item.imageUrl }} />
			<Text style={styles.headerText} category="h6">
				{`${item.title}`}
			</Text>
		</React.Fragment>
	);
	const renderItem = ({ item, index }) => {
		return (
			<Card key={item.key} header={() => CustomHeader(item)}>
				<Text>{`${item.content}`}</Text>
			</Card>
		);
	};
	return (
		<Layout style={{ flex: 1 }}>
			<Carousel delay={2000} style={styles.sliderStyle} bullet autoplay currentPage={1}>
				<View style={[{ backgroundColor: '#BADA55' }, styles.sliderStyle]}>
					<Text>1</Text>
				</View>
				<View style={[{ backgroundColor: 'red' }, styles.sliderStyle]}>
					<Text>2</Text>
				</View>
				<View style={[{ backgroundColor: 'blue' }, styles.sliderStyle]}>
					<Text>3</Text>
				</View>
			</Carousel>
			<GetArticleListComponent>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Article.map((dat) => {
							if (articleList.length > 0) {
								if (articleList.every((item) => item.key != dat.articleID)) {
									articleList.push({
										key: dat.articleID,
										title: dat.title,
										content: dat.content,
										publishDate: dat.publishDate,
										imageUrl: dat.imageUrl,
									});
								}
							} else {
								articleList.push({
									key: dat.articleID,
									title: dat.title,
									content: dat.content,
									publishDate: dat.publishDate,
									imageUrl: dat.imageUrl,
								});
							}
						});
					}
					return <List data={articleList} renderItem={renderItem} />;
				}}
			</GetArticleListComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	sliderStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 6,
	},
	headerText: {
		marginHorizontal: 24,
		marginVertical: 16,
	},
	headerImage: {
		flex: 1,
		height: 192,
	},
});
export default GetArticleList;
