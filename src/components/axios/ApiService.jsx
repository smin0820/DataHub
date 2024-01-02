import axiosInstance from "@components/axios/AxiosInstance";

const ApiService = {

    // login
    loginUser: async (loginId, password) => {
        try {
            const response = await axiosInstance.post('/users', {
                loginId,
                password
            });
            console.log('로그인 응답:', response.data);
            return response.data;
        } catch (error) {
            console.error('로그인 실패:', error);
            throw error;
        }
    },

    // register
    registerSystem: async (inputValues) => {
        try {
            const response = await axiosInstance.post('/join/user', inputValues, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Success:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error', error);
            throw error;
        }
    },

    // modify
    ModifyService: async (userData) => {
        try {
            const response = await axiosInstance.put('/users', userData);
            console.log('Success in modifyUser:', response);
            return response.data;
        } catch (error) {
            console.error('Error during the update request:', error);
            throw error;
        }
    },

    // admin view
    fetchWaitArticles: async (page) => {
        try {
            const response = await axiosInstance.get('/wait-article', {
                params: { page }
            });
            console.log('Success fetching articles:', response);
            return response.data;
        } catch (error) {
            console.error('Error fetching articles:', error);
            throw error;
        }
    },

    // admin system nav
    fetchSystemNames: async () => {
        let systemId = 1;
        let systemNames = [];
        let hasMore = true;
    
        while (hasMore) {
            try {
                const response = await axiosInstance.get('/base-category', {
                    params: {
                        systemId: systemId
                    }
                });
                if (response.data && response.data.systemName) {
                    systemNames.push({ id: systemId, name: response.data.systemName });
                    systemId++;
                } else {
                    hasMore = false;
                }
            } catch (error) {
                console.error('Error fetching system names:', error);
                hasMore = false;
            }
        }
        return systemNames;
    },

    // admin review
    reviewArticle: async (formData) => {
        try {
            // PUT 요청을 보내는 부분
            const response = await axiosInstance.put('/article-review', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Success in reviewArticle:', response);
        return response.data; // 요청이 성공하면 응답 데이터를 반환
        } catch (error) {
            console.error('Error in reviewArticle:', error);
        throw error; // 오류 발생 시 예외를 던짐
        }
    },

    // system name
    fetchBaseCategory: async (systemId) => {
        try {
            const response = await axiosInstance.get('/base-category', {
                params: {
                    systemId
                }
            });
            console.log('서버 응답:', response.data);
            return response.data;
        } catch (error) {
            console.error('Base category 요청 실패:', error);
            throw error;
        }
    },

    // system article 1 - category
    fetchDetailCategories: async (baseCategoryId) => {
        try {
            const response = await axiosInstance.get('/detail-category', {
                params: { baseCategoryId }
            });
            console.log('서버 응답:', response.data);
            return response.data;
        } catch (error) {
            console.error('Detail category 요청 실패:', error);
            throw error;
        }
    },

    // system article 2 - article
    fetchArticles: async (detailCategoryId, page) => {
        try {
            const response = await axiosInstance.get('/articles', {
                params: { detailCategoryId, page }
            });
            console.log('서버 응답:', response.data);
            return response.data;
        } catch (error) {
            console.error('Articles 요청 실패:', error);
            throw error;
        }
    },

    // system file upload
    uploadFile: (detailCategoryId, file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('detailCategoryId', detailCategoryId);
    
        return axiosInstance.post('/article-file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    // get notice list
    fetchNotices: async (page) => {
        try {
            const response = await axiosInstance.get('/notices', {
                params: { page }
            });
            console.log('서버 응답:', response.data);
            return response.data;
        } catch (error) {
            console.error('Notices 요청 실패:', error);
            throw error;
        }
    },

    // get notice detail
    fetchNoticeDetail: async (noticeId) => {
        try {
            const response = await axiosInstance.get(`/notice`, {
                params: { noticeId }
            });
            console.log('서버 응답:', response.data);
            return response.data;
        } catch (error) {
            console.error('Notice Detail 요청 실패:', error);
            throw error;
        }
    },

    // register notice
    registerNotice: async (title, body, userId) => {
        try {
            const response = await axiosInstance.post('/notice/post', {
                noticeTitle: title,
                noticeContent: body,
                userId: userId
            });
            console.log('서버 응답:', response.data);
            return response.data;
        } catch (error) {
            console.error('Notice 등록 실패:', error);
            throw error;
        }
    },

    // edit notice
    editNotice: async (noticeId, title, body, userId) => {
        try {
            const response = await axiosInstance.put('/notice/update', {
                noticeId: noticeId,
                noticeTitle: title,
                noticeContent: body,
                userId: userId
            });
            console.log('서버 응답:', response.data);
            return response.data;
        } catch (error) {
            console.error('Notice 수정 실패:', error);
            throw error;
        }
    },

    deleteNotice: async (noticeId, userId) => {
        try {
            const response = await axiosInstance.delete(`/notice/delete`, {
                params: { noticeId, userId }
            });
            console.log('서버 응답:', response.data);
            return response.data;
        } catch (error) {
            console.error('Notice 삭제 실패:', error);
            throw error;
        }
    }


};

export default ApiService;