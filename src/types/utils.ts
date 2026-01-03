export interface IUserLogin {
    usernameOrEmail: string;
    password: string;
}

export interface IRegisterStudy {
    title: string;
    studyDate: Date;
    description: string;
}

export interface IStudyTask {
    id: string;
    title: string;
    studyDate: string;
    createdAt: string;
    isExpired: boolean;
    isFinalized: boolean;
    description: string | null;
}