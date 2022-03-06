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
    })

    const onChange = (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
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
                title: animation.title
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
                <TextField
                    label="Description"
                    name="description"
                    multiline={true}
                    value={state.description}
                    rows={5}
                    onChange={onChange}
                />

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
                                    src={`/uploads/${animation.path}`}
                                    style={{ height: '100px', width: '100px' }}
                                >
                                </Player>
                            </div>
                            <div className="text-xs">{animation.title}</div>
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
                                src={`/uploads/${animation.path}`}
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

                <Button type="submit">Update</Button>

            </form>
        </div>
    )
}

export default EditAnimation