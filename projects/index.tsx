export interface Project {
    id: string;
    name: string;
    type: string;
    deadline: string;
    leader: string;
    priority: number;
    status: string;
  }
  
  export const projects: Project[] = [
    {
      id: "1",
      name: "NFT 마켓플레이스 개발",
      type: "개발 프로젝트",
      deadline: "2024.12.20 18:00",
      leader: "김재원",
      priority: 9,
      status: "Processing",
    },
    {
      id: "2",
      name: "탈중앙화 투표 시스템 구축",
      type: "개발 프로젝트",
      deadline: "2024.12.25 23:59",
      leader: "김승원",
      priority: 10,
      status: "Processing",
    },
    {
      id: "3",
      name: "ZKP(영지식 증명) 라이브러리 검증",
      type: "연구 프로젝트",
      deadline: "2024.11.30 17:00",
      leader: "최세창",
      priority: 8,
      status: "Processing",
    },
    {
      id: "4",
      name: "DAO 거버넌스 솔루션 설계",
      type: "개발 프로젝트",
      deadline: "2024.12.15 20:00",
      leader: "정원필",
      priority: 7,
      status: "Pending",
    },
    {
      id: "5",
      name: "Solana 기반 P2E 게임 제작",
      type: "개발 프로젝트",
      deadline: "2024.12.10 22:00",
      leader: "이재원",
      priority: 10,
      status: "Processing",
    },
    {
      id: "6",
      name: "스마트 컨트랙트 보안 검토",
      type: "연구 프로젝트",
      deadline: "2024.12.08 19:00",
      leader: "박지호",
      priority: 9,
      status: "Processing",
    },
    {
      id: "7",
      name: "Layer 2 Rollup 효율성 분석",
      type: "연구 프로젝트",
      deadline: "2024.11.28 15:00",
      leader: "이찬호",
      priority: 8,
      status: "Completed",
    },
    {
      id: "8",
      name: "Blockchain Data Indexing API 개발",
      type: "개발 프로젝트",
      deadline: "2024.12.18 18:00",
      leader: "김재원",
      priority: 9,
      status: "Processing",
    },
    {
      id: "9",
      name: "Web3 온보딩 플랫폼 프로토타입",
      type: "개발 프로젝트",
      deadline: "2024.12.12 20:00",
      leader: "서지현",
      priority: 7,
      status: "Pending",
    },
    {
      id: "10",
      name: "Cross-chain 브릿지 검증 및 테스트",
      type: "연구 프로젝트",
      deadline: "2024.12.22 17:00",
      leader: "홍수아",
      priority: 8,
      status: "Processing",
    },
    {
      id: "11",
      name: "Decentralized Identity(DID) 솔루션 개발",
      type: "개발 프로젝트",
      deadline: "2024.12.28 23:59",
      leader: "이재훈",
      priority: 10,
      status: "Processing",
    },
    {
      id: "12",
      name: "Proof-of-Stake 기반 컨센서스 비교 연구",
      type: "연구 프로젝트",
      deadline: "2024.12.05 15:00",
      leader: "정다은",
      priority: 6,
      status: "Completed",
    },
    {
      id: "13",
      name: "GameFi 에코시스템 확장 솔루션",
      type: "개발 프로젝트",
      deadline: "2024.12.30 20:00",
      leader: "김성환",
      priority: 8,
      status: "Pending",
    },
    {
      id: "14",
      name: "Blockchain Analytics Dashboard",
      type: "개발 프로젝트",
      deadline: "2024.12.25 21:00",
      leader: "박소연",
      priority: 9,
      status: "Processing",
    },
    {
      id: "15",
      name: "DeFi 스마트 컨트랙트 자동화",
      type: "개발 프로젝트",
      deadline: "2024.12.18 16:00",
      leader: "이하늘",
      priority: 8,
      status: "Processing",
    },
  ];
  