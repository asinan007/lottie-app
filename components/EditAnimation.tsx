/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import Button from './common/buttons/Button'
import { useDropzone } from 'react-dropzone';
import TextField from './common/textFields/TextField'
import { MultiSelect } from "react-multi-select-component";
import { GET_USERS } from '../graphql/query/GetUsers'
import { useLazyQuery } from '@apollo/client'
import { GET_TAGS } from '../graphql/query/GetTags'
import axios from 'axios'
import { useRouter } from 'next/router';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import ColorPicker from './common/ColorPicker'

interface Props {
    setOpen: () => void,
    animation: any
}

const EditAnimation = ({ animation, setOpen }: Props) => {
    const [getUsers, { data: queryData, loading: queryLoading }] = useLazyQuery(GET_USERS)
    const [getTags, { data: tagsData, loading: tagsLoading }] = useLazyQuery(GET_TAGS)
    const [tags, setTags] = useState([]);
    const [tagOptions, setTagOptions] = useState([])
    const [file, setFile] = useState()
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ multiple: false, accept: '.json', maxFiles: 1 });
    const router = useRouter()
    const id = router?.query?.id

    const [state, setState] = useState({
        title: '',
        description: '',
        background: '',
    })

    const onChange = (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    const handleBGColorInput = (el:any) => {
        setState({ ...state, background: el.target.value })
        console.log(el.target.value, state);
    }

    useEffect(() => {

        getTags()
        getUsers()
    }, [])

    useEffect(() => {
        if (tagsData?.getTags?.length) {
            setTagOptions(tagsData?.getTags?.map((tag: any) => { return { label: tag.name, value: tag.id } }))
        }
    }, [tagsData?.getTags])

    useEffect(() => {
        if (animation) {
            const tgOptions = animation.TagOnAnimation.map((tg: any) => { return { label: tg.tag.name, value: tg.tag.id } })
            setTags(tgOptions)
            setState({
                description: animation.description,
                title: animation.title,
                background: animation.background
            })
            setFile(animation.path);

        }
    }, [animation])

    const [jsonData, setData] = useState([]);
    const getData = () => {
        fetch('/uploads/' + animation.path
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log('json Response1', response)
                return response.json();
            })
            .then(function (myJson) {
                console.log('myjson Response1', myJson);
                setData(myJson)
            });
    }
    useEffect(() => {
        getData()
    }, [animation])


    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (!tags.length || (!acceptedFiles.length && !file)) return alert("Tags or file are required")

        const formatedTags = tags.map((tg: any) => Number(tg.value))

        const formData = new FormData()
        if (acceptedFiles.length)
            formData.append("file", acceptedFiles[0])
        formData.append("title", state.title)
        formData.append("description", state.description)
        formData.append("background", state.background)
        formData.append("animationId", animation.id)
        formData.append("tags", JSON.stringify(formatedTags))

        axios.put("/api/animation", formData)
            .then(res => {
                console.log('res', res.data)
                setTimeout(() => {
                    window.location.reload()
                }, 300)
                alert('Animation updated successfully')
                setOpen()

            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h2 className='mb-10'>Edit Lottie</h2>
            <form className='space-y-5' onSubmit={onSubmit}>
                <div>
                    <label htmlFor={"tags"} className="block text-sm font-medium text-gray-700 mb-1">
                        Tags
                    </label>
                    <MultiSelect
                        options={tagOptions}
                        value={tags}
                        onChange={setTags}
                        labelledBy={"Tags"}
                    />
                </div>
                <TextField
                    label="Title"
                    name="title"
                    required={true}
                    value={state.title}
                    onChange={onChange}
                />

                <label className="block text-sm font-medium text-gray-700">
                    Background
                </label>
                <ColorPicker 
                    value={state.background}
                    name='background'
                    onChange={handleBGColorInput}
                />
                <TextField
                    label="Description"
                    name="description"
                    multiline={false}
                    value={state.description}
                    rows={5}
                    onChange={onChange}
                />

                <div className="flex flex-wrap -mx-1 overflow-hidden mt-5">
                    <div className="my-1 w-2/5 overflow-hidden bg-gray-100">

                        <div className="text-xs uppercase pb-2 mb-2 mt-6 font-semibold text-gray-500 p-4">
                            Background
                        </div>
                        <div>
                            <div className="mb-2">
                                <div className="flex items-center justify-end">
                                </div>
                            </div>
                        </div>

                        <div className="text-xs uppercase pb-2 mb-2 mt-6 font-semibold text-gray-500 p-4">
                            Dimensions
                        </div>
                        <div className="flex mb-3">
                            <div>
                                <div className="mb-2">
                                    <div className="flex items-center justify-end">
                                        <div className="text-xs">W</div>
                                        <input
                                            className="w-2/4 ml-3 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="inline-password"
                                            type="text"
                                            placeholder=""
                                            value={JSON.parse(JSON.stringify(jsonData)).w}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-end">
                                        <div className="text-xs">H</div>
                                        <input
                                            className="w-2/4 ml-3 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="inline-password"
                                            type="text"
                                            placeholder=""
                                            value={JSON.parse(JSON.stringify(jsonData)).h}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-xs uppercase pb-2 mb-2 mt-6 font-semibold text-gray-500 p-4">
                            Layers
                        </div>
                        <div id="layers">
                            {JSON.parse(JSON.stringify(jsonData)).layers?.map((layer: any) => (
                                <div key={layer.ind}>
                                    <div className="flex items-center pl-4 py-2">
                                        <div className="mr-3">
                                            <Player
                                                autoplay
                                                loop
                                                background="white"
                                                src={{ ...JSON.parse(JSON.stringify(jsonData)), layers: [layer] }}
                                                style={{ height: '150px', width: '150px' }}
                                            ></Player>
                                        </div>
                                        <div className="text-xs">{layer.nm}</div>
                                    </div>
                                    <div className='pl-20'>
                                        {layer.shapes?.map((shape: any) => (
                                            <div className=' hover:bg-blue-300 hover:cursor-pointer'>
                                                {shape?.nm}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="px-1 w-3/5 overflow-hidden">
                        <div className="w-full" style={{ background: state.background ?? 'none' }}>
                            <Player
                                autoplay
                                loop
                                src={`/uploads/${animation.path}`}
                                style={{ height: 'screen', width: 'inherit' }}
                            >
                            </Player>
                        </div>
                    </div>

                </div>

                <Button type="submit">Update</Button>

            </form>
        </div>
    )
}

export default EditAnimation