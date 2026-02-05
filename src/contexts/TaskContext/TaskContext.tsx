import { createContext } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { initialTaskState } from "./initialTaskState";

type taskContextProps = {
    state: TaskStateModel;
    setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
    clearHistory: () => void;
}

const initialContextValue = {
    state: initialTaskState,
    setState: () => {},
    clearHistory: () => {},
}

export const TaskContext = createContext<taskContextProps>(initialContextValue);




