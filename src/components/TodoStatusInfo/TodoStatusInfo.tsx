import classNames from 'classnames';
import type { TodoInfo, TodoStatusVariant } from '../../types/api';
import styles from './TodoStatusInfo.module.scss';

interface TodoStatusInfoProps {
  todosInfo: TodoInfo;
  activeStatus: TodoStatusVariant;
  updateData: (status: TodoStatusVariant) => void;
}

export const TodoStatusInfo = ({ todosInfo, activeStatus, updateData }: TodoStatusInfoProps) => {
  const { all, inWork, completed } = todosInfo;

  return (
    <div className={styles.TodosInfo}>
      <div
        className={classNames(styles.TodosInfoItem, { [`${styles.isActive}`]: activeStatus === 'all' })}
        onClick={() => updateData('all')}
      >
        Все: ({all})
      </div>
      <div
        className={classNames(styles.TodosInfoItem, { [`${styles.isActive}`]: activeStatus === 'inWork' })}
        onClick={() => updateData('inWork')}
      >
        В работе: ({inWork})
      </div>
      <div
        className={classNames(styles.TodosInfoItem, { [`${styles.isActive}`]: activeStatus === 'completed' })}
        onClick={() => updateData('completed')}
      >
        Выполненные: ({completed})
      </div>
    </div>
  );
};
