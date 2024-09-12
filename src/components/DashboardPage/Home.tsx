import ConnectButton from '../ConnectButton'

const Home = () => (
  <main className="grid gap-6 sm:gap-12 md:gap-24 h-[calc(100vh-160px)]">
    <div className="grid grid-rows-[1fr_auto_2fr]">
      <section className="row-start-2 grid gap-4 place-items-center container w-fit p-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight">
          {'Welcome to Mesa'}
        </h1>
        <ConnectButton showTextInMobile={false} />
      </section>
    </div>
  </main>
)

export default Home
