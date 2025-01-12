export interface ProjectTask {
  id: string; // uuid
  project_id: string; // uuid
  title: string; // varchar
  description: string; // text
  contribute_score: number; // float
  task_url: string; // text
  created_at: string; // timestamptz
  deadline: string; // timestamptz
  assigned_users: string[]; // text[]
  status: string; // task_status
  priority: string; // priority
}

export const tasks: ProjectTask[] = [
  // NFT 마켓플레이스 개발 (Project ID: 1)
  {
    id: "101",
    project_id: "1",
    title: "UI 설계",
    description: "NFT 마켓플레이스의 사용자 인터페이스 설계 작업",
    contribute_score: 5.0,
    task_url: "https://example.com/task/101",
    created_at: "2024-11-01T10:30:00Z",
    deadline: "2024-11-15T18:00:00Z",
    assigned_users: ["박지호", "최세창"],
    status: "In Progress",
    priority: "High",
  },
  {
    id: "102",
    project_id: "1",
    title: "스마트 컨트랙트 개발",
    description: "NFT 거래를 처리하는 스마트 컨트랙트 개발 작업",
    contribute_score: 8.0,
    task_url: "https://example.com/task/102",
    created_at: "2024-11-02T11:00:00Z",
    deadline: "2024-11-20T18:00:00Z",
    assigned_users: ["김재원", "박지호"],
    status: "In Progress",
    priority: "High",
  },
  {
    id: "103",
    project_id: "1",
    title: "백엔드 API 구축",
    description: "NFT 데이터와 연동되는 백엔드 API 구축 작업",
    contribute_score: 7.0,
    task_url: "https://example.com/task/103",
    created_at: "2024-11-03T12:00:00Z",
    deadline: "2024-11-25T18:00:00Z",
    assigned_users: ["정원필", "박지호"],
    status: "Pending",
    priority: "Medium",
  },
  // 탈중앙화 투표 시스템 구축 (Project ID: 2)
  {
    id: "201",
    project_id: "2",
    title: "투표 스마트 컨트랙트 개발",
    description: "투명한 투표를 위한 스마트 컨트랙트 개발",
    contribute_score: 9.0,
    task_url: "https://example.com/task/201",
    created_at: "2024-11-02T13:00:00Z",
    deadline: "2024-11-22T23:59:00Z",
    assigned_users: ["김승원", "박소연"],
    status: "In Progress",
    priority: "High",
  },
  {
    id: "202",
    project_id: "2",
    title: "투표 결과 시각화",
    description: "투표 결과 데이터를 시각화하는 대시보드 개발",
    contribute_score: 6.0,
    task_url: "https://example.com/task/202",
    created_at: "2024-11-03T14:00:00Z",
    deadline: "2024-11-28T23:59:00Z",
    assigned_users: ["정원필", "김재원"],
    status: "Pending",
    priority: "Medium",
  },
  {
    id: "203",
    project_id: "2",
    title: "테스트 및 검증",
    description: "투표 시스템의 전체 테스트 및 검증 작업",
    contribute_score: 7.0,
    task_url: "https://example.com/task/203",
    created_at: "2024-11-04T15:00:00Z",
    deadline: "2024-12-01T23:59:00Z",
    assigned_users: ["박소연", "최세창"],
    status: "Pending",
    priority: "Medium",
  },
  // ZKP(영지식 증명) 라이브러리 검증 (Project ID: 3)
  {
    id: "301",
    project_id: "3",
    title: "ZKP 프로토콜 분석",
    description: "ZKP 프로토콜의 보안 분석 작업",
    contribute_score: 8.5,
    task_url: "https://example.com/task/301",
    created_at: "2024-11-05T10:30:00Z",
    deadline: "2024-11-15T17:00:00Z",
    assigned_users: ["최세창", "김재원"],
    status: "In Progress",
    priority: "High",
  },
  {
    id: "302",
    project_id: "3",
    title: "라이브러리 코드 검토",
    description: "ZKP 라이브러리의 코드 품질 및 보안 검토",
    contribute_score: 7.5,
    task_url: "https://example.com/task/302",
    created_at: "2024-11-06T11:00:00Z",
    deadline: "2024-11-20T17:00:00Z",
    assigned_users: ["김재원", "박소연"],
    status: "Pending",
    priority: "Medium",
  },
  {
    id: "303",
    project_id: "3",
    title: "테스트 사례 설계",
    description: "ZKP 검증을 위한 테스트 사례 설계",
    contribute_score: 6.5,
    task_url: "https://example.com/task/303",
    created_at: "2024-11-07T12:00:00Z",
    deadline: "2024-11-25T17:00:00Z",
    assigned_users: ["박소연", "정원필"],
    status: "Pending",
    priority: "Low",
  },
];
