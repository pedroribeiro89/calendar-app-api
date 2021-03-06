import {IncomingMessage, ServerResponse} from "http";
import {listEventsUseCase} from "../business/list-events-usecase";
import {UrlWithParsedQuery} from "url";
import {CORS_HEADERS} from "./controller";


export class EventsController {
    private async getEvents(request: IncomingMessage, response: ServerResponse, parsedUrl: UrlWithParsedQuery) {
        const queryParams = parsedUrl.query
        const year = typeof queryParams.year === 'string' ? queryParams.year : null;
        const month = typeof queryParams.month === 'string' ? queryParams.month : null;

        try {
            const events = await listEventsUseCase.execute(year, month);
            response.writeHead(200, {'Content-Type': 'application/json', ...CORS_HEADERS})
            response.write(events)
            response.end();
        } catch (e: any) {
            response.writeHead(500, {'Content-Type': 'application/json', ...CORS_HEADERS})
            response.write(JSON.stringify(e));
            response.end();
        }
    }

    handle(request: IncomingMessage, response: ServerResponse, parsedUrl: UrlWithParsedQuery) {
        switch (request.method) {
            case 'GET': {
                this.getEvents(request, response, parsedUrl);
                break;
            }
            default: {
                response.statusCode = 404;
                response.end();
            }
        }
    }
}

export const eventsController = new EventsController();
