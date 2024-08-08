import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createRestaurant(data) {
    return await prisma.restaurants.create({ data });
}

export async function getRestaurants() {
    return await prisma.restaurants.findMany();
}

export async function reserveRestaurant(restaurantId) {
    return await prisma.restaurants.update({
        where: { id: Number(restaurantId) , tables_reserved: {lte: total_tables}},
        data: { 
            tables_reserved: { increment: 1 }
         }
    });
}

export async function deleteRestaurant(restaurantId) {
    return await prisma.restaurants.delete({
        where: { id: Number(restaurantId) }
    });
}
