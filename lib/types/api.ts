type APIData = {
    DataSet1?: unknown;
    DataSet2?: unknown;
    DataSet3?: unknown;
    DataSet4?: unknown;
    DataSet5?: unknown;
    DataSet6?: unknown;
    DataSet7?: unknown;
    DataSet8?: unknown;
    DataSet9?: unknown;
    DataSet10?: unknown;
};

type APIError = {
    status: number;
    message: string;
    details?: string | null;
};

type APIResponse = {
    data: APIData | null;
    error: APIError | null;
};

export type { APIData, APIResponse };
