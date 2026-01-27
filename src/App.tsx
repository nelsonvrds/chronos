import { Container } from './components/Containers';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';
import { CountDown } from './components/CountDown';
import { DefaultInput } from './components/DefaultInput';

import './styles/global.css';
import './styles/theme.css';


export function App() {
    return (
        <>
            <Container>
                <Logo />
            </Container>

            <Container>
                <Menu />
            </Container>

            <Container>
                <CountDown />
            </Container>

            <Container>
                <form className='form' action="">
                    <div className='formRow'>
                        <DefaultInput id='meuInput' type='text' />
                    </div>

                    <div className='formRow'>
                        <p>Select the duration of the task</p>
                    </div>

                    <div className='formRow'>
                        <p>ciclos</p>
                        <p>1234567890</p>
                    </div>

                    <div className='formRow'>
                        <button>Enviar</button>
                    </div>


                </form>
            </Container>
        </>
    )
}