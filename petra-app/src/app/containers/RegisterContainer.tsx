import * as React from 'react';
import { Google } from 'expo';
import { RegisterScreen } from '../pages/screens/RegisterScreen';
import { Layout } from '@ui-kitten/components';
/**
 * Register container props
 */
export interface RegisterContainerProps {
    navigation: any;
}

/**
 * Register container state
 */
export interface RegisterContainerState {
    firebaseUser: any;
}

/**
 * Register container
 */
class RegisterContainer extends React.Component<RegisterContainerProps, RegisterContainerState> {
    constructor(props: RegisterContainerProps) {
        super(props);
        this.state = { firebaseUser: '' };
    }
    
    onRedirect = userId => {
        this.props.navigation.navigate('Home', {
            userId: userId,
        });
    };

    onRegister = () => {
        
    };

    /**
     * Renders login container
     * @returns
     */
    render() {
        return (
            <Layout>
                <RegisterScreen
                    onRegister={() => this.onRegister()}
                    onRedirect={value => this.onRedirect(value)}
                    firebaseUser={this.state.firebaseUser}
                />
            </Layout>
        );
    }
}
export default RegisterContainer;
