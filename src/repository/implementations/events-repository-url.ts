import {IEventsRepository} from "../events-repository";
import {CalendarEvent} from "../../models/Event";
import * as https from "https";

export class EventsRepositoryUrl implements IEventsRepository {
    private url: string;

    constructor(url: string) { this.url =url; }

    private async requestFileFromGithub(): Promise<{ name: string, matches: CalendarEvent[] } | string> {
        return new Promise((resolve) => {
            https.get(this.url, (response) => {
                let body = "";
                response.on("data", (chunk) => body += chunk);
                response.on("end", () => {
                    if (response.statusCode === 200) {
                        try {
                            let json = JSON.parse(body);
                            resolve(json);
                        } catch (error) {
                            resolve('Error parsing events json');
                        }
                    } else {
                        resolve('Error requesting events json');
                    }
                });
            }).on('error', (error) => resolve('Error requesting events json'));
        });
    }

    private convertJsonFileToCalendarEvent(jsonFile: { name: string, matches: CalendarEvent[] }): CalendarEvent[] {
        return jsonFile.matches?.map((event: CalendarEvent) => {
            return {
                round: event.round,
                date: new Date(event.date),
                team1: event.team1,
                team2: event.team2,
                score: event.score
            }
        }) ?? [];
    }

    async listEvents(year: string | null, month: string | null): Promise<CalendarEvent[]> {
        const jsonFile = await this.requestFileFromGithub();
        if (typeof jsonFile !== 'string') {
            const data = this.convertJsonFileToCalendarEvent(jsonFile);
            return data.filter((event: CalendarEvent) => {
                return (year === null || event.date.getFullYear() === +year) &&
                    (month === null || event.date.getMonth() === +month);
            });
        } else {
            throw {name: 'ERROR', message: jsonFile };
        }
    }
}
