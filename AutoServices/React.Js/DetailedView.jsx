import "./autoService.css";
import logger from "sabio-debug";
import { useEffect } from "react";
import PropTypes from "prop-types";
import React, { useState } from "react";
import followerService from "services/followerService";

import { 
        useNavigate, 
        useParams, 
        useLocation
} from "react-router-dom";

import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";

import {
  Clipboard,
  Clock,
  DollarSign,
  Filter,
  Info,
  Tool,
} from "react-feather";

const _logger = logger.extend("AutoServiceViewMore");

const defaultService = {
  id: "",
  name: "",
  sku: "",
  description: "",
  organizationId: "",
  organizationName: "",
  serviceType: {
    id: "",
    name: "",
  },
  unitType: {
    id: "",
    name: "",
  },
  unitCost: "",
  estimatedDuration: "",
  createdBy: {
    id: "",
    firstName: "",
    mi: "",
    lastName: "",
    avatarUrl: "",
  },
  modifiedBy: {
    id: "",
    firstName: "",
    mi: "",
    lastName: "",
    avatarUrl: "",
  },
};

//----------------Functional-Component--------------------

function AutoServiceViewMore(props) {
  const { state } = useLocation();
  const { autoServiceId } = useParams();

  const [serviceData, setServiceData] = useState(defaultService);
  const [serviceId, setServiceId] = useState(autoServiceId);
  const [followCount, setFollowCount] = useState({
    followers: 0,
  });
  const [followStatus, setFollowStatus] = useState({
    isFollowing: "",
  });

  _logger({ serviceId });
  _logger("currentUser", props.currentUser.id);

  const currentUserId = props.currentUser.id;
  const navigate = useNavigate();

  useEffect(() => {
    setServiceId(autoServiceId);

    if (state?.type === "AUTOSERVICE_VIEW" && state.payload) {
      setServiceData((prevState) => {
        return { ...prevState, ...state.payload };
      });
    }

    followerService
      .getByOrgId(state.payload.organizationId)
      .then(onGetFollowCountSuccess)
      .catch(onGetFollowCountError);

    followerService
      .getBoolByIds(state.payload.organizationId, currentUserId)
      .then(onGetFollowStatusSuccess)
      .catch(onGetFollowStatusError);
  }, [autoServiceId, state]);

  const onEditService = (e) => {
    e.preventDefault();
    navigateToEditForm(serviceData);
  };

  const navigateToEditForm = (serviceData) => {
    _logger("sending service to form..", serviceData);
    const state = {
      type: "AUTOSERVICEEDIT_VIEW",
      payload: serviceData,
    };
    navigate(`/autoservices/${serviceData.id}/edit`, { state });
  };

  ///--------------Followers----------------------

  const onGetFollowCountSuccess = (response) => {
    const numOfFollowers = response.item;

    setFollowCount((prevState) => {
      const followCount = { ...prevState };
      followCount.followers = numOfFollowers;
      return followCount;
    });
  };

  const onGetFollowCountError = (err) => {
    _logger("ERROR FOLLOWER COUNT", err);
  };

  const onGetFollowStatusSuccess = (response) => {
    const followBool = response.item;
    _logger("Get Follow Status Success", followBool);

    setFollowStatus((prevState) => {
      const followStatus = { ...prevState };
      followStatus.isFollowing = followBool;
      return followStatus;
    });
  };

  const onGetFollowStatusError = (err) => {
    _logger("ERROR STATUS", err);
  };

  return (
    <React.Fragment>
      <div className="bg-services">
        <Container>
          <Row className="center-autoservices">
            <Col xl={8} lg={8} md={12} sm={12}>
              <div>
                <h1 className="title-autoservices">
                  Getting Started with Auto Services
                </h1>
                <p className="desc-services">
                  Here you will find a detailed description of the Auto Service.
                  Now you have access to the transperancy of things like
                  material costs, estimated service times, and more.
                </p>
                <div className="d-flex align-items-center">
                  <span className="ms-4">
                    <span className="text-white ms-3">
                      <i className="fe fe-clipboard text-white-50"></i>{" "}
                      {serviceData.organizationName}{" "}
                    </span>
                  </span>
                  <span className="ms-4">
                    {" "}
                    <span className="text-white ms-3">
                      <i className="fe fe-user text-white-50"></i>{" "}
                      {followCount.followers} Followers
                    </span>
                  </span>
                  <span className="ms-4">
                    {followStatus.isFollowing === true && (
                      <span className="bg-light-primary text-primary badge bg-secondary">
                        Following
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="center-autoservices">
          <Col xl={7} lg={7} md={12} sm={12} className="mt-n8 mb-4 mb-lg-12">
            <Tab.Container defaultActiveKey="design">
              <Card>
                <Card.Header className="border-bottom-0 p-0 bg-white">
                  <Nav className="nav-lb-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="design" className="mb-sm-3 mb-md-0">
                        Service
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body className="p-0">
                  <Tab.Content>
                    <Tab.Pane eventKey="design" className="pb-4 p-4">
                      <div className="row">
                        <div className="mb-4">
                          <h3 className="mb-2">{serviceData.name}</h3>
                          <p>{serviceData.description}</p>
                        </div>
                        <h4 className="mb-3">About This Service</h4>
                        <Row className="mb-6">
                          <Col lg={6} md={6} sm={12}>
                            <ListGroup bsPrefix="list-unstyled" variant="flush">
                              <ListGroup.Item
                                bsPrefix=" "
                                className="d-flex mb-2"
                              >
                                <Clock className="clock-icon" />
                                <span>
                                  Estimated Time:{" "}
                                  {serviceData.estimatedDuration} Min
                                </span>
                              </ListGroup.Item>
                              <ListGroup.Item
                                bsPrefix=" "
                                className="d-flex mb-2"
                              >
                                <Clipboard className="clipboard-icon" />
                                <span>
                                  Organization: {serviceData.organizationName}
                                </span>
                              </ListGroup.Item>
                              <ListGroup.Item
                                bsPrefix=" "
                                className="d-flex mb-2"
                              >
                                <Tool className="tool-icon" />
                                <span>
                                  Service Type: {serviceData.serviceType.name}
                                </span>
                              </ListGroup.Item>
                            </ListGroup>
                          </Col>
                          <Col lg={6} md={6} sm={12}>
                            <ListGroup bsPrefix="list-unstyled" variant="flush">
                              <ListGroup.Item
                                bsPrefix=" "
                                className="d-flex mb-2"
                              >
                                <Info className="info-icon" />
                                <span>SKU: {serviceData.sku}</span>
                              </ListGroup.Item>
                              <ListGroup.Item
                                bsPrefix=" "
                                className="d-flex mb-2"
                              >
                                <Filter className="filter-icon" />
                                <span>
                                  Unit Type: {serviceData.unitType.name}
                                </span>
                              </ListGroup.Item>
                              <ListGroup.Item
                                bsPrefix=" "
                                className="d-flex mb-2"
                              >
                                <DollarSign className="dollarsign-icon" />
                                <span>
                                  Cost Per Unit: ${serviceData.unitCost}
                                </span>
                              </ListGroup.Item>
                            </ListGroup>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col lg={12} md={12} sm={12}>
                            <p>
                              Created By: {serviceData.createdBy.firstName}{" "}
                              {serviceData.createdBy.mi}
                              {". "}
                              {serviceData.createdBy.lastName}
                            </p>
                          </Col>
                          <Col lg={12} md={12} sm={12}>
                            <p>
                              Modified By: {serviceData.modifiedBy.firstName}{" "}
                              {serviceData.modifiedBy.mi}
                              {". "}
                              {serviceData.modifiedBy.lastName}
                            </p>
                          </Col>
                        </Row>
                      </div>
                      <Row className="edit-btn">
                        {props.currentUser.roles.includes("OrgAdmin") && (
                          <Button
                            className="btn-primary"
                            size="m"
                            type="submit"
                            onClick={onEditService}
                          >
                            Edit Service
                          </Button>
                        )}
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Card.Body>
              </Card>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

AutoServiceViewMore.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    roles: PropTypes.shape({
      0: PropTypes.string.isRequired,
      1: PropTypes.string,
      includes: PropTypes.func,
    }).isRequired,
  }),
};

export default AutoServiceViewMore;
