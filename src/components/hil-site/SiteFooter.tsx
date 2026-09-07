import styles from "./SiteFooter.module.css";

export function SiteFooter({ title, body, onContact }: { title: string; body: string; onContact: () => void }) {
  return <footer className={styles.footer} data-od-id="site-footer">
    <div className={styles.container}>
      <div className={styles.grid}><h2><button onClick={onContact}>{title}</button></h2><div><p>{body}</p><a href="mailto:chawjk@ukm.edu.my">chawjk@ukm.edu.my</a></div></div>
      <div className={styles.meta}>© 2026 Harmonizing Intelligence Lab</div>
    </div>
  </footer>;
}
