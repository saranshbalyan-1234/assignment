import { Avatar, Button, Space, Tag } from "antd";
const url =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyIkWCF_2NnTM-imjWtFuzsPEWFYYH-Vk76A&usqp=CAU";
export const columns = [
  {
    key: "sort",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "left",
    render: (name, row) => {
      return (
        <Space direction="row" align="center">
          <Avatar size="large" src={row.profile} />
          <div>{name}</div>
        </Space>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "address",
    align: "center",
  },

  {
    title: "Speciality",
    dataIndex: "speciality",
    key: "speciality",
    align: "center",
    render: (data) => {
      return (
        <Tag style={{ fontWeight: 500 }} color="#2db7f5">
          {data}
        </Tag>
      );
    },
  },

  {
    title: "",
    dataIndex: "",
    key: "bjbhbh",
    align: "center",
    render: (data, row) => {
      return <Button type="link">Schedule Appointment</Button>;
    },
  },
];
