import React from 'react';
import { Container } from '@mui/material';

import styles from './PageContainer.module.scss';
export const PageContainer = (props) => {
    return (
        <Container className={styles.pageContainer}>{props.children}</Container>
    );
};
