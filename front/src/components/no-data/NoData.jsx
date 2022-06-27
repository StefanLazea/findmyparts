import React from 'react';

import NoDataIcon from 'assets/icons/NoDataIcon';
import { LABELS } from 'constants/labels';
import styles from './NoData.module.scss';

export const NoData = ({ title = LABELS.noDataAvailable, subtitle = '' }) => {
    return (
        <div className={styles.noDataContainer}>
            <div className={styles.noDataImage}>
                <NoDataIcon />
                <span className={`${styles.center} ${styles.noDataTitle}`}>
                    {title}
                </span>
                <span className={`${styles.center} ${styles.noDataSubtitle}`}>
                    {subtitle}
                </span>
            </div>
        </div>
    );
};
