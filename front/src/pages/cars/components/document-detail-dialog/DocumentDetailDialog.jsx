import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
    DialogTitle,
    Dialog,
    DialogContent,
    Button,
    Grid,
    IconButton
} from '@mui/material';

import SummaryCard from 'components/summary-card/SummaryCard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EditIcon from '@mui/icons-material/Edit';

import _ from 'lodash';
import { LABELS } from 'constants/labels';
import styles from './DocumentDetailDialog.module.scss';

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
                <div className={styles.titleContainer}>
                    <span className={styles.dialogTitle}>
                        {LABELS.detailsAbout} {documentDetail.label}
                    </span>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="close"
                        onClick={() => {}}>
                        <EditIcon />
                    </IconButton>
                </div>
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
                <div className={styles.calendarButton}>
                    <Button
                        variant="outlined"
                        startIcon={<DateRangeIcon />}
                        onClick={() =>
                            window.open(
                                documentDetail.documentData.eventLink,
                                '_blank'
                            )
                        }>
                        {LABELS.seeCalendarEvent}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
