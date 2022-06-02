import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import MainScreen from "../../Components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { createTaskAction } from "../../actions/qaTaskActions";
import ErrorMessage from "../../Components/ErrorMessage";
import Loading from "../../Components/Loading";

const QaTrackerPage = () => {
  const [jobNumber, setJobNumber] = useState();
  const [taskReceivedDate, setTaskReceivedDate] = useState(new Date());
  const [totalVolume, setTotalVolume] = useState();
  const [editedVolume, setEditedVolume] = useState();
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const qaCreate = useSelector((state) => state.qaCreate);

  const { loading, error } = qaCreate;

  let title = "";
  if (localStorage.getItem("userInfo")) {
    title = `Welcome Back, ${
      JSON.parse(localStorage.getItem("userInfo")).name
    }!`;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createTaskAction(jobNumber, taskReceivedDate, totalVolume, editedVolume)
    );
    if (!jobNumber || !taskReceivedDate || !totalVolume || !editedVolume)
      return;

    setVisible(true);

    setJobNumber("");
    setTaskReceivedDate("");
    setTotalVolume("");
    setEditedVolume("");

    window.setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  return (
    <MainScreen title={title}>
      <Alert color="info" show={visible}>
        Success! Task Has Been Posted!
      </Alert>
      <Form onSubmit={submitHandler}>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Form.Group className="mb-3">
          <Form.Label>Job Number</Form.Label>
          <Form.Control
            onChange={(e) => setJobNumber(e.target.value)}
            value={jobNumber}
            type="text"
            placeholder="Job Number"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Task Receive Date</Form.Label>
          <Form.Control
            onChange={(e) => setTaskReceivedDate(e.target.value)}
            type="date"
            value={taskReceivedDate}
            placeholder="Task Receive Date"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Total Volume (Number)</Form.Label>
          <Form.Control
            onChange={(e) => setTotalVolume(e.target.value)}
            value={totalVolume}
            type="number"
            step=".01"
            placeholder="Total Volume (Number)"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Edited Volume (Number)</Form.Label>
          <Form.Control
            onChange={(e) => setEditedVolume(e.target.value)}
            value={editedVolume}
            type="number"
            step=".01"
            placeholder="Edited Volume (Number)"
          />
        </Form.Group>
        {loading && <Loading size={50} />}
        <Button variant="primary" type="submit" size="lg">
          Submit
        </Button>
      </Form>
    </MainScreen>
  );
};

export default QaTrackerPage;
