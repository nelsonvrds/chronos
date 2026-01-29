import { PlayCircleIcon } from "lucide-react"
import { DefaultButton } from "../DefaultButton"
import { DefaultInput } from "../DefaultInput"
import { Cycles } from "../Cycles"


export function MainForm() {
    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log('Certo')
    }

    return (
        <>
            <form onSubmit={handleCreateNewTask} className='form' action="">

                <div className='formRow'>
                    <DefaultInput labelText='Task'
                        id='meuInput'
                        type='text'
                        placeholder='Enter your name' />
                </div>

                <div className='formRow'>
                    <p>Proximo intervalo é de 25min</p>
                </div>

                <div className='formRow'>
                    <Cycles />
                </div>

                <div className='formRow'>
                    <DefaultButton icon={<PlayCircleIcon />} color='green' />
                </div>


            </form>
        </>
    )

}



