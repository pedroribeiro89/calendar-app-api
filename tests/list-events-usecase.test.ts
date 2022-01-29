import {assert, expect} from "chai";
import {CalendarEvent} from "../src/models/Event";
import * as sinon from "sinon";
import {SinonSandbox} from "sinon";
import {eventsRepository} from "../src/repository/events-repository";
import {listEventsUseCase, ListEventsUseCase} from "../src/business/list-events-usecase";

const mocks: CalendarEvent[] = require('./mocks/events.json');

describe('List Events Suite Test', function() {
    let listEventsUseCaseObj: ListEventsUseCase;
    let sandbox: SinonSandbox;

    before(() => {
        listEventsUseCaseObj = listEventsUseCase;
    })
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    })
    afterEach(() => {
        sandbox.restore();
    })

    it('Should throw an error if year is null',  async function () {
        sandbox.stub(eventsRepository, 'listEvents').callsFake((args) => {
            return mocks;
        });

        try {
            expect(await listEventsUseCase.execute(null, '8')).to.throw();
        } catch (e) {
            expect(e).to.be.deep.equal({ name: 'VALIDATION ERROR', message: 'Invalid year' })
        }
    });

    it('Should throw an error if year is invalid year number',  async function () {
        sandbox.stub(eventsRepository, 'listEvents').callsFake((args) => {
            return mocks;
        });

        try {
            expect(await listEventsUseCase.execute('20211', '8')).to.throw();
        } catch (e) {
            expect(e).to.be.deep.equal({ name: 'VALIDATION ERROR', message: 'Invalid year' })
        }
    });

    it('Should throw an error if year is not a number',  async function () {
        sandbox.stub(eventsRepository, 'listEvents').callsFake((args) => {
            return mocks;
        });

        try {
            expect(await listEventsUseCase.execute('test', '8')).to.throw();
        } catch (e) {
            expect(e).to.be.deep.equal({ name: 'VALIDATION ERROR', message: 'Invalid year' })
        }
    });

    it('Should throw an error if month is null',  async function () {
        sandbox.stub(eventsRepository, 'listEvents').callsFake((args) => {
            return mocks;
        });
        try {
            await listEventsUseCase.execute('2021', null);
            assert.fail('Should have throw month validation error');
        } catch (e) {
            expect(e).to.be.deep.equal({ name: 'VALIDATION ERROR', message: 'Invalid month' })
        }
    });

    it('Should throw an error if month is less than 0',  async function () {
        sandbox.stub(eventsRepository, 'listEvents').callsFake((args) => {
            return mocks;
        });
        try {
            await listEventsUseCase.execute('2021', '-1');
            assert.fail('Should have throw month validation error');
        } catch (e) {
            expect(e).to.be.deep.equal({ name: 'VALIDATION ERROR', message: 'Invalid month' })
        }
    });

    it('Should throw an error if month is greater than 11',  async function () {
        sandbox.stub(eventsRepository, 'listEvents').callsFake((args) => {
            return mocks;
        });
        try {
            await listEventsUseCase.execute('2021', '12');
            assert.fail('Should have throw month validation error');
        } catch (e) {
            expect(e).to.be.deep.equal({ name: 'VALIDATION ERROR', message: 'Invalid month' })
        }
    });

    it('Should throw an error if month is invalid number',  async function () {
        sandbox.stub(eventsRepository, 'listEvents').callsFake((args) => {
            return mocks;
        });
        try {
            await listEventsUseCase.execute('2021', '087');
            assert.fail('Should have throw month validation error');
        } catch (e) {
            expect(e).to.be.deep.equal({ name: 'VALIDATION ERROR', message: 'Invalid month' })
        }
    });

    it('Should throw an error if month is not a number',  async function () {
        sandbox.stub(eventsRepository, 'listEvents').callsFake((args) => {
            return mocks;
        });
        try {
            await listEventsUseCase.execute('2021', 'test');
            assert.fail('Should have throw month validation error');
        } catch (e) {
            expect(e).to.be.deep.equal({ name: 'VALIDATION ERROR', message: 'Invalid month' })
        }
    });
});
