// Articles.ts
// Articles에 대한 타입을 정의합니다.


/////////////////////////////////////////////////////////////////////////////
// 단일 게시물(/system, /admin)에 대한 타입을 정의합니다.
/////////////////////////////////////////////////////////////////////////////
// 단일 게시물(Article)에 대한 타입을 정의합니다.
export type Article = {
    articleId: number;
    uploadDate: string;
    approval: string;
    declineDetail: string;
    taskFileUrl: string;
    taskFileName: string;
    declineFileUrl: string;
    declineFileName: string;
}

// 대기중 게시물(Admin)에 대한 타입을 정의합니다.
export type AdminTable = {
    systemName: string;
    detailCategoryName: string;
    articleId: number;
    approval: string;
    uploadDate: string;
    taskFileUrl: string;
    taskFileName: string;
}

// // 대기중 게시물 목록에 대한 타입을 정의합니다.
// export interface AdminTableResponse {
//     totalPages: number;
//     pageNumber: number;
//     articles: AdminTable[];
// }

// 게시물 목록에 대한 타입을 정의합니다.
export interface ArticlesResponse {
    allPage: number;
    page: number;
    articles: Article[];
}

/////////////////////////////////////////////////////////////////////////////
// Qna(/qna)에 대한 타입을 정의합니다.
/////////////////////////////////////////////////////////////////////////////
// Qna에 대한 타입을 정의합니다.
export interface Qna {
    qaId: number;
    qaTitle: string;
    qaDate: string;
    username: string;
}

// Qna 목록에 대한 타입을 정의합니다.
export interface QnasResponse {
    allPage: number;
    page: number;
    qnas: Qna[];
}

// Reply에 대한 타입을 정의합니다.
export interface Reply {
    replyId: number;
    replyDate: string;
    replyContent: string;
    username: string;
}

// Qna 상세 정보에 대한 응답 타입을 정의합니다.
export interface QnaDetailResponse extends QnasResponse {
    qa: Qna; // 해당 Qna의 정보
    content: string; // 해당 Qna의 내용
    replys: Reply[]; // 해당 Qna의 댓글 목록
}