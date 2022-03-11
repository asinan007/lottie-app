/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import TextField from './common/textFields/TextField';
import { useLazyQuery } from '@apollo/client';
import Button from './common/buttons/Button';
import { GET_ANIMATION } from '../graphql/query/GetAnimation';
import { useRouter } from 'next/router';

const ShowAnimation = () => {
    const [getAnimation, { data, loading, refetch }] = useLazyQuery(GET_ANIMATION)
    const [animation, setAnimation] = React.useState({} as any)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const id = router?.query?.id

    useEffect(() => {
        if (id)
            getAnimation({ variables: { id: Number(id) } })
    }, [id])

    const [jsonData, setData] = useState([]);
    const getData = () => {
        fetch('/uploads/' + data?.getAnimation.path
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setData(myJson)
            });
    }
    useEffect(() => {
        getData()
    }, [data])

    React.useEffect(() => {
        if (data) setAnimation({ ...data?.getAnimation, path: JSON.parse(JSON.stringify(jsonData)) })
    }, [data])

    return (
        <>
            <div className="relative flex items-center justify-between px-2 py-4 bg-blue-100">
                <span className="uppercase font-semibold text-sm text-gray-600">
                    Edit your lottie animation
                </span>
                <button
                    type="button"
                    className="bg-green-500 text-sm hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Save Lottie
                </button>
            </div>
            <div className='mt-10'>
                <TextField
                    label="Title"
                    name="title"
                    required={true}
                    value={data?.getAnimation.title}
                />
                <TextField
                    label="Description"
                    name="description"
                    multiline={true}
                    value={data?.getAnimation.description}
                    rows={5}
                />
            </div>

            <div className="flex flex-wrap -mx-1 overflow-hidden mt-5">
                <div className="my-1 w-1/5 overflow-hidden bg-gray-100">
                    <div className="text-xs uppercase pb-2 mb-2 font-semibold text-gray-800 p-4">
                        Lottie Properties
                    </div>
                    <div className="flex items-center">
                        <div className="mr-3 ml-4">
                            <Player
                                autoplay
                                loop
                                background="white"
                                src={`/uploads/${data?.getAnimation.path}`}
                                style={{ height: '100px', width: '100px' }}
                            >
                            </Player>
                        </div>
                        <div className="text-xs">{data?.getAnimation.title}</div>
                    </div>

                    <div className="text-xs uppercase pb-2 mb-2 mt-6 font-semibold text-gray-500 p-4">
                        Layers
                    </div>
                    <div id="layers">
                        {JSON.parse(JSON.stringify(jsonData)).layers?.map((layer: any) => (
                            <div
                                className="flex items-center pl-4 py-2 hover:bg-blue-300 hover:cursor-pointer"
                                key={layer.ind}
                            >
                                <div className="mr-3">
                                    <Player
                                        autoplay
                                        loop
                                        background="gray-50"
                                        src={{ ...JSON.parse(JSON.stringify(jsonData)), layers: [layer] }}
                                        style={{ height: '50px', width: '50px' }}
                                    ></Player>
                                </div>
                                <div className="text-xs">{layer.nm}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-1 w-3/5 overflow-hidden  bg-white">
                    <div>
                        <Player
                            autoplay
                            loop
                            background="white"
                            src={`/uploads/${data?.getAnimation.path}`}
                            style={{ height: 'screen', width: 'inherit' }}
                        >
                            <Controls
                                visible={true}
                                buttons={['play', 'repeat', 'frame', 'debug']}
                            />
                        </Player>
                    </div>
                </div>

                <div className="my-1 px-1 w-1/5 overflow-hidden pl-4 pt-2 pr-4 bg-gray-100">
                    
                    <div className="flex mb-3 w-full">
                        <div className="flex items-center justify-center mr-3">
                            <div className="text-sm">Background</div>
                        </div>
                        <div>
                            <div className="mb-2">
                                <div className="flex items-center justify-end">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ShowAnimation