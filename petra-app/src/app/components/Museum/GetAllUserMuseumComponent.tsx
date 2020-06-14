import React from 'react';
import { Layout, Select, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetUserMuseumComponent } from '../../generated/components';

export interface GetAllUserMuseumProps {
	label: string;
	parentReference: any;
	userID: number;
}

const GetAllUserMuseumComponent: React.FC<GetAllUserMuseumProps> = (props) => {
	const [selected, setSelected] = React.useState(null);
	const [datam, setDatam] = React.useState([]);

	function onValueChange(value) {
		const id = value.id;
		props.parentReference(id);
		setSelected(value);
	}
	return (
		<Layout>
			<GetUserMuseumComponent variables={{ userID: props.userID }}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Museum.map((dat) => {
							if (datam.length > 0) {
								if (datam.every((item) => item.id !== dat.museumID)) {
									datam.push({ id: dat.museumID, text: dat.name });
								}
							} else {
								datam.push({ id: dat.museumID, text: dat.name });
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
			</GetUserMuseumComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllUserMuseumComponent;
