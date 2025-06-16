import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getUsersDataAction } from '../../store/actions/getUsersData';

export const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, usersData, usersMeta } = useAppSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getUsersDataAction());
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }

  console.log(usersData, usersMeta);

  return <div>UsersPage</div>;
};
