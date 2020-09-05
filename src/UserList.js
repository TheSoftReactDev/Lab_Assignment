import React, { useState } from "react";
import {
  Container,
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormGroup,
} from "reactstrap";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { requestUserItems } from "./UserListAction";

//var DatePicker = require("reactstrap-date-picker");
const getUserItems = createSelector(
  (state) => state.UserListReducer,
  (UserListReducer) => UserListReducer
);

const UserList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activityPeriods, setActivityPeriods] = useState([]);
  const [showActivity, setShowActivity] = useState(false);
  const [currrentActivityPeriod, setCurrentActivityPeriod] = useState();
  const [date, setDate] = useState();
  const { userItems, isloading } = useSelector(getUserItems);
  const dispatch = useDispatch();
  if (isloading) {
    dispatch(requestUserItems());
  }
  const onButtonClick = (e) => {
    setIsModalOpen(true);
    setActivityPeriods(e);
  };
  const toggle = () => {
    setIsModalOpen(false);
    setDate();
    setShowActivity(false);
    setCurrentActivityPeriod(null);
  };

  const onDateClicked = (e) => {
    setDate(e);

    const event = new Date(e);
    const eventTwo = event.toString().slice(4, 15);
    var isActivityFound = activityPeriods.find(
      (x) => x.start_time.slice(0, 11) === eventTwo
    );
    if (isActivityFound != null) {
      setCurrentActivityPeriod(isActivityFound);
    } else {
      setCurrentActivityPeriod(null);
    }
    setShowActivity(true);
  };

  function ReturnUserData() {
    const ListItems = Object.keys(userItems).map((key) => (
      <React.Fragment key={key}>
        <Row>
          <Col>
            <Button
              style={{
                backgroundColor: "#e9ecef",
                color: "black",
                borderWidth: "0px",
              }}
              onClick={() => onButtonClick(userItems[key].activity_periods)}
            >
              {userItems[key].real_name}
            </Button>{" "}
          </Col>
        </Row>
      </React.Fragment>
    ));

    return ListItems;
  }

  return (
    <Container className="jumbotron" fluid={true}>
      <Row>
        <Col>
          <Label className="text-info">
            <h2>List Of Users</h2>
          </Label>
        </Col>
      </Row>
      {userItems != null ? <ReturnUserData /> : <div></div>}
      {isModalOpen === true ? (
        <Modal isOpen={isModalOpen} toggle={toggle}>
          <ModalHeader className="modal-header" toggle={toggle}>
            Activity
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col lg="5" md="5">
                <FormGroup>
                  <Label className="text-info">Please Select a Date: </Label>
                  <br />
                  <DatePicker
                    selected={date}
                    onChange={onDateClicked}
                    className="btn btn-primary dropdown-toggle"
                  ></DatePicker>
                </FormGroup>
              </Col>
            </Row>

            {currrentActivityPeriod != null ? (
              <Row>
                <Col>
                  <Label className="text-success">Start Time -</Label>
                  &nbsp;
                  {currrentActivityPeriod.start_time}
                  <br />
                  <Label className="text-danger">End Time -</Label>
                  &nbsp;
                  {currrentActivityPeriod.end_time}
                </Col>
              </Row>
            ) : (
              <Row hidden={!showActivity}>
                <Col>
                  <Label className="text-danger">No Activity Found</Label>
                </Col>
              </Row>
            )}
          </ModalBody>
        </Modal>
      ) : null}
    </Container>
  );
};

export default UserList;
