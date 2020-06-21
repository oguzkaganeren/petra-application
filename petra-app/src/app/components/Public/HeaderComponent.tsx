import React from 'react';
import { StyleSheet, Platform, View, TouchableOpacity } from 'react-native';
import {
	Icon,
	TopNavigation,
	TopNavigationAction,
	Toggle,
	Avatar,
	Text,
	Spinner,
	Layout,
	Button,
} from '@ui-kitten/components';
import { DrawerActions } from '@react-navigation/native';
import Constants from 'expo-constants';
import { ThemeContext } from '../../../ThemeContext';
import { GetUserInfoComponent } from '../../generated/components';

declare var global: any;

export interface HeaderProps {
	headerTitle?: any;
	previous: any;
	navigation: any;
}

const HeaderComponent: React.FC<HeaderProps> = (props) => {
	//defaultProps = { hasBackButton: false, headerTitle: 'Petra Application' };

	const themeContext = React.useContext(ThemeContext);
	const [userInfo, setUserInfo] = React.useState([
		{ name: '', surname: '', mail: '', profileImageUrl: '', phone: '', birthDate: '' },
	]);

	const [showAvatar, setShowAvatar] = React.useState(false);
	const [userID, setUserID] = React.useState(global.userID);
	const [checked, setChecked] = React.useState(global.isDark != undefined ? global.isDark : false);
	React.useEffect(() => {
		if (checked != global.isDark && global.isDark != undefined) {
			setChecked(global.isDark);
		}
	}, [global.isDark]);
	React.useEffect(() => {
		if (global.userID != undefined && global.userID != null && global.userID != -1) {
			setShowAvatar(true);
		} else {
			setShowAvatar(false);
		}
		setUserID(global.userID);
	}, [global.userID]);
	const onCheckedChange = () => {
		global.isDark = !checked;
		themeContext.toggleTheme();
		setChecked(!checked);
	};
	const MenuIcon = (style) => <Icon {...style} name="menu-outline" />;
	const BackIcon = (style) => <Icon {...style} name="arrow-back" />;
	const SunIcon = (style) => <Icon {...style} name="sun-outline" />;
	const NightIcon = (style) => <Icon {...style} name="moon-outline" />;
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
		<View style={styles.avatarContainer}>
			{showAvatar ? (
				<TouchableOpacity
					onPress={() => {
						props.navigation.navigate('SettingScreen');
					}}
				>
					<GetUserInfoComponent variables={{ userID: userID }}>
						{({ loading, error, data }) => {
							if (loading) return <Spinner size="small" />;
							if (error) return <Text>error</Text>;

							if (data) {
								userInfo.splice(0);
								data.User.map((dat) => {
									userInfo.push({
										name: dat.name,
										surname: dat.surname,
										mail: dat.mail,
										profileImageUrl: dat.profileImageUrl,
										phone: dat.Phone != null ? dat.Phone.phone : '',
										birthDate: dat.birthDate,
									});
								});
							}
							return (
								<Layout style={styles.avatarContainer}>
									<Avatar
										style={styles.avatar}
										size="small"
										source={
											userInfo[0].profileImageUrl.length > 0
												? { uri: userInfo[0].profileImageUrl }
												: require('../../assets/person.png')
										}
									/>
									<Text style={styles.text} category="s1">
										{userInfo[0].name}
									</Text>
								</Layout>
							);
						}}
					</GetUserInfoComponent>
				</TouchableOpacity>
			) : null}
			<Button
				style={styles.button}
				onPress={onCheckedChange}
				icon={checked ? SunIcon : NightIcon}
				status="control"
			></Button>
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
	avatarContainer: {
		flexDirection: 'row',
	},
	container: {
		marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
	},
	avatar: {
		marginTop: 16,
		marginRight: 8,
	},
	text: {
		marginRight: 16,
		marginTop: 20,
	},
	button: {
		height: 20,
		width: 20,
		marginTop: 8,
	},
});
export default HeaderComponent;
