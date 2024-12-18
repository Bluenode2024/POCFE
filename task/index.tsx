export interface Task {
  id: string;
  name: string;
  priority: number;
  status: string;
  deadline: string;
  address: string; // 주소 필드 추가
}

export const tasks: Task[] = [
  { id: "1", name: "프론트엔드 디자인", priority: 3, status: "Processing", deadline: "2024.12.15 18:00", address: "0xBc82945c549405AC733c80A6b616b8bC337713bD" },
  { id: "1", name: "스마트 컨트랙트 작성", priority: 3, status: "Pending", deadline: "2024.12.16 18:00", address: "0xBc82945c549405AC733c80A6b616b8bC337713bD" },
  { id: "1", name: "백엔드 통합", priority: 3, status: "Pending", deadline: "2024.12.17 18:00", address: "0xBc82945c549405AC733c80A6b616b8bC337713bD" },

  { id: "2", name: "스마트 컨트랙트 설계", priority: 4, status: "Processing", deadline: "2024.12.20 23:59", address: "0xBc82945c549405AC733c80A6b616b8bC337713bD" },
  { id: "2", name: "UI 개발", priority: 3, status: "Processing", deadline: "2024.12.22 23:59", address: "0xBc82945c549405AC733c80A6b616b8bC337713bD" },
  { id: "2", name: "테스트 자동화", priority: 3, status: "Pending", deadline: "2024.12.24 23:59", address: "0xBc82945c549405AC733c80A6b616b8bC337713bD" },

  { id: "3", name: "코드 분석", priority: 4, status: "Processing", deadline: "2024.11.25 17:00", address: "0xBc82945c549405AC733c80A6b616b8bC337713bD" },
  { id: "3", name: "테스트 작성", priority: 4, status: "Completed", deadline: "2024.11.28 17:00", address: "0xBc82945c549405AC733c80A6b616b8bC337713bD" },

  { id: "4", name: "구조 설계", priority: 3, status: "Pending", deadline: "2024.12.10 20:00", address: "0xBc82945c549405AC733c80A6b616b8bC337713bD" },
  { id: "4", name: "스마트 컨트랙트 개발", priority: 2, status: "Pending", deadline: "2024.12.12 20:00", address: "0xBc82945c549405AC733c80A6b616b8bC337713bD" },
  { id: "4", name: "시뮬레이션 테스트", priority: 2, status: "Pending", deadline: "2024.12.14 20:00", address: "0xBc82945c549405AC733c80A6b616b8bC337713bD" },

  { id: "5", name: "게임 디자인", priority: 4, status: "Processing", deadline: "2024.12.05 22:00", address: "0xBc82945c549405AC733c80A6b616b8bC337713bD" },
  { id: "5", name: "스마트 컨트랙트 개발", priority: 3, status: "Processing", deadline: "2024.12.07 22:00", address: "0xBc82945c549405AC733c80A6b616b8bC337713bD" },
  { id: "5", name: "배포 및 테스트", priority: 3, status: "Pending", deadline: "2024.12.10 22:00", address: "0xBc82945c549405AC733c80A6b616b8bC337713bD" },

  // 추가된 모든 task에도 동일한 address를 하드코딩
];
