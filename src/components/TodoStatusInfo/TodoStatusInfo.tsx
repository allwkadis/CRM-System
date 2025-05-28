import classNames from 'classnames';
import type { TodoInfo, TodoStatusVariant } from '../../types/api';
import styles from './TodoStatusInfo.module.scss';

interface TodoStatusInfoProps {
  todosInfo: TodoInfo;
  activeStatus: TodoStatusVariant;
  changeStatusHandler: (status: TodoStatusVariant) => void;
}

//написать handler

export const TodoStatusInfo = ({ todosInfo, activeStatus, changeStatusHandler }: TodoStatusInfoProps) => {
  const { all, inWork, completed } = todosInfo;

  return (
    <div className={styles.TodosInfo}>
      <div
        className={classNames(styles.TodosInfoItem, { [`${styles.isActive}`]: activeStatus === 'all' })}
        onClick={() => changeStatusHandler('all')}
      >
        Все: ({all})
      </div>
      <div
        className={classNames(styles.TodosInfoItem, { [`${styles.isActive}`]: activeStatus === 'inWork' })}
        onClick={() => changeStatusHandler('inWork')}
      >
        В работе: ({inWork})
      </div>
      <div
        className={classNames(styles.TodosInfoItem, { [`${styles.isActive}`]: activeStatus === 'completed' })}
        onClick={() => changeStatusHandler('completed')}
      >
        Выполненные: ({completed})
      </div>
    </div>
  );
};
