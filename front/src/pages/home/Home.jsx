import React from 'react';
// import { addUserId, useGlobalContext } from '../../global-context';
import _ from 'lodash';
import { useGoogleApi } from 'react-gapi';

// import { PieChart } from 'components/pie-chart/PieChart';
export const Home = () => {
    const gapi = useGoogleApi({
        discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
        ],
        scopes: [
            'https://www.googleapis.com/auth/calendar.events',
            'https://www.googleapis.com/auth/calendar'
        ]
    });
    const addEventToCalendar = async (fromDate, expDate) => {
        console.log(fromDate, expDate);
        const request = {
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime'
        };
        // const resp = await gapi.client.calendar.events.list(request);
        const googleEvent = {
            summary: `gasestePiesa.online: hello Aveti de reinnoit JJJJ`,
            start: {
                // dateTime: moment(expDate).format(),
                dateTime: '2022-06-10T09:00:00',

                timeZone: 'Etc/GMT+03:00'
            },
            end: {
                // dateTime: moment(expDate + ONE_DAY).format(),
                dateTime: '2022-06-10T09:00:00',
                timeZone: 'Etc/GMT+03:00'
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },
                    { method: 'email', minutes: 24 * 60 * 7 },
                    { method: 'email', minutes: 10 },
                    { method: 'popup', minutes: 10 }
                ]
            }
        };
        const createEvent = await gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: googleEvent
        });
        if (!_.isNil(createEvent) && _.get(createEvent, 'status') === 200) {
            console.log(createEvent);

            return _.get(createEvent, 'result.htmlLink');
        }
        return '';
    };
    return (
        <div className="home-page">
            <div onClick={() => addEventToCalendar()}>test</div>
        </div>
    );
};
