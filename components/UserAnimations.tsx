/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client';
import Button from './common/buttons/Button';
import Modal from './common/Modal';
import AddAnimation from './AddAnimation';
import AnimationCards from './common/AnimationCards';
import { GET_ANIMATIONS_BY_USER } from '../graphql/query/GetAnimaitonsByUser';
import { useRouter } from 'next/router';
import { GET_ANIMATIONS_BY_TAG_USER } from '../graphql/query/GetAnimationsByTagUser';
import SearchField from './common/textFields/SearchField';

const UserAnimations = () => {
    const [getAnimations, { data, loading, refetch }] = useLazyQuery(GET_ANIMATIONS_BY_USER)
    const [getAnimationsByTagUser, { data: searchData, loading: searchLoading }] = useLazyQuery(GET_ANIMATIONS_BY_TAG_USER)
    const [animations, setAnimations] = useState([])
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const id = router?.query?.id

    useEffect(() => {
        if (id)
            getAnimations({ variables: { id: Number(id) } })
    }, [id])

    useEffect(() => {
        if (searchData?.getAnimationsByTagUser?.length || search) {
            setAnimations(searchData?.getAnimationsByTagUser || [])
        } else if (data?.getAnimationsByUser?.length) {
            setAnimations(data?.getAnimationsByUser || [])
        }
    }, [data, searchData])

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (search) {
                getAnimationsByTagUser({ variables: { name: search, userId: id } })
            } else {
                if (data?.getAnimationsByUser?.length) setAnimations(data?.getAnimationsByUser)
            }
        }, 500)

        return (() => {
            clearTimeout(debounce)
        })

    }, [search])



    return (
        <div className='mb-20'>
            <div className="flex justify-between items-end mb-7">
                <h1>User Lotties</h1>
                <div className="flex justify-between items-end mb-7">
                    <SearchField label='Search by tag' name="search" onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="w-[200px] text-right mt-5">
                    <Button onClick={() => setOpen(true)}>Upload a new lottie</Button>
                </div>
            </div>
            {animations.length > 0 ?
                <AnimationCards animations={animations} /> :
                search ? <h2>No search animations available</h2> :
                    <h2>No animations available for this user</h2>
            }
            <Modal open={open} setOpen={setOpen}>
                <AddAnimation setOpen={() => setOpen(false)} refetch={refetch} />
            </Modal>
        </div>
    )
}

export default UserAnimations