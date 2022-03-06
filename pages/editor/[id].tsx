import type { NextPage } from 'next'
import Head from 'next/head'
import ShowAnimation from '../../components/showAnimation'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

const Index: NextPage = () => {
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
                    
                    <ShowAnimation />
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default Index
