import {IncomingMessage, ServerResponse} from "http";
import {listEventsUseCase} from "../business/list-events-usecase";
import * as url from "url";
import {UrlWithParsedQuery} from "url";

export class EventsController {
    private getEvents(request: IncomingMessage, response: ServerResponse, parsedUrl: UrlWithParsedQuery) {
        const queryParams = parsedUrl.query
        const year = typeof queryParams.year === 'string' ? queryParams.year : null;
        const month = typeof queryParams.month === 'string' ? queryParams.month : null;

        const events = listEventsUseCase.execute(year, month);

        response.writeHead(200, {'Content-Type': 'application/json'})
        response.write(events)
        response.end();
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
