/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SignInDto {
  /**
   * 회원가입된 사용자의 지갑주소
   * @example "0xc832e2C6cB5F6893134225B204Af8733edeC8e92"
   */
  walletAddress: string;
  /**
   * 메타마스크에서 사용자가 서명한 서명값
   * @example "개발자 모드에서는 아무 문자열이나 넣어도됨"
   */
  signature: string;
  /**
   * 사용자의 메세지
   * @example "테스트용 아무 메세지나 넣기 "
   */
  message: string;
}

export interface RegisterDto {
  /**
   * 사용자의 이름
   * @example "정원필"
   */
  name: string;
  /**
   * 사용자의 학과(데이터 타입이 department type이라 아무 학과나 넣으면 에러남
   * @example "computer_science"
   */
  department: string;
  /**
   * 사용자의 학번
   * @format int64
   * @example "12250000"
   */
  studentNumber: number;
  /**
   * 사용자의 지갑주소
   * @example "0xc832e2C6cB5F6893134225B204Af8733edeC8e92"
   */
  walletAddress: string;
}

export interface CreateTestSignatureDto {
  /**
   * 증명 데이터 (JSON 문자열 형태)
   * @example "{"type":"session_attendance","date":"2025-03-15","details":"블록체인 세션 참석"}"
   */
  proofData: string;
  /**
   * 첨부 파일(이미지, pdf, word, txt 등)
   * @format binary
   */
  file?: File;
}

export interface SubmitProofDto {
  /**
   * 활동 유형 ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  activityTypeId: string;
  /**
   * 증명 데이터 (JSON 문자열 형태)
   * @example "{"type":"session_attendance","date":"2025-03-15","details":"블록체인 세션 참석"}"
   */
  proofData: string;
  /**
   * 첨부 파일 (옵션)
   * @format binary
   */
  file?: File;
}

export interface SubmitProofSignatureDto {
  /**
   * 활동 유형 ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  activityTypeId: string;
  /**
   * IPFS에 업로드된 증명 데이터의 해시값
   * @example "bafkreihdwdceuuh6tp3tgjqzayvqsvhtzvflpe5hpxz3rx5cgys2q2j3we"
   */
  jsonIpfsHash: string;
  /**
   * IPFS에 업로드된 첨부 파일의 해시값 (파일이 없으면 null)
   * @example "QmVtYjDqJqtxpqUw1MbbWp1k4GkYX5PfUvP9ZcNNFMRfPg"
   */
  fileIpfsHash?: string;
  /**
   * 사용자가 서명한 값
   * @example "0x9f89201b2d41270a281cf08bce03dcec8c07e10fd6c232dcfd04db348ffa770d..."
   */
  signature: string;
  /**
   * 사용자가 서명한 지갑의 주소소
   * @example "0xc832e2C6cB5F6893134225B204Af8733edeC8e92"
   */
  walletAddress: string;
}

export type CreatePocActivityDto = object;

export interface CreateProjectDto {
  /**
   * 프로젝트 이름
   * @example "기여도 측정 및 보상 분배 프로젝트"
   */
  project_name: string;
  /**
   * 프로젝트 설명
   * @example "학회원들의 공정한 기여도 측정 및 보상 분배를 위한 Dapp "
   */
  description: string;
  /**
   * 프로젝트 시작 날짜
   * @format date-time
   * @example "2025-02-23"
   */
  start_date: string;
  /**
   * 프로젝트 종료 날짜
   * @format date-time
   * @example "2025-05-23"
   */
  end_date: string;
  /**
   * 프로젝트 멤버
   * @example [{"member_name":"정원필","role":"developer"},{"member_name":"김승원","role":"designer"}]
   */
  members: any[][];
  /**
   * 프로젝트 레포지토리 링크
   * @example ["https://github.com/example1","https://github.com/example2"]
   */
  repo_link: string[];
}

export interface ApproveProjectDto {
  /**
   * 프로젝트 ID
   * @example "b4f0e1e9-4c7b-4f5c-9c9b-9c9b9c9b9c9b"
   */
  project_id: string;
  /**
   * 승인 상태
   * @example true
   */
  approve_status: boolean;
  /**
   * 관리자 코멘트
   * @example "프로젝트 승인을 축하합니다!"
   */
  admin_comment?: string;
}

