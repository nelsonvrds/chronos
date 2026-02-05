import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/Taskmodel';
import { DefaultButton } from '../DefaultButton';
import { Trash2Icon } from 'lucide-react';
import styles from './styles.module.css';

const PERIOD_LABELS: Record<TaskModel['type'], string> = {
    workTime: 'Ciclo de foco',
    shortBreakTime: 'Descanso curto',
    longBreakTime: 'Descanso longo',
};

function isFinished(task: TaskModel): boolean {
    return task.completedDate !== null || task.interruptedDate !== null;
}

function isInProgress(task: TaskModel, activeTaskId: string | null): boolean {
    return activeTaskId !== null && task.id === activeTaskId;
}

function formatDateTime(timestamp: number): string {
    const date = new Date(timestamp);
    const dateStr = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const timeStr = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    return `${dateStr} ${timeStr}`;
}

export function TaskHistory() {
    const { state, clearHistory } = useTaskContext();

    const allTasks = state.tasks
        .sort((a, b) => b.startDate - a.startDate);

    if (allTasks.length === 0) {
        return (
            <div className={styles.history}>
                <h2 className={styles.title}>Histórico de tarefas</h2>
                <p className={styles.empty}>Nenhuma tarefa concluída ou interrompida ainda.</p>
            </div>
        );
    }

    return (
        <div className={styles.history}>
            <div className={styles.header}>
                <h2 className={styles.title}>Histórico de tarefas</h2>
                <DefaultButton type="button" icon={<Trash2Icon />} color="red" onClick={clearHistory}>
                    Apagar histórico
                </DefaultButton>
            </div>
            <div className={styles.tableWrap}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.colTarefa}>Tarefa</th>
                            <th className={styles.colHorario}>Data/Hora</th>
                            <th className={styles.colPeriodo}>Período</th>
                            <th className={styles.colStatus}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTasks.map((task) => {
                            const inProgress = isInProgress(task, state.activeTask?.id ?? null);
                            return (
                                <tr key={task.id} className={styles.row}>
                                    <td className={styles.colTarefa}>{task.name}</td>
                                    <td className={styles.colHorario}>
                                        {formatDateTime(task.startDate)}
                                    </td>
                                    <td className={styles.colPeriodo}>
                                        <span
                                            className={`${styles.periodBadge} ${styles[`period_${task.type}`]}`}
                                            title={PERIOD_LABELS[task.type]}
                                        >
                                            {PERIOD_LABELS[task.type]} ({task.duration} min)
                                        </span>
                                    </td>
                                    <td className={styles.colStatus}>
                                        <span
                                            className={
                                                inProgress
                                                    ? styles.badgeInProgress
                                                    : task.completedDate !== null
                                                        ? styles.badgeCompleted
                                                        : styles.badgeInterrupted
                                            }
                                            title={
                                                inProgress
                                                    ? 'Tarefa em andamento'
                                                    : task.completedDate !== null
                                                        ? 'Tarefa executada até o fim'
                                                        : 'Tarefa interrompida'
                                            }
                                        >
                                            {inProgress ? 'Em progresso' : task.completedDate !== null ? 'Concluída' : 'Interrompida'}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
