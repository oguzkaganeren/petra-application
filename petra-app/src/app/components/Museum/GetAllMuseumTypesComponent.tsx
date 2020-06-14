import React from 'react';
import { Layout, Select, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetMuseumTypesComponent } from '../../generated/components';

export interface GetAllMuseumTypesProps {
	label: string;
	parentReference: any;
}

const GetAllMuseumTypesComponent: React.FC<GetAllMuseumTypesProps> = (props) => {
	const [selected, setSelected] = React.useState([]);
	const [datam, setDatam] = React.useState([]);

	function onValueChange(value) {
		const filter = Object.keys(value).reduce((result, key) => {
			return result.concat({ museumTypeID: value[key].id });
		}, []);
		props.parentReference(filter);
		setSelected(value);
	}

	return (
		<Layout>
			<GetMuseumTypesComponent>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						data.MuseumType.map((dat) => {
							if (datam.length > 0) {
								if (datam.every((item) => item.id !== dat.museumTypeID)) {
									datam.push({ id: dat.museumTypeID, text: dat.type });
								}
							} else {
								datam.push({ id: dat.museumTypeID, text: dat.type });
							}
						});
						return (
							<Select
								data={datam}
								placeholder={props.label}
								multiSelect={true}
								selectedOption={selected}
								onSelect={(value) => onValueChange(value)}
							/>
						);
					}
				}}
			</GetMuseumTypesComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllMuseumTypesComponent;
