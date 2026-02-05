import styles from './styles.module.css';


export function Footer() {
    return (
        <footer className={styles.footer}>
            <a href="">Chronos &copy; {new Date().getFullYear()}</a>

        </footer>



    )

}