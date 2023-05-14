import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "UserName",
      dataIndex: "UserName",
    },
    {
      title: "Address",
      dataIndex: "Address",
      render: (address) => (
        <>
          <p>{address.AddressNo}, {address.WardName}, {address.DistrictName}, {address.ProvinceName}</p>
          <p>{address.FullName}</p>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleUserDetail(record)}>View</Button>
          <Button type="default" onClick={() => handleUpdateUser(record)}>Update</Button>
          <Button type="text" danger onClick={() => handleDeleteUser(record)}>Delete</Button>
        </>
      ),
    },
  ];

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/User")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
        setUsers(null); // set users to null to indicate an error occurred
      });
  }, []);

  const handleUserDetail = user => {
    navigate(`/user-detail/${user.id}`)
  }

  const handleUpdateUser = (user) => {
    navigate(`/update-user/${user.id}`);
  };

  const handleDeleteUser = (user) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete user ${user.UserName}?`
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/User/${user.id}`)
        .then(() => {
          alert("User deleted successfully");
          setUsers((prevUsers) =>
            prevUsers.filter((u) => u.id !== user.id)
          );
        })
        .catch((error) => {
          console.error(error);
          alert("Error deleting user");
        });
    }
  };

  if (users === undefined) {
    return <div>Loading...</div>;
  } else if (users === null) {
    return <div>Error loading users.</div>;
  } else {
    return (
      <div>
        <h1>User List</h1>
        <Table columns={columns} dataSource={users} rowKey="id" />
      </div>
    );
  }
};

export default UserList;
