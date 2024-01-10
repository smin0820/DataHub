import { axiosInstance } from "@components/axios/AxiosInstance";

const ApiService = {

    // login
    loginUser: async (loginId, password) => {
        try {
            const response = await axiosInstance.post('/users', {
                loginId,
                password
            });
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
            return response.data;
        } catch (error) {
            console.error('Error fetching articles:', error);
            throw error;
        }
    },

    // admin system nav
    fetchSystemNames: async () => {
        try {
            const response = await axiosInstance.get('/system');
            return response;
        } catch(error) {
            console.error('Error fetching system names:', error);
        }       
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
            return response.data;
        } catch (error) {
            console.error('Notice Detail 요청 실패:', error);
            throw error;
        }
    },

    // register notice
    registerNotice: async (title, body, loginId) => {
        try {
            const response = await axiosInstance.post('/notice/post', {
                noticeTitle: title,
                noticeContent: body,
                loginId: loginId
            });
            return response.data;
        } catch (error) {
            console.error('Notice 등록 실패:', error);
            throw error;
        }
    },

    // edit notice
    editNotice: async (noticeId, title, body, loginId) => {
        try {
            const response = await axiosInstance.put('/notice/update', {
                noticeId: noticeId,
                noticeTitle: title,
                noticeContent: body,
                loginId: loginId
            });
            return response.data;
        } catch (error) {
            console.error('Notice 수정 실패:', error);
            throw error;
        }
    },

    // delete notice
    deleteNotice: async (noticeId, loginId) => {
        try {
            const response = await axiosInstance.delete(`/notice/delete`, {
                data: {
                    noticeId: noticeId,
                    loginId: loginId
                },
            });
            return response.data;
        } catch (error) {
            console.error('Notice 삭제 실패:', error);
            throw error;
        }
    },

    // get Q&A list
    fetchQnas: async (page) => {
        try {
            const response = await axiosInstance.get('/qa', {
                params: { page }
            });
            return response.data;
        } catch (error) {
            console.error('Qna 목록 요청 실패:', error);
            throw error;
        }
    },

    // get qna detail and reply
    fetchQnaDetail: async (qaId) => {
        try {
            const response = await axiosInstance.get(`/reply`, {
                params: { qaId }
            });
            console.log('서버 응답:', response.data);
            return response.data;
        } catch (error) {
            console.error('Q&A Detail 요청 실패:', error);
            throw error;
        }
    },

    //댓글 추가
    registerComment: async (loginId, qaId, replyContent) => {
        const formData = new FormData();
        formData.append('loginId',loginId);
        formData.append('qaId',qaId);
        formData.append('replyContent',replyContent);
        try {
            const response = await axiosInstance.post('/reply/addition', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('서버 응답:', response.data);
        } catch(error) {
            console.log('댓글 추가 실패:', error);
            throw error;
        }
    },

    // 댓글 삭제
    deleteReply: async (loginId, replyId) => {
        try {
            const response = await axiosInstance.delete(`/reply/del`, {
                params: {
                    loginId: loginId,
                    replyId: replyId
                },
            });
            console.log('서버 응답:', response.data);
            return response.data;
        } catch (error) {
            console.error('댓글 삭제 실패:', error);
            throw error;
        }
    },

    // 댓글 수정
    editReply: async (loginId, replyId, updateContent) => {
        const formData = new FormData();
        formData.append('loginId',loginId);
        formData.append('replyId',replyId);
        formData.append('updateContent',updateContent);

        try {
            const response = await axiosInstance.put('/reply/modi', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('댓글 수정 성공', response);
            return response.data;
        } catch (error) {
            console.log('댓글 수정 실패', error);
            throw error;
        }
    },

    // Q&A 글쓰기
    registerQna: async (loginId, qaTitle, qaContent) => {
        const formData = new FormData();
        formData.append('loginId',loginId);
        formData.append('qaTitle',qaTitle);
        formData.append('qaContent',qaContent);

        try {
            const response = await axiosInstance.post('/qa/addition', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch(error) {
            console.error('qna 등록 실패:', error);
            throw error;
        }
    },

    // Q&A 수정
    editQna: async (loginId, qaId, updateTitle, updateContent) => {
        const formData = new FormData();
        formData.append('loginId',loginId);
        formData.append('qaId',qaId);
        formData.append('updateTitle', updateTitle);
        formData.append('updateContent',updateContent);

        try {
            const response = await axiosInstance.put('/qa/modi', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Q&A 수정 실패', error);
            throw error;
        }
    },

    // Q&A 삭제
    deleteQna: async (qaId, loginId) => {
    try {
        const response = await axiosInstance.delete(`/qa/del`, {
            params: {
                qaId: qaId,
                loginId: loginId
            },
        });
        return response.data;
    } catch (error) {
        console.error('Qna 삭제 실패:', error);
        throw error;
    }
    },

    // 시스템명 중복확인(user)
    userCheckSystemName: async (loginId, systemName) => {
        try {
            const response = await axiosInstance.post('/users/check-systemname', {
                loginId,
                systemName
            });
            return response.data;
        } catch (error) {
            console.log(systemName)
            console.error('시스템명 중복확인 요청 실패:', error);
            throw error;
        }
    },

    // 아이디 중복확인(admin)
    adminCheckLoginId: async (loginId) => {
        try {
            const response = await axiosInstance.get('/join/check-loginid', {
                params: { loginId }
            });
            return response.data;
        } catch (error) {
            console.log(loginId)
            console.error('아이디 중복확인 요청 실패:', error);
            throw error;
        }
    },

    // 시스템명 중복확인(admin)
    adminCheckSystemName: async (systemName) => {
        try {
            const response = await axiosInstance.get('/join/check-systemname', {
                params: { systemName }
            });
            return response.data;
        } catch (error) {
            console.log(systemName)
            console.error('시스템명 중복확인 요청 실패:', error);
            throw error;
        }
    }
};

export default ApiService;