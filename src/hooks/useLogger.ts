import {useEffect, useRef} from 'react';
import RNFS from 'react-native-fs';
import {LOG_FILE_PATH} from "../constants/constants";


const logToFile = async (message: string) => {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] ${message}\n`;
    await RNFS.appendFile(LOG_FILE_PATH, logLine, 'utf8');
};

export function useLogger() {
    const originalLogRef = useRef(console.log);

    useEffect(() => {
        const originalLog = console.log;
        originalLogRef.current = originalLog;

        console.log = (...args: any[]) => {
            originalLog(...args); // terminal log
            const msg = args
                .map(a => (typeof a === 'string' ? a : JSON.stringify(a)))
                .join(' ');
            logToFile(msg);
        };

        console.log('Logger initialized.');

        return () => {
            console.log = originalLogRef.current;
        };
    }, []);
}
