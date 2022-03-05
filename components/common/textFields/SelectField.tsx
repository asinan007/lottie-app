import React, { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
    name: string,
    label?: string,
    children: ReactNode
}

const SelectField = ({ label, name, children, ...rest }: InputProps) => {

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                {...rest}
                name={name}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                {children}
            </select>
        </div>
    )
}

export default SelectField