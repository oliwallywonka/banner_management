import { Screen, Prisma } from "@prisma/client";
import { ScreenRepository } from "./repository";
import type { CreateScreenDTO } from "./dtos";
import { getUnixTime } from "../helpers/date";
import { generateCode } from "@src/helpers/code";

export interface ScreenService {
  getAll(): Promise<Screen[]>;
  getById(id: number): Promise<Screen | null>;
  save(screen: CreateScreenDTO): Promise<Screen>;
  update(screenId: number, screen: Prisma.ScreenUpdateInput): Promise<Screen>;
}

export class ScreenServiceImpl implements ScreenService {
  constructor(private readonly screenRepository: ScreenRepository) {}

  async getAll(): Promise<Screen[]> {
    return await this.screenRepository.getAll();
  }

  async getById(id: number): Promise<Screen | null> {
    return await this.screenRepository.getById(id);
  }

  async save(dto: CreateScreenDTO): Promise<Screen> {
    console.log(dto);
    const newScreen: Prisma.ScreenCreateInput = {
      group: {
        connect: {
          id: dto.groupId,
        },
      },
      code: generateCode(),
      name: dto.name,
      status: dto.status ?? "UNREGISTERED",
      screenId: dto.screenId,
      createdAt: getUnixTime(),
      updatedAt: getUnixTime(),
    };
    return await this.screenRepository.save(newScreen);
  }

  async update(
    screenId: number,
    screen: Prisma.ScreenUpdateInput
  ): Promise<Screen> {
    return await this.screenRepository.update(screenId, screen);
  }
}
