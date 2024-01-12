import React from 'react';
import HeaderContainer from '@components/common/Header/HeaderContainer'
import QnaDetailTitle from './containers/QnaDetailTitle';
import QnaDetailComments from './containers/QnaDetailComments';

export default function QnaDetail() {
    return (
        <>
            <HeaderContainer></HeaderContainer>
            <QnaDetailTitle></QnaDetailTitle>
            <QnaDetailComments></QnaDetailComments>
        </>
    );
}

