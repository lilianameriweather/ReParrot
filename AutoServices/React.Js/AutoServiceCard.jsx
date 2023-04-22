import React from "react";
import { Button, Card, Row, Col, Image, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import logger from "sabio-debug";
import { useNavigate } from "react-router-dom";
import { Clipboard, Info, Trash, DollarSign, Clock } from "react-feather";
import "./autoService.css";

const _logger = logger.extend("AutoService");

const AutoService = (props) => {
  const aService = props.autoService;
  const currentUser = props.currentUser;
  _logger("currentUser", currentUser);
  _logger("Autoservice", aService);

  const navigate = useNavigate();

  const onLocalClicked = (e) => {
    e.preventDefault();
    navigateToViewMore(aService);
  };

  const onLocalClickedDelete = (e) => {
    e.preventDefault();
    _logger("Delete Clicked");
    props.onServiceClickedDelete(aService, e);
  };

  const navigateToViewMore = (aService) => {
    const state = {
      type: "AUTOSERVICE_VIEW",
      payload: aService,
    };
    navigate(`/autoservices/${aService.id}`, { state });
  };

  return (
    <React.Fragment>
      <div className="container mb-2">
        <Card className="mb-2 card-hover">
          <Row className="g-0">
            <Col lg={12} md={12} sm={12}>
              <Card.Body>
                <h3
                  className="mb-2 text-truncate-line-2"
                  onClick={onLocalClicked}
                >
                  {aService.name}
                </h3>
                <ListGroup as="ul" bsPrefix="list-inline" className="mb-3">
                  <ListGroup.Item as="li" bsPrefix="list-inline-item">
                    <Clock className="clock-icon mb-2"></Clock>
                    {aService.estimatedDuration}m
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix="list-inline-item">
                    <Clipboard className="clipboard-icon mb-2" />
                    {aService.organizationName}
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix="list-inline-item">
                    <DollarSign className="dollarsign-icon mb-2" />
                    {aService.unitType.name}: ${aService.unitCost}
                  </ListGroup.Item>
                </ListGroup>
                <Row className="align-items-center g-0">
                  <Col className="col-auto">
                    <Image
                      src={aService.createdBy.avatarUrl}
                      className="rounded-circle avatar-xs"
                      alt=""
                    />
                  </Col>
                  <Col className="col ms-2">
                    <span>
                      {aService.createdBy.firstName}{" "}
                      {aService.createdBy.lastName}
                    </span>
                  </Col>

                  <Col className="col-auto">
                    <Button size="m" variant="primary" onClick={onLocalClicked}>
                      <Info className="info-icon-w" />
                    </Button>
                    {"  "}
                    {props.currentUser.roles.includes("OrgAdmin") && (
                      <Button
                        size="m"
                        variant="danger"
                        onClick={onLocalClickedDelete}
                      >
                        <Trash className="trash-icon-w" />
                      </Button>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </React.Fragment>
  );
};

AutoService.propTypes = {
  autoService: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    description: PropTypes.string,
    organizationId: PropTypes.number.isRequired,
    organizationName: PropTypes.string.isRequired,
    serviceType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    unitType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    unitCost: PropTypes.number.isRequired,
    estimatedDuration: PropTypes.number.isRequired,
    createdBy: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      mi: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
    modifiedBy: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      mi: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
  }),
  currentUser: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  onServiceClickedDelete: PropTypes.func.isRequired,
};

export default AutoService;
