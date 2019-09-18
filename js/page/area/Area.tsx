import React from 'react';
import { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, StatusBar } from 'react-native';
import Logo from '../../components/Logo/Logo';
import DataStore from "../../common/js/DataStorage";
import ManipWrap from "../../components/ManipWrap/ManipWrap";
import Back from "../../components/Back/Back";
import TaskListHeader from "../../components/TaskListHeader/TaskListHeader";
import TaskList from "../../components/TaskList/TaskList";
import SceneList from "../../components/SceneList/SceneList";
import DevicePop from "../../components/DevicePop/DevicePop";
import { manipulate, sendCmdGroup, sendTask } from "../../common/js/utils";
import { AREA_MULTI_MACHINE, PLACE_ID, PLAN_ID } from "../../common/js/params";
import CmdIcon from "../../components/CmdIcon/CmdIcon";
import CmdGroupPop from "../../components/CmdGroupPop/CmdGroupPop";

let areaId: number = 0;
let areaName: string = '';
// let planId: number = 0;
interface AreaProps {
    navigation: any
}
interface AreaState {
    isDevicePop: boolean,
    areaName: string,
    tasksList: Array<any>,
    currentTaskId: number,
    scenesList: Array<any>,
    currentSceneId: number,
    currentDeviceId: number,
    deviceList: Array<any>,
    groupList: Array<any>,
    areaTaskList: Array<any>,
    isCmdGroupPop: boolean,
    isAreaTaskPop: boolean,
    currentDeviceName: string
}
export default class AreaPage extends Component<AreaProps, AreaState> {
    state = {
        isDevicePop: false,
        areaName: '',
        tasksList: [],
        deviceList: [],
        scenesList: [],
        groupList: [],
        areaTaskList: [],
        currentTaskId: 0,
        currentSceneId: 0,
        currentDeviceId: 0,
        isCmdGroupPop: false,
        isAreaTaskPop: false,
        currentDeviceName: '无'
    };
    private static dataStore = new DataStore();
    componentDidMount() {
        areaId = this.props.navigation.getParam('areaId');
        areaName = this.props.navigation.getParam('areaName');
        // planId = this.props.navigation.getParam('planId');
        this.setState({
            areaName
        }, () => {
            if (AREA_MULTI_MACHINE.indexOf(areaId) < 0) {
                // this.getTask();
                this.getScene();
            } else {
                this.getControlDevice();
            }
        })
    }
    getScene = (deviceId: number = 0, deviceName: string = '') => {
        let postData = {
            area_id: areaId,
            plan_id: PLAN_ID
        };
        AreaPage.dataStore.fetchNetData('/api/scene/list', postData)
            .then((data: any) => {
                let scenes = data.scenes;
                this.setState({
                    scenesList: scenes,
                    currentSceneId: scenes.length > 0 ? scenes[0].id : 0,
                    currentDeviceId: deviceId,
                    currentDeviceName: deviceName,
                    isDevicePop: false
                }, () => {
                    this.getTask();
                })
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    transTracksToTasks = (tracks: Array<any>) => {
        let newData: Array<any> = [];
        for (let i: number = 0, length: number = tracks.length; i < length; i++) {
            for (let j: number = 0, _length: number = tracks[i]['tasks'].length; j < _length; j++) {
                newData.push(tracks[i]['tasks'][j]);
            }
        }
        return newData;
    }
    getTask = () => {
        let postData = {
            scene_id: this.state.currentSceneId
        }
        let deviceId = this.state.currentDeviceId;
        if (deviceId) {
            postData = Object.assign(postData, {
                device_id: deviceId
            })
        }
        AreaPage.dataStore.fetchNetData('/api/play_task/scene_tasks', postData)
            .then((data: any) => {
                let tracks = data.tracks;
                let newData = this.transTracksToTasks(tracks);
                this.setState({
                    tasksList: newData,
                    currentTaskId: newData.length > 0 ? newData[0].id : 0,
                    isDevicePop: false
                })
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    getControlDevice = () => {
        if (this.state.deviceList.length !== 0) {
            return;
        }
        AreaPage.dataStore.fetchNetData('/api/device/list', {
            area_id: areaId,
            place_id: PLACE_ID
        })
            .then((data: any) => {
                let devices = data.devices;
                let newData = devices.filter((item: any) => {
                    return item.category_id === 2
                })
                newData.unshift({id: 0, name: '默认所有'});
                this.setState({
                    deviceList: newData
                })
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    back = () => {
        this.props.navigation.goBack();
    }
    onTaskChange = (taskId: number, taskName: string) => {
        this.setState({
            currentTaskId: taskId
        }, () => {
            manipulate('/api/ctrl_cmd/goto_task', {play: 1, progress: -1, task_id: taskId});
        })
    }
    onSceneChange = (sceneId: number) => {
        this.setState({
            currentSceneId: sceneId
        }, () => {
            this.getTask();
            // manipulate('/api/ctrl_cmd/goto_task', {play: 1, progress: -1, task_id: taskId});
        })
    }
    showDevicePop = () => {
        this.setState({
            isDevicePop: true
        })
    }
    hideDevicePop = () => {
        this.setState({
            isDevicePop: false
        })
    }
    getCmdGroup = () => {
        AreaPage.dataStore.fetchNetData('/api/cmd_grp/list', {
            place_id: PLACE_ID,
            area_id: areaId
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
    // 获取当前展区下的所有播放任务（包含所有预案）
    getAreaTask = () => {
        AreaPage.dataStore.fetchNetData('/api/play_task/area_tasks', {
            area_id: areaId
        })
            .then((data: any) => {
                this.setState({
                    areaTaskList: data.tasks,
                    isAreaTaskPop: true
                })
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    hideCmdGroupPop = () => {
        this.setState({
            isCmdGroupPop: false
        })
    }
    hideAreaTaskPop = () => {
        this.setState({
            isAreaTaskPop: false
        })
    }
    setCurrentDeviceId = (currentDeviceId) => {
        this.setState({
            currentDeviceId
        })
    }
    render() {
        let isMultiMachine = AREA_MULTI_MACHINE.indexOf(areaId) >= 0;
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={true}
                />
                <Logo main={false} />
                <TouchableOpacity style={[styles.icon, {right: 20}]} onPress={this.back}>
                    <Back />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.icon, {right: 70}]} onPress={this.getCmdGroup}>
                    <CmdIcon />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.icon, {right: 120}]} onPress={this.getAreaTask}>
                    <CmdIcon />
                </TouchableOpacity>
                <View style={styles.contentContainer}>
                    <View style={styles.content}>
                        <View style={styles.sceneWrap}>
                            <TaskListHeader
                                title='幕列表'
                            />
                            <SceneList
                                sceneList={this.state.scenesList}
                                onSceneChange={this.onSceneChange}
                                currentSceneId={this.state.currentSceneId}
                            ></SceneList>
                        </View>
                        <View style={styles.taskWrap}>
                            <TaskListHeader
                                title='内容列表'
                            />
                            <TaskList
                                taskList={this.state.tasksList}
                                onTaskChange={this.onTaskChange}
                                currentTaskId={this.state.currentTaskId}
                            ></TaskList>
                            {
                                isMultiMachine &&
                                <Text style={styles.deviceName}>当前播控：{this.state.currentDeviceName}</Text>
                            }
                        </View>
                        <View style={styles.manipWrap}>
                            <ManipWrap
                                areaId={areaId}
                                taskId={this.state.currentTaskId}
                                isList={isMultiMachine ? true : false}
                                openListPop={this.showDevicePop}
                            />
                        </View>
                    </View>
                </View>
                <DevicePop
                    visible={this.state.isDevicePop}
                    cbCancel={this.hideDevicePop}
                    deviceList={this.state.deviceList}
                    getScene={this.getScene}
                />
                {/*当前展区下的所有任务弹窗*/}
                {/*
                <CmdGroupPop
                    visible={this.state.isAreaTaskPop}
                    cbCancel={this.hideAreaTaskPop}
                    headerText='请选择一个任务：'
                    groupList={this.state.areaTaskList}
                    handleClick={sendTask}
                />
                */}
                {/*指令组弹窗*/}
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
        flex: 1,
        alignItems: 'center'
    },
    bg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        zIndex: 0
    },
    contentContainer: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    deviceName: {
        position: 'absolute',
        bottom: 70,
        left: 0,
        zIndex: 10
    },
    sceneWrap: {
        width: 250,
        paddingLeft: 50,
        paddingRight: 40,
        paddingBottom: 100,
        paddingTop: 100
    },
    taskWrap: {
        position: 'relative',
        width: 350,
        paddingBottom: 100,
        paddingTop: 100
    },
    manipWrap: {
        width: 320,
        justifyContent: 'center',
        paddingHorizontal: 50
    },
    btnRowWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 65,
        marginVertical: 10
    },
    btnWrap: {
        margin: 12
    },
    multiBtnWrap: {
        margin: 5
    },
    icon: {
        position: 'absolute',
        top: 20,
        width: 40,
        height: 40,
        zIndex: 100000
    }
});
