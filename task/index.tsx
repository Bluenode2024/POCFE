export interface Task {
    id: string;
    name: string;
    priority: number;
    status: string;
    deadline: string;
  }
  
  export const tasks: Task[] = [
    // NFT 마켓플레이스 개발 (priority: 9)
    { id: "1", name: "프론트엔드 디자인", priority: 3, status: "Processing", deadline: "2024.12.15 18:00" },
    { id: "1", name: "스마트 컨트랙트 작성", priority: 3, status: "Pending", deadline: "2024.12.16 18:00" },
    { id: "1", name: "백엔드 통합", priority: 3, status: "Pending", deadline: "2024.12.17 18:00" },
  
    // 탈중앙화 투표 시스템 구축 (priority: 10)
    { id: "2", name: "스마트 컨트랙트 설계", priority: 4, status: "Processing", deadline: "2024.12.20 23:59" },
    { id: "2", name: "UI 개발", priority: 3, status: "Processing", deadline: "2024.12.22 23:59" },
    { id: "2", name: "테스트 자동화", priority: 3, status: "Pending", deadline: "2024.12.24 23:59" },
  
    // ZKP 라이브러리 검증 (priority: 8)
    { id: "3", name: "코드 분석", priority: 4, status: "Processing", deadline: "2024.11.25 17:00" },
    { id: "3", name: "테스트 작성", priority: 4, status: "Completed", deadline: "2024.11.28 17:00" },
  
    // DAO 거버넌스 솔루션 설계 (priority: 7)
    { id: "4", name: "구조 설계", priority: 3, status: "Pending", deadline: "2024.12.10 20:00" },
    { id: "4", name: "스마트 컨트랙트 개발", priority: 2, status: "Pending", deadline: "2024.12.12 20:00" },
    { id: "4", name: "시뮬레이션 테스트", priority: 2, status: "Pending", deadline: "2024.12.14 20:00" },
  
    // Solana 기반 P2E 게임 제작 (priority: 10)
    { id: "5", name: "게임 디자인", priority: 4, status: "Processing", deadline: "2024.12.05 22:00" },
    { id: "5", name: "스마트 컨트랙트 개발", priority: 3, status: "Processing", deadline: "2024.12.07 22:00" },
    { id: "5", name: "배포 및 테스트", priority: 3, status: "Pending", deadline: "2024.12.10 22:00" },
  
    // 스마트 컨트랙트 보안 검토 (priority: 9)
    { id: "6", name: "코드 리뷰", priority: 5, status: "Processing", deadline: "2024.12.06 19:00" },
    { id: "6", name: "취약점 스캐닝", priority: 4, status: "Pending", deadline: "2024.12.08 19:00" },
  
    // Layer 2 Rollup 효율성 분석 (priority: 8)
    { id: "7", name: "데이터 수집", priority: 4, status: "Completed", deadline: "2024.11.27 15:00" },
    { id: "7", name: "보고서 작성", priority: 4, status: "Completed", deadline: "2024.11.28 15:00" },
  
    // Blockchain Data Indexing API 개발 (priority: 9)
    { id: "8", name: "API 설계", priority: 3, status: "Processing", deadline: "2024.12.16 18:00" },
    { id: "8", name: "데이터베이스 구성", priority: 3, status: "Processing", deadline: "2024.12.17 18:00" },
    { id: "8", name: "API 배포", priority: 3, status: "Pending", deadline: "2024.12.18 18:00" },
  
    // Web3 온보딩 플랫폼 프로토타입 (priority: 7)
    { id: "9", name: "UX/UI 디자인", priority: 3, status: "Pending", deadline: "2024.12.10 20:00" },
    { id: "9", name: "백엔드 개발", priority: 2, status: "Pending", deadline: "2024.12.11 20:00" },
    { id: "9", name: "스마트 컨트랙트 통합", priority: 2, status: "Pending", deadline: "2024.12.12 20:00" },
  
    // Cross-chain 브릿지 검증 및 테스트 (priority: 8)
    { id: "10", name: "테스트 케이스 설계", priority: 4, status: "Processing", deadline: "2024.12.20 17:00" },
    { id: "10", name: "테스트 실행", priority: 4, status: "Pending", deadline: "2024.12.22 17:00" },
  
    // Decentralized Identity(DID) 솔루션 개발 (priority: 10)
    { id: "11", name: "DID 프로토콜 설계", priority: 4, status: "Processing", deadline: "2024.12.24 23:59" },
    { id: "11", name: "시스템 통합", priority: 3, status: "Pending", deadline: "2024.12.26 23:59" },
    { id: "11", name: "테스트 및 배포", priority: 3, status: "Pending", deadline: "2024.12.28 23:59" },
  
    // Proof-of-Stake 기반 컨센서스 비교 연구 (priority: 6)
    { id: "12", name: "데이터 분석", priority: 3, status: "Completed", deadline: "2024.12.03 15:00" },
    { id: "12", name: "결과 정리", priority: 3, status: "Completed", deadline: "2024.12.05 15:00" },
  
    // GameFi 에코시스템 확장 솔루션 (priority: 8)
    { id: "13", name: "확장 방안 분석", priority: 4, status: "Pending", deadline: "2024.12.25 20:00" },
    { id: "13", name: "프로토타입 제작", priority: 4, status: "Pending", deadline: "2024.12.30 20:00" },
  
    // Blockchain Analytics Dashboard (priority: 9)
    { id: "14", name: "데이터 시각화", priority: 4, status: "Processing", deadline: "2024.12.20 21:00" },
    { id: "14", name: "백엔드 API 개발", priority: 3, status: "Processing", deadline: "2024.12.22 21:00" },
    { id: "14", name: "대시보드 통합", priority: 2, status: "Pending", deadline: "2024.12.25 21:00" },
  
    // DeFi 스마트 컨트랙트 자동화 (priority: 8)
    { id: "15", name: "스마트 컨트랙트 설계", priority: 4, status: "Processing", deadline: "2024.12.15 16:00" },
    { id: "15", name: "자동화 프로세스 개발", priority: 4, status: "Pending", deadline: "2024.12.18 16:00" },
  ];
  