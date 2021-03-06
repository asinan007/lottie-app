import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from "next";
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

const upload = multer({
    storage: multer.diskStorage({
        destination: `./public/uploads`,
        filename: (req: any, file: { originalname: any; }, cb: (arg0: null, arg1: any) => any) => cb(null, `${uuidv4()}${file.originalname}`),
    }),
});

const uploadMiddleware = upload.array('file');

const apiRoute = nextConnect({
    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});
apiRoute.use(uploadMiddleware);

const prisma = new PrismaClient()
apiRoute.post(async (req: NextApiRequest & { files: any }, res: NextApiResponse) => {
    const { title, description, tags, userId, jsonUrl } = req.body
    const formatedTags = JSON.parse(tags)

    try {
        const prisRes = await prisma.animation.create({ data: { description, title, path: jsonUrl, userId: Number(userId) } })
        if (prisRes) {
            const arrTag = formatedTags.map((tg: Number) => { return { animationId: prisRes.id, tagId: tg } })
            const addTag = await prisma.tagOnAnimation.createMany({ data: arrTag })
        }

    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ data: 'Something went wrong' });

    }
    return res.status(201).json({ data: 'Animation created successfully' });

});

apiRoute.put(async (req: NextApiRequest & { files: any }, res: NextApiResponse) => {
    const { title, description, tags, animationId, background, jsonData, file, path } = req.body
    const formatedTags = JSON.parse(tags)
    const jsonFileData = jsonData
    const fileName = file

    try {
        const prisRes = req.files.length ? await prisma.animation.update({
            where: {
                id: Number(animationId)
            },
            data: { description, title, background, path: req.files[0].filename }
        }) :
            await prisma.animation.update({
                where: {
                    id: Number(animationId)
                }, data: { description, title, background, path }
            })
        if (prisRes) {
            const arrTag = formatedTags.map((tg: Number) => { return { animationId: prisRes.id, tagId: tg } })
            const delTag = await prisma.tagOnAnimation.deleteMany({
                where: {
                    animationId: Number(animationId)
                }
            })
            if (delTag) {
                const addTag = await prisma.tagOnAnimation.createMany({ data: arrTag })
            }

            fs.writeFile(fileName, jsonFileData, err => {
                if (err) console.log(err)
            })
        }

    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ data: 'Something went wrong' });

    }
    return res.status(201).json({ data: 'Animation updated successfully' });

});

apiRoute.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    try {
        const prisRes = await prisma.animation.delete({ where: { id: Number(id) } })
        if (prisRes) {
            fs.unlink(prisRes.path, err => {
                if (err) console.log(err)
            });

        }

    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ data: 'Something went wrong' });

    }
    return res.status(201).json({ data: 'Animation deleted successfully' });

})

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};