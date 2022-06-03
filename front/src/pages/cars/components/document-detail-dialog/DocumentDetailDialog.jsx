import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
    DialogTitle,
    Dialog,
    DialogContent,
    IconButton,
    Grid
} from '@mui/material';

import SummaryCard from 'components/summary-card/SummaryCard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import _ from 'lodash';
import { LABELS } from 'constants/labels';

const DETAILS = [
    {
        value: '20/10/2020',
        label: 'Data expirare'
    },
    {
        value: '20/10/2020',
        label: 'Data expirare'
    }
];
export const DocumentDetailDialog = ({ documentDetail, open, setOpen }) => {
    console.log('DIALOG', documentDetail);
    const [details, setDetails] = useState([]);
    useEffect(() => {
        const fromDate =
            documentDetail.documentData.fromDate === ''
                ? moment(documentDetail.documentData.fromDate).format(
                      'DD-MM-YYYY'
                  )
                : '-';
        const details = [
            {
                value: fromDate,
                color: SummaryCard.COLORS_CLASSNAME.RED,
                label: LABELS.beginDate
            },
            {
                value: moment(
                    documentDetail.documentData.expirationDate
                ).format('DD-MM-YYYY'),
                label: LABELS.expirationDate
            }
        ];
        setDetails(details);
    }, [documentDetail]);
    return (
        <Dialog open={open} onClose={() => setOpen((prev) => !prev)}>
            <DialogTitle>
                Detalii legate despre {documentDetail.label}
            </DialogTitle>
            <DialogContent>
                <Grid
                    container
                    rowSpacing={2}
                    spacing={{ xs: 1, sm: 3, md: 6 }}
                    columns={{ xs: 1, sm: 6, md: 6 }}>
                    {details.map((item) => (
                        <Grid item xs={1} sm={3} md={3} key={_.uniqueId()}>
                            <SummaryCard data={item} />
                        </Grid>
                    ))}
                </Grid>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="close"
                    onClick={() =>
                        window.open(
                            documentDetail.documentData.eventLink,
                            '_blank'
                        )
                    }>
                    <DateRangeIcon />
                    Vezi evenimentul in google calendar
                </IconButton>
            </DialogContent>
        </Dialog>
    );
};
