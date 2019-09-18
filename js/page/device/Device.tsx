import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import AreaListRow from '../../components/AreaListRow/AreaListRow';
import DeviceSwiperWrap from "../../components/DeviceSwiperWrap/DeviceSwiperWrap";
import { AREA_LIST, PLACE_ID } from "../../common/js/params";
import DataStore from '../../common/js/DataStorage';
import { AppContext } from '../../common/js/context';
import CommandListWrap from "../../components/CommandListWrap/CommandListWrap";
import CmdGroupPop from "../../components/CmdGroupPop/CmdGroupPop";
import Back from "../../components/Back/Back";
import CmdIcon from "../../components/CmdIcon/CmdIcon";
import Logo from '../../components/Logo/Logo';
import { sendCmdGroup } from "../../common/js/utils";

interface DeviceProps {
    navigation: any
}
interface DeviceStates {
    currentAreaId: number,
    currentDeviceId: number,
    deviceList: Array<any>,
    functionList: Array<any>,
    isCmdGroupPop: boolean,
    groupList: Array<any>
}
export default class DevicePage extends Component<DeviceProps, DeviceStates> {
    state = {
        currentAreaId: 0,
        deviceList: [],
        functionList: [],
        currentDeviceId: 0,
        isCmdGroupPop: false,
        groupList: []
    }
    DeviceSwiperWrap: any;
    public static dataStore:any = new DataStore();
    setDevicesData = (deviceData: Array<any>) => {
        /*
        let newDeviceData = getSpecialDevice(deviceData, false);
        this.setState({
            deviceList: newDeviceData
        })
        */
        this.setState({
            deviceList: deviceData
        })
    }
    setCurrentAreaId = (areaId: number) => {
        this.setState({
            currentAreaId: areaId,
            currentDeviceId: 0,
            functionList: []
        },() => {
            this.DeviceSwiperWrap.resetCurrentDeviceInfo();
        })
    }
    getAreaListContainAll = (areaList: Array<any>) => {
        if (0 === areaList[0].id) return areaList;
        let newData = [...areaList];
        newData.unshift({
            id: 0,
            name: '所有展区'
        })
        return newData;
    }
    beforeGetFunctionList = (deviceId: number, deviceName: string, deviceIp: string) => {
        this.setState({
            currentDeviceId: deviceId
        }, () => {
            this.getFunctionList(deviceId);
        })
    }
    getFunctionList = (deviceId: number) => {
        DevicePage.dataStore.fetchNetData('/api/device_model_function/list', {
            device_id: deviceId
        })
            .then((data: any) => {
                this.setState({
                    functionList: data.deviceModelFunction
                })
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    back = () => {
        this.props.navigation.goBack();
    }
    getCmdGroup = () => {
        DevicePage.dataStore.fetchNetData('/api/cmd_grp/list', {
            place_id: PLACE_ID,
            area_id: this.state.currentAreaId
        })
            .then((data: any) => {
                this.setState({
                    groupList: data.commands,
                    isCmdGroupPop: true
                })
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    /*
    getCmdGroup = () => {
        debugger;
        DevicePage.dataStore.fetchNetData('/api/place/info', {
            place_id: PLACE_ID,
        })
            .then((data: any) => {
                debugger;
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    */
    hideCmdGroupPop = () => {
        this.setState({
            isCmdGroupPop: false
        })
    }
    render() {
        let areaList = this.getAreaListContainAll(AREA_LIST);
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={true}
                />
                <Logo main={false} />
                <TouchableOpacity style={styles.back} onPress={this.back}>
                    <Back />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cmdGroup} onPress={this.getCmdGroup}>
                    <CmdIcon />
                </TouchableOpacity>
                <View style={styles.areaWrap}>
                    <AreaListRow areaList={areaList} setDevicesData={this.setDevicesData} setCurrentAreaId={this.setCurrentAreaId}/>
                </View>
                <View style={styles.deviceWrap}>
                    <DeviceSwiperWrap
                        deviceList={this.state.deviceList}
                        beforeGetFunctionList={this.beforeGetFunctionList}
                        ref={(child)=>{this.DeviceSwiperWrap = child}}
                    ></DeviceSwiperWrap>
                </View>
                <AppContext.Provider value={this.state}>
                    <View style={styles.commandWrap}>
                        <CommandListWrap commandList={this.state.functionList} setDevicesData={() => {}} setCurrentAreaId={() => {}}/>
                    </View>
                </AppContext.Provider>
                <CmdGroupPop
                    visible={this.state.isCmdGroupPop}
                    cbCancel={this.hideCmdGroupPop}
                    groupList={this.state.groupList}
                    handleClick={sendCmdGroup}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingBottom: 16
    },
    areaWrap: {
        width: '93%',
        height: 60,
        marginTop: 90
    },
    deviceWrap: {
        flex: 1,
        width: '88%',
        overflow: 'hidden'
    },
    commandWrap: {
        width: '90%',
        height: 50,
        marginBottom: 20
    },
    back: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 40,
        height: 40,
        zIndex: 100000
    },
    cmdGroup: {
        position: 'absolute',
        top: 20,
        width: 40,
        height: 40,
        right: 70,
        zIndex: 100000
    }
})
