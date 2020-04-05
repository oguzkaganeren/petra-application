import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetMuseumEntranceTypesComponent } from '../../generated/components';
/**
 * Location props
 */
export interface GetAllMuseumEntranceTypesProps {
	label: string;
	parentReference: any;
}

/**
 * Location state
 */
export interface GetAllMuseumEntranceTypesState {
	selected: any;
	setSelectedOption: any;
	datam: any;
}

/**
 * Location component
 */
export class GetAllMuseumEntranceTypesComponent extends React.Component<
	GetAllMuseumEntranceTypesProps,
	GetAllMuseumEntranceTypesState
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
			datam: [],
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
			selected: value,
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
				<GetMuseumEntranceTypesComponent>
					{({ loading, error, data }) => {
						if (loading) return <Text>Loading</Text>;
						if (error) return <Text>error</Text>;

						if (data) {
							data.MuseumEntranceType.map((dat) => {
								if (this.state.datam.length > 0) {
									if (this.state.datam.every((item) => item.id !== dat.museumEntranceTypeID)) {
										this.state.datam.push({ id: dat.museumEntranceTypeID, text: dat.content });
									}
								} else {
									this.state.datam.push({ id: dat.museumEntranceTypeID, text: dat.content });
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
				</GetMuseumEntranceTypesComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
