import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { GetArchSiteTypesComponent } from '../../generated/components';
/**
 * Location props
 */
export interface GetAllArchSiteTypesProps {
	label: string;
	parentReference: any;
}

/**
 * Location state
 */
export interface GetAllArchSiteTypesState {
	selected: any;
	setSelectedOption: any;
	datam: any;
}

/**
 * Location component
 */
export class GetAllArchSiteTypesComponent extends React.Component<GetAllArchSiteTypesProps, GetAllArchSiteTypesState> {
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
				<GetArchSiteTypesComponent>
					{({ loading, error, data }) => {
						if (loading) return <Text>Loading</Text>;
						if (error) return <Text>error</Text>;

						if (data) {
							data.ArchSiteType.map(dat => {
								if (this.state.datam.length > 0) {
									if (this.state.datam.every(item => item.id !== dat.archSiteTypeID)) {
										this.state.datam.push({ id: dat.archSiteTypeID, text: dat.name });
									}
								} else {
									this.state.datam.push({ id: dat.archSiteTypeID, text: dat.name });
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
				</GetArchSiteTypesComponent>
			</Layout>
		);
	}
}