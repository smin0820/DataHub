// Categories.ts
// Categories에 대한 타입을 정의합니다.

///////////////////////////////////////////////////////////////////////
// System에 대한 타입을 정의합니다.
///////////////////////////////////////////////////////////////////////
// System에 대한 타입을 정의합니다.
export interface System {
    systemId: number;
    systemName: string;
}

// System 목록에 대한 타입을 정의합니다.
export interface SystemsResponse {
    systems: System[];
}

///////////////////////////////////////////////////////////////////////
// BaseCategory(systemId로 전달되는 값)에 대한 타입을 정의합니다.
///////////////////////////////////////////////////////////////////////
// BaseCategory에 대한 타입을 정의합니다.
export interface BaseCategory {
    baseCategoryId: number;
    baseCategoryName: string;
}

// BaseCategory 목록에 대한 타입을 정의합니다.
export interface BaseCategoriesResponse {
    systemName: string;
    baseCategories: BaseCategory[];
}

///////////////////////////////////////////////////////////////////////
// DetailCategory(baseCategoryId로 전달되는 값)에 대한 타입을 정의합니다.
///////////////////////////////////////////////////////////////////////
// DetailCategory에 대한 타입을 정의합니다.
export interface DetailCategory {
    detailCategoryId: number;
    detailCategoryName: string;
}

// DetailCategory 목록에 대한 타입을 정의합니다.
export interface DetailCategoriesResponse {
    detailCategories: DetailCategory[];
}