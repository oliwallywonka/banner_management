import { serve } from "bun";

import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import { ScreenController } from "@src/screen/controller";
import staticPlugin from "@elysiajs/static";
import cors from "@elysiajs/cors";
import cron, { Patterns } from "@elysiajs/cron";
import Cron from "croner";

import VueApp from "../../ui/dist/index.html";
import { socketServer } from "./dependencies";
import { GroupController } from "@src/groups/controller";

export class App {
  private app: Elysia<"", any>;

  constructor() {
    this.app = new Elysia()
      .use(swagger({ path: "/docs" }))
      .use(
        cron({
          name: "get-dashboard-data",
          pattern: Patterns.EVERY_10_SECONDS,
          run() {
            console.log("Cron job triggered");
          },
        })
      )
      .use(cors({ origin: "*" }))
      .use(staticPlugin({ assets: "uploads", prefix: "/uploads" }))
      .group(
        "/api/v1",
        (app) => (app.use(ScreenController), app.use(GroupController))
      );
  }

  public async start() {
    this.app.listen(3000, () => {
      console.log("API Server started on port 3000");
    });
    try {
      this.startVueApp();
    } catch (error) {
      console.log(error);
    }
  }

  private startVueApp() {
    const server = serve({
      port: 3002,
      routes: {
        "/*": VueApp,
      },
      development: true,
      error(error) {
        console.error(error);
        return new Response(`Internal Error: ${error}\n${error.stack}`, {
          status: 500,
        });
      },
    });
    console.log(`VUE server started on port ${server.port}`);
  }

  private cronFunction(store: Cron) {
    socketServer.io.emit("cron-job-triggered");
  }
}
