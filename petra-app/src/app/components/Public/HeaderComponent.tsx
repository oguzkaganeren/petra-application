import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction, Toggle, Button } from '@ui-kitten/components';
import { DrawerActions } from '@react-navigation/native';
import Constants from 'expo-constants';
import { ThemeContext } from '../../../ThemeContext';
declare var global: any;

export interface HeaderProps {
	headerTitle?: any;
	previous: any;
	navigation: any;
}

const HeaderComponent: React.FC<HeaderProps> = (props) => {
	//defaultProps = { hasBackButton: false, headerTitle: 'Petra Application' };

	const themeContext = React.useContext(ThemeContext);
	const [checked, setChecked] = React.useState(global.isDark != undefined ? global.isDark : false);
	React.useEffect(() => {
		if (checked != global.isDark && global.isDark != undefined) {
			setChecked(global.isDark);
		}
	}, [global.isDark]);
	const onCheckedChange = (isChecked) => {
		global.isDark = isChecked;
		themeContext.toggleTheme();
		setChecked(isChecked);
	};
	const MenuIcon = (style) => <Icon {...style} name="menu-outline" />;
	const BackIcon = (style) => <Icon {...style} name="arrow-back" />;
	const BackAction = () => <TopNavigationAction onPress={props.navigation.goBack} icon={BackIcon} />;
	const MenuAction = (propsf) => (
		<TopNavigationAction
			onPress={() => {
				props.navigation.dispatch(DrawerActions.toggleDrawer());
			}}
			icon={MenuIcon}
		/>
	);

	const onBackPress = () => {};

	const renderLeftControl = () => (props.previous ? <BackAction /> : <MenuAction onPress={onBackPress} />);
	const renderRightControl = () => (
		<View>
			<Toggle style={styles.toggle} text="Night Mode" checked={checked} onChange={onCheckedChange} />
		</View>
	);
	return (
		<TopNavigation
			style={styles.container}
			title={props.headerTitle}
			leftControl={renderLeftControl()}
			rightControls={renderRightControl()}
		/>
	);
};

const styles: any = StyleSheet.create({
	header: {
		//paddingTop: 20,
		// borderWidth: 0,
		//flex: 1,
	},
	container: {
		marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
	},
});
export default HeaderComponent;
