import { Typography, Flex } from 'antd';
import { useEffect, useState } from 'react';
import { getUserProfileData } from '../../api/user';

export const ProfilePage = () => {
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    const data = getUserProfileData();
    console.log(data);
  }, []);

  return (
    <Flex align="center" justify="center" style={{ height: '100%' }}>
      <Typography.Text>Привет</Typography.Text>
    </Flex>
  );
};
