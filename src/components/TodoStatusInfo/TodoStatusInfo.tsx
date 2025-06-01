import type { TodoInfo, TodoStatusVariant } from '../../types/api';

import { Tabs } from 'antd';

interface TodoStatusInfoProps {
  taskCount: TodoInfo;
  changeStatusHandler: (status: TodoStatusVariant) => void;
}

export const TodoStatusInfo = ({ taskCount, changeStatusHandler }: TodoStatusInfoProps) => {
  const TodoStatusInfoTabsItems = [
    { label: `Все ${taskCount.all}`, key: 'all' },
    { label: `В работе ${taskCount.inWork}`, key: 'inWork' },
    { label: `Выполненные ${taskCount.completed}`, key: 'completed' },
  ];

  return (
    <Tabs
      centered
      tabPosition="top"
      items={TodoStatusInfoTabsItems}
      onChange={(activeKey) => changeStatusHandler(activeKey as TodoStatusVariant)}
    />
  );
};
