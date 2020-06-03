import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetFoodComponent } from '../../generated/components';

export interface GetAllFoodProps {
	label: string;
	parentReference: any;
}
const GetAllFoodComponent: React.FC<GetAllFoodProps> = props => {
	const [selected, setSelected] = React.useState([]);
	const [datam, setDatam] = React.useState([]);

	function onValueChange(value) {
		setSelected(value);

		const filter = Object.keys(value).reduce((result, key) => {
			return result.concat({ restaurantFoodID: value[key].restaurantFoodID });
		}, []);
		props.parentReference(filter);
	}

	return (
		<Layout>
			<GetFoodComponent>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.RestaurantFood.map(dat => {
							if (datam.length > 0) {
								if (datam.every(item => item.restaurantFoodID !== dat.restaurantFoodID)) {
									datam.push({ restaurantFoodID: dat.restaurantFoodID, text: dat.name });
								}
							} else {
								datam.push({ restaurantFoodID: dat.restaurantFoodID, text: dat.name });
							}
						});
						return (
							<Select
								data={datam}
								placeholder={props.label}
								multiSelect={true}
								selectedOption={selected}
								onSelect={value => onValueChange(value)}
							/>
						);
					}
				}}
			</GetFoodComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllFoodComponent;
