import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetMuseumTypesComponent } from '../generated/components';
/**
 * Location props
 */
export interface GetAllMuseumTypesProps {
	label: string;
	parentReference: any;
}

/**
 * Location state
 */
export interface GetAllMuseumTypesState {
	selected: any;
	setSelectedOption: any;
	datam: any;
}

/**
 * Location component
 */
export class GetAllMuseumTypesComponent extends React.Component<GetAllMuseumTypesProps, GetAllMuseumTypesState> {
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
				<GetMuseumTypesComponent>
					{({ loading, error, data }) => {
						if (loading) return <Text>Loading</Text>;
						if (error) return <Text>error</Text>;

						if (data) {
							data.MuseumType.map(dat => {
								if (this.state.datam.length > 0) {
									if (this.state.datam.every(item => item.id !== dat.museumTypeID)) {
										this.state.datam.push({ id: dat.museumTypeID, text: dat.type });
									}
								} else {
									this.state.datam.push({ id: dat.museumTypeID, text: dat.type });
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
				</GetMuseumTypesComponent>
			</Layout>
		);
	}
}

const styles: any = StyleSheet.create({});
