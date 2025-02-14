type APIData = {
    DataSet1?: any;
    DataSet2?: any;
    DataSet3?: any;
    DataSet4?: any;
    DataSet5?: any;
    DataSet6?: any;
    DataSet7?: any;
    DataSet8?: any;
    DataSet9?: any;
    DataSet10?: any;
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
