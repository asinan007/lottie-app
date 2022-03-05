/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery, useMutation } from '@apollo/client'
import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { CREATEUSER } from '../graphql/mutation/CreateUser'
import { GET_USERS } from '../graphql/query/GetUsers'
import Button from './common/buttons/Button'
import TextField from './common/textFields/TextField'
import { toast, ToastContainer } from 'react-toastify'

interface Props {
    setOpen: () => void
}

const CreateUser = ({ setOpen }: Props) => {
    const [createUser, { data, loading }] = useMutation(CREATEUSER, { refetchQueries: [GET_USERS], onError: () => null })
    const [state, setState] = useState({ name: '', email: '' })
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const res = await createUser({ variables: { ...state } })
        if (!res.errors) {
            setState({ name: '', email: '' })
            setOpen()
            alert('User created successfully')
        }
    }
    return (
        <div>
            <h2 className='mb-7'>Create User</h2>
            <form className='space-y-5' onSubmit={onSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={state.name}
                    required={true}
                    onChange={onChange}
                />
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={state.email}
                    required={true}
                    onChange={onChange}
                />

                <Button type="submit" disabled={loading}>Create</Button>
            </form>
        </div>
    )
}

export default CreateUser