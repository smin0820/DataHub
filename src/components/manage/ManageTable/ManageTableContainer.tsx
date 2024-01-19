// ManageTableContainer.tsx
// '시스템 관리'페이지의 내용을 전달하는 컨테이너입니다.

import React from 'react';
import ManageContentContainer from '@components/manage/ManageTable/ManageContentContainer';
import { useSystems } from '@hooks/useSystems';
import { UseSystemReturn } from '@@types/Systems';


export default function ManageTableContainer() {
    const { systemList, loading, error, refetchSystem }: UseSystemReturn = useSystems();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    const refreshList = () => {
        refetchSystem();
    }

    return (
        <div>
            <ManageContentContainer title={'[시스템 목록]'} data={systemList} onRefresh={refreshList} />
        </div>
    );
}

