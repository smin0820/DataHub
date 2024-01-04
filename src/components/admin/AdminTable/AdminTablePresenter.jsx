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