import { ScreenService } from "@src/screen/services";
import { Server } from "socket.io";
import { screenService } from "./dependencies";

export class SocketServer {
  public io: Server;
  private static instance: SocketServer;
  private secreenService: ScreenService;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new SocketServer();
    }
    return this.instance;
  }

  constructor() {
    this.secreenService = screenService;
    this.io = new Server({
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    }).listen(3001);
    this.startEvents();
  }

  private async startEvents() {
    //TODO: use rooms to join each screen socket with an admin socket to prevent mixing of data
    console.log("SOCKET server started at port 3001");
    this.io.on("connection", (socket) => {
      console.log("connected", socket.handshake.auth);
      console.log(this.io.engine.clientsCount);

      socket.on("disconnect", async () => {
        // TODO: verify if there are another client screen connected based on socket.handshake.auth
        console.log("disconnect", socket.handshake.auth);
        if (socket.handshake.auth.screenId === -1) return;
        const screen = await screenService.update(
          socket.handshake.auth.screenId,
          {
            status: "disconnected",
          }
        );
        this.io.emit("screen:update:status", screen);
      });

      socket.on("screen:list", async () => {
        try {
          const services = await screenService.getAll();
          this.io.emit("screen:list", services);
        } catch (error) {}
      });

      socket.on("screen:create", () => {});

      socket.on(
        "screen:update:status",
        async (payload: { id: number; status: string }) => {
          try {
            const screen = await screenService.update(payload.id, {
              status: payload.status,
            });
            this.io.emit("screen:update:status", screen);
          } catch (error) {
            console.log(error);
          }
        }
      );

      socket.on("screen:unique", async (screenId: number) => {
        try {
          const contents = await screenService.getById(screenId);
          this.io.emit("screen:unique", contents);
        } catch (error) {}
      });

      socket.on("screen:content:play", (screenId: number) => {
        console.log("play", screenId);
        this.io.emit("screen:content:play", screenId);
      });

      socket.on("screen:content:pause", (screenId) => {
        console.log("pause", screenId);
        this.io.emit("screen:content:pause", screenId);
      });

      socket.on("screen:content:stop", (screenId) => {
        console.log("stop", screenId);
        this.io.emit("screen:content:stop", screenId);
      });
    });
  }
}
