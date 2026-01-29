import { Container } from "../../components/Containers";
import { Footer } from "../../components/Footer";
import { Logo } from "../../components/Logo";
import { Menu } from "../../components/Menu";

type MainTemplateProps = {
    children: React.ReactNode;
}



export function MainTemplate({ children }: MainTemplateProps) {
    return (
        <div>
            <Container>
                <Logo />
            </Container>

            <Container>
                <Menu />
            </Container>

            {children}


            <Container>
                <Footer />
            </Container>
        </div>


    )
}