import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {Platform} from 'react-native';
import {LOG_FILE_PATH} from "../constants/constants";


export const shareLogs = async () => {
    const exists = await RNFS.exists(LOG_FILE_PATH);
    if (!exists) {
        console.error('Log file does not exist.');
        return;
    }

    try {
        await Share.open({
            url: `file://${LOG_FILE_PATH}`,
            type: 'text/plain',
            title: 'Log File',
            filename: Platform.OS === 'android' ? 'logs.txt' : undefined,
        });
    } catch (e) {
        console.error('Log sharing was cancelled or failed.', e);
    }
};
