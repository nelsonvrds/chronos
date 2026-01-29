import { Container } from "../../components/Containers";
import { CountDown } from "../../components/CountDown";
import { MainForm } from "../../components/MainForm";
import { MainTemplate } from "../../templates/MainTemplate";


export function Home() {

 return (
        <div>
           <MainTemplate>
           <Container>
                <CountDown />

            </Container>

            <Container>
                <MainForm />
            </Container>
           </MainTemplate>
        </div>


    )
}