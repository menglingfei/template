import React, { Component } from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity} from 'react-native';
import DataStore from "../../common/js/DataStorage";
import { AppContext } from '../../common/js/context';
interface ButtonProps {
    title: string,
    selected: boolean,
    handlePress?: any,
    // 该按钮本身的ID，如：按钮为功能按钮，则该ID为功能ID
    id: number
}
export default class BgButton extends Component<ButtonProps> {
    constructor(props: any) {
        super(props);
    }
    public static dataStore:any = new DataStore();
    sendCmd = (id: number): void => {
        BgButton.dataStore.fetchNetData('/api/ctrl_cmd/run_device_command', {
            function_id: this.props.id,
            device_id: id
        })
            .then((data: any) => {
                // console.log(JSON.stringify(data));
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    render() {
        return (
            <AppContext.Consumer>
                {
                    context => {
                        return (
                            <TouchableOpacity style={styles.container} onPress={() => {
                                this.sendCmd(context.currentDeviceId)
                            }}>
                                <ImageBackground
                                    source={require('./bgBtn.png')}
                                    style={styles.img}
                                >
                                    <Text style={styles.text}>{this.props.title}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    }
                }
            </AppContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 124
    },
    img: {
        justifyContent: 'center',
        width: 115,
        height: 50
    },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 17,
        fontWeight: '600'
    }
});
