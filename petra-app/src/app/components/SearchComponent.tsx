import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Icon, Layout, Button } from '@ui-kitten/components';

/**
 * Search props
 */
export interface SearchProps {}

/**
 * Search state
 */
export interface SearchState {
	selectedOption: any;
}
const data = [{ text: 'Option 1' }, { text: 'Option 2' }, { text: 'Option 3' }];
/**
 * Search component
 */
export class SearchComponent extends React.Component<SearchProps, SearchState> {
	SearchIcon = style => <Icon {...style} name="search-outline" />;

	/**
	 * Creates an instance of search component.
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = { selectedOption: 0 };
	}

	/**
	 * Renders search component
	 * @returns
	 */
	render() {
		return (
			<Layout>
				<Card style={styles.card}>
					<Button style={styles.searchButton} icon={this.SearchIcon} appearance="ghost" status="primary">
						Find your route!
					</Button>
				</Card>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({
	card: {
		margin: 8
	},
	searchButton: {
		justifyContent: 'flex-start'
	}
});
