import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetTagsComponent } from '../../generated/components';
/**
 * Location props
 */
export interface GetAllTagsProps {
	label: string;
	parentReference: any;
}

/**
 * Location state
 */
export interface GetAllTagsState {
	selected: any;
	datam: any;
	idSelected: any;
}

/**
 * Location component
 */
export class GetAllTagsComponent extends React.Component<GetAllTagsProps, GetAllTagsState> {
	/**
	 * Creates an instance of Location component.
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {
			selected: [],
			datam: [],
			idSelected: []
		};
		this.onValueChange = this.onValueChange.bind(this);
	}

	/**
	 * Determines whether value change on
	 * @param value
	 */
	onValueChange(value) {
		this.setState({
			selected: value.text
		});

		const filter = Object.keys(value).reduce((result, key) => {
			return result.concat({ tagID: value[key].tagID });
		}, []);
		this.props.parentReference(filter);
	}
	private keyExtractor = (item, index): string => {
		return item.tagID.toString();
	};
	/**
	 * Renders Location component
	 * @returns
	 */
	render() {
		return (
			<Layout>
				<GetTagsComponent>
					{({ loading, error, data }) => {
						if (loading) return <Text>Loading</Text>;
						if (error) return <Text>error</Text>;

						if (data) {
							data.Tag.map(dat => {
								if (this.state.datam.length > 0) {
									if (this.state.datam.every(item => item.tagID !== dat.tagID)) {
										this.state.datam.push({ tagID: dat.tagID, text: dat.name });
									}
								} else {
									this.state.datam.push({ tagID: dat.tagID, text: dat.name });
								}
							});
							return (
								<Select
									data={this.state.datam}
									placeholder={this.props.label}
									multiSelect={true}
									selectedOption={this.state.selected}
									keyExtractor={this.keyExtractor.bind(this)}
									onSelect={this.onValueChange}
								/>
							);
						}
					}}
				</GetTagsComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
