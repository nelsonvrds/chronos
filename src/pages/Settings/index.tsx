import { useState, useEffect } from "react";
import { Container } from "../../components/Containers";
import { MainTemplate } from "../../templates/MainTemplate";
import { DefaultButton } from "../../components/DefaultButton";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import type { TaskStateModel } from "../../models/TaskStateModel";
import styles from "./styles.module.css";

type ConfigKey = keyof TaskStateModel["config"];

const CONFIG_LABELS: Record<ConfigKey, string> = {
    workTime: "Foco",
    shortBreakTime: "Descanso curto",
    longBreakTime: "Descanso longo",
};

export function Settings() {
    const { state, setState } = useTaskContext();
    const [localConfig, setLocalConfig] = useState(state.config);
    const [savedFeedback, setSavedFeedback] = useState(false);

    useEffect(() => {
        if (!savedFeedback) return;
        const timer = setTimeout(() => setSavedFeedback(false), 4000);
        return () => clearTimeout(timer);
    }, [savedFeedback]);

    function handleChange(key: ConfigKey, value: number) {
        const clamped = Math.max(1, Math.min(120, Math.round(value) || 1));
        setLocalConfig((prev) => ({ ...prev, [key]: clamped }));
    }

    function handleSave() {
        setState((prev) => ({
            ...prev,
            config: { ...localConfig },
        }));
        setSavedFeedback(true);
    }

    return (
        <MainTemplate>
            <Container>
                <div className={styles.settings}>
                    {savedFeedback && (
                        <div className={`${styles.feedback} ${styles.feedbackSuccess}`}>
                            Alterações salvas
                        </div>
                    )}
                    <h2 className={styles.title}>Configurações de tempo</h2>
                    <p className={styles.subtitle}>
                        Altere a duração de cada período (em minutos)
                    </p>
                    <div className={styles.tableWrap}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.colPerfil}>Período</th>
                                    <th className={styles.colTempo}>Tempo (min)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(Object.keys(CONFIG_LABELS) as ConfigKey[]).map(
                                    (key) => (
                                        <tr key={key} className={styles.row}>
                                            <td className={styles.colPerfil}>
                                                {CONFIG_LABELS[key]}
                                            </td>
                                            <td className={styles.colTempo}>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    max={120}
                                                    value={localConfig[key]}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            key,
                                                            Number(e.target.value) || 1
                                                        )
                                                    }
                                                    className={styles.input}
                                                    aria-label={`Tempo em minutos para ${CONFIG_LABELS[key]}`}
                                                />
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.actions}>
                        <DefaultButton type="button" onClick={handleSave}>
                            Salvar
                        </DefaultButton>
                    </div>
                </div>
            </Container>
        </MainTemplate>
    );
}
