// AdminTablePresenter.jsx
// '대기중 게시물'페이지를 보여주는 테이블 프레젠터입니다.
// 표의 내용은 SystemContentContainer.jsx에서 처리합니다.

import React from "react";
import SystemContentContainer from "@components/common/containers/SystemContentContainer";
import PaginationComponent from '@components/common/PaginationComponent';

const AdminTablePresenter = ({ articles, currentPage, totalPages, onPageChange }) => {
    return (
        <div>
            <SystemContentContainer title={"[대기중 게시물]"} data={articles} />
            <PaginationComponent 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={onPageChange}
            />
        </div>    
    );
};

export default AdminTablePresenter;