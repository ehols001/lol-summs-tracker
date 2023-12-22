'use client'

/**
 * Helper function to format a time into a readable format
 * 
 * @param time the time to be formatted
 * 
 * @returns the formatted time in M:SS format
 */
const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${String(minutes).padStart(1, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const SummTimers = ({
    timeRemaining,
}: {
    timeRemaining: number;
}) => {

    return (
        <div className='absolute top-0 left-0 w-[100%] h-[100%] rounded-md'>
            <span className='text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                {formatTime(timeRemaining)}
            </span>
        </div>
    )
}