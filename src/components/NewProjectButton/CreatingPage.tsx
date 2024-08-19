import Loading from 'react-loading';

const CreatingPage = () => (
    <main className='flex flex-col justify-center items-center fixed w-screen h-screen top-0 left-0 bg-white z-[2] text-black'>
        <Loading type="spin" color="#000000" height={40} width={40} />
        <p className="text-xl font-bold pt-2">Success</p>
        <p className="text-[grey]">Setting up project page</p>
    </main>
)

export default CreatingPage