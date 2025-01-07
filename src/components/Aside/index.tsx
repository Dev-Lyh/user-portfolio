import styles from './aside.module.css';

export default function Aside() {
    return (
        <aside className={styles.aside_container}>
            <strong>
                Easy Portfolio for Developer
            </strong>
            <p>
                As a web developer, having a portfolio is essential for showcasing your technical skills and attracting
                potential clients. A portfolio is a museum of your work, with past tech stacks, case studies, and your
                work
                history.
            </p>
        </aside>
    )
}