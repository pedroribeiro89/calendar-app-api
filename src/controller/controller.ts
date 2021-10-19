import {IncomingMessage, RequestListener, ServerResponse} from "http";
import {eventsController} from "./events-controller";
import url from "url";

export class CalendarAppController {

    buildRequestListener(): RequestListener {
        return (request: IncomingMessage, response: ServerResponse) => {
            const parsedUrl = url.parse(request.url ?? '' ,true);
            switch (parsedUrl.pathname) {
                case '/events': {
                    eventsController.handle(request, response, parsedUrl);
                    break;
                }
                default: {
                    response.statusCode = 404;
                    response.end();
                }
            }
        }
    }
}

export const appController = new CalendarAppController();
export const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Request-Method': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': '*',
}
