import type { TodoStatusVariant } from '../../types/api';

import { Tabs } from 'antd';

interface TodoStatusInfoProps {
  changeStatusHandler: (status: TodoStatusVariant) => void;
}

const TodoStatusInfoTabsItems = [
  { label: 'Все', key: 'all' },
  { label: 'В работе', key: 'inWork' },
  { label: 'Выполненные', key: 'completed' },
];

export const TodoStatusInfo = ({ changeStatusHandler }: TodoStatusInfoProps) => {
  return (
    <Tabs
      centered
      defaultActiveKey={'all'}
      tabPosition="top"
      items={TodoStatusInfoTabsItems}
      onChange={(activeKey) => changeStatusHandler(activeKey as TodoStatusVariant)}
    />
  );
};
