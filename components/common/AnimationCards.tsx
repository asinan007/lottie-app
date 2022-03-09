import React, { useState } from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import DangerButton from './buttons/DangerButton';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import Modal from './Modal';
import BigModal from './BigModal';
import EditAnimation from '../EditAnimation';

const AnimationCards = ({ animations }: any) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [editData, setEditData] = useState()

    const deleteAnimaiton = async (id: number) => {

        axios.delete(`/api/animation?id=${id}`)
            .then(res => {
                console.log('res', res)
                window.location.reload()
            })
            .catch(err => console.log(err))

    }

    const editClick = (animation: any) => {
        setEditData(animation)
        setOpen(true)
    }

    return (
        <div className='grid grid-cols-4 gap-3 ml-5'>
            {animations?.map((animation: any) => (
                <div key={animation.id} className="border shadow-xl min-h-[300px] px-5 py-3 rounded-md">
                    <div className='rounded-md mb-5' style={{ background: animation.background ?? 'none' }}>
                    <Player
                        autoplay
                        loop
                        src={`/uploads/${animation?.path}`}
                        style={{ height: '200px', width: '200px' }}
                    >
                        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                    </Player>
                    </div>
                    <div className="bg-gray-50 rounded-md rounded-bl">
                        <div className='p-4'>
                            <div className="flex justify-between">
                                <h2
                                    tabIndex={0}
                                    className="focus:outline-none text-lg font-semibold"
                                >
                                    {animation?.title}
                                </h2>
                                {router.asPath !== '/' &&

                                    <button onClick={() => editClick(animation)} className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                                        Edit
                                    </button>

                                }
                            </div>
                            <div className="flex justify-between">
                                <p className='text-xs'>
                                    <a href={`/users/${animation?.user?.id}`}>{animation?.user?.name}</a>
                                </p>
                            </div>
                            <div className="flex justify-between mt-5">
                                <p className='text-sm'>{animation?.description}</p>
                            </div>
                            <div className="flex mt-4">
                                {animation?.TagOnAnimation?.map((tag: any) => (
                                    <div>
                                        <p
                                            tabIndex={0}
                                            className="text-sm font-sans font-semibold border border-blue rounded-full py-1 px-3 bg-blue-600 text-white"
                                        >
                                            {tag.tag.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {router.asPath !== '/' &&
                                <div className="mt-5 flex justify-between space-x-5">
                                    <DangerButton onClick={() => deleteAnimaiton(animation?.id)}>Delete</DangerButton>
                                </div>}
                        </div>
                    </div>
                </div>
            ))}

            <BigModal open={open} setOpen={setOpen}>
                <EditAnimation animation={editData} setOpen={() => setOpen(false)} />
            </BigModal>
        </div>
    )
}

export default AnimationCards