class TimeFormatter {
    static formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;
        return formattedTime;
    }
}