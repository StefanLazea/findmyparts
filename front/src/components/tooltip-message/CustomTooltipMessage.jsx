import * as React from 'react';
import moment from 'moment';
import _ from 'lodash';
import styles from './CustomTooltipMessage.module.scss';

export const CustomTooltipMessage = ({ item }) => {
    const expirationDate = _.get(item, 'documentData.expirationDate', '');
    return (
        <div className={styles.tooltipContainer}>
            <span>Expira in {moment(expirationDate).format('DD-MM-YYYY')}</span>
            <span>Apasa pe icon pentru mai multe informatii.</span>
        </div>
    );
};
