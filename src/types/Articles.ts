// Articles.ts
// Articles에 대한 타입을 정의합니다.

// 단일 게시물(Article)에 대한 타입을 정의합니다.
export interface Article {
    articleId: number;
    uploadDate: string;
    approval: string;
    declineDetail: string;
    taskFileUrl: string;
    taskFileName: string;
    declineFileUrl: string;
    declineFileName: string;
}

// 게시물 목록에 대한 타입을 정의합니다.
export interface ArticlesResponse {
    allPage: number;
    page: number;
    articles: Article[];
}
