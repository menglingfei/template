import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
import { Animated, StyleSheet, View, Image, Text, StatusBar, ToastAndroid } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import IndexButtonWrap from '../../components/IndexButtonWrap/IndexButtonWrap';
import IndexButton from '../../components/IndexButton/IndexButton';
import AreaButton from '../../components/AreaButton/AreaButton';
import CmdGroupPop from '../../components/CmdGroupPop/CmdGroupPop';
import ConfirmPop from '../../components/ConfirmPop/ConfirmPop';
import { Loading } from '../../components/Loading/Loading';
import Logo from '../../components/Logo/Logo';
import DataStore from '../../common/js/DataStorage';
import { AREA_LIST, PLACE_ID, DEVICE_ALL_ID } from '../../common/js/params';
import { sendCmdGroup } from '../../common/js/utils';

interface MainProps {
    navigation: any
}
interface MainStates {
    isAreaBg: boolean,
    isRouteBg: boolean,
    isCmdPop: boolean,
    isAreaPagePop: boolean,
    isDevicePagePop: boolean,
    currentAreaName: string,
    currentAreaId: number,
    opacity: any,
    groupList: Array<any>,
    isConfirmPop: boolean,
    currentManipId: number,
    currentManipType: string,
    timer: any,
    progress: number
}
const shadowOpt = {
    width: 260, //包裹的子内容多宽这里必须多宽
    height: 460, //同上
    color: "#c1c0c0", //阴影颜色
    border: 8, //阴影宽度
    radius: 10, //包裹的子元素圆角多少这里必须是多少
    opacity: 0.5, //透明度
    x: 0,
    y: 0,
    style: {marginVertical: 5}
}
export default class Main extends Component<MainProps, MainStates> {
    state = {
            isAreaBg: false,
            isRouteBg: false,
            isAreaPagePop: false,
            isDevicePagePop: false,
            isCmdPop: false,
            currentAreaName: '',
            currentAreaId: 0,
            opacity: new Animated.Value(0),
            groupList: [],
            isConfirmPop: false,
            currentManipId: 0,
            currentManipType: '',
            timer: undefined,
            progress: 0
    }
    public static fadeAnimation: any = new Animated.Value(0);
    public static dataStore:any = new DataStore();
    componentDidMount() {
        Orientation.lockToLandscape();
    }
    sendCmdGroup = () => {
        let that = this;
        this.setState({
            timer: setInterval(() => {
                let progress = this.state.progress;
                if (progress > 0.96) {
                    clearTimeout(that.state.timer);
                }
                that.setState({
                    progress: progress + 0.002
                }, () => {
                    let message = this.state.currentManipType === 'ON' ? '正在开启' : '正在关闭';
                    Loading.showProgress(this.state.progress, message);
                })
            }, 50)
        }, () => {
            let toastMessage = this.state.currentManipType === 'ON' ? '开启成功' : '关闭成功';
            Main.dataStore.fetchNetDataWithProgress('/api/ctrl_cmd/run_command_group', {
                id: this.state.currentManipId
            })
                .then((data: any) => {
                    // debugger;
                    clearTimeout(that.state.timer);
                    Loading.hide();
                    ToastAndroid.showWithGravity(
                        toastMessage,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                    this.setState({
                        progress: 0
                    });
                })
                .catch((error: any) => {
                    error && console.log(error.toString());
                })
        })
    }
    toggleAreaBg = () =>  {
        let isAreaBg = this.state.isAreaBg;

        let OPACITY_VALUE = 1;
        Animated.timing(                     // 随时间变化而执行动画
            Main.fadeAnimation,              // 动画中的变量值
            {
                toValue: OPACITY_VALUE,      // 透明度最终变为1，即完全不透明
                duration: 4000,              // 让动画持续一段时间
            }
        ).start();
        this.setState({
            isAreaBg: !isAreaBg
        })
    }
    toggleRouteBg = () => {
        let isRouteBg = this.state.isRouteBg;
        this.setState({
            isRouteBg: !isRouteBg
        })
    }
    renderAreaList = () => {
        let areaList = AREA_LIST;
        return (
            areaList.map((item) => {
                return (
                    <AreaButton key={item.id} x={item.x} y={item.y} width={item.width} height={item.height} title={item.name} handleClick={() => {this.openAreaLayer(item.name, item.id)}} />
                )
            })
        )
    }
    openAreaLayer = (areaName, areaId) => {
        this.props.navigation.navigate('AreaPage', {
            areaId,
            areaName
        });
    }
    openDeviceLayer = () => {
        this.props.navigation.navigate('DevicePage');
    }
    closeCmd = () => {
        this.setState({
            isCmdPop: false
        })
    }
    getGroupList = () => {
        Main.dataStore.fetchNetData('/api/cmd_grp/list', {
            place_id: PLACE_ID
        })
            .then((data: any) => {
                let commands = data.commands;
                this.setState({
                    groupList: commands,
                    isCmdPop: true
                })
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    openCmd = () => {
        this.setState({
            isCmdPop: true
        })
    }
    openConfirmPop = (id: number, type: string) => {
        this.setState({
            isConfirmPop: true,
            currentManipId: id,
            currentManipType: type
        })
    }
    closeConfirmPop = () => {
        this.setState({
            isConfirmPop: false
        })
    }
    beforeCloseAllDevice = () => {
        this.setState({
            isConfirmPop: false
        }, () => {
            this.sendCmdGroup();
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={true}
                />
                <Logo main={false}/>
                <View style={styles.contentContainer}>
                    <View style={styles.contentArea}>
                        <Image style={[styles.bg, {zIndex: 1}]} source={require('./displayBg.png')} />
                        {
                            this.state.isAreaBg &&
                            <View style={styles.areaWrapper}>
                                <Image style={[styles.bg, {zIndex: 100}]} source={require('./areaBg.png')} />
                                <View style={[styles.areaList]}>
                                    {this.renderAreaList()}
                                </View>
                            </View>
                        }
                        {
                            this.state.isRouteBg &&
                            <Image style={[styles.bg, {zIndex: 10}]} source={require('./route.png')} />
                        }
                    </View>
                    <BoxShadow setting={shadowOpt}>
                        <View style={styles.contentIndex}>
                            <View style={styles.header}>
                                <Text style={styles.totalEn}>HANGZHOU</Text>
                                <Text style={styles.total}>杭州综合管廊展示厅</Text>
                            </View>
                            <View style={styles.headerEn}>
                                <Text style={styles.headerEnLine}>Integrated Pipeline</Text>
                                <Text style={styles.headerEnLine}>Gallery Exhibition Hall</Text>
                            </View>
                            <IndexButtonWrap titleCn='展厅导览' titleEn='Exhibition Hall Guide'>
                                <View style={styles.marT1}>
                                    <IndexButton titleCn='空间分区' titleEn='Spatial partition' icon='map-marker' handleClick={this.toggleAreaBg}/>
                                </View>
                                <View style={styles.marT2}>
                                    <IndexButton titleCn='参观线路' titleEn='Tour Routes' icon='routes' handleClick={this.toggleRouteBg}/>
                                </View>
                            </IndexButtonWrap>
                            <IndexButtonWrap titleCn='公共设施' titleEn='Public Facilities'>
                                <View style={styles.marT1}>
                                    <IndexButton titleCn='设备管理' titleEn='Equipment Management' icon='desktop-mac' handleClick={this.openDeviceLayer}/>
                                </View>
                                <View style={styles.marT1}>
                                    <IndexButton titleCn='全局指令组' titleEn='Global Command Group' icon='cards-variant' handleClick={this.getGroupList}/>
                                </View>
                                <View style={[styles.marT1, styles.powerWrap]}>
                                    <IndexButton titleCn='全开' titleEn='Power On' width={90} icon='power' handleClick={() => {this.openConfirmPop(DEVICE_ALL_ID.ON, 'ON')}}/>
                                    <IndexButton titleCn='全关' titleEn='Power Off' width={90} icon='power-off' handleClick={() => {this.openConfirmPop(DEVICE_ALL_ID.OFF, 'OFF')}}/>
                                </View>
                            </IndexButtonWrap>
                        </View>
                    </BoxShadow>
                </View>
                <CmdGroupPop
                    visible={this.state.isCmdPop}
                    cbCancel={this.closeCmd}
                    groupList={this.state.groupList}
                    handleClick={sendCmdGroup}
                />
                <ConfirmPop
                    type={this.state.currentManipType === 'ON' ? '开启': '关闭'}
                    visible={this.state.isConfirmPop}
                    cbCancel={() => {this.closeConfirmPop()}}
                    cbConfirm={() => {this.beforeCloseAllDevice()}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        zIndex: 1,
        top: 0,
        bottom: 0,
        right: 40,
        left: 0
    },
    bg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    contentArea: {
        width: 650,
        height: '100%'
    },
    contentIndex: {
        width: 260,
        height: 460,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingLeft: 27,
        paddingRight: 27
    },
    areaWrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1000
    },
    areaList: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 10000
    },
    areaBg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        zIndex: 100
    },
    marT1: {
        marginTop: 10
    },
    marT2: {
        marginTop: 6
    },
    header: {
        marginTop: 13
    },
    total: {
        fontSize: 17,
        fontWeight: '600',
        color: 'rgba(0, 0, 0, 1)',
        marginTop: -8
    },
    totalEn: {
        fontSize: 32,
        color: 'rgba(153, 153, 153, 1)'
    },
    headerEn: {
        marginTop: 10,
        marginBottom: 25
    },
    headerEnLine: {
        fontSize: 9,
        color: 'rgba(51, 51, 51, 1)',
        height: 10,
        lineHeight: 10
    },
    test: {
        width: 315,
        height: 44,
        backgroundColor: '#fff',
        borderRadius: 22
    },
    powerWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 195
    }
});
