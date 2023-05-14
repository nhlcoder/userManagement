import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Avatar, Divider, Row, Col, Typography } from "antd";
import axios from "axios";

const { Meta } = Card;
const { Title, Text } = Typography;
const url = 'https://i.pinimg.com/474x/e4/3f/cb/e43fcb7d451d75bcbabbb3252581660d.jpg';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/User/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
        setUser(null);
      });
  }, [id]);

  if (user === undefined) {
    return <div>Loading...</div>;
  } else if (user === null) {
    return <div>Error loading user.</div>;
  } else {
    return (
      <div className="user-detail-container">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8}>
            <Card>
              <Meta
                avatar={
                  <Avatar size={120} src={<img src={url} alt="avatar" />} />
                }
              />
              <Divider />
              <Text strong>Email:</Text>{" "}
              <Text>{user.Email}</Text>
              <br />
              <Text strong>Address:</Text>{" "}
              <Text>
                {user.Address.AddressNo}, {user.Address.FullName}, {user.Address.WardName},
                {user.Address.DistrictName}, {user.Address.ProvinceName}
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={16}>
            <Card>
              <Title level={4}>User Info</Title>
              <Divider />
              <Row>
                <Col span={12}>
                  <Text strong>User Name:</Text>{" "}
                  <Text>{user.UserName}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Sex:</Text>{" "}
                  <Text>{'Female'}</Text>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Text strong>ID:</Text>{" "}
                  <Text>{user.id}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Date of Birth:</Text>{" "}
                  <Text>{user.DateOfBir}</Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
};

export default UserDetail;
