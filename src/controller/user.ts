import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers() {
    try {
        const users = await prisma.user.findMany();
        console.log(users);
    } catch (error) {
        console.error('Error searching users:', error);
    } finally {
        await prisma.$disconnect();
    }
}
