import React from 'react';
import ManageContentContainer from './ManageContentContainer';
import { useSystems } from '@hooks/useSystems';

export default function ManageTableContainer() {
    const { systemList, loading, error, refetchSystem } = useSystems();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    const refreshList = () => {
        refetchSystem();
    }

    return (
        <div>
            <ManageContentContainer title={'[시스템 목록]'} data={systemList} onRefresh={refreshList} />
        </div>
    );
}

