import { ContentScreen, Prisma, type PrismaClient } from "@prisma/client";

export interface ContentRepository {
  save(content: Prisma.ContentScreenCreateInput): Promise<ContentScreen>;
  deleteByScreenId(screenId: number): Promise<Prisma.BatchPayload>;
}

export class ContentRepositoryImpl implements ContentRepository {
  constructor(private readonly db: PrismaClient) {}

  async save(
    contentScreen: Prisma.ContentScreenCreateInput
  ): Promise<ContentScreen> {
    const newContent = await this.db.contentScreen.create({
      data: contentScreen,
      include: {
        content: true,
      },
    });
    return newContent;
  }

  async deleteByScreenId(screenId: number): Promise<Prisma.BatchPayload> {
    return await this.db.contentScreen.deleteMany({
      where: { screenId: screenId },
    });
  }
}
