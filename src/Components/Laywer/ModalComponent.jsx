import React, { useState } from "react";
import { Avatar, Button, DatePicker, message, Modal, Space, Spin } from "antd";
import { useDispatch } from "react-redux";
import { bookAppointment } from "../../actions/dataActions";
const { RangePicker } = DatePicker;
const ModalComponent = ({ detail, setOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };
  const changeHandler = (value, dateString) => {
    console.log(value);
    console.log(dateString);
    const obj = { start: dateString[0], end: dateString[1] };
    setFormData(obj);
  };

  const book = async () => {
    setLoading(true);

    const flag = detail.bookedSlots.every((data) => {
      const dataStartDate = new Date(data.start);
      const dataEndDate = new Date(data.end);
      const aStartDate = new Date(formData.start);
      const aEndDate = new Date(formData.end);

      if (
        (aStartDate < dataStartDate && aEndDate < dataStartDate) ||
        (aStartDate > dataEndDate && aEndDate > dataEndDate)
      ) {
        return true;
      }

      return false;
    });

    if (!flag) {
      setLoading(false);
      message.warning("Slot not available");
      return;
    }
    const data = await dispatch(
      bookAppointment({
        id: detail.id,
        bookedSlots: [...detail.bookedSlots, { ...formData }],
      })
    );
    message.info(data.msg);
    setLoading(false);
    setOpen(false);
  };
  return (
    <Spin spinning={loading}>
      <Modal
        title="Book Lawyer"
        open={true}
        onOk={book}
        onCancel={handleCancel}
        okText="Book now"
      >
        <Space direction="row" align="center">
          <Avatar
            src="https://vicepresidentofindia.nic.in/sites/default/files/ShriJDhankhar.JPG"
            size="large"
          />
          <h4>Saransh Balyan</h4>
        </Space>
        <Space align="center">
          <h4>choose slot</h4>
          <RangePicker onChange={changeHandler} />
        </Space>
      </Modal>
    </Spin>
  );
};
export default ModalComponent;
