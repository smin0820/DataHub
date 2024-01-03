import React from 'react';
import HeaderContainer from '@components/common/containers/HeaderContainer'
import QnaDetailtitle from './containers/QnaDetailtitle';
import WrapComments from './containers/WrapComments';

export default function QnaDetail() {
    return (
        <>
            <HeaderContainer></HeaderContainer>
            <QnaDetailtitle></QnaDetailtitle>
            <WrapComments></WrapComments>
        </>
    );
}

