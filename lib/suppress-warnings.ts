// @ts-nocheck
if (typeof process !== 'undefined' && process.emitWarning) {
    const originalEmit = process.emitWarning;
    process.emitWarning = (warning, ...args) => {
        // Suppress "DEP0169: url.parse() behavior is not standardized..."
        if (typeof warning === 'string' && warning.includes('url.parse')) {
            return;
        }
        if (typeof warning === 'object' && warning.code === 'DEP0169') {
            return;
        }
        return originalEmit.call(process, warning, ...args);
    };
}
