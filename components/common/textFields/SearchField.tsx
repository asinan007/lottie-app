import React, { InputHTMLAttributes, useEffect, useState } from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import TextField from './TextField'
import { useLazyQuery } from '@apollo/client'
import { GET_ANIMATIONS_BY_TAG } from '../../../graphql/query/GetAnimationsByTag'
import Button from '../buttons/Button'
import { GET_ANIMATIONS } from '../../../graphql/query/GetAnimatons'
import { useRouter } from 'next/router'
import Link from 'next/link'
import en from 'javascript-time-ago/locale/en.json'
import TimeAgo from 'javascript-time-ago';

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    name: string,
    label?: string,
    type?: string,
    multiline?: boolean,
    rows?: number
}
const style = "border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
const SearchField = ({ name, label, type, multiline, rows, ...rest }: InputProps) => {

    return (
        <div className="relative mx-auto text-gray-600 lg:block hidden mt-5 left">
            <input
                type={type || "text"}
                {...rest}
                name={name}
                className={style}
            />
        </div>
    )
}

export default SearchField