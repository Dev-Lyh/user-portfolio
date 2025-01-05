import styles from './separator.module.css';

export default function Separator() {
  return (
    <div className={styles.container_separator}>
      <div className={styles.line_separator}></div>
      <span>or</span>
      <div className={styles.line_separator}></div>
    </div>
  )
}