export interface UpdateRepositoryDto {
  /**
   * 프로젝트 ID
   * @example "b4f0e1e9-4c7b-4f5c-9c9b-9c9b9c9b9c9b"
   */
  project_id: string;
  /**
   * 레포지토리 링크
   * @example "https://github.com/example"
   */
  repo_link: string;
}

export interface CreateEpochDto {
  /**
   * 에포크 제목
   * @example "2024년 1학기"
   */
  title: string;
  /**
   * 시작일
   * @format date-time
   * @example "2024-03-01"
   */
  startDate: string;
  /**
   * 종료일
   * @format date-time
   * @example "2024-06-30"
   */
  endDate: string;
  /**
   * 보상 금액
   * @example 1000000
   */
  rewardValue: number;
}

export interface CreatePocDto {
  /**
   * POC 항목
   * @example "UI 디자인"
   */
  entity: string;
  /**
   * 서명
   * @example "서명"
   */
  signature: string;
  /**
   * POC 종류
   * @example "디자인"
   */
  category: string;
  /**
   * 기여 점수
   * @example 10
   */
  score: number;
  /**
   * 설명
   * @example "UI/UX 개선을 우한 디자인 제안"
   */
  description: string;
  /**
   * 에포크 ID
   * @example "f9890740-eefc-467a-8c1a-1a0215a7da59"
   */
  epoch_id: string;
}

export interface CreateTaskDto {
  /**
   * 점수
   * @example 10
   */
  score: number;
}

export interface CreateValidatorDto {
  /**
   * 돈을 예치한 지갑 주소
   * @example "0xc832e2C6cB5F6893134225B204Af8733e..."
   */
  walletAddress: string;
}

export interface CreateValidationDto {
  /**
   * 테스크 ID
   * @example "97f3c7d2-f305-4148-bbbd-4dc14..."
   */
  taskId: string;
}

export interface UpdateValidationDto {
  /**
   * 검증인의 코멘트
   * @example "comment..."
   */
  comment: string;
  /**
   * 검증 보상 컨트랙트 주소
   * @example "0xc832e2C6cB5F6893134225B204Af8733e..."
   */
  rewardContractAddress: string;
}

export interface UpdateValidationResponse {
  /**
   * 검증 ID
   * @example "27520da2-cf32-4a84-8022-723f..."
   */
  id: string;
  /**
   * 검증인 ID
   * @example "f95adae0-f350-4438-89dc-f721..."
   */
  vali_id: string;
  /**
   * 검증 상태
   * @example "validating"
   */
  status: string;
  /**
   * 검증인의 코멘트
   * @example "comment..."
   */
  comment: string;
  /**
   * 검증 보상 컨트랙트 주소
   * @example "0xc832e2C6cB5F6893134225B204Af8733e..."
   */
  reward_contract_address: string;
  /**
   * 생성일
   * @example "2025-02-26T08:08:41.535+00:00"
   */
  created_at: string;
  /**
   * 테스크 ID
   * @example "97f3c7d2-f305-4148-bbbd-4dc14..."
   */
  task_id: string;
}

export interface SuccessMessageResponse {
  /**
   * 성공 메시지
   * @example "검증 상태를 성공적으로 reported로 업데이트하였습니다."
   */
  message: string;
}

export interface CreateReportDto {
  /**
   * 검증 ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  validation_id: string;
  /**
   * 신고 코멘트
   * @example "이 검증은 오류가 있습니다."
   */
  reporter_comment: string;
}

