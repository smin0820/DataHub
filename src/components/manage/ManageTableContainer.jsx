import React, { useState } from 'react';
import ManageContentContainer from './ManageContentContainer';

export default function ManageTableContainer() {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;
    return (
        <div>
            <ManageContentContainer title={'[시스템 목록]'} />
            {/* <PaginationComponent 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange}  
            /> */}
        </div>
    );
}

