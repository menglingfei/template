import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BoxShadow} from 'react-native-shadow';
interface ButtonProps {
    titleCn: string,
    titleEn: string,
    width?: number,
    icon?: string,
    handleClick: any
}
export default function IndexButton(ButtonProps: ButtonProps) {
    const width = ButtonProps.width ? ButtonProps.width : 195;
    const shadowOpt = {
        width: width, //包裹的子内容多宽这里必须多宽
        height: 30, //同上
        color: "#9B9B9B", //阴影颜色
        border: 3, //阴影宽度
        radius: 10, //包裹的子元素圆角多少这里必须是多少
        opacity: 0.2, //透明度
        x: 0,
        y: 0,
        style: {marginVertical: 5}
    }
    return (
        <BoxShadow setting={shadowOpt}>
            <TouchableOpacity style={[styles.container, {width: width}]} activeOpacity = { .8 } onPress={ButtonProps.handleClick}>
            <Icon name={ButtonProps.icon} size={16} color='#adadad' />
            <View style={styles.titleWrap}>
                <Text style={styles.textCn}>{ButtonProps.titleCn}</Text>
                <Text style={styles.textEn}>{ButtonProps.titleEn}</Text>
            </View>
        </TouchableOpacity>
        </BoxShadow>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 12,
        borderRadius: 12,
        backgroundColor: '#fff'
    },
    titleWrap: {
        flex: 1,
        marginLeft: 9,
        justifyContent: 'center'
    },
    textCn: {
        color: 'rgba(51, 51, 51, 1)',
        fontSize: 13,
        marginBottom: -2
    },
    textEn: {
        color: 'rgba(102, 102, 102, 1)',
        fontSize: 9,
        marginTop: -2
    }
});