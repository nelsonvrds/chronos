import type { TaskModel } from "./Taskmodel";

export type TaskStateModel = {
    tasks: TaskModel[];
    secondsRemaining: number;
    formattdSecondsRemaining: string;
    activeTask: TaskModel | null;
    currentCycle: number; 
    config: {
        workTime: number;
        shortBreakTime: number;
        longBreakTime: number;
    }
} 

