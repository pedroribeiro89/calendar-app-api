import {IEventsRepository} from "../events-repository";
import {CalendarEvent} from "../../models/Event";

export class EventsRepositoryFile implements IEventsRepository {
    private data: CalendarEvent[];

    constructor() {
        this.data = require('./../../data/events.json');
        this.data = this.data.map((event: CalendarEvent) => {
            return {
                round: event.round,
                date: new Date(event.date),
                team1: event.team1,
                team2: event.team2,
                score: event.score
            }
        });
        // console.log(this.data.length);
    }

    // listEvents(year: string | null, month: string | null): CalendarEvent[] {
    //     return [];
    // }

    listEvents(year: string | null, month: string | null): CalendarEvent[] {
        return this.data.filter((event: CalendarEvent) => {
            return (year === null || event.date.getFullYear() === +year) &&
                   (month === null || event.date.getMonth() === +month);
        });
    }
}
