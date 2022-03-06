import type { NextPage } from 'next'
import Head from 'next/head'
import ShowAnimations from '../components/ShowAnimations'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Lottie Assesment</title>
        <meta name="description" content="Lottie Assesment by Sinan" />
        <link rel="icon" href="/images/lottie.svg" />
      </Head>
      <Navbar />
      <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
        <main role="main" className="w-full h-full flex-grow overflow-auto mt-5 mb-5 p-5">
          <h1 className='text-center text-red-600 mt-5'>Welcome to Lottie Files</h1>
          <ShowAnimations />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Home
