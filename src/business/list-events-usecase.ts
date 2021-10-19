import {eventsRepository} from "../repository/events-repository";

export class ListEventsUseCase {
    async execute(year: string | null, month: string | null): Promise<string> {
        const isValidYear = year?.length === 4 && !isNaN(+year);
        if (!isValidYear) { throw { name: 'VALIDATION ERROR', message: 'Invalid year' }; }

        const isValidMonth = (month?.length === 1 || month?.length === 2) && !isNaN(+month) && +month >= 0 && +month < 12;
        if (!isValidMonth) { throw { name: 'VALIDATION ERROR', message: 'Invalid month' }; }

        const events = await eventsRepository.listEvents(year, month);
        return JSON.stringify(events);
    }
}

export const listEventsUseCase = new ListEventsUseCase();
