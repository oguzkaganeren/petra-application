import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetArchSiteEntranceTypesComponent } from '../../generated/components';

export interface GetASEntranceTypesProps {
	label: string;
	style?: any;
	parentReference: any;
}

const GetASEntranceTypesComponent: React.FC<GetASEntranceTypesProps> = (props) => {
	const [selected, setSelected] = React.useState({ id: 0, text: 'Select Arch. Site Entrance Type' });
	const [datam, setDatam] = React.useState([{ id: 0, text: 'Select Arch. Site Entrance Type' }]);

	function onValueChange(value) {
		const id = value.id;
		props.parentReference(id);
		console.log(value);
		setSelected(value);
	}
	return (
		<Layout style={props.style}>
			<GetArchSiteEntranceTypesComponent>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.ArchSiteEntranceType.map((dat) => {
							if (datam.length > 0) {
								if (datam.every((item) => item.id !== dat.archSiteEntranceTypeID)) {
									datam.push({ id: dat.archSiteEntranceTypeID, text: dat.content });
								}
							} else {
								datam.push({ id: dat.archSiteEntranceTypeID, text: dat.content });
							}
						});
						return (
							<Select
								data={datam}
								placeholder={props.label}
								selectedOption={selected}
								onSelect={(value) => onValueChange(value)}
							/>
						);
					}
				}}
			</GetArchSiteEntranceTypesComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetASEntranceTypesComponent;
