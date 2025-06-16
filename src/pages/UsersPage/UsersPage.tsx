import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getUsersDataAction } from '../../store/actions/getUsersData';
import { Select, Space, Table } from 'antd';
import { adminSlice } from '../../store/slices/adminSlice';

export const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, usersData, usersMeta, usersSortOrder, usersSortBy } = useAppSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getUsersDataAction({ sortBy: usersSortBy, sortOrder: usersSortOrder }));
  }, [usersSortOrder, usersSortBy]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  console.log(usersData);
  const changeSortByHandler = (value) => dispatch(adminSlice.actions.changeSortBy(value));
  const changeSortOrderHandler = (value) => dispatch(adminSlice.actions.changeSortOrder(value));

  return (
    <div>
      <Select
        title="sortBy"
        style={{ maxWidth: 200, width: '100%' }}
        defaultValue={usersSortBy}
        onChange={changeSortByHandler}
        options={[
          { value: 'username', label: 'userName' },
          { value: 'email', label: 'email' },
          { value: 'id', label: 'id' },
        ]}
      />
      <Select
        title="sortOrder"
        style={{ maxWidth: 200, width: '100%' }}
        defaultValue={usersSortOrder}
        onChange={changeSortOrderHandler}
        options={[
          { value: 'asc', label: 'по возрастанию' },
          { value: 'desc', label: 'по убыванию' },
        ]}
      />
    </div>
  );
};
