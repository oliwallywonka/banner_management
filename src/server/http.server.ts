import { Elysia, file } from "elysia";
import swagger from "@elysiajs/swagger";
import { ScreenController } from "@src/screen/controllers";
import staticPlugin from "@elysiajs/static";
import cors from "@elysiajs/cors";
import VueApp from "../../ui/dist/index.html";
import { serve } from "bun";
export class App {
  private app: Elysia;

  constructor() {
    this.app = new Elysia()
      .use(swagger({ path: "/docs" }))
      .use(cors({ origin: "*" }))
      .use(staticPlugin({ assets: "uploads", prefix: "/uploads" }))
      .group("/api/v1", (app) => app.use(ScreenController));
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
      }
    });
    console.log(`VUE server started on port ${server.port}`);
  }
}
