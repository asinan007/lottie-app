
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const data = await prisma.animation.findMany({
        where: {
            userId: 1
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
    res.status(200).json({ name: 'John Doe', data })
}