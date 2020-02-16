import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetArchSiteEntranceTypesComponent } from '../../generated/components';
/**
 * Location props
 */
export interface GetAllArchSiteEntranceTypesProps {
	label: string;
	parentReference: any;
}

/**
 * Location state
 */
export interface GetAllArchSiteEntranceTypesState {
	selected: any;
	setSelectedOption: any;
	datam: any;
}

/**
 * Location component
 */
export class GetAllArchSiteEntranceTypesComponent extends React.Component<
	GetAllArchSiteEntranceTypesProps,
	GetAllArchSiteEntranceTypesState
> {
	/**
	 * Creates an instance of Location component.
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {
			selected: null,
			setSelectedOption: null,
			datam: []
		};
		this.onValueChange = this.onValueChange.bind(this);
	}

	/**
	 * Determines whether value change on
	 * @param value
	 */
	onValueChange(value) {
		const id = value.id;
		this.props.parentReference(id);
		this.setState({
			selected: value.text
		});
	}
	private keyExtractor = (item, index): string => {
		return item.id.toString();
	};
	/**
	 * Renders Location component
	 * @returns
	 */
	render() {
		return (
			<Layout>
				<GetArchSiteEntranceTypesComponent>
					{({ loading, error, data }) => {
						if (loading) return <Text>Loading</Text>;
						if (error) return <Text>error</Text>;

						if (data) {
							data.ArchSiteEntranceType.map(dat => {
								if (this.state.datam.length > 0) {
									if (this.state.datam.every(item => item.id !== dat.archSiteEntranceTypeID)) {
										this.state.datam.push({ id: dat.archSiteEntranceTypeID, text: dat.content });
									}
								} else {
									this.state.datam.push({ id: dat.archSiteEntranceTypeID, text: dat.content });
								}
							});
							return (
								//keyEx. Ekle
								<Select
									data={this.state.datam}
									placeholder={this.props.label}
									selectedOption={this.state.selected}
									keyExtractor={this.keyExtractor.bind(this)}
									onSelect={this.onValueChange}
								/>
							);
						}
					}}
				</GetArchSiteEntranceTypesComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
