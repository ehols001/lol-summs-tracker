const Placeholders = () => {
    return (
        <div className='flex justify-evenly w-[90%] py-3'>
            <div className='animate-pulse bg-gradient-to-br from-slate-400 to-slate-600 w-[70px] h-[70px] border border-gray-600 rounded-md'></div>
            <div className='animate-pulse bg-gradient-to-br from-slate-400 to-slate-600 w-[70px] h-[70px] my-auto border border-gray-600 rounded-md'></div>
            <div className='animate-pulse bg-gradient-to-br from-slate-400 to-slate-600 w-[70px] h-[70px] my-auto border border-gray-600 rounded-md'></div>
        </div>
    )
}

const Divider = () => {
    return (
        <div className='w-[90%] h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent'></div>
    )
}

export default function LoadingSkeleton() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className='flex flex-col justify-center items-center w-[320px] h-[500px]'>
                <Placeholders />
                <Divider />
                <Placeholders />
                <Divider />
                <Placeholders />
                <Divider />
                <Placeholders />
                <Divider />
                <Placeholders />
            </div>
        </div>
    )
}