import React from 'react';

import { PieChart } from 'components/pie-chart/PieChart';
import { PageContainer } from 'components/page-container/PageContainer';

import styles from './Home.module.scss';

export const Home = () => {
    const data = [
        {
            id: 'php',
            label: 'php',
            value: 46,
            color: 'hsl(73, 70%, 50%)'
        },
        {
            id: 'c',
            label: 'c',
            value: 252,
            color: 'hsl(99, 70%, 50%)'
        },
        {
            id: 'javascript',
            label: 'javascript',
            value: 563,
            color: 'hsl(65, 70%, 50%)'
        },
        {
            id: 'go',
            label: 'go',
            value: 7,
            color: 'hsl(100, 70%, 50%)'
        },
        {
            id: 'ruby',
            label: 'ruby',
            value: 133,
            color: 'hsl(286, 70%, 50%)'
        }
    ];
    return (
        <PageContainer>
            {/* todo check for data to pe passed */}
            <div className={styles.partsPie}>
                <PieChart data={data} />
            </div>
        </PageContainer>
    );
};
