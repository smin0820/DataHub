// ApiService.jsx
// 서버 API와 통신하는 함수들을 모아둔 파일입니다.

// 로그인 및 계정 관련 API 
// 메인 페이지(/system, /admin) 관련 API 
// 공지사항 관련 API 
// Q&A 관련 API가 있습니다.

import { axiosInstance } from "@components/axios/AxiosInstance";

const ApiService = {

    ////////////////////////////////////////////////////////////////////////////////////////////
    // 로그인 및 계정 관련 API
    ////////////////////////////////////////////////////////////////////////////////////////////
    // login
    loginUser: async (loginId, password) => {
        try {
            const response = await axiosInstance.post('/users', {
                loginId,
                password
            });
            // 로그인 성공시 응답 데이터에서 토큰 추출
            const jwtToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;
            localStorage.setItem('jwtToken', jwtToken);
            localStorage.setItem('refreshToken', refreshToken);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
            return response.data;
        } catch (error) {
            console.error('로그인 실패:', error);
            throw error;
        }
    },

    // logout
    logoutUser: async (loginId) => {
        try {
            const response = await axiosInstance.post('/logout/user', {
                loginId
            });
            return response;
        } catch (error) {
            console.error('로그아웃 실패:', error);
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

     // 시스템명 중복확인(user)
    userCheckSystemName: async (loginId, systemName) => {
        try {
            const response = await axiosInstance.post('/users/check-systemname', {
                loginId,
                systemName
            });
            return response.data;
        } catch (error) {
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
            console.error('시스템명 중복확인 요청 실패:', error);
            throw error;
        }
    },

    // 시스템 데이터 삭제 함수 (반드시 이 순서대로 삭제해야 함)
    deleteSystemData: async (systemId) => {
        try {
            // 게시물 삭제
            const articleResponse = await axiosInstance.delete(`/article/del-all`, {
                params: {
                    systemId: systemId
                }
            });

            // Q&A 및 댓글 삭제
            const qaReplyResponse = await axiosInstance.delete(`/qa-reply/del-all`, {
                params: {
                    systemId: systemId
                }
            });

            return {
                article: articleResponse.data,
                qaReply: qaReplyResponse.data
            };
        } catch (error) {
            console.error('시스템 데이터 삭제 실패:', error);
            throw error;
        }
    },

    // 시스템 삭제시 > 해당 시스템 계정 삭제
    // !! 반드시 delSystemData 함수 이후에 실행되어야 함
    deleteUser: async (systemId) => {
        try {
            const response = await axiosInstance.delete(`/user/del`, {
                params: {
                    systemId: systemId
                }
            });
            return response.data;
        } catch (error) {
            console.error('시스템 삭제 실패:', error);
        }
    },

    // admin이 시스템 정보 수정 클릭 시 > 해당 시스템 정보 가져오는 API
    systemModify: async (systemId) => {
        const formData = new FormData();
        formData.append('systemId', systemId);
        try {
            const response = await axiosInstance.post('/user/bysystem', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('로그인 실패:', error);
            throw error;
        }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////
    // 메인 페이지(/system, /admin) 관련 API
    ////////////////////////////////////////////////////////////////////////////////////////////
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

    // admin system nav(전체 시스템 목록)
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

    // system name(시스템명 가져오기 + 기본 카테고리 가져오기)
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

    // system article 1 - category(세부 카테고리 가져오기)
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

    // system article 2 - article(게시물 가져오기)
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

    // system file delete(아직 검토되지 않은 경우에만 삭제가능)
    deleteFile: async (articleId) => {
        try {
            const response = await axiosInstance.delete(`/article/del`, {
                params: { articleId }
            });
            console.log('File 삭제 성공:', response)
            return response.data;
        } catch (error) {
            console.error('File 삭제 실패:', error);
            throw error;
        }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////
    // 공지사항 관련 API
    ////////////////////////////////////////////////////////////////////////////////////////////
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

    // 공지사항 제목 검색 기능
    searchNoticeList: async (page, keyword, searchBy) => {
        try {
            const response = await axiosInstance.get('/notice/search', {
                params: { 
                    page: page, 
                    keyword: keyword,
                    searchBy: searchBy
                }
            });
            return response.data;
        } catch (error) {
            console.error('공지사항 제목, 본문 검색 실패:', error);
            throw error;
        }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////
    // Q&A 관련 API
    ////////////////////////////////////////////////////////////////////////////////////////////
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
            return response.data;
        } catch (error) {
            console.error('Q&A Detail 요청 실패:', error);
            throw error;
        }
    },

    //댓글 추가
    registerReply: async (loginId, qaId, replyContent) => {
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
        } catch(error) {
            console.error('댓글 추가 실패:', error);
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
            return response.data;
        } catch (error) {
            console.error('댓글 수정 실패', error);
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
    
    // Q&A 제목, 본문, 작성자 검색 기능
    searchQnaList: async (page, keyword, searchBy) => {
        try {
            const response = await axiosInstance.get('/qa/search', {
                params: { 
                    page: page, 
                    keyword: keyword,
                    searchBy: searchBy
                }
            });
            return response.data;
        } catch (error) {
            console.error('Q&A 제목 or 본문 or 작성자 검색 실패:', error);
            throw error;
        }
    }
};

export default ApiService;