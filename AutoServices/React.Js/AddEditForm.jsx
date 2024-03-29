import React from "react";
import { useState, useEffect } from "react";
import logger from "sabio-debug";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import { Formik, Form as FormikForm, ErrorMessage, Field } from "formik";
import autoServiceService from "services/autoServicesService";
import toastr from "toastr";
import AutoServiceValidationSchema from "./autoServiceValidationSchema";
import lookUpService from "services/lookUpService";
import { useLocation, useNavigate } from "react-router-dom";
import "./autoService.css";

const _logger = logger.extend("AutoServiceAddEdit");

function AutoServiceAdd() {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    description: "",
    organizationId: "",
    serviceTypeId: "",
    unitTypeId: "",
    unitCost: "",
    estimatedDuration: "",
    isDeleted: false,
  });
  const [unitTypeData, setUnitTypeData] = useState([]);
  const [serviceTypeData, setServiceTypeData] = useState([]);
  const [organizationData, setOrganizationsData] = useState([]);

  const { state } = useLocation();
  const navigate = useNavigate();

  _logger(setFormData);

  useEffect(() => {
    lookUpService
      .LookUp(["ServiceTypes"])
      .then(onGetServiceTypesSuccess)
      .catch(onGetServiceTypesError);

    lookUpService
      .LookUp(["UnitTypes"])
      .then(onGetUnitTypesSuccess)
      .catch(onGetUnitTypesError);

    lookUpService
      .LookUp(["OrganizationsNames"])
      .then(onGetOrganizationsSuccess)
      .catch(onGetOrganizationsError);
  }, []);

  const onGetServiceTypesSuccess = (response) => {
    var serviceTypesArray = response.item.serviceTypes;

    setServiceTypeData(serviceTypesArray.map(mapServiceTypes));
  };

  const onGetServiceTypesError = (error) => {
    _logger("serviceTypes Error", error);
  };

  const onGetUnitTypesSuccess = (response) => {
    var unitTypesArray = response.item.unitTypes;

    setUnitTypeData(unitTypesArray.map(mapUnitTypes));
  };

  const onGetUnitTypesError = (error) => {
    _logger("UnitTypes Get All Error", error);
  };

  const onGetOrganizationsSuccess = (response) => {
    var organizationsArray = response.item.organizationsNames;
    _logger("Org Names: ", organizationsArray);
    setOrganizationsData(organizationsArray.map(mapOrganizations));
  };

  const onGetOrganizationsError = (error) => {
    _logger("Organizations Get All Error", error);
  };

  const mapServiceTypes = (type) => {
    return (
      <option key={type.id} value={type.id}>
        {type.name}
      </option>
    );
  };

  const mapUnitTypes = (type) => {
    return (
      <option key={type.id} value={type.id}>
        {type.name}
      </option>
    );
  };

  const mapOrganizations = (org) => {
    return (
      <option key={org.id} value={org.id}>
        {org.name}
      </option>
    );
  };

  const handleSubmit = (values) => {
    _logger("form values", values);
    if (values.id) {
      autoServiceService
        .updateAutoService(values.id, values)
        .then(onEditServiceSuccess)
        .catch(onEditServiceError);
    } else {
      autoServiceService
        .addAutoService(values)
        .then(onAddServiceSuccess)
        .catch(onAddServiceError);
    }
  };

  const onAddServiceSuccess = (response) => {
    _logger("response:", response);
    toastr.success(
      "You have Added an Auto Service Successfully",
      "Add Success"
    );
    _logger("navigating");
    navigate(`/autoservices`);
  };

  const onAddServiceError = (error) => {
    _logger("error", error);
    toastr.error("Please check Fields and Resubmit", "Add Failed");
  };

  const onEditServiceSuccess = (response) => {
    _logger("response:", response);
    toastr.success(
      "You have Updated an Auto Service Successfully",
      "Update Success"
    );
    _logger("navigating");
    navigate(`/autoservices`);
  };

  const onEditServiceError = (error) => {
    _logger("error", error);
    toastr.error("Please check Fields and Resubmit", "Update Failed");
  };

  useEffect(() => {
    if (state?.type === "AUTOSERVICEEDIT_VIEW" && state.payload) {
      _logger("AutoService Change Firing", state);

      setFormData((prevState) => {
        const newFormData = { ...prevState };
        newFormData.id = state.payload.id;
        newFormData.name = state.payload.name;
        newFormData.sku = state.payload.sku;
        newFormData.description = state.payload.description;
        newFormData.serviceTypeId = state.payload.serviceType.id;
        newFormData.organizationId = state.payload.organizationId;
        newFormData.unitTypeId = state.payload.unitType.id;
        newFormData.unitCost = state.payload.unitCost;
        newFormData.estimatedDuration = state.payload.estimatedDuration;

        _logger("Form Filled", newFormData);
        return newFormData;
      });
    }
  }, []);

  return (
    <React.Fragment>
      <div className="pt-lg-8 pb-lg-12 pt-8 pb-12 bg-primary">
        <Container>
          <Row className="center-autoservices">
            <Col xl={7} lg={7} md={12} sm={12}>
              <div>
                <h1 className="title-autoservices"> Manage Auto Service </h1>
                <p className="desc-services"> Add or Edit Auto Services </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="center-autoservices">
          <Col xl={8} lg={8} md={8} sm={8} className="mt-n8 mb-12 mb-lg-0">
            <Tab.Container defaultActiveKey="add">
              <Card>
                <Card.Header className="border-bottom-0 p-0 bg-white">
                  <Nav className="nav-lb-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="add" className="mb-sm-3 mb-md-0">
                        Manage Auto Service
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body className="p-0">
                  <Tab.Content>
                    <Tab.Pane eventKey="add" className="pb-4 p-4">
                      <Formik
                        enableReinitialize={true}
                        initialValues={formData}
                        onSubmit={handleSubmit}
                        validationSchema={AutoServiceValidationSchema}
                      >
                        <FormikForm>
                          <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                              <Form.Label>Service Name</Form.Label>
                              <Field
                                className="form-control"
                                type="text"
                                id="name"
                                name="name"
                                placeholder="e.g., Oil Change"
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="has-error"
                              />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                              <Form.Label>SKU</Form.Label>
                              <Field
                                className="form-control"
                                type="text"
                                id="sku"
                                name="sku"
                                placeholder="e.g., KS93528TUT"
                              />
                              <ErrorMessage
                                name="sku"
                                component="div"
                                className="has-error"
                              />
                            </Form.Group>
                          </Row>
                          <Row className="mb-3 ">
                            <Form.Group as={Col} md="12">
                              <Form.Label>Description</Form.Label>
                              <Field
                                className="form-control"
                                rows="8"
                                as="textarea"
                                id="description"
                                name="description"
                                placeholder="Provide a Brief Description about this Service."
                              />
                              <ErrorMessage
                                name="description"
                                component="div"
                                className="has-error"
                              />
                            </Form.Group>
                          </Row>
                          <Row className="mb-3 ">
                            <Form.Group as={Col} md="4">
                              <Form.Label>Organization</Form.Label>
                              <Field
                                as="select"
                                className="form-group form-select text-dark"
                                id="organizationId"
                                name="organizationId"
                                placeholder="Organization"
                              >
                                <option
                                  value=""
                                  label="Oganizations"
                                  className="text-muted"
                                ></option>
                                {organizationData}
                              </Field>
                              <ErrorMessage
                                name="organizationId"
                                component="div"
                                className="has-error"
                              />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                              <Form.Label>Service Type</Form.Label>
                              <Field
                                as="select"
                                className="form-group form-select text-dark"
                                type="text"
                                id="serviceTypeId"
                                name="serviceTypeId"
                                placeholder="Service"
                              >
                                <option
                                  value=""
                                  label="Service Types"
                                  className="text-muted"
                                ></option>
                                {serviceTypeData}
                              </Field>
                              <ErrorMessage
                                name="serviceTypeId"
                                component="div"
                                className="has-error"
                              />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                              <Form.Label>Unit Type</Form.Label>
                              <Field
                                as="select"
                                className="form-group form-select text-dark"
                                type="text"
                                id="unitTypeId"
                                name="unitTypeId"
                                placeholder="Unit"
                              >
                                <option
                                  value=""
                                  label="Unit Types"
                                  className="text-muted"
                                ></option>
                                {unitTypeData}
                              </Field>
                              <ErrorMessage
                                name="unitTypeId"
                                component="div"
                                className="has-error"
                              />
                            </Form.Group>
                          </Row>
                          <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                              <Form.Label>Unit Cost (USD)</Form.Label>
                              <Field
                                className="form-control"
                                type="text"
                                id="unitCost"
                                name="unitCost"
                                placeholder="USD"
                              />
                              <ErrorMessage
                                name="unitCost"
                                component="div"
                                className="has-error"
                              />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                              <Form.Label>Estimated Time (Min) </Form.Label>
                              <Field
                                className="form-control"
                                type="text"
                                id="estimatedDuration"
                                name="estimatedDuration"
                                placeholder="Minutes"
                              />
                              <ErrorMessage
                                name="estimatedDuration"
                                component="div"
                                className="has-error"
                              />
                            </Form.Group>
                          </Row>
                          <Row className="p-3">
                            <Button
                              className="btn-success"
                              size="m"
                              type="submit"
                            >
                              Submit
                            </Button>
                          </Row>
                        </FormikForm>
                      </Formik>
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

export default AutoServiceAdd;
