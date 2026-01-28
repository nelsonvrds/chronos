import styles from './styles.module.css';

export function Cycles() {
    return (
        <div className={styles.cycles}>
            <span>Ciclos</span>
            <div className={styles.cyclesDots}>
                <span className={`${styles.cyclesDot} ${styles.workTime}`}></span>
                <span className={`${styles.cyclesDot} ${styles.shortBreakTime}`}></span>
                <span className={`${styles.cyclesDot} ${styles.workTime}`}></span>
                <span className={`${styles.cyclesDot} ${styles.shortBreakTime}`}></span>
                <span className={`${styles.cyclesDot} ${styles.workTime}`}></span>
                <span className={`${styles.cyclesDot} ${styles.shortBreakTimeTime}`}></span>
                <span className={`${styles.cyclesDot} ${styles.workTime}`}></span>
                <span className={`${styles.cyclesDot} ${styles.longBreakTime}`}></span>


            </div>
        </div>
    )
}