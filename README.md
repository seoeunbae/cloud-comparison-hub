# ☁️ Cloud Comparison Hub: AWS vs GCP

> **AWS와 GCP의 복잡한 서비스들, 이제 한눈에 비교하고 최적의 아키텍처를 설계하세요.**

<img width="955" height="445" alt="Screenshot 2026-01-13 at 11 38 03 AM" src="https://github.com/user-attachments/assets/98f42c4c-6450-4170-8b26-67087e3ee28c" />


---

## 🎯 기획 의도 (Planning Intent)

클라우드 컴퓨팅 시장의 양대 산맥인 AWS와 GCP는 수백 개의 서비스를 제공합니다. 하지만 각 플랫폼마다 명칭과 세부 기능이 달라, 멀티 클라우드를 도입하거나 플랫폼을 이전하려는 엔지니어들에게는 큰 진입장벽이 존재합니다. **Cloud Comparison Hub**는 이러한 기술적 격차를 해소하고, 데이터에 기반한 객관적인 서비스 비교를 통해 의사결정을 돕기 위해 기획되었습니다.

## 🚀 필요성 (Necessity)

1.  **멀티 클라우드 전략의 확산**: 특정 벤더 종속성(Vendor Lock-in)을 피하기 위해 여러 클라우드를 혼용하는 기업이 늘어남에 따라, 동일 기능의 타 플랫폼 서비스를 찾는 수요가 급증했습니다.
2.  **학습 곡선 단축**: AWS 전문가가 GCP를 처음 접할 때, 익숙한 서비스(예: EC2)에 대응하는 GCP 서비스(Compute Engine)를 즉시 찾아내고 차이점을 이해함으로써 학습 시간을 획기적으로 줄일 수 있습니다.
3.  **최적의 비용 및 성능 선택**: 서비스별 특장점과 활용 사례를 비교하여 프로젝트의 요구사항에 가장 부합하는 플랫폼을 선택할 수 있는 기준을 제공합니다.

## 😫 기존의 불편했던 점 (Pain Points)

*   **파편화된 문서**: 각 CSP의 공식 문서를 일일이 찾아보며 수동으로 비교표를 만들어야 하는 번거로움이 있었습니다.
*   **모호한 명칭**: 'Lambda'와 'Cloud Functions'처럼 이름만 봐서는 정확한 기능적 차이를 알기 어려운 경우가 많았습니다.
*   **업데이트 반영의 한계**: 클라우드 서비스는 매달 새로운 기능이 추가되지만, 정적인 비교 블로그 포스트들은 최신 정보를 반영하지 못하는 경우가 많습니다. (본 서비스는 AI를 통해 실시간 지식을 바탕으로 답변합니다.)

---

## ✨ 주요 기능 (Key Features)

*   **실시간 서비스 검증**: 입력한 제품명이 해당 클라우드 플랫폼의 표준 서비스인지 AI가 즉시 확인합니다.
*   **심층 비교 분석**: 유사점, 핵심 차이점, 그리고 실제 비즈니스 환경에서의 전략적 활용 사례를 제공합니다.
*   **한국어 최적화**: 모든 분석 결과와 사용자 인터페이스가 한국어로 제공되어 국내 엔지니어들에게 최적의 경험을 선사합니다.
*   **Cloud Run 배포 지원**: Docker를 통해 Google Cloud Run 등 컨테이너 환경에 즉시 배포 가능합니다.

---

## 📸 서비스 화면 (Screenshots)

### 1. 메인 화면 (Main Dashboard)
<img width="955" height="445" alt="Screenshot 2026-01-13 at 11 38 03 AM" src="https://github.com/user-attachments/assets/41c32033-8b10-4ce9-90fb-072f060efaee" />  


*깔끔하고 현대적인 글래스모피즘 디자인의 입력 인터페이스를 제공합니다.*

### 2. 비교 결과 화면 (Analysis Result)

<img width="1141" height="699" alt="Screenshot 2026-01-13 at 11 37 38 AM" src="https://github.com/user-attachments/assets/a3f2ed53-88af-4df6-9786-d3cc1726acf3" />  


*유사점, 차이점, 활용 사례가 카드 형태로 구조화되어 한눈에 들어옵니다.*

---

## 🛠 기술 스택 (Tech Stack)

*   **Frontend**: React 19, Tailwind CSS 4, Motion (Animations)
*   **Backend**: Express (Node.js), Vite Middleware
*   **AI**: Google Gemini 3 Flash (via @google/genai)
*   **Deployment**: Docker, Google Cloud Run Ready

---

## 🏃‍♂️ 시작하기 (Getting Started)

### 환경 변수 설정
`.env` 파일에 다음 항목을 설정하세요:
```env
GEMINI_API_KEY=your_api_key_here
```

### 설치 및 실행
```bash
npm install
npm run dev
```

---

## 👨‍💻 Developer
**@seoeunbae**  
[GitHub Profile](https://github.com/seoeunbae)

---
*본 프로젝트는 AI 기반 클라우드 인텔리전스 도구로, 최신 클라우드 기술 동향을 반영합니다.*
