import { Container } from './components/Containers';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';
import { CountDown } from './components/CountDown';
import { DefaultInput } from './components/DefaultInput';
import { Cycles } from './components/Cycles';
import { DefaultButton } from './components/DefaultButton';
import { Footer } from './components/Footer';


import './styles/global.css';
import './styles/theme.css';
import { PlayCircleIcon } from 'lucide-react';


export function App() {
    return (
        <div>
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
                        <DefaultInput labelText='Teste'
                            id='meuInput'
                            type='text'
                            placeholder='Enter your name' />
                    </div>

                    <div className='formRow'>
                        <p>Select the duration of the task</p>
                    </div>

                    <div className='formRow'> 
                        <Cycles />
                    </div>

                    <div className='formRow'>
                        <DefaultButton icon={<PlayCircleIcon />} color='green' />
                    </div>


                </form>
            </Container>


            <Container>
                <Footer />
            </Container>
        </div>


    )
}