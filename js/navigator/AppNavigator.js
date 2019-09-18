import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';
import HomePage from '../page/index/Index';
import AreaPage from '../page/area/Area';
import DevicePage from '../page/device/Device';
const MainNavigator  = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: ({navigation}) => ({header: null, gesturesEnable: true})
    },
    AreaPage: {
        screen: AreaPage,
        navigationOptions: ({navigation}) => ({header: null, gesturesEnable: true})
    },
    DevicePage: {
        screen: DevicePage,
        navigationOptions: ({navigation}) => ({header: null, gesturesEnable: true})
    }
}, {
    initialRouteName: 'HomePage'
});

export default createAppContainer(createSwitchNavigator({
    Main: MainNavigator
}))
