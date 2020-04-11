import React from 'react';
import { Layout, Select, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { GetFoodTypesComponent } from '../../generated/components';

export interface GetAllFoodTypesProps {
	label: string;
	parentReference: any;
}

const GetAllFoodTypesComponent: React.FC<GetAllFoodTypesProps> = props => {
	const [selected, setSelected] = React.useState(null);
	const [datam, setDatam] = React.useState([]);

	function onValueChange(value) {
		const id = value.id;
		this.props.parentReference(id);
		this.setState({
			selected: value.text
		});
	}

	return (
		<Layout>
			<GetFoodTypesComponent>
				{({ loading, error, data }) => {
					if (loading) return <Text>Loading</Text>;
					if (error) return <Text>error</Text>;

					if (data) {
						data.RestaurantFoodType.map(dat => {
							if (datam.length > 0) {
								if (datam.every(item => item.id !== dat.restaurantFoodTypeID)) {
									datam.push({ id: dat.restaurantFoodTypeID, text: dat.type });
								}
							} else {
								datam.push({ id: dat.restaurantFoodTypeID, text: dat.type });
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
			</GetFoodTypesComponent>
		</Layout>
	);
};

const styles: any = StyleSheet.create({});
export default GetAllFoodTypesComponent;
