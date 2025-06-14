import { Typography, Flex } from 'antd';
import { useEffect, useState } from 'react';
import { getUserProfileData } from '../../api/user';
import { useAppSelector } from '../../store/store';

export const ProfilePage = () => {
  // const [profileData, setProfileData] = useState([]);
  const { isLoading, profileData } = useAppSelector((state) => state.auth);
  useEffect(() => {
    const data = getUserProfileData();
    console.log(data);
  }, []);

  if (isLoading) return <div>loading</div>;

  return (
    <Flex align="center" justify="center" style={{ height: '100%' }}>
      <Typography.Text>Привет</Typography.Text>
    </Flex>
  );
};
