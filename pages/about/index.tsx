import type { NextPage } from 'next'
import Head from 'next/head'
import Users from '../../components/Users'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

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
                <main role="main" className="w-full h-full flex-grow overflow-auto">
                    <h1 className='text-center text-red-600 mt-5'>About This Assesment</h1>
                    <div className='mt-10 mb-10'>
                        <p>
You are tasked to create an application that will allow a user to upload an animation, view and
search for those animations, and make minor edits
Assume a user will use this feature to upload their own animation to see if it plays well using
the Lottie-Player. Tag the animations with searchable fields, and browse their animations later
to view previously uploaded animations.
                        </p>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default Index
