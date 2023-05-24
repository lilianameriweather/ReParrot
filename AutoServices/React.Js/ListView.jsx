import "./autoService.css";
import "rc-pagination/assets/index.css";

import React from "react";
import toastr from "toastr";
import logger from "sabio-debug";
import PropTypes from "prop-types";
import Pagination from "rc-pagination";
import AutoService from "./AutoService";
import locale from "rc-pagination/lib/locale/en_US";
import AutoServiceViewMore from "./AutoServiceViewMore";
import autoServiceService from "../../services/autoServicesService";

import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Button, Card, Col, Container, Nav, Row, Tab } from "react-bootstrap";

const _logger = logger.extend("AutoServices");

function AutoServices(props) {
  const [pageData, setPageData] = useState({
    arrayOfAutoServices: [],
    autoServicesComponents: [],
  });

  const [paginate, setPaginate] = useState({
    index: 0,
    total: 0,
    pageSize: 6,
    query: "",
  });

  const currentUser = props.currentUser;

  const navigate = useNavigate();

  useEffect(() => {
    if (paginate.query?.length > 0) {
      autoServiceService
        .autoServiceSearchPagination(
          paginate.index,
          paginate.pageSize,
          paginate.query
        )
        .then(onGetAllServicesSuccess)
        .catch(onGetAllServicesError);
    } else if (!paginate.query) {
      autoServiceService
        .getAllAutoServices(paginate.index, paginate.pageSize)
        .then(onGetAllServicesSuccess)
        .catch(onGetAllServicesError);
    }
  }, [paginate.index, paginate.query]);

  const onGetAllServicesSuccess = (response) => {
    var autoServicesArray = response.item.pagedItems;
    _logger("Get All AutoServices Success", { autoServicesArray });

    setPageData((prevState) => {
      const pageData = { ...prevState };
      pageData.arrayOfAutoServices = autoServicesArray;
      pageData.autoServicesComponents = autoServicesArray.map(mapAutoService);
      return pageData;
    });

    setPaginate((prevState) => {
      const newPageData = { ...prevState };
      newPageData.pageSize = response.item.pageSize;
      newPageData.total = response.item.totalCount;
      return newPageData;
    });
  };

  const onGetAllServicesError = (error) => {
    _logger("Get AutoServices Error...", error);
    toastr.error("Something went wrong", "List Failed");
  };

  const onPageChange = (page) => {
    _logger("onPageChange", page);

    setPaginate((prevState) => {
      const updatedPage = { ...prevState, index: page - 1 };
      return updatedPage;
    });
  };

  const onGetAutoServiceDetail = (service, eObj) => {
    _logger(service, eObj);
    return (
      <AutoServiceViewMore
        autoService={service}
        currentUser={currentUser}
        onServiceClickedDelete={onDeleteRequest}
      />
    );
  };

  const mapAutoService = (aService) => {
    return (
      <AutoService
        autoService={aService}
        key={"AutoService" + aService.id}
        onLocalClicked={onGetAutoServiceDetail}
        onServiceClickedDelete={onDeleteRequest}
        currentUser={currentUser}
      />
    );
  };

  const onSearchSubmit = (value) => {
    _logger("searching Auto Services...", value);

    setPaginate((prevState) => {
      const updatedPage = { ...prevState };

      updatedPage.index = 0;
      updatedPage.pageSize = value.pageSize;
      updatedPage.query = value.query;
      updatedPage.total = value.total;
      return updatedPage;
    });
  };

  const onNavigateToAddForm = () => {
    _logger("navigating");
    navigate(`/autoservices/add`);
  };

  const onDeleteRequest = useCallback((service, eObj) => {
    _logger(service.id, { service, eObj });

    const handler = getDeleteSuccessHandler(service.id);

    autoServiceService
      .deleteAutoServiceById(service.id)
      .then(handler)
      .catch(onDeleteServiceError);
  }, []);

  const getDeleteSuccessHandler = (idToBeDeleted) => {
    toastr.success(
      "You have Deleted an Auto Service Successfully",
      "Delete Success"
    );

    setPageData((prevState) => {
      const pageData = { ...prevState };
      pageData.arrayOfAutoServices = [...pageData.arrayOfAutoServices];

      const idxOf = pageData.arrayOfAutoServices.findIndex((service) => {
        let result = false;

        if (service.id === idToBeDeleted) {
          result = true;
        }
        return result;
      });

      if (idxOf >= 0) {
        pageData.arrayOfAutoServices.splice(idxOf, 1);
        pageData.autoServicesComponents =
          pageData.arrayOfAutoServices.map(mapAutoService);
      }
      return pageData;
    });
  };

  const onDeleteServiceError = (err) => {
    _logger("Error Deleting Auto Service", err);
    toastr.error("Something went wrong", "Delete Failed");
  };

  return (
    <div>
      <div className="bg-services">
        <Container>
          <Row className="center-autoservices">
            <Col xl={8} lg={8} md={12} sm={12}>
              <div>
                <h1 className="title-autoservices">
                  Getting Started with Auto Services
                </h1>
                <p className="desc-services">
                  Browse through popular Auto Services. You can learn more about
                  your favorite organizations or discover new ones. Get to know
                  what you are getting out of each Auto Service.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="center-autoservices">
            <Col xl={8} lg={8} md={12} sm={12}>
              <div className="mt-4 mb-4">
                <Formik
                  enableReinitialize={true}
                  initialValues={paginate}
                  onSubmit={onSearchSubmit}
                >
                  <Form>
                    <Field
                      type="search"
                      className="form-control form-control-sm"
                      id="query"
                      name="query"
                      placeholder="Search Auto Services"
                    />
                  </Form>
                </Formik>
              </div>
              {props.currentUser.roles.includes("OrgAdmin") && (
                <Button
                  className="btn-success text-right"
                  size="sm"
                  type="submit"
                  onClick={onNavigateToAddForm}
                >
                  Add Service
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="center-autoservices">
          <Col xl={8} lg={8} md={12} sm={12} className="mt-n8 mb-4 mb-lg-12">
            <Tab.Container defaultActiveKey="autoservices">
              <Card>
                <Card.Header className="border-bottom-0 p-0 bg-white">
                  <Nav className="nav-lb-tab">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="autoservices"
                        className="mb-sm-3 mb-md-0"
                      >
                        Auto Services
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body className="p-0">
                  <Tab.Content>
                    <Tab.Pane eventKey="autoservices" className="pb-4 p-4">
                      <div className="row">
                        {pageData.autoServicesComponents}
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Card.Body>
                <Container>
                  <Row>
                    <Col>
                      <Pagination
                        onChange={onPageChange}
                        index={paginate.index}
                        total={paginate.total}
                        pageSize={paginate.pageSize}
                        locale={locale}
                        className="text-center mt-2 mb-6"
                      />
                    </Col>
                  </Row>
                </Container>
              </Card>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

AutoServices.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    roles: PropTypes.shape({
      0: PropTypes.string.isRequired,
      1: PropTypes.string,
      includes: PropTypes.func,
    }),
  }),
};
export default AutoServices;
