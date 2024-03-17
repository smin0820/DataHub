# 공공기관 데이터베이스 통합 관리 서비스 DataHub
![logo](https://github.com/smin0820/DataHub/assets/97029953/f69c8a14-38a0-4dac-a5d5-056645eb67be)

## 📌DataHub 소개
> 공공데이터의 활용을 위해 공공기관 DB의 관리현황을 기록, 보고할 수 있는 데이터 표준화 협업 도구의 개발로 시스템 담당자의 업무 효율성 향상을 위한 웹 서비스

<br />

## 💡기획 배경

### 추진 배경
- 경상북도 공공데이터 정책실과 회의를 통해 공공데이터를 왜 활용하지 하는에 대한 회의 진행
- 같은 종류의 데이터라도 형태가 일정하지 않아 활용의 어려움 발견

### 필요성
- 행정안전부에서 공공기관의 시스템 DB 개방 의무화
- 하지만 경상북도, 대구시 같은 경우 시스템을 관리하는 유지보수 업체와 협조체계 미흡, 전산직이 아닌 시스템 담당자의 전문 지식 부족으로 공공데이터 개방이 어려운 상황

### 목적
- 공공데이터를 체계적으로 수집하고 관리 할 수 있도록 각 시스템의 다양한 정의서와 데이터 품질진단 보고서를 일괄 관리하는 시스템을 구축하고자 함
- 데이터 수집을 위한 DB, ERD, 테이블, 칼럼 정의서와 수집되는 데이터 품질 관리를 위한 값진단 결과보고서를 지속적으로 업로드하여 이력을 관리할 수 있도록 구현

<br />

## 🧑🏻‍💻기술 스택
<table>
  <tr>
    <td>언어</td>
    <td>
      <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
    </td>
  </tr>
  <tr>
    <td>라이브러리</td>
    <td>
      <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
      <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
      <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
      <img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white">
    </td>
  </tr>
  <tr>
    <td>스타일링</td>
    <td>
      <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
    </td>
  </tr>
  <tr>
    <td>패키지 매니저</td>
    <td>
      <img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white">
    </td>
  </tr>
  <tr>
    <td>빌드 툴</td>
    <td>
      <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
    </td>
  </tr>
  <tr>
    <td>배포</td>
    <td>
      <img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
    </td>
  </tr>
  <tr>
    <td>파일 저장</td>
    <td>
      <img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
    </td>
  </tr>
</table>

### 👨‍👨‍👧‍👦협업 툴
[협업 문서- 노션](https://spicymin.notion.site/DataHub-031dc33c1f374c1d8ce117de70e614bf)

<br />

## 🗓프로젝트 기간
1차: 2023.09 ~ 2023.12 (3개월)

2차: 2023.12 ~ 2024.01 (1개월) // 현장실습

<br />

## 🛠️기능
### 계정 (로그인, 로그아웃, 시스템 등록(관리자), 시스템 삭제(관리자))

### 시스템 정보 수정(관리자, 사용자)

### 증빙 자료 업로드(사용자 / 게시글 등록, 삭제)

### 증빙 자료 검토(관리자 / 게시글 검토, 삭제)

### 공지사항(열람, 작성, 수정, 삭제)
https://github.com/smin0820/DataHub/assets/97029953/e19cffde-ac88-4d53-9058-6120c2946dd8

### Q&A(작성, 수정, 삭제)
https://github.com/smin0820/DataHub/assets/97029953/7504ff8a-bf4b-43fe-988e-45f2912ae0ac

### 검색 기능
https://github.com/smin0820/DataHub/assets/97029953/02250ee2-9657-4574-a71f-48e832015c77

### 댓글(작성, 수정, 삭제)
https://github.com/smin0820/DataHub/assets/97029953/a5b95663-b6a3-4032-a4ec-0cc3eebf7c00
