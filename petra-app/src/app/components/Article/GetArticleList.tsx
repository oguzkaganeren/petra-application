import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Icon, List, ListItem, Layout, Text } from '@ui-kitten/components';
import { GetArticleListComponent } from '../../generated/components';

declare var global: any;

export interface GetArticleListProps {}

const GetArticleList: React.FC<GetArticleListProps> = props => {
	const [articleList, setArticleList] = React.useState([]);

	function renderItemAccessory(item) {
		return <Text appearance="hint">{item.publishDate.split('T')[0]}</Text>;
	}
	const renderItemIcon = style => <Icon {...style} name="bulb-outline" />;
	const renderItem = ({ item, index }) => {
		return (
			<ListItem
				key={item.key}
				title={`${item.title}`}
				description={`${item.content}`}
				icon={renderItemIcon}
				accessory={() => renderItemAccessory(item)}
			/>
		);
	};
	return (
		<Layout style={{ flex: 1 }}>
			<GetArticleListComponent>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Article.map(dat => {
							if (articleList.length > 0) {
								if (articleList.every(item => item.key != dat.articleID)) {
									articleList.push({
										key: dat.articleID,
										title: dat.title,
										content: dat.content,
										publishDate: dat.publishDate
									});
								}
							} else {
								articleList.push({
									key: dat.articleID,
									title: dat.title,
									content: dat.content,
									publishDate: dat.publishDate
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
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2
	}
});
export default GetArticleList;
