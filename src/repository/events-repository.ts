import {EventsRepositoryFile} from "./implementations/events-repository-file";
import {CalendarEvent} from "../models/Event";
import {EventsRepositoryUrl} from "./implementations/events-repository-url";

export interface IEventsRepository {
    listEvents(year: string | null, month: string | null): CalendarEvent[] | Promise<CalendarEvent[]>;
}

// export const eventsRepository: IEventsRepository = new EventsRepositoryFile();
export const eventsRepository: IEventsRepository = new EventsRepositoryUrl('https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json');
