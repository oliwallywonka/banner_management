import { PrismaClient } from "@prisma/client";
import { SocketServer } from "./socket.server";
import { ScreenRepositoryImpl } from "@src/screen/repository";
import { ScreenServiceImpl } from "@src/screen/service";
import { GroupRepositoryImpl } from "@src/groups/repository";
import { GroupServiceImpl } from "@src/groups/service";

const prisma = new PrismaClient();

/**************** SCREEN DEPENDENCIES ****************/
const screenRepository = new ScreenRepositoryImpl(prisma);
export const screenService = new ScreenServiceImpl(screenRepository);

/****************GROUP DEPENDENCIES ****************/
const groupRepository = new GroupRepositoryImpl(prisma);
export const groupService = new GroupServiceImpl(groupRepository);

export const socketServer = SocketServer.getInstance();
