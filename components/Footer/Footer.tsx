import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Footer() {
    const [navbarOpen, setNavbarOpen] = React.useState(false)
    return (
        <>
            <footer className="bg-indigo-800 mt-50">
                <div className="px-4 py-3 text-white mx-auto">
                    <p className='text-center text-sm'>Lottie Assesment 2022</p>
                    <div className="text-center text-xs py-2">
                        <a href="\">&copy;2022 Sinan</a>
                    </div>
                </div>
            </footer>
        </>
    )
}