export interface CreateReportResponse {
  /**
   * 리포트 ID
   * @example "db0a8b08-9cb8-41a8-8619-7a66..."
   */
  id: string;
  /**
   * 사용자 ID
   * @example "faa59f94-be69-4328-a808-dadb..."
   */
  user_id: string;
  /**
   * 검증 ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  validation_id: string;
  /**
   * 예치 컨트랙트 주소
   * @example null
   */
  staking_contract_address: string;
  /**
   * 리포트 상태
   * @example "pending"
   */
  status: string;
  /**
   * 리포트 생성일
   * @example "2025-02-26T12:25:30.724+00:00"
   */
  created_at: string;
  /**
   * 신고 코멘트
   * @example "이 검증은 오류가 있습니다."
   */
  reporter_comment: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title PoC System API
 * @version 1.0
 * @contact
 *
 * Proof of Contribution 시스템 API 문서
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerSignIn
     * @summary 지갑 서명을 통한 로그인
     * @request POST:/auth/sign-in
     */
    authControllerSignIn: (data: SignInDto, params: RequestParams = {}) =>
      this.request<
        {
          access_token?: string;
          user?: object;
        },
        any
      >({
        path: `/auth/sign-in`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerRegister
     * @summary 새 사용자 등록
     * @request POST:/auth/register
     */
    authControllerRegister: (data: RegisterDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  blockchain = {
    /**
     * No description
     *
     * @tags blockchain
     * @name BlockchainControllerCreateTestSignature
     * @summary 테스트용 서명 생성
     * @request POST:/blockchain/create-test-signature
     */
    blockchainControllerCreateTestSignature: (data: CreateTestSignatureDto, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/blockchain/create-test-signature`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  admin = {
    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerGrantAdminRole
     * @request POST:/admin/grant-admin-role/{userId}
     * @secure
     */
    adminControllerGrantAdminRole: (userId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/admin/grant-admin-role/${userId}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerApproveUser
     * @request POST:/admin/approve-user/{userId}
     * @secure
     */
    adminControllerApproveUser: (userId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/admin/approve-user/${userId}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerCloseProject
     * @request POST:/admin/close-project/{projectId}
     */
    adminControllerCloseProject: (projectId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/admin/close-project/${projectId}`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerApproveUserRequest
     * @request GET:/admin/approve-user-request
     */
    adminControllerApproveUserRequest: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/admin/approve-user-request`,
        method: "GET",
        ...params,
      }),
  };
  users = {
    /**
     * @description 등록된 유저의 목록을 조회합니다.
     *
     * @tags User
     * @name UserControllerGetAllUsers
     * @summary 모든 유저 목록 조회
     * @request GET:/users
     * @secure
     */
    userControllerGetAllUsers: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerUpdateUserStatus
     * @request PATCH:/users/{userId}
     */
    userControllerUpdateUserStatus: (userId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${userId}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetUserId
     * @request GET:/users/id/{walletAddress}
     * @secure
     */
    userControllerGetUserId: (walletAddress: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/id/${walletAddress}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  activity = {
    /**
     * No description
     *
     * @tags Activity
     * @name ActivityControllerGenerateProofHash
     * @summary 사용자의 활동 증명을 IPFS에 업로드하고 해시 생성
     * @request POST:/activity/generate-proof-hash
     * @secure
     */
    activityControllerGenerateProofHash: (data: SubmitProofDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/activity/generate-proof-hash`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Activity
     * @name ActivityControllerSubmitProof
     * @summary IPFS 해시를 기반으로 활동 증명 제출
     * @request POST:/activity/{id}/submit-proof
     * @secure
     */
    activityControllerSubmitProof: (id: string, data: SubmitProofSignatureDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/activity/${id}/submit-proof`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Activity
     * @name ActivityControllerApproveProof
     * @summary 관리자가 활동 증명을 승인
     * @request POST:/activity/approve-proof
     * @secure
     */
    activityControllerApproveProof: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/activity/approve-proof`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Activity
     * @name ActivityControllerCreatePocActivity
     * @summary PoC 활동 생성
     * @request POST:/activity/create
     * @secure
     */
    activityControllerCreatePocActivity: (data: CreatePocActivityDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/activity/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  projects = {
    /**
     * @description 리더가 새로운 프로젝트를 신청합니다.
     *
     * @tags project
     * @name ProjectControllerCreateProject
     * @summary 새로운 프로젝트 등록
     * @request POST:/projects
     * @secure
     */
    projectControllerCreateProject: (data: CreateProjectDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/projects`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 관리자가 프로젝트를 승인 또는 거절합니다.
     *
     * @tags project
     * @name ProjectControllerApproveProject
     * @summary 프로젝트 승인/거절
     * @request POST:/projects/approve
     * @secure
     */
    projectControllerApproveProject: (data: ApproveProjectDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/projects/approve`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 승인된 프로젝트에 GitHub 레포지토리를 추가합니다.
     *
     * @tags project
     * @name ProjectControllerInsertRepository
     * @summary 새로운 레포지토리 추가
     * @request POST:/projects/repository
     */
    projectControllerInsertRepository: (data: UpdateRepositoryDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/projects/repository`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 주어진 프로젝트id의 테스크를 조회합니다.
     *
     * @tags project
     * @name ProjectControllerGetTasksByProjectId
     * @summary 프로젝트의 테스크 조회
     * @request GET:/projects/{id}/tasks
     * @secure
     */
    projectControllerGetTasksByProjectId: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/projects/${id}/tasks`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 주어진 테스크를 조회합니다.
     *
     * @tags project
     * @name ProjectControllerGetTaskById
     * @summary 테스크 상세 조회
     * @request GET:/projects/task/{id}
     * @secure
     */
    projectControllerGetTaskById: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/projects/task/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 나에게 할당된 테스크를 조회합니다.
     *
     * @tags project
     * @name ProjectControllerGetMyTask
     * @summary 나의 테스크 조회
     * @request GET:/projects/my-tasks
     * @secure
     */
    projectControllerGetMyTask: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/projects/my-tasks`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 나에게 할당된 테스크의 진행도를 조회합니다.
     *
     * @tags project
     * @name ProjectControllerGetMyTaskProgress
     * @summary 나의 테스크 목록 조회
     * @request GET:/projects/my-progress
     * @secure
     */
    projectControllerGetMyTaskProgress: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/projects/my-progress`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 프로젝트의 진행률을 조회합니다.
     *
     * @tags project
     * @name ProjectControllerGetProjectProgressById
     * @summary 프로젝트 진행률 조회
     * @request GET:/projects/{id}/progess
     * @secure
     */
    projectControllerGetProjectProgressById: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/projects/${id}/progess`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 특정 상태의 프로젝트 목록을 조회합니다.
     *
     * @tags project
     * @name ProjectControllerGetProjectsByStatus
     * @summary 프로젝트 상태별 조회
     * @request GET:/projects/status/{status}
     */
    projectControllerGetProjectsByStatus: (status: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/projects/status/${status}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description 사용자 본인이 현재 참여중인 프로젝트 목록을 조회합니다.
     *
     * @tags project
     * @name ProjectControllerGetMyProjects
     * @summary 사용자가 현재 참여중인 모든 프로젝트 목록 조회
     * @request GET:/projects/myproject
     * @secure
     */
    projectControllerGetMyProjects: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/projects/myproject`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  epochs = {
    /**
     * No description
     *
     * @tags epochs
     * @name EpochControllerCreateEpoch
     * @summary 새로운 에포크 생성
     * @request POST:/epochs
     * @secure
     */
    epochControllerCreateEpoch: (data: CreateEpochDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/epochs`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags epochs
     * @name EpochControllerApproveEpoch
     * @request PATCH:/epochs/{epochId}
     * @secure
     */
    epochControllerApproveEpoch: (epochId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/epochs/${epochId}`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags epochs
     * @name EpochControllerGetCurrentEpoch
     * @summary 현재 활성화된 에포크 조회
     * @request GET:/epochs/current
     * @secure
     */
    epochControllerGetCurrentEpoch: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/epochs/current`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags epochs
     * @name EpochControllerSettleEpoch
     * @summary 에포크 정산
     * @request POST:/epochs/{id}/settle
     * @secure
     */
    epochControllerSettleEpoch: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/epochs/${id}/settle`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags epochs
     * @name EpochControllerGetEpochRewards
     * @summary 에포크 보상 정보 조회
     * @request GET:/epochs/{id}/rewards
     * @secure
     */
    epochControllerGetEpochRewards: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/epochs/${id}/rewards`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags epochs
     * @name EpochControllerGetEpochActivities
     * @summary 에포크 활동 내역 조회
     * @request GET:/epochs/{id}/activities
     * @secure
     */
    epochControllerGetEpochActivities: (
      id: string,
      query: {
        userId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/epochs/${id}/activities`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  poc = {
    /**
     * No description
     *
     * @tags Poc
     * @name PocControllerCreatePoc
     * @request POST:/poc
     */
    pocControllerCreatePoc: (data: CreatePocDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/poc`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Poc
     * @name PocControllerCreateTask
     * @request POST:/poc/{pocId}/task
     */
    pocControllerCreateTask: (pocId: string, data: CreateTaskDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/poc/${pocId}/task`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  scores = {
    /**
     * No description
     *
     * @tags Score
     * @name ScoreControllerAddUserScore
     * @request POST:/scores
     */
    scoreControllerAddUserScore: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/scores`,
        method: "POST",
        ...params,
      }),
  };
  validate = {
    /**
     * @description 검증인을 등록하는 API입니다.
     *
     * @tags Validate
     * @name ValidateControllerCreateValidator
     * @summary 검증인 등록 API
     * @request POST:/validate/validator
     * @secure
     */
    validateControllerCreateValidator: (data: CreateValidatorDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/validate/validator`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 검증을 생성하는 API입니다.
     *
     * @tags Validate
     * @name ValidateControllerCreateValidation
     * @summary 검증 생성 API
     * @request POST:/validate/validation
     * @secure
     */
    validateControllerCreateValidation: (data: CreateValidationDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/validate/validation`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 검증인이 테스크 완수를 인정하여 검증 상태를 validating으로 업데이트하는 API입니다.
     *
     * @tags Validate
     * @name ValidateControllerUpdateValidation
     * @summary 검증 상태를 validating으로 업데이트하는 API
     * @request PATCH:/validate/validation/{validationId}
     * @secure
     */
    validateControllerUpdateValidation: (validationId: any, data: UpdateValidationDto, params: RequestParams = {}) =>
      this.request<UpdateValidationResponse, void>({
        path: `/validate/validation/${validationId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 검증에 대한 리포트가 승인되어 검증 상태를 reported으로 업데이트하는 API입니다.
     *
     * @tags Validate
     * @name ValidateControllerUpdateValidationToReported
     * @summary 검증 상태 reported로 업데이트하는 API
     * @request PATCH:/validate/reported/{validationId}
     * @secure
     */
    validateControllerUpdateValidationToReported: (validationId: string, params: RequestParams = {}) =>
      this.request<SuccessMessageResponse, void>({
        path: `/validate/reported/${validationId}`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 검증 상태가 reported인 검증을 조회하는 API입니다.
     *
     * @tags Validate
     * @name ValidateControllerGetReportedValidation
     * @summary 검증 상태가 reported인 검증을 조회하는 API
     * @request GET:/validate/reported
     * @secure
     */
    validateControllerGetReportedValidation: (params: RequestParams = {}) =>
      this.request<UpdateValidationResponse[], any>({
        path: `/validate/reported`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  report = {
    /**
     * @description 검증에 대한 리포트를 생성하는 API입니다.
     *
     * @tags Report
     * @name ReportControllerCreateReport
     * @summary 리포트 생성 API
     * @request POST:/report
     * @secure
     */
    reportControllerCreateReport: (data: CreateReportDto, params: RequestParams = {}) =>
      this.request<CreateReportResponse, void>({
        path: `/report`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 검증에 대한 리포트를 승인하는 API입니다.
     *
     * @tags Report
     * @name ReportControllerUpdateReportToAccept
     * @summary 리포트 승인 API
     * @request PATCH:/report/success/{reportId}
     * @secure
     */
    reportControllerUpdateReportToAccept: (reportId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/report/success/${reportId}`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 검증에 대한 리포트를 반려하는 API입니다.
     *
     * @tags Report
     * @name ReportControllerUpdateReportToReject
     * @summary 리포트 반려 API
     * @request PATCH:/report/reject/{reportId}
     * @secure
     */
    reportControllerUpdateReportToReject: (reportId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/report/reject/${reportId}`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
