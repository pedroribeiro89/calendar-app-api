export interface CalendarEvent {
    round: string;
    date: Date;
    team1: string;
    team2: string;
    score: EventScore;
}

export interface EventScore {
    ft: number[]
}
