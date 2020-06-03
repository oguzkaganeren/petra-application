import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetCitiesComponent } from '../../generated/components';

export interface GetAllCitiesProps {
	label: string;
	parentReference: any;
}

const GetAllCitiesComponent: React.FC<GetAllCitiesProps> = props => {
	const [selected, setSelected] = React.useState(null);
	const [datam, setDatam] = React.useState([]);

	function onValueChange(value) {
		const id = value.id;
		props.parentReference(id);
		setSelected(value);
	}
	return (
		<Layout>
			<GetCitiesComponent>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.City.map(dat => {
							if (datam.length > 0) {
								if (datam.every(item => item.id !== dat.cityID)) {
									datam.push({ id: dat.cityID, text: dat.city });
								}
							} else {
								datam.push({ id: dat.cityID, text: dat.city });
							}
						});
						return (
							<Select
								data={datam}
								placeholder={props.label}
								selectedOption={selected}
								onSelect={value => onValueChange(value)}
							/>
						);
					}
				}}
			</GetCitiesComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllCitiesComponent;
