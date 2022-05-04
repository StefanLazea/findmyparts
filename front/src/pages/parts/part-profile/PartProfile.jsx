import React, { useEffect } from 'react';
import { PageContainer } from '../../../components/page-container/PageContainer'
import { useLocation } from 'react-router';

export const PartProfile = ({ ...props }) => {
    const { state } = useLocation();

    useEffect(() => {
        console.log(state)
    }, [state])

    return <PageContainer>
        <div>
            hello
        </div>
    </PageContainer>
}