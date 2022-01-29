import {ListEventsUseCase, listEventsUseCase} from "../src/business/list-events-usecase";
import * as sinon from "sinon";
import {EventsRepositoryFile} from "../src/repository/implementations/events-repository-file";
import {SinonSandbox} from "sinon";
import {CalendarEvent} from "../src/models/Event";
import {expect} from "chai";

const mocks: CalendarEvent[] = require('./mocks/events.json');
describe('', function (){
    let eventsRepository: EventsRepositoryFile;
    let sandbox: SinonSandbox;
    let mockData: CalendarEvent[] = [];

    before(() => {
        eventsRepository = new EventsRepositoryFile();
        mockData = mocks.map((event: CalendarEvent) => {
            return {
                round: event.round,
                date: new Date(event.date),
                team1: event.team1,
                team2: event.team2,
                score: event.score
            }
        });
        (eventsRepository as any).data = mockData;

    })
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    })
    afterEach(() => {
        sandbox.restore();
    })

    it('Should return a list of events filtered by the given year and month', async function() {
        //arrange
        const year = 2020;
        const month = 10;
        const expected = mockData.filter((calendarEvent: CalendarEvent) => {
            return calendarEvent.date.getFullYear() === year && calendarEvent.date.getMonth() === month
        });
        //act
        const result = eventsRepository.listEvents('' + year, '' + month);
        //assert
        expect(result).to.be.deep.equal(expected)

    });
})
