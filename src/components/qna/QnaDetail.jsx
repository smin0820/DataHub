import React from 'react';
import AdminHeaderContainer from '@components/admin/containers/AdminHeaderContainer'
import QnaDetailtitle from './containers/QnaDetailtitle';
import WrapComments from './containers/WrapComments';

export default function QnaDetail() {
    return (
        <>
            <AdminHeaderContainer></AdminHeaderContainer>
            <QnaDetailtitle></QnaDetailtitle>
            <WrapComments></WrapComments>
        </>
    );
}

