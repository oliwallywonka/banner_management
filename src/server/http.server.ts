import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import { ScreenController } from "@src/screen/controllers";
import staticPlugin from "@elysiajs/static";
import cors from "@elysiajs/cors";

export class App {
  private app: Elysia;

  constructor() {
    this.app = new Elysia()
      .use(swagger({ path: "/docs" }))
      .use(cors({ origin: "*" }))
      .use(staticPlugin({ assets: "uploads", prefix: "/uploads" }))
      .group("/api/v1", (app) => app.use(ScreenController));
  }

  public start() {
    this.app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  }
}
