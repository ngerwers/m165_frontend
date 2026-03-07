import styles from "./header.module.css";

export default function header(){
    return(
        <header className={styles.header}>
        <nav className={styles.nav}>Mein Logo</nav>
        </header>
    )
}