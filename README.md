# my-chat-app (클라이언트)

React + TypeScript + Tailwind + Socket.IO 채팅 클라이언트

## 📋 주요 기능
- REST API로 이전 대화 내역 불러오기
- Socket.IO 실시간 메시지 송수신
- 내가 보낸 메시지 / 다른 사용자 메시지 구분 UI
- Tailwind CSS 기반 반응형 레이아웃

## 🚀 설치 및 실행

1. 저장소 클론  
   ```bash
   git clone <클라이언트 레포 URL>
   cd my-chat-app
   ```

2. 의존성 설치  
   ```bash
   npm install
   ```

3. 개발 서버 실행  
   ```bash
   npm run dev
   ```
   - 포트: `http://localhost:5173`

## ⚙️ 스크립트

| 명령어           | 설명                                                     |
| ---------------- | -------------------------------------------------------- |
| `npm run dev`    | Vite 개발 서버 실행                                      |
| `npm run build`  | 프로덕션 번들 생성 (`dist/`)                            |
| `npm run preview`| 빌드된 앱을 로컬에서 미리 보기 (Vite preview)            |

## 🔧 환경 변수

`.env` 파일에 아래를 설정하세요:
```
VITE_API_BASE=http://localhost:4000
```
- REST 호출 및 Socket.IO 연결 URL 기준

## 🗂️ 폴더 구조
```
my-chat-app/
├─ src/
│  ├─ api/
│  │  └─ messages.ts       # REST API 유틸
│  ├─ hooks/
│  │  └─ useSocket.ts      # Socket.IO 훅
│  ├─ App.tsx              # 메인 컴포넌트
│  ├─ index.css            # Tailwind 지시어
│  └─ main.tsx             # 진입점 (Tailwind 임포트) 
├─ public/
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

## 💡 팁
- `import type` 으로 API 타입만 분리해 가져오기  
- 메시지 이력 페이징: REST API에 `?page=` 쿼리 추가  
- 인증 토큰 사용 시 HTTP 헤더(`Authorization`)와 Socket.IO `auth` 옵션 활용  
- Tailwind 커스텀 테마는 `tailwind.config.cjs`에 정의
