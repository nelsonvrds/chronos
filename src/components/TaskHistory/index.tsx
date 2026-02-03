import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/Taskmodel';
import styles from './styles.module.css';

function isFinished(task: TaskModel): boolean {
    return task.completedDate !== null || task.interruptedDate !== null;
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
            <ul className={styles.list}>
                {finishedTasks.map((task) => (
                    <li key={task.id} className={styles.item}>
                        <span className={styles.taskName}>{task.name}</span>
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
                    </li>
                ))}
            </ul>
        </div>
    );
}
