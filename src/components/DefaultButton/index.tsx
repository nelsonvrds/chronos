import styles from './styles.module.css';

type DefaultButtonProps = {
    icon?: React.ReactNode;
    color?: 'green' | 'red';
    children?: React.ReactNode;
} & React.ComponentProps<'button'>;


export function DefaultButton({ icon, color='green', children, ...rest }: DefaultButtonProps) {

    return (
        <button className={`${styles.button} ${styles[color]}`} {...rest}>
            {icon}
            {children && <span>{children}</span>}
        </button>
    )
}