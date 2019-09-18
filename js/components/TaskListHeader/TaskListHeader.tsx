import React from 'react';
import { StyleSheet, Text } from 'react-native';
interface HeaderProps {
    title: string
}

export default class TaskListHeader extends React.PureComponent<HeaderProps> {
    render() {
        return (
            <Text style={styles.header}>
                {this.props.title}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 40,
        lineHeight: 40,
        textAlign: 'center',
        fontWeight: "600",
        fontSize: 16,
        backgroundColor: "rgba(74, 74, 74, 1)",
        color: "#fff"
    }
});