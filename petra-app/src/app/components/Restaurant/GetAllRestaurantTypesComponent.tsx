import React from 'react';
import { Layout, Select, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetRestaurantTypesComponent } from '../../generated/components';

export interface GetAllRestaurantTypesProps {
	label: string;
	parentReference: any;
}

const GetAllRestaurantTypesComponent: React.FC<GetAllRestaurantTypesProps> = (props) => {
	const [selected, setSelected] = React.useState(null);
	const [datam, setDatam] = React.useState([]);

	function onValueChange(value) {
		const id = value.id;
		props.parentReference(id);
		setSelected(value);
	}

	return (
		<Layout>
			<GetRestaurantTypesComponent>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						data.RestaurantType.map((dat) => {
							if (datam.length > 0) {
								if (datam.every((item) => item.id !== dat.restaurantTypeID)) {
									datam.push({ id: dat.restaurantTypeID, text: dat.type });
								}
							} else {
								datam.push({ id: dat.restaurantTypeID, text: dat.type });
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
			</GetRestaurantTypesComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllRestaurantTypesComponent;
