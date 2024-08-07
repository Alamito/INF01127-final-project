import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createSpace(data) {
    return await prisma.space.create({ data });
}

export async function getSpaces() {
    return await prisma.space.findMany();
}

export async function reserveSpace(spaceId) {
    return await prisma.space.update({
        where: { id: Number(spaceId) },
        data: { 
            available: false
         }
    });
}

export async function deleteSpace(spaceId) {
    return await prisma.space.delete({
        where: { id: Number(spaceId) }
    });
}
