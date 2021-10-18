
import * as http from "http"
import {IncomingMessage, RequestListener, ServerResponse} from "http";


const requestListener: RequestListener = (req: IncomingMessage, res: ServerResponse) => {
    console.log('foi')
    return 'teste';
}

export const app = http.createServer(requestListener)
    .listen(3000, () => console.log('app running at', 3000))
