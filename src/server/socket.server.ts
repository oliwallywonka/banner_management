import { Server } from "socket.io";

export class SocketServer {
  public io: Server;
  private static instance: SocketServer;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new SocketServer();
    }
    return this.instance;
  }

  constructor() {
    this.io = new Server({
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    }).listen(3001);
    this.startEvents();
  }

  private startEvents() {
    console.log("Socket server started at port 3001");
    this.io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });

      socket.on("add-content-to-screen", (screenId) => {
        console.log(screenId);
        socket.emit("add-content-to-screen", screenId);
      });
    });
  }
}
