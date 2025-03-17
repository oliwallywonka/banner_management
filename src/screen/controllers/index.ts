import Elysia, { t } from "elysia";
import {
  CreateScreenContentDTO,
  CreateScreenDTO,
  ResponseContentScreenDTO,
  ResponseScreenDTO,
  ResponseScreensDTO,
  transformIdDTO,
  transformScreenContentDTO,
} from "../dto";
import { screenService, socketServer } from "@src/server/dependencies";

export const ScreenController = new Elysia().group("/screens", (app) =>
  app

    /********* GET ALL SCREENS *********/
    .get(
      "/",
      async ({ set }) => {
        try {
          const screens = await screenService.getAll();
          return {
            status: 200,
            data: screens,
          };
        } catch (error) {
          const err = error as Error;
          set.status = 500;
          return {
            status: 500,
            message: err.message,
          };
        }
      },
      {
        response: {
          200: t.Object({
            status: t.Literal(200),
            data: ResponseScreensDTO,
          }),
          500: t.Object({
            status: t.Literal(500),
            message: t.String(),
          }),
        },
        detail: {
          tags: ["Screen"],
          description: "Get all screens",
          summary: "Get all screens",
        },
      }
    )

    /********* GET SCREEN BY ID *********/
    .get(
      "/:id",
      async ({ params, set }) => {
        try {
          const screen = await screenService.getById(params.id);
          if (!screen) {
            set.status = 404;
            return { status: 404, data: null };
          }
          return {
            status: 200,
            data: screen,
          };
        } catch (error) {
          const err = error as Error;
          set.status = 500;
          return {
            status: 500,
            message: err.message,
          };
        }
      },
      {
        params: t.Object({
          id: t.Number(),
        }),
        transform: transformIdDTO,
        response: {
          200: t.Object({
            status: t.Literal(200),
            data: ResponseScreenDTO,
          }),
          404: t.Object({
            status: t.Literal(404),
            data: t.Null(),
          }),
          500: t.Object({
            status: t.Literal(500),
            message: t.String(),
          }),
        },
        detail: {
          tags: ["Screen"],
          summary: "Get screen by id",
          description:
            "Get an screen object with related contentScreens and content",
        },
      }
    )

    /********* CREATE SCREEN *********/
    .post(
      "/",
      async ({ body, set }) => {
        try {
          const screen = await screenService.save(body);
          return {
            status: 200,
            data: screen,
          };
        } catch (error) {
          const err = error as Error;
          set.status = 500;
          return {
            status: 500,
            message: err.message,
          };
        }
      },
      {
        body: CreateScreenDTO,
        response: {
          200: t.Object({
            status: t.Literal(200),
            data: ResponseScreenDTO,
          }),
          500: t.Object({
            status: t.Literal(500),
            message: t.String(),
          }),
        },
        detail: {
          tags: ["Screen"],
          summary: "Create a screen",
          description: "Create a screen object",
        },
      }
    )

    /********* ADD CONTENT TO SCREEN *********/
    .post(
      "/:id/content",
      async ({ params, body }) => {
        try {
          const contentScreen = await screenService.addContent(params.id, body);
          // TODO: EMIT EVENT FROM SOCKET SERVER
          socketServer.io.emit("screen:contents:add", contentScreen);
          return {
            status: 200,
            data: contentScreen,
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: 500,
            message: err.message,
          };
        }
      },
      {
        body: CreateScreenContentDTO,
        params: t.Object({
          id: t.Number(),
        }),
        transform: transformScreenContentDTO,
        response: {
          200: t.Object({
            status: t.Literal(200),
            data: ResponseContentScreenDTO,
          }),
          500: t.Object({
            status: t.Literal(500),
            message: t.String(),
          }),
        },
        detail: {
          tags: ["Screen"],
          summary: "Add content to a screen",
          description:
            "Add content to a screen it creates a contentScreen and content model",
        },
      }
    )
);
