import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import type { TaskModel } from '../../models/Taskmodel';
import styles from './styles.module.css';

const CYCLE_LABELS: Record<TaskModel['type'], string> = {
    workTime: 'Ciclo de foco',
    shortBreakTime: 'Descanso curto',
    longBreakTime: 'Descanso longo',
};

export function Cycles() {
    const { state } = useTaskContext();

    const cycleStep = Array.from({ length: state.currentCycle });

    return (
        <div className={styles.cycles}>
            <span className={styles.cyclesTitle}>Ciclos</span>

            <div className={styles.cyclesDots}>
                {cycleStep.map((_, index) => {
                    const cycleNumber = getNextCycle(index);
                    const nextCycleType = getNextCycleType(cycleNumber);
                    const label = CYCLE_LABELS[nextCycleType];
                    return (
                        <span
                            key={index}
                            className={`${styles.cyclesDot} ${styles[nextCycleType]}`}
                            title={`${label} (ciclo ${cycleNumber})`}
                            aria-label={label}
                        />
                    );
                })}
            </div>
        </div>
    );
}
