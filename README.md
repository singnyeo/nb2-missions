## 📁 목록

### 1️⃣ [상품과 게시물 설계](./01-product-article/README.md)
> `main.js`를 중심으로 한 클래스 설계 연습  
- `Product`, `Article` 클래스 정의  
- 좋아요 / 즐겨찾기 기능  
- 게시글, 상품 관련 서비스 메서드 작성

### 2️⃣ [중고마켓 API 구현](./02-secondHandMarket/README.md)
> PostgreSQL 기반의 실전형 CRUD API 서버 구현 
- 상품 및 게시글 등록/조회/수정/삭제 API  
- 댓글 기능 + cursor 페이지네이션  
- 이미지 업로드, 유효성 검사, 에러 핸들러 구현  
- `.env` 환경 설정, CORS, 시딩 처리 등 실전 환경 구성
- 🔗 배포 링크 : https://nb2-missions-sprint3.onrender.com

### 3️⃣ [토큰 기반 인증/인가 및 좋아요 기능](./03-secure-content-api/README.md)  
> JWT 기반 인증 + 게시글/댓글/좋아요 기능 포함한 사용자 중심 API 서버 구현  
- 회원가입 / 로그인 (Access + Refresh Token 발급)  
- 유저 정보 조회 / 수정 / 비밀번호 변경  
- 게시글, 댓글 등록/조회/수정/삭제 기능  
- 게시글/상품에 대한 좋아요 및 좋아요 취소 기능  
- 좋아요 여부(`isLiked`) 포함 응답 및 좋아요한 목록 조회  
- Prisma 관계형 설계 및 onDelete 적용  
- 인증 미들웨어, 인가 처리, 유저 기반 권한 검증 구현

### 4️⃣ [타입스크립트 마이그레이션 및 Layered Architecture 적용](./04-secure-content-api-refactor/README.md)
> 기존 Express.js 프로젝트를 타입스크립트로 마이그레이션하고, Controller/Service/Repository 계층 분리 적용
- tsconfig.json 파일 생성 및 옵션 설정 (예: outDir)
- 타입스크립트 개발 환경 세팅 (ts-node, nodemon 스크립트 포함)
- any 타입 최소화, 인터페이스 및 타입 별칭 활용
- declare로 req.user 등 타입 확장
- Controller, Service, Repository 계층 구조로 코드 리팩토링
- DTO 활용해 계층 간 데이터 전달 명확화