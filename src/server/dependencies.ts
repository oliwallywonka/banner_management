import { PrismaClient } from "@prisma/client";
import { SocketServer } from "./socket.server";
import { ScreenRepositoryImpl } from "@src/screen/repositories/screen.repository";
import { ContentRepositoryImpl } from "@src/screen/repositories/content.repository";
import { ScreenServiceImpl } from "@src/screen/services";

const prisma = new PrismaClient();


/**************** SCREEN DEPENDENCIES ****************/
const screenRepository = new ScreenRepositoryImpl(prisma);
const contentRepository = new ContentRepositoryImpl(prisma);
export const screenService = new ScreenServiceImpl(
  screenRepository,
  contentRepository
);

export const socketServer = SocketServer.getInstance();
