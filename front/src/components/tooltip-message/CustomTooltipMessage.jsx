import * as React from 'react';
import moment from 'moment';
import _ from 'lodash';
import styles from './CustomTooltipMessage.module.scss';
import { LABELS } from 'constants/labels';

export const CustomTooltipMessage = ({ item }) => {
    const expirationDate = _.get(item, 'documentData.expirationDate', '');
    console.log(item);
    return (
        <div>
            {item.exists ? (
                <div className={styles.tooltipContainer}>
                    <span>
                        {item.expired ? LABELS.expired : LABELS.willExpire}
                        {moment(expirationDate).format('DD-MM-YYYY')}
                    </span>
                    <span>Apasa pe icon pentru mai multe informatii.</span>
                </div>
            ) : (
                <span>
                    {LABELS.notExisting}! {LABELS.addDocument}
                </span>
            )}
        </div>
    );
};
