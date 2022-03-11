/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import TextField from './common/textFields/TextField';
import { useLazyQuery } from '@apollo/client';
import { GET_ANIMATIONS_BY_TAG } from '../graphql/query/GetAnimationsByTag';
import Button from './common/buttons/Button';
import { GET_ANIMATIONS } from '../graphql/query/GetAnimatons';
import { useRouter } from 'next/router';
import AnimationCards from './common/AnimationCards';
import SearchField from './common/textFields/SearchField';

const ShowAnimations = () => {
    const [getAnimations, { data, loading }] = useLazyQuery(GET_ANIMATIONS)
    const [getAnimationsByTag, { data: searchData, loading: searchLoading }] = useLazyQuery(GET_ANIMATIONS_BY_TAG)
    const [animations, setAnimations] = useState<any>([])
    const [search, setSearch] = useState('')
    const router = useRouter()

    useEffect(() => {
        getAnimations()
    }, [])

    useEffect(() => {
        if (searchData?.getAnimationsByTag?.length || search) {
            setAnimations(searchData?.getAnimationsByTag || [])
        } else if (data?.getAnimations?.length) {
            setAnimations(data?.getAnimations || [])
        }
    }, [data, searchData])

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (search) {
                getAnimationsByTag({ variables: { name: search } })
            } else {
                if (data?.getAnimations?.length) setAnimations(data?.getAnimations)
            }
        }, 500)

        return (() => {
            clearTimeout(debounce)
        })

    }, [search])

    return (
        <div>
            <div className="flex justify-between items-end mb-7">
                <SearchField label='Search by tag' name="search" onChange={(e) => setSearch(e.target.value)} />
            </div>
            {animations.length > 0 ?
                <AnimationCards animations={animations} /> :
                search ? <h2>No search animations available</h2> :
                    <h2>No animations available</h2>
            }
        </div>
    )
}

export default ShowAnimations