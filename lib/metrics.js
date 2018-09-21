const timer = () => {
    let startTime = Date.now();
    return (pretty = false) => {
        if(pretty) {
            let [minutes, seconds, ms] = new Date(Date.now() - startTime)
                .toISOString()
                .substr(14, 9)
                .split(/:|\./)
                .map(token => parseInt(token));
            return minutes > 0 ? `${minutes}m ${seconds}s` : (seconds > 0 ? `${seconds}s` : `${ms}ms`);
        } else {
            return Date.now() - startTime;
        }
    };
};

module.exports = {
    timer
};