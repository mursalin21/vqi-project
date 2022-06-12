import React, { useEffect, useState } from "react";
import {
	Alert,
	Badge,
	Button,
	Card,
	Container,
	ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	adminExportList,
	listAdminTasks,
	updateAdminTaskAction,
} from "../../actions/qaTaskActions";
import ErrorMessage from "../../Components/ErrorMessage";
import Loading from "../../Components/Loading";
import MainScreen from "../../Components/MainScreen";

const TaskList = () => {
	const dispatch = useDispatch();
	const adminTaskList = useSelector((state) => state.adminTaskList);
	const adminTaskUpdate = useSelector((state) => state.adminTaskUpdate);
	// const adminExportList = useSelector((state) => state.adminExportList);

	const { loading, qaTasks, error } = adminTaskList;
	const { taskUpdateLoading, taskUpdateError } = adminTaskUpdate;

	const [isUpdating, setIsUpdating] = useState(false);
	const [taskId, setTaskId] = useState("");
	const [jobNumber, setJobNumber] = useState();
	const [email, setEmail] = useState("");
	const [taskReceivedDate, setTaskReceivedDate] = useState(new Date());
	const [totalVolume, setTotalVolume] = useState();
	const [editedVolume, setEditedVolume] = useState();
	const [status, setStatus] = useState("Pending");
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (isUpdating === true) {
			console.log(totalVolume);
			dispatch(
				updateAdminTaskAction(
					taskId,
					jobNumber,
					email,
					totalVolume,
					editedVolume,
					taskReceivedDate,
					status
				)
			);
			if (!status) return;

			setIsUpdating(false);
		}
		dispatch(listAdminTasks());
	}, [
		dispatch,
		editedVolume,
		isUpdating,
		jobNumber,
		email,
		status,
		taskId,
		taskReceivedDate,
		totalVolume,
	]);

	const handleSubmitAlert = () => {
		setVisible(true);

		window.setTimeout(() => {
			setVisible(false);
		}, 2000);
	};

	const handleExportCsv = () => {
		dispatch(adminExportList());
	};

	return (
		<MainScreen title="Report List">
			<Container
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "space-evenly",
				}}
			>
				<Button onClick={() => handleExportCsv()}>Export</Button>
			</Container>
			<Alert color="info" show={visible}>
				Success! Task Updated!
			</Alert>
			<Container
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "space-evenly",
				}}
			>
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{loading && <Loading />}
				{taskUpdateError && (
					<ErrorMessage variant="danger">{error}</ErrorMessage>
				)}
				{taskUpdateLoading ? (
					<Loading />
				) : (
					qaTasks?.reverse().map((info, rank) => (
						<Card key={rank} style={{ width: "20rem", margin: "10px" }}>
							<Card.Header className="d-flex justify-content-between">
								<p>{rank + 1}</p>
								{info.status === "Pending" ? (
									<Button
										onClick={() => {
											setIsUpdating(true);
											setTaskId(info._id);
											setJobNumber(info.job_number);
											setEmail(info.email);
											setTaskReceivedDate(info.task_received_date);
											setTotalVolume(info.total_volume);
											setEditedVolume(info.edited_volume);
											setStatus("Done");
											console.log(info);
											handleSubmitAlert();
										}}
									>
										Complete
									</Button>
								) : (
									<h4>
										<Badge bg="success">Task Done</Badge>
									</h4>
								)}
							</Card.Header>
							<ListGroup variant="flush">
								<ListGroup.Item>Job Number: {info.job_number}</ListGroup.Item>
								<ListGroup.Item>Email: {info.email}</ListGroup.Item>
								<ListGroup.Item>
									Total Volume: {info.total_volume}
								</ListGroup.Item>
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
										Task Updated QA DONE: {info.createdAt.substring(0, 10)}
										{" Time: "}
										{info.createdAt.substring(11, 19)}
									</ListGroup.Item>
								)}
								{info.status === "Pending" ? (
									<ListGroup.Item>
										Status: <span style={{ color: "red" }}>{info.status}</span>
									</ListGroup.Item>
								) : (
									<ListGroup.Item>
										Status:{" "}
										<span style={{ color: "green" }}>{info.status}</span>
									</ListGroup.Item>
								)}
							</ListGroup>
						</Card>
					))
				)}
			</Container>
		</MainScreen>
	);
};

export default TaskList;
