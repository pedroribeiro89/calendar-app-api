import * as http from "http"
import {appController} from "./controller/controller";

export const app = http.createServer(appController.buildRequestListener())
    .listen(3000, () => console.log('app running at', 3000))
