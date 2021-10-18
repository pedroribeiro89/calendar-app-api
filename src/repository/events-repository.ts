import {EventsRepositoryFile} from "./implementations/events-repository-file";
import {CalendarEvent} from "../models/Event";

export interface IEventsRepository {
    listEvents(year: string | null, month: string | null): CalendarEvent[];
}

export const eventsRepository: IEventsRepository = new EventsRepositoryFile();
