import axios from "axios";
import * as serviceHelpers from "./serviceHelpers";

const endpoint = `${serviceHelpers.API_HOST_PREFIX}/api/autoservices`; 

const getByIdAutoService = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess) 
    .catch(serviceHelpers.onGlobalError);
};

const getAllAutoServices = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess) 
    .catch(serviceHelpers.onGlobalError); 
};

const getAllByOrgIdNoPag = (orgId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/organizations?orgId=${orgId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess) 
    .catch(serviceHelpers.onGlobalError); 
};

const addAutoService = (payload) => {
  const config = {
    method: "POST",
    data: payload,
    url: endpoint,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

const autoServiceSearchPagination = (pageIndex, pageSize, query) => {
    const config = {
      method: "GET",
      url: `${endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
      withCredentials: true, 
      crossdomain: true,
      headers: {"Content-Type": "application/json"},
  
    };
    return axios(config)
      .then(serviceHelpers.onGlobalSuccess)
      .catch(serviceHelpers.onGlobalError);
  }

  const updateAutoService = (id, payload) => {
    const config = {
      method: "PUT",
      data: payload,
      url: `${endpoint}/${id}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config)
      .then(serviceHelpers.onGlobalSuccess)
      .catch(serviceHelpers.onGlobalError);
  };

  const deleteAutoServiceById = (id) => {
    const config = {
      method: "DELETE",
      url: `${endpoint}/${id}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config)
      .then(serviceHelpers.onGlobalSuccess)
      .catch(serviceHelpers.onGlobalError);

  };
  
const autoServiceService = {
  getByIdAutoService, 
  getAllAutoServices, 
  getAllByOrgIdNoPag,
  addAutoService, 
  autoServiceSearchPagination, 
  updateAutoService, 
  deleteAutoServiceById
};

export default autoServiceService;