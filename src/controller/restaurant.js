import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getRestaurants() {
    return await prisma.restaurants.findMany();
}

export async function reserveRestaurant(restaurantId) {
    return await prisma.restaurants.update({
        where: { id: Number(restaurantId) },
        data: { 
            tables_reserved: { increment: 1 }
         }
    })
}
