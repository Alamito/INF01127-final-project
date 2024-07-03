import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(data) {
    return await prisma.user.create({ data });
}

export async function verifyCredentials(data) {
    return await prisma.user.findUnique({
        where: {
            email: data.email,
            password: data.password,
        },
    });
}

export async function isEmployee(email) {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    return user.type === 'employee';
}
