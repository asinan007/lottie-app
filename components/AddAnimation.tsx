/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import Button from './common/buttons/Button'
import { useDropzone } from 'react-dropzone';
import TextField from './common/textFields/TextField'
import { MultiSelect } from "react-multi-select-component";
import { GET_USERS } from '../graphql/query/GetUsers'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_TAGS } from '../graphql/query/GetTags'
import axios from 'axios'
import { useRouter } from 'next/router';
import { CREATETAG } from '../graphql/mutation/CreateTag';

interface Props {
    setOpen: () => void,
    refetch: any
}

const AddAnimation = ({ setOpen, refetch }: Props) => {
    const [getUsers, { data: queryData, loading: queryLoading }] = useLazyQuery(GET_USERS)
    const [getTags, { data: tagsData, loading: tagsLoading }] = useLazyQuery(GET_TAGS)
    const [createTag, { data }] = useMutation(CREATETAG)
    const [tags, setTags] = useState([]);
    const [tagOptions, setTagOptions] = useState([])
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ multiple: false, accept: '.json', maxFiles: 1 });
    const router = useRouter()
    const id = router?.query?.id

    const [state, setState] = useState({
        userId: '',
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


    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (!tags.length || !acceptedFiles.length) return alert("Tags or file are required")

        const formatedTags = tags.map((tg: any) => Number(tg.value))

        const formData = new FormData()

        formData.append("file", acceptedFiles[0])
        formData.append("title", state.title)
        formData.append("description", state.description)
        formData.append("userId", String(id))

        formData.append("tags", JSON.stringify(formatedTags))

        axios.post("/api/animation", formData)
            .then(res => {
                console.log('res', res.data)
                setTimeout(() => {
                    window.location.reload()
                }, 300)
                alert('Animation added successfully')
                setOpen()

            })
            .catch(err => console.log(err))

    }

    const onCreateTag = async (value: any) => {
        const res = await createTag({ variables: { name: value } })
        return {
            label: res?.data?.createTag?.name,
            value: res?.data?.createTag?.id
        }
    }

    return (
        <div>
            <h2 className='mb-10'>Add Lottie</h2>
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
                        isCreatable={true}
                        onCreateOption={onCreateTag}
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
                <div {...getRootProps({ className: `w-full h-[5rem] flex items-center justify-center mb-2 rounded-[7px] border-dashed border-2 cursor-pointer  border-[#D9D9D9] hover:border-blue-300` })}>
                    <input {...getInputProps()} />
                    <p className="subtitle-clr px-3">Drag 'n' drop file here, or click to select file</p>
                </div>

                <Button type="submit">Submit</Button>

            </form>
        </div>
    )
}

export default AddAnimation