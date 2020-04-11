import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetDayComponent } from '../../generated/components';

export interface GetAllDayProps {
	label: string;
	parentReference: any;
}

const GetAllDayComponent: React.FC<GetAllDayProps> = props => {
	const [selected, setSelected] = React.useState(null);
	const [datam, setDatam] = React.useState([]);

	function onValueChange(value) {
		const id = value.id;
		props.parentReference(id);
		setSelected(value);
	}

	return (
		<Layout>
			<GetDayComponent>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Day.map(dat => {
							if (datam.length > 0) {
								if (datam.every(item => item.id !== dat.dayID)) {
									datam.push({ id: dat.dayID, text: dat.name });
								}
							} else {
								datam.push({ id: dat.dayID, text: dat.name });
							}
						});
						return (
							//keyEx. Ekle
							<Select
								data={datam}
								placeholder={props.label}
								selectedOption={selected}
								onSelect={value => onValueChange(value)}
							/>
						);
					}
				}}
			</GetDayComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllDayComponent;
