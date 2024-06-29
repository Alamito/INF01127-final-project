import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(data) {
    return await prisma.user.create({ data });
}
