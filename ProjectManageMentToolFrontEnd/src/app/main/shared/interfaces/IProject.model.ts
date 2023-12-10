export interface IProject extends IEditProject {
    id: string;
    userId: string;
    
}

export interface IEditProject{
    name: string;
    description: string;
    isCompleted: boolean;
    projectId: string;
}
