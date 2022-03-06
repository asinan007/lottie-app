/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { GET_USERS } from '../graphql/query/GetUsers'
import Box from './common/Box'
import Button from './common/buttons/Button'
import Modal from './common/Modal'
import CreateUser from './CreateUser'

const Users = () => {
    const [getUsers, { data }] = useLazyQuery(GET_USERS)
    const router = useRouter()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getUsers()
    }, [])

    console.log('users', data)
    const users = data?.getUsers

    return (
        <div>

            <div className="flex justify-between items-end mb-7">
                <h2>All users</h2>
                <div className="w-[200px]">
                    <Button onClick={() => setOpen(true)}>Create User</Button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-5">
                {users?.map((user: any) => (
                    <Fragment key={user.id}>
                        <Box pointer onClick={() => router.push(`/users/${user?.id}`)}>
                            <div className="flex space-x-2">
                                <div className="w-20 h-20 rounded-full bg-red-400 text-center pt-3">
                                    <p className='text-white text-5xl font-big'>
                                        {user.name.charAt(0)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <div className="name text-gray-800 text-2xl font-medium mt-4">
                                    <p>{user?.name}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <div className="email text-gray-500">
                                    <p>{user?.email}</p>
                                </div>
                            </div>
                        </Box>
                    </Fragment>
                ))}
            </div>
            <Modal open={open} setOpen={setOpen}>
                <CreateUser setOpen={() => setOpen(false)} />
            </Modal>
        </div>

    )
}

export default Users