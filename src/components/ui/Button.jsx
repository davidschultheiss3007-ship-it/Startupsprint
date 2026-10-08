import Icon from './Icon.jsx'
import styles from './Button.module.css'

/**
 * Button oder Link im RareFind-Stil.
 * variant: 'primary' (schwarz) | 'secondary' (Outline) | 'light' (weiß, für dunkle Flächen)
 */
export default function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  arrow = true,
  block = false,
  className = '',
  ...rest
}) {
  const classes = [styles.button, styles[variant], styles[size], block && styles.block, className]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <span>{children}</span>
      {arrow && <Icon name="arrow" size={20} className={styles.arrow} />}
    </>
  )

  return href ? (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  ) : (
    <button className={classes} {...rest}>
      {content}
    </button>
  )
}
