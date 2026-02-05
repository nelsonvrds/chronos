import { useEffect, useState } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { formatedSecondsToMinutes } from "../../utils/formatedSecondsToMinutes.ts";
import { loadTasksFromStorage, saveTasksToStorage } from "../../utils/taskStorage";
import { loadConfigFromStorage, saveConfigToStorage } from "../../utils/configStorage";

type TaskContextProviderProps = {
    children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, setState] = useState(() => {
        const savedTasks = loadTasksFromStorage();
        const savedConfig = loadConfigFromStorage();
        return { ...initialTaskState, tasks: savedTasks, config: savedConfig };
    });

    useEffect(() => {
        saveTasksToStorage(state.tasks);
    }, [state.tasks]);

    useEffect(() => {
        saveConfigToStorage(state.config);
    }, [state.config]);

    function clearHistory() {
        setState((prev) => ({
            ...prev,
            tasks: prev.tasks.filter((t) => t.completedDate === null && t.interruptedDate === null),
        }));
    }

    useEffect(() => {
        if (!state.activeTask) return;

        const intervalId = setInterval(() => {
            setState((prevState) => {
                if (!prevState.activeTask) return prevState;
                const nextSeconds = prevState.secondsRemaining - 1;

                if (nextSeconds <= 0) {
                    const now = Date.now();
                    return {
                        ...prevState,
                        activeTask: null,
                        secondsRemaining: 0,
                        formattdSecondsRemaining: formatedSecondsToMinutes(0),
                        tasks: prevState.tasks.map((task) =>
                            task.id === prevState.activeTask!.id
                                ? { ...task, completedDate: now }
                                : task
                        ),
                    };
                }

                return {
                    ...prevState,
                    secondsRemaining: nextSeconds,
                    formattdSecondsRemaining: formatedSecondsToMinutes(nextSeconds),
                };
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [state.activeTask]);

    useEffect(() => {
        if (state.activeTask) {
            document.title = `Chronos Pomodoro - ${state.formattdSecondsRemaining}`;
        } else {
            document.title = "Chronos Pomodoro";
        }
    }, [state.activeTask, state.formattdSecondsRemaining]);

    return (
        <TaskContext.Provider value={{ state, setState, clearHistory }}>
            {children}
        </TaskContext.Provider>
    );
}