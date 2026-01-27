import './styles/global.css';
import './styles/theme.css';
import { Heading } from './components/Heading';
import { TimerIcon } from 'lucide-react';





export function App() {
    return (
        <>
            <Heading>
                Hello World
                <button>
                    <TimerIcon />
                </button>
                
            </Heading>

            <p>
                <h1>Helloasdfadfgaduikghmn sfgbfdvx drt a a rtag fgfdgaerfgasdfdsafraebgfvgghnmjhgfd World</h1>

            </p>
        </>
    )
}