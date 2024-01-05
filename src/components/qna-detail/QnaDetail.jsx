import React from 'react';
import HeaderContainer from '@components/common/Header/HeaderContainer'
import QnaDetailTitle from './containers/QnaDetailTitle';
import CommentsTest from './containers/CommentsTest';

export default function QnaDetail() {
    return (
        <>
            <HeaderContainer></HeaderContainer>
            <QnaDetailTitle></QnaDetailTitle>
            <CommentsTest></CommentsTest>
        </>
    );
}

