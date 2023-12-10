export interface ITask extends ITaskEdit {
    id: string;
    
}

export interface ITaskEdit{
    title: string;
    description: string;
    isCompleted: boolean;
    projectId: string;
}