import * as React from 'react';
import {  Button, Text, Layout } from '@ui-kitten/components';
import { StyleSheet, Image } from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
/**
 * Register props
 * 
 * 
 * 
 * 
 */
export interface RegisterProps {
    onRegister: Function;
    onRedirect: Function;
    firebaseUser: any;
}

/**
 * Register state
 */
export interface RegisterState {
    isRendered: boolean;
}

/**
 * Register
 */
export class RegisterScreen extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.state = { isRendered: false };
    }
    renderSetUserComponent() {
        return (
            <Layout>
                    {(registerMutation, { data }) => (
                        <Formik
                            initialValues={{}}
                            validationSchema={Yup.object({})}
                            onSubmit={(values, formikActions) => {
                                setTimeout(() => {
                                    registerMutation({
                                        variables: {
                                            firebaseId: this.props.firebaseUser.uid,
                                            displayName: this.props.firebaseUser.displayName,
                                            email: this.props.firebaseUser.email,
                                            pictureUri: this.props.firebaseUser.photoURL,
                                        },
                                    })
                                        .then(res => {
                                            let obj = JSON.parse(JSON.stringify(res));
                                            console.log(obj.data.setUser.id);
                                            this.props.onRedirect(obj.data.setUser.id);
                                        })
                                        .catch(err => alert(err));
                                    // Important: Make sure to setSubmitting to false so our loading indicator
                                    // goes away.
                                    formikActions.setSubmitting(false);
                                }, 500);
                            }}
                        >
                            {props => (
                                 
                            )}
                        </Formik>
                    )}
            </Layout>
        );
    }
    /**
     * Renders Register
     * @returns
     */
    render() {
        return (
            <Layout style={styles.container}>
                    <Image source={require('../../assets/icon.png')} style={styles.logo} />
                    {this.renderSetUserComponent()}
            </Layout>
        );
    }
}

const styles: any = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        flex: 0.3,
        width: '100%',
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        width: '80%',
    },
    button: {
        backgroundColor: '#3498db',
    },
});
