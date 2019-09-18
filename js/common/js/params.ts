// 1708测试
/*
export const URL: string = 'https://api.yunzhizhan.cn';
export const TOKEN: string = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQyNjBmODUzYzVmMDNkZjIwN2YwYTMzMWRkMGQ1MWEzY2U2YjU4N2VkODNlM2M5NjQxODkxZDdkZTkwN2I0ZmU2ODQyZjA4ZDM3NTAzOTVmIn0.eyJhdWQiOiIxIiwianRpIjoiZDI2MGY4NTNjNWYwM2RmMjA3ZjBhMzMxZGQwZDUxYTNjZTZiNTg3ZWQ4M2UzYzk2NDE4OTFkN2RlOTA3YjRmZTY4NDJmMDhkMzc1MDM5NWYiLCJpYXQiOjE1NTgwMDUxMTgsIm5iZiI6MTU1ODAwNTExOCwiZXhwIjoxNTg5NjI3NTE4LCJzdWIiOiI0OSIsInNjb3BlcyI6W119.E6Ijg5h9iXSuIiaicpC50ooX3C7sQZs7gAUuHoyvWXWl8tPu-20Wih_xVM0Z1ddZq3hvdXKABVPxbyjGpQyd7v5QOHl2UQ-pBvAPbh8U6IpTCVnRdESBuJTNsSzTHzxrSF0XB8M-5xsIg2AF9ZFrwuS3ld96usXbPBIHs7T1fJWHcFK72blDXhABd4UQ2ekQGTMYeuhthZxuLdCKV4Hrka26CqcvrvqOgn5tB_mE4-fzOnNUlNiwI3_WRYV-JkPzM52ttW5MsllkFssbnVokGjZ6prP5e-7EYF282IdsQ4Ttz9R2k62ZqVrha2eIeDeRVVazqbkdtNHsZDpddMdXjI3kWRht40wbcWYIokOLXpRROELFpI5iiplgW27bwNrj18mVOsdp19wO_SUKH8FNQOj6aRFll2pndbh47EAl7YojxVT-FhcsQBOLtWCOK4xurwf9DIdiaSS_qjE-aqIwgy080U3kFixgqOHRMphgui1tmBgSv9yapNJx4vANEw0DO5pmkUx1Qk_YXjZo1AAX_1ey6LWVV6wMVgbW3jEy1oKnIxbdbsHmv5gtZUb_4imAJ8yoG_3c3bArj_vp8Qh_dtLjRaDi0-tf3srGs73uNC9ciibNWwSsna6z6g3CpbVyQ3IUMNvGLugd1C00QfroaVz-G0I5VmQnoU6Lru7fq8Q';
export const PLACE_ID: number = 7;
// 需要做分屏的展区ID的数组
export const AREA_SCREEN_LIST = [];
// 预案ID，固定
export const PLAN_ID: number = 12;
export const SOCKET_IP: string = '192.168.1.246';
export const SOCKET_PORT: string = '9002';
// 多播控展区
export const AREA_MULTI_MACHINE:Array<number> = [10];
// 设备全开，全关指令ID
export const AREA_LIST: Array<any> = [
    {
        id: 11,
        name: '投影区',
        x: 32,
        y: 22,
        width: 70,
        height: 22
    },
    {
        id: 10,
        name: '拼接屏区',
        x: 69,
        y: 60,
        width: 70,
        height: 22
    },
    {
        id: 16,
        name: '滑轨屏区',
        x: 100,
        y: 300,
        width: 70,
        height: 22
    }
];
// 设备全开，全关指令ID
export const DEVICE_ALL_ID = {
    ON: 192,
    OFF: 193
};
*/

// 正式

