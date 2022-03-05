import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    name: string,
    label?: string,
    type?: string,
    multiline?: boolean,
    rows?: number
}
const style = "mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-[1px] py-2 px-3 border-gray-300 rounded-md"
const TextField = ({ name, label, type, multiline, rows, ...rest }: InputProps) => {
    return (
        <div>

            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            {multiline ? <textarea className={style} rows={rows} name={name}  {...rest} /> :
                <input
                    type={type || "text"}
                    {...rest}
                    name={name}
                    className={style}
                />}
        </div>
    )
}

export default TextField