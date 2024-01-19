// TabMenuTableContainer.tsx
// 시스템 페이지(/system)의 탭 메뉴 각각에 해당하는 게시물을 전달해주는 컴포넌트입니다. 

import React from 'react';
import SystemContentContainer from '@components/common/containers/SystemContentContainer';
import ApiService from '@components/axios/ApiService';
import PaginationComponent from '@components/common/PaginationComponent';
import { useRecoilValue } from 'recoil';
import { systemUploadState } from '@recoil/atoms/systemUploadStateAtom';
import { DetailCategory } from '@@types/Categories';

type DetailCategoryBoardProps = {
    category: DetailCategory;
    index: number;
}

const DetailCategoryBoard = ({ 
    category, 
    index 
}: DetailCategoryBoardProps) => {
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

    const handlePageChange = (newPage: number) => {
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

type TabMenuContainerProps = {
    detailCategories: DetailCategory[];
}

export default function TabMenuTableContainer({ detailCategories }: TabMenuContainerProps) {
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