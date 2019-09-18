import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
interface ButtonProps {
    titleCn: string,
    titleEn: string,
    children: any
}
export default class IndexButtonWrap extends React.Component<ButtonProps> {
    shouldComponentUpdate(nextProps, nextStates) {
        return false;
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleWrap}>
                    <Text style={styles.title}>{this.props.titleCn}</Text>
                    <Text style={styles.titleEn}>{this.props.titleEn}</Text>
                </View>
                <View>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    titleWrap: {
        flexDirection: 'row',
        paddingBottom: 3,
        borderBottomColor: 'rgba(151, 151, 151, 1)',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(51, 51, 51, 1)'
    },
    titleEn: {
        marginLeft: 6,
        marginTop: 5,
        fontSize: 10,
        color: 'rgba(51, 51, 51, 1)'
    }
})
