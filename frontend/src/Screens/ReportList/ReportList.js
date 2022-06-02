import React, { useEffect } from "react";
import { Badge, Card, Container, ListGroup } from "react-bootstrap";
import MainScreen from "../../Components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { listQaTasks } from "../../actions/qaTaskActions";
import Loading from "../../Components/Loading";
import ErrorMessage from "../../Components/ErrorMessage";

const ReportList = () => {
  const dispatch = useDispatch();
  const qaTaskList = useSelector((state) => state.qaTaskList);

  const { loading, qaTasks, error } = qaTaskList;

  useEffect(() => {
    dispatch(listQaTasks());
  }, [dispatch]);

  return (
    <MainScreen title="Report List">
      <Container
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {qaTasks?.reverse().map((info, rank) => (
          <Card key={rank} style={{ width: "20rem", margin: "10px" }}>
            <Card.Header>{rank + 1}</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Job Number: {info.job_number}</ListGroup.Item>
              <ListGroup.Item>Email: {info.email}</ListGroup.Item>
              <ListGroup.Item>Total Volume: {info.total_volume}</ListGroup.Item>
              <ListGroup.Item>
                Edited Volume: {info.edited_volume}
              </ListGroup.Item>
              <ListGroup.Item>
                Task Received Date: {info.task_received_date}
              </ListGroup.Item>
              <ListGroup.Item>
                Task Created: {info.createdAt.substring(0, 10)}
                {" Time: "}
                {info.createdAt.substring(11, 19)}
              </ListGroup.Item>
              {info.status === "Done" && (
                <ListGroup.Item>
                  Task Last Updated QA DONE: {info.updatedAt.substring(0, 10)}
                  {" Time: "}
                  {info.updatedAt.substring(11, 19)}
                </ListGroup.Item>
              )}
              {info.status === "Pending" ? (
                <ListGroup.Item>
                  Status:{" "}
                  <Badge bg="danger">
                    <span style={{ color: "white" }}>{info.status}</span>
                  </Badge>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  Status:{" "}
                  <Badge bg="success">
                    <span style={{ color: "white" }}>{info.status}</span>
                  </Badge>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        ))}
      </Container>
    </MainScreen>
  );
};

export default ReportList;
