const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
        // Render a completed state
        return <span>Completed</span>;
    } else {
        // Render a countdown
        return <span>{days > 0 && <>{days}d</>}{hours > 0 && <>{hours}h</>}{minutes > 0 && <>{minutes}m</>}{seconds > 0 && <>{seconds}s</>}</span>;
    }
};

export default renderer