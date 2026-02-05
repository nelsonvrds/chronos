import { DefaultButton } from "../DefaultButton"
import { DefaultInput } from "../DefaultInput"
import { Cycles } from "../Cycles"
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import type { TaskModel } from "../../models/Taskmodel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatedSecondsToMinutes } from "../../utils/formatedSecondsToMinutes.ts";
import { requestNotificationPermission, notifyTaskStarted, notifyTaskInterrupted } from "../../utils/notifications";

const NEXT_CYCLE_LABELS: Record<TaskModel['type'], string> = {
    workTime: 'Ciclo de foco',
    shortBreakTime: 'Descanso curto',
    longBreakTime: 'Descanso longo',
};

type FeedbackType = "success" | "error" | "info";

export function   MainForm() {
    const { state, setState } = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement>(null);
    const hadActiveTask = useRef(false);
    const [feedback, setFeedback] = useState<{ text: string; type: FeedbackType } | null>(null);

    const nextCycle = getNextCycle(state.currentCycle);

    useEffect(() => {
        if (!feedback) return;
        const timer = setTimeout(() => setFeedback(null), 4000);
        return () => clearTimeout(timer);
    }, [feedback]);

    useEffect(() => {
        if (state.activeTask) {
            hadActiveTask.current = true;
        } else if (hadActiveTask.current) {
            hadActiveTask.current = false;
            if (taskNameInput.current) taskNameInput.current.value = "";
        }
    }, [state.activeTask]);
    const nextCycleType = getNextCycleType(nextCycle);
    const nextCycleLabel = NEXT_CYCLE_LABELS[nextCycleType];
    const nextCycleMinutes = state.config[nextCycleType];


    async function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (taskNameInput.current === null) return;

        const taskName = taskNameInput.current.value.trim();

        if (!taskName) {
            setFeedback({ text: "Por favor, digite uma tarefa", type: "info" });
            return;
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completedDate: null,
            interruptedDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType,
        };
        const secondsRemaining = newTask.duration * 60;

        setState(prevState => ({
            ...prevState,
            config: { ...prevState.config },
            activeTask: newTask,
            currentCycle: nextCycle,
            secondsRemaining,
            formattdSecondsRemaining: formatedSecondsToMinutes(secondsRemaining),
            tasks: [...prevState.tasks, newTask],
        }));

        setFeedback({ text: "Tarefa iniciada", type: "success" });
        const permission = await requestNotificationPermission();
        if (permission === "granted") {
            notifyTaskStarted(taskName, newTask.duration);
        }
    }

    function handleInterruptTask() {
        if (!state.activeTask) return;
        const taskName = state.activeTask.name;
        setFeedback({ text: "A tarefa foi interrompida", type: "error" });
        notifyTaskInterrupted(taskName);
        const now = Date.now();
        setState(prevState => ({
            ...prevState,
            activeTask: null,
            secondsRemaining: 0,
            formattdSecondsRemaining: formatedSecondsToMinutes(0),
            tasks: prevState.tasks.map(task =>
                task.id === state.activeTask!.id
                    ? { ...task, interruptedDate: now }
                    : task
            ),
        }));
    }

    const hasActiveTask = !!state.activeTask;

    const feedbackClass = {
        success: styles.feedbackSuccess,
        error: styles.feedbackError,
        info: styles.feedbackInfo,
    };

    return (
        <>
            {feedback && (
                <div className={`${styles.feedback} ${feedbackClass[feedback.type]}`}>
                    {feedback.text}
                </div>
            )}
            <form onSubmit={handleCreateNewTask} className='form' action="">
                <div className='formRow'>
                    <DefaultInput
                        labelText='Task'
                        id='meuInput'
                        type='text'
                        placeholder='Digite sua tarefa'
                        ref={taskNameInput}
                        disabled={hasActiveTask}
                    />
                </div>

                <div className='formRow'>
                    <p>Próximo: {nextCycleLabel} ({nextCycleMinutes} min)</p>
                </div>

                <div className='formRow'>
                    <Cycles />
                </div>

                <div className='formRow'>
                    {hasActiveTask ? (
                        <DefaultButton
                            type='button'
                            icon={<StopCircleIcon />}
                            color='red'
                            onClick={handleInterruptTask}
                        >
                            Interromper tarefa
                        </DefaultButton>
                    ) : (
                        <DefaultButton type='submit' icon={<PlayCircleIcon />}>
                            Iniciar
                        </DefaultButton>
                    )}
                </div>


            </form>
        </>
    )

}



