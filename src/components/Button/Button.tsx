import classNames from 'classnames';
import styles from './Button.module.scss';
type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
}

export const Button = ({ children, variant = 'primary', ...props }: ButtonProps) => {
  return (
    <button className={classNames(styles.Button, styles[variant])} {...props}>
      {children}
    </button>
  );
};
