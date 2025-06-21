import {useEffect} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import RNFS from 'react-native-fs';
import {LOG_FILE_PATH} from "../constants/constants";

export function useNativeLogListener() {
    useEffect(() => {
        const eventEmitter = new NativeEventEmitter(NativeModules.ChangeDNS);
        const subscription = eventEmitter.addListener('nativeLog', async (msg: string) => {
            // console.log('[NATIVE]', msg);
            const timestamp = new Date().toISOString();
            await RNFS.appendFile(LOG_FILE_PATH, `[NATIVE][${timestamp}] ${msg}\n`, 'utf8');
        });

        return () => subscription.remove();
    }, []);
}
