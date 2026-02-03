import { Container } from "../../components/Containers";
import { TaskHistory } from "../../components/TaskHistory";
import { MainTemplate } from "../../templates/MainTemplate";

export function History() {
    return (
        <div>
            <MainTemplate>
                <Container>
                    <TaskHistory />
                </Container>
            </MainTemplate>
        </div>
    );
}
