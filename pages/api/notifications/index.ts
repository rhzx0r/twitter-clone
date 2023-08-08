// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from '@/libs/prismadb';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {

//   if (req.method !== "DELETE") {
//     return res.status(405).end()
//   }

//   try {
//     const { userId } = req.body;

//     if(!userId || typeof userId !== "string") {
//       throw new Error("Invalid ID");
//     }

//     const user = await prisma.user.findUnique({
//       where: {
//         id: userId
//       }
//     });

//     if(!user) {
//       throw new Error("Invalid ID");
//     }

//     await prisma.notification.deleteMany({
//       where: {
//         userId
//       }
//     });


//     res.status(200).json({ message: "Notificaciones eliminadas exitosamente" });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).end()
//   }
// }