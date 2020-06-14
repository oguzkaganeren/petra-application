import React from 'react';
import { Layout, Select, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetMuseumEntranceTypesComponent } from '../../generated/components';

export interface GetAllMuseumEntranceTypesProps {
	label: string;
	parentReference: any;
	style?: any;
}

const GetAllMuseumEntranceTypesComponent: React.FC<GetAllMuseumEntranceTypesProps> = (props) => {
	const [selected, setSelected] = React.useState({ id: 0, text: 'Select Museum Entrance Type' });
	const [datam, setDatam] = React.useState([{ id: 0, text: 'Select Museum Entrance Type' }]);

	function onValueChange(value) {
		const id = value.id;
		props.parentReference(id);
		setSelected(value);
	}

	return (
		<Layout style={props.style}>
			<GetMuseumEntranceTypesComponent>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						data.MuseumEntranceType.map((dat) => {
							if (datam.length > 0) {
								if (datam.every((item) => item.id !== dat.museumEntranceTypeID)) {
									datam.push({ id: dat.museumEntranceTypeID, text: dat.content });
								}
							} else {
								datam.push({ id: dat.museumEntranceTypeID, text: dat.content });
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
			</GetMuseumEntranceTypesComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllMuseumEntranceTypesComponent;
