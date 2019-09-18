"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
class TaskListHeader extends react_1.default.PureComponent {
    render() {
        return (react_1.default.createElement(react_native_1.Text, { style: styles.header }, this.props.title));
    }
}
exports.default = TaskListHeader;
const styles = react_native_1.StyleSheet.create({
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
