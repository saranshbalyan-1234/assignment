import { Input, Spin, Table, Avatar, Button, Space, Tag } from "antd";
import { connect } from "react-redux";
import styled from "styled-components";

import { fetchData } from "../../actions/dataActions";
import { useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { useState } from "react";
import ModalComponent from "./ModalComponent";
const Lawyer = ({ data, loading, error, fetchData }) => {
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const openModal = (row) => {
    setDetail(row);
    setOpen(true);
  };
  const columns = [
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
        return (
          <Button type="link" onClick={() => openModal(row)}>
            Schedule Appointment
          </Button>
        );
      },
    },
  ];
  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };
  return (
    <StyledMainContainer>
      <h1>Book Appointment</h1>
      <Spin spinning={loading}>
        <div class="table-container">
          <div class="filter">
            <Input
              placeholder="Search"
              onChange={(e) => fetchData(e.target.value)}
            />
          </div>

          <DndContext
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={onDragEnd}
          >
            <SortableContext
              // rowKey array
              items={dataSource.map((i) => i.key)}
              strategy={verticalListSortingStrategy}
            >
              <Table
                components={{
                  body: {
                    row: Row,
                  },
                }}
                rowKey="key"
                columns={columns}
                dataSource={dataSource}
              />
            </SortableContext>
          </DndContext>
        </div>
      </Spin>
      {open && <ModalComponent detail={detail} setOpen={setOpen} />}
    </StyledMainContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data.data,
    loading: state.data.loading,
    error: state.data.error,
  };
};

export default connect(mapStateToProps, { fetchData })(Lawyer);

const StyledMainContainer = styled.div`
  .table-container {
    margin-top: 15px;
    padding: 20px 0;
    box-shadow: 5px 5px 10px lightgray;

    .filter {
      padding-right: 20px;
      padding-bottom: 20px;
      display: flex;
      justify-content: flex-end;
      input {
        width: 200px;
      }
    }
  }
`;

const Row = ({ children, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1,
      }
    ),
    transition,
    ...(isDragging
      ? {
          position: "relative",
          zIndex: 9999,
        }
      : {}),
  };
  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if (child.key === "sort") {
          return React.cloneElement(child, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{
                  touchAction: "none",
                  cursor: "move",
                }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};
