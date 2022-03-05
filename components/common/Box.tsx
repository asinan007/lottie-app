import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode,
    onClick: () => void,
    pointer?: boolean
}

const Box = ({ children, onClick, pointer = false }: Props) => {
    return (
        <div className={`card bg-white border flex flex-col items-center justify-center p-4 shadow-lg rounded-2xl w-64 ${pointer ? 'cursor-pointer' : ''}`} onClick={onClick}>
            {children}
        </div>
    )
}

export default Box