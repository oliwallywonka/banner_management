import { PrismaClient } from "@prisma/client";
import { SocketServer } from "./socket.server";

export const prisma = new PrismaClient();
export const socketServer = SocketServer.getInstance(); 
