import axios from "axios";
import * as serviceHelpers from "./serviceHelpers";

const endpoint = `${serviceHelpers.API_HOST_PREFIX}/api/followers`; 

//GET FOLLOW COUNT
const getByOrgId = (orgId) => {
    const config = {
      method: "GET",
      url: `${endpoint}/followcount/${orgId}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config)
      .then(serviceHelpers.onGlobalSuccess) 
      .catch(serviceHelpers.onGlobalError);
  };

// GET FOLLOW STATUS
const getBoolByIds = (orgId, userId) => {
    const config = {
      method: "GET",
      url: `${endpoint}/status/${orgId}/${userId}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config)
      .then(serviceHelpers.onGlobalSuccess) 
      .catch(serviceHelpers.onGlobalError);
  };

  //FOLLOW REQUEST
  const addFollower = (orgId) => {
    const config = {
      method: "POST",
      url: `${endpoint}?orgId=${orgId}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config)
      .then(serviceHelpers.onGlobalSuccess) 
      .catch(serviceHelpers.onGlobalError);
  };

  //REMOVE FOLLOW
  const removeFollower = (orgId) => {
    const config = {
      method: "DELETE",
      url: `${endpoint}?orgId=${orgId}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config)
      .then(serviceHelpers.onGlobalSuccess) 
      .catch(serviceHelpers.onGlobalError);
  };



const followerService = {
    getByOrgId, getBoolByIds, addFollower, removeFollower
};

export default followerService;
