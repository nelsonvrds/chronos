import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/Taskmodel';
import styles from './styles.module.css';

const PERIOD_LABELS: Record<TaskModel['type'], string> = {
    workTime: 'Ciclo de foco',
    shortBreakTime: 'Descanso curto',
    longBreakTime: 'Descanso longo',
};

function isFinished(task: TaskModel): boolean {
    return task.completedDate !== null || task.interruptedDate !== null;
}

function formatTime(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

function getEndDate(task: TaskModel): number {
    return task.completedDate ?? task.interruptedDate ?? task.startDate;
}

export function TaskHistory() {
    const { state } = useTaskContext();

    const finishedTasks = state.tasks
        .filter(isFinished)
        .sort((a, b) => b.startDate - a.startDate);

    if (finishedTasks.length === 0) {
        return (
            <div className={styles.history}>
                <h2 className={styles.title}>Histórico de tarefas</h2>
                <p className={styles.empty}>Nenhuma tarefa concluída ou interrompida ainda.</p>
            </div>
        );
    }

    return (
        <div className={styles.history}>
            <h2 className={styles.title}>Histórico de tarefas</h2>
            <div className={styles.tableWrap}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.colTarefa}>Tarefa</th>
                            <th className={styles.colHorario}>Horário</th>
                            <th className={styles.colPeriodo}>Período</th>
                            <th className={styles.colStatus}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {finishedTasks.map((task) => (
                            <tr key={task.id} className={styles.row}>
                                <td className={styles.colTarefa}>{task.name}</td>
                                <td className={styles.colHorario} title={`Início: ${formatTime(task.startDate)} — Fim: ${formatTime(getEndDate(task))}`}>
                                    {formatTime(task.startDate)} → {formatTime(getEndDate(task))}
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
                                            task.completedDate !== null
                                                ? styles.badgeCompleted
                                                : styles.badgeInterrupted
                                        }
                                        title={
                                            task.completedDate !== null
                                                ? 'Tarefa executada até o fim'
                                                : 'Tarefa interrompida'
                                        }
                                    >
                                        {task.completedDate !== null ? 'Concluída' : 'Interrompida'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
