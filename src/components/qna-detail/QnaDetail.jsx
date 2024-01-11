import React from 'react';
import HeaderContainer from '@components/common/Header/HeaderContainer'
import QnaDetailTitle from './containers/QnaDetailTitle';
import Comments from './containers/Comments';

export default function QnaDetail() {
    return (
        <>
            <HeaderContainer></HeaderContainer>
            <QnaDetailTitle></QnaDetailTitle>
            <Comments></Comments>
        </>
    );
}

