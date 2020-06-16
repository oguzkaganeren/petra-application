import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Layout, ButtonGroup, Text, ListItem, List, Spinner } from '@ui-kitten/components';
import { GetCompanyByIdComponent } from '../../../generated/components';
import StarRating from 'react-native-star-rating';

declare var global: any;

export interface CompanyInfoScreenProps {
	navigation: any;
	route: any;
	companyID: any;
}

const CompanyInfoScreen: React.FC<CompanyInfoScreenProps> = (props) => {
	const { companyID } = props.route.params;
	const [companyInfo, setCompanyInfo] = React.useState([]);
	
	
	return (
		<Layout style={{ flex: 1, margin: 40 }}>
			<GetCompanyByIdComponent variables={{ companyID: companyID }}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner size="giant" />;
					if (error) return <Text>error</Text>;

					if (data) {
						data.Company.map((dat) => {
							companyInfo.push({
								title: dat.name,
								address: dat.Location.Address.address,
								taxNumber: dat.taxNumber,
								mail: dat.mail,
								description: dat.description == null ? '' : dat.description,
								phone: dat.CompanyPhones.length > 0 ? dat.CompanyPhones[0].Phone.phone : '',
							});
						});
					}
					return (
						<Layout>
							<Text style={styles.text} category="h4">
								{companyInfo[0].title}
							</Text>
							<Text>{companyInfo[0].description}</Text>

							<Text style={styles.text} category="s1">
								Address:{companyInfo[0].address}
							</Text>
							<Text style={styles.text} category="p1">
								Tax Number:{companyInfo[0].taxNumber}
							</Text>
							<Text style={styles.text} category="p1">
								Phone:{companyInfo[0].phone}
							</Text>
						</Layout>
					);
				}}
			</GetCompanyByIdComponent>

			
			
		</Layout>
	);
};

const styles: any = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});
export default CompanyInfoScreen;
