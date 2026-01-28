import styles from './styles.module.css';
import { TimerIcon, HouseIcon, SunIcon, SettingsIcon, MoonIcon } from 'lucide-react';
import { useEffect, useState } from 'react';


type AvaliableThemes = 'dark' | 'light';

export function Menu() {
    const [theme, setTheme] = useState<AvaliableThemes>(() =>{
        const storageTheme = 
        localStorage.getItem('theme') as AvaliableThemes || 'dark';
        return storageTheme;
    });


    const nextThemeIcon ={
        dark: <SunIcon />,
        light: <MoonIcon />,
    }


    
    function handleThemeChange(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) {
        event.preventDefault();

        console.log('Clicado', Date.now());

        setTheme(prevTheme => {
            const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
            return nextTheme;
        })
    }


    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);




    return (
        <nav className={styles.menu}>
            <a className={styles.menuLink}
                href="#"
                aria-label="Home"
                
                title="Home" >
                <HouseIcon />
            </a>
            <a className={styles.menuLink}
                href="#"
                aria-label="Historico"
                title="Historico">
                <TimerIcon />
            </a>

            <a className={styles.menuLink}
                href="#"
                aria-label="Configurações"
                title="Configurações">
                <SettingsIcon />
            </a>

            <a className={styles.menuLink}
                href=""
                aria-label="Tema"
                title="Tema"
                onClick={handleThemeChange}>
                {nextThemeIcon[theme]}

            </a>
        </nav>
    )
}
