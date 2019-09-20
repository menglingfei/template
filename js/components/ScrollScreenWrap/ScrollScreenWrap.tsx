import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import ManipulateButton from "../ManipulateButton/ManipulateButton";
import { manipulate } from '../../common/js/utils';
import DataStore from '../../common/js/DataStorage';

const DEVICE_ID = 406;
const FUNCTION_IDS = {
    left: 335,
    right: 336,
    stop: 337
}
export default class ScrollScreenWrap extends Component {
    state = {
        isWelcomePop: false
    };
    private static dataStore = new DataStore();
    sendCommand = (functionId) => {
        ScrollScreenWrap.dataStore.fetchNetData('/api/ctrl_cmd/run_device_command', {
            function_id: functionId,
            device_id: DEVICE_ID
        })
            .then((data: any) => {
                // TODO
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    render() {
        const color = ['rgba(89, 216, 250, 1)', 'rgba(45, 176, 243, 1)'];
        return (
            <View style={styles.manipWrap}>
                <View style={styles.btnRowWrap}>
                    <ManipulateButton title='向左' color={color} handleClick={this.sendCommand.bind(FUNCTION_IDS.left)} icon='arrow-left' />
                </View>
                <View style={styles.btnRowWrap}>
                    <ManipulateButton title='向右' color={color} handleClick={this.sendCommand.bind(FUNCTION_IDS.right)} icon='arrow-right' />
                </View>
                <View style={styles.btnRowWrap}>
                    <ManipulateButton title='停止' color={color} handleClick={this.sendCommand.bind(FUNCTION_IDS.stop)} icon='stop' />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    manipWrap: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: "100%"
    },
    btnRowWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 65,
        marginVertical: 6
    }
});
