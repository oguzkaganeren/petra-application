import React from 'react';
import { Layout, Select, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetCuisineTypesComponent } from '../../generated/components';

export interface GetAllCuisineTypeProps {
	label: string;
	parentReference: any;
}

const GetAllCuisineTypeComponent: React.FC<GetAllCuisineTypeProps> = (props) => {
	const [selected, setSelected] = React.useState([]);
	const [datam, setDatam] = React.useState([]);

	function onValueChange(value) {
		setSelected(value);

		const filter = Object.keys(value).reduce((result, key) => {
			return result.concat({ restaurantCuisineTypeID: value[key].restaurantCuisineTypeID });
		}, []);
		props.parentReference(filter);
	}

	return (
		<Layout>
			<GetCuisineTypesComponent>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						data.RestaurantCuisineType.map((dat) => {
							if (datam.length > 0) {
								if (datam.every((item) => item.restaurantCuisineTypeID !== dat.restaurantCuisineTypeID)) {
									datam.push({ restaurantCuisineTypeID: dat.restaurantCuisineTypeID, text: dat.name });
								}
							} else {
								datam.push({ restaurantCuisineTypeID: dat.restaurantCuisineTypeID, text: dat.name });
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
			</GetCuisineTypesComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllCuisineTypeComponent;
