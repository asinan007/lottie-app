import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const resolvers = {
    Query: {
        getUsers: async () => await prisma.user.findMany(),
        getUser: async (_: any, args: { name: string }) => await prisma.user.findFirst({
            where: { name: args.name }
        }),
        getTags: async () => await prisma.tag.findMany(),
        getAnimations: async () => await prisma.animation.findMany({
            include: {
                user: true,
                TagOnAnimation: {
                    include: {
                        tag: true
                    }
                }
            }
        }),
        getAnimationsByTag: async (_: any, args: { name: string }) => await prisma.animation.findMany({
            where: {
                TagOnAnimation: {
                    some: {
                        tag: {
                            name: args.name
                        }
                    }
                }
            },
            include: {
                user: true,
                TagOnAnimation: {
                    include: {
                        tag: true
                    }
                }
            }
        }),
        getAnimationsByUser: async (_: any, args: { id: string }) => await prisma.animation.findMany({
            where: {
                userId: Number(args.id)
            },
            include: {
                user: true,
                TagOnAnimation: {
                    include: {
                        tag: true
                    }
                }
            }
        })
    },
    Mutation: {
        createUser: async (_: any, args: { name: string, email: string }) => {
            try {
                const res = await prisma.user.create({ data: { ...args } })
                if (res) return res
                console.log(res)
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    // The .code property can be accessed in a type-safe manner
                    if (error.code === 'P2002') {
                        throw 'User already exist with this email'

                    }
                }
                throw error
            }
        },
    }
}