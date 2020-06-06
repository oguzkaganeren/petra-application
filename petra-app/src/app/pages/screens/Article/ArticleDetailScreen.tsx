import * as React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Layout, ButtonGroup, Text, ListItem, List } from '@ui-kitten/components';
import { GetArticleByIdComponent } from '../../../generated/components';

declare var global: any;

export interface ArchSiteInfoScreenProps {
	navigation: any;
	route: any;
	articleID: any;
}

const ArchSiteInfoScreen: React.FC<ArchSiteInfoScreenProps> = (props) => {
	const { articleID } = props.route.params;
	const [articleInfo, setArticleInfo] = React.useState([]);

	return (
		<Layout style={{ flex: 1, padding: 40 }}>
			<GetArticleByIdComponent variables={{ articleID: articleID }}>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Article.map((dat) => {
							articleInfo.push({
								title: dat.title,
								content: dat.content,
								imageUrl: dat.imageUrl,
								tags: dat.ArticleTags,
							});
						});
					}
					return (
						<Layout>
							<Image style={styles.headerImage} source={{ uri: articleInfo[0].imageUrl }} />
							<Text style={styles.text} category="h4">
								{articleInfo[0].title}
							</Text>
							<Text>{articleInfo[0].content}</Text>
							<Layout style={styles.container}>
								<Text style={{ marginTop: 8 }} category="s1">
									Tags:
								</Text>
								<ButtonGroup style={{ marginLeft: 5 }} appearance="outline">
									{articleInfo[0].tags.map((dat) => {
										return <Button>{dat.Tag.name}</Button>;
									})}
								</ButtonGroup>
							</Layout>
						</Layout>
					);
				}}
			</GetArticleByIdComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	headerImage: {
		flex: 1,
		height: 192,
	},
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});
export default ArchSiteInfoScreen;
