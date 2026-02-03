import { useEffect, useState } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { formatedSecondsToMinutes } from "../../utils/formatedSecondsToMinutes.ts";

type TaskContextProviderProps = {
    children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, setState] = useState(initialTaskState);

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

    return (
        <TaskContext.Provider value={{ state, setState }}>
            {children}
        </TaskContext.Provider>
    );
}