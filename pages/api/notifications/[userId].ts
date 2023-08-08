import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== "GET" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    if (req.method === "GET") {
      const notification = await prisma.notification.findMany({
        where: {
          userId
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          hasNotifications: false
        }
      });
  
      return res.status(200).json(notification);
    } else {

      await prisma.notification.deleteMany({
        where: {
          userId
        }
      });

      res.status(200).json({ message: "Notificaciones eliminadas exitosamente" });
    }

  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}