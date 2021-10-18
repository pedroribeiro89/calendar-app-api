import {eventsRepository} from "../repository/events-repository";

export class ListEventsUseCase {
    execute(year: string | null, month: string | null): string {
        const events = eventsRepository.listEvents(year, month);
        return JSON.stringify(events);
    }
}

export const listEventsUseCase = new ListEventsUseCase();
