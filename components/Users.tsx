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
        <div className='mt-10 mb-10'>

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
                                <div className="text-lg font-medium">Name: </div>
                                <div className="text-lg">{user?.name}</div>
                            </div>
                            <div className="flex space-x-2">
                                <div className="text-lg font-medium">Email: </div>
                                <div className="text-lg">{user?.email}</div>
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