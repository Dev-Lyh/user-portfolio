import styles from "./notification.module.css"

interface NotificationProps {
  title: string;
  color: string;
  content: string;
}

export default function Notification({title, color, content}: NotificationProps) {
  return (
    <div className={styles.notification_container}>
      <strong>{title}</strong>
      <small>{content}</small>
    </div>
  )
}