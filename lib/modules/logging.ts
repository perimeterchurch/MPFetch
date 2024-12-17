class Log {
    static debugMode: boolean = false;

    static warn = console.warn;
    static error = console.error;
    static info = console.info;

    static debug = (...args: any[]) => {
        if (this.debugMode) {
            console.debug(...args);
        }
    };
}

export { Log };
