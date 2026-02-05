import { Link } from 'react-router-dom';
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
            <Link className={styles.menuLink}
                to="/"
                aria-label="Home"
                title="Home">
                <HouseIcon />
            </Link>
            <Link className={styles.menuLink}
                to="/history"
                aria-label="Histórico"
                title="Histórico">
                <TimerIcon />
            </Link>

            <Link className={styles.menuLink}
                to="/configuracoes"
                aria-label="Configurações"
                title="Configurações">
                <SettingsIcon />
            </Link>

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
