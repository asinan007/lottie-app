import React, { InputHTMLAttributes } from 'react'

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