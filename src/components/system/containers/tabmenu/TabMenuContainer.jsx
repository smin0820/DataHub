import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SystemContentContainer from '@components/common/containers/SystemContentContainer';
import ApiService from '@components/axios/ApiService';
import PaginationComponent from '@components/common/PaginationComponent';
import { useRecoilValue } from 'recoil';
import { systemUploadState } from '@recoil/atoms/systemUploadStateAtom';


function DetailCategoryBoard({ category, index }) {
    const [articles, setArticles] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0); 
    const systemUpload = useRecoilValue(systemUploadState);

    React.useEffect(() => {
        ApiService.fetchArticles(category.detailCategoryId, currentPage)
            .then(articleData => {
                setArticles(articleData.content);
                setTotalPages(articleData.totalPages);
            })
            .catch(error => console.error('Articles 요청 오류:', error));
    }, [category.detailCategoryId, currentPage, systemUpload]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <SystemContentContainer title={`${index}. ${category.detailCategoryName}`} data={articles} />
            <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
            />
        </div>
        

    );
}


DetailCategoryBoard.propTypes = {
    category: PropTypes.shape({
        detailCategoryId: PropTypes.number.isRequired,
        detailCategoryName: PropTypes.string.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired
};

export default function TabMenuContainer({ detailCategories }) {
    if (!detailCategories) {
        // detailCategories가 undefined 또는 null인 경우 처리
        return <div>Loading...</div>;
    }

    if (detailCategories.length === 0) {
        // `detailCategories`가 비어 있으면 로딩 메시지 또는 다른 UI 요소를 표시
        return <div>Loading...</div>;
    }

    return (
        <>
            {detailCategories.map((category, index) => (
                <DetailCategoryBoard key={category.detailCategoryId} category={category} index={index + 1} />
            ))}
        </>
    );
}

TabMenuContainer.propTypes = {
    detailCategories: PropTypes.arrayOf(PropTypes.shape({
        detailCategoryId: PropTypes.number,
        detailCategoryName: PropTypes.string
    }))
};
PaginationComponent.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};