export const URL: string = 'https://api.yunzhizhan.cn';
export const TOKEN: string = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI3YjIxYWNmZDQ2NWNjZDc2Zjc0OTk4ZGM3MjMzZTA0YjNiNWU1OWQ4YmEwYzg5ZDU2OTNjNTRmOTdmM2MxYTFkNDQ2MTdjM2ViOTZhMjY1In0.eyJhdWQiOiIxIiwianRpIjoiMjdiMjFhY2ZkNDY1Y2NkNzZmNzQ5OThkYzcyMzNlMDRiM2I1ZTU5ZDhiYTBjODlkNTY5M2M1NGY5N2YzYzFhMWQ0NDYxN2MzZWI5NmEyNjUiLCJpYXQiOjE1NjE2MDQ4NzMsIm5iZiI6MTU2MTYwNDg3MywiZXhwIjoxNTkzMjI3MjczLCJzdWIiOiI2NCIsInNjb3BlcyI6W119.KjFcU8ch6tsvqR48tZZy9OmrBDMUIPgWmczpKFU9vrti66wKSd-SM39eVi9BN4xDxfP13wXIcKwtBY5cUUCKyLebK3Sle0CqFQjJn8jAlR704ovsSlM3CR6P-ukrG1Grk-xML4fhL0s26dXhzU-KtMs-jp1mhEiBgUKbesvV32mbMaebNFT9T9Yf-D0xD0WoJ_H0ySyrCbYhM6WXxd2pYDz9vQMKHYEPv8s_SoAhQl5NhaCUrCyTxvhFdR-kJ6qpQKZxy0B6EDSD9p3mbZpXOpoo3DQI2ESURxnUZJhY7AWUPBBMDCpRgFlFb1O41sp8IcCOWAjrziXNAAZDCSlCf7bwsoJhAMZarc7PyowEJe-vW44tjuW4hk01hoynnSAHc4PZvWtooMrWlhKZUwykaU1dGzKBU-A6Up8aKkLCs-yKg-yYlwii70NNzfWqZGfOw5s-V_8oEt-8TQ429VaJDcFSvXPZSAXF3SOP3kcn-cy-SVdk8Vy1AOZQr4Yae8hnW3Psf_SkeBdZYJ7QwvITWdkzKXKCd44mPTBQW_j1ilhHKe5CorP_BfRtICkYGzhHO_GiBHQjVSFCOYxMyXgsnFOR63i8bHV8YgOPMiDWjOqnBfVoiDu3sdkh5Wvdg41tj_iWVzTL2cmH_aTjlM_lctFXzuzqtmOZU0d6Us37n9I';
export const PLACE_ID: number = 30;
// 需要做分屏的展区ID的数组
export const AREA_SCREEN_LIST = [];
// 预案ID，固定
export const PLAN_ID: number = 76;
export const SOCKET_IP: string = '';
export const SOCKET_PORT: string = '';
// 多播控展区
export const AREA_MULTI_MACHINE = [];
// 设备全开，全关指令ID
export const DEVICE_ALL_ID = {
    // TODO
    ON: -1,
    OFF: -2
};
export const AREA_LIST: Array<any> = [
    {
        id: 91,
        name: '中国综合管廊发展区',
        x: 290,
        y: 10,
        width: 130,
        height: 22
    },
    {
        id: 88,
        name: '主题宣传片',
        x: 155,
        y: 337,
        width: 85,
        height: 22
    },
    {
        id: 90,
        name: '国家战略布局',
        x: 245,
        y: 61,
        width: 90,
        height: 22
    },
    {
        id: 92,
        name: '杭州市综合管廊规划',
        x: 430,
        y: 215,
        width: 135,
        height: 22
    },
    {
        id: 94,
        name: '杭州综合管廊发展历程',
        x: 400,
        y: 42,
        width: 154,
        height: 22
    },
    {
        id: 95,
        name: '杭州综合管廊科普',
        x: 520,
        y: 437,
        width: 130,
        height: 22
    },
    {
        id: 93,
        name: '杭州综合管廊项目',
        x: 475,
        y: 182,
        width: 135,
        height: 22
    },
    {
        id: 100,
        name: '签名墙',
        x: 385,
        y: 559,
        width: 60,
        height: 22
    },
    {
        id: 99,
        name: '管廊六大体系',
        x: 405,
        y: 250,
        width: 130,
        height: 22
    },
    {
        id: 98,
        name: '综合管廊建设工艺',
        x: 440,
        y: 520,
        width: 130,
        height: 22
    },
    {
        id: 96,
        name: '综合管廊知识问答',
        x: 510,
        y: 285,
        width: 130,
        height: 22
    },
    {
        id: 101,
        name: '综合管廊管理',
        x: 300,
        y: 524,
        width: 100,
        height: 22
    },
    {
        id: 102,
        name: '美丽杭州蓝图',
        x: 215,
        y: 563,
        width: 100,
        height: 22
    },
    {
        id: 97,
        name: '透视地面',
        x: 485,
        y: 478,
        width: 70,
        height: 22
    },
    {
        id: 89,
        name: '领导关怀区',
        x: 185,
        y: 30,
        width: 70,
        height: 22
    },
];

/************************* Common ************************/
export const DEST = "16_05541352";
// 中控服务ID
export const DEVICE_SN = "cF81MF8zdjlo";
// 需要做Websocket连接的展区ID
export const AREA_ID = 77;
