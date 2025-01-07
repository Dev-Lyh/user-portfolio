import styles from './titlesubtitle.module.css';

interface TitleSubtitleProps {
  title: string;
  subtitle: string;
}

export default function TitleSubtitle({title, subtitle}: TitleSubtitleProps) {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.subtitle}
          style={{marginBottom: title.includes("Forgot password") && '2.6rem'}}>{subtitle}</h2>
    </>
  )
}