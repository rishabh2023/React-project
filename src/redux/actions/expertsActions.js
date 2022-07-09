import { ActionTypes } from "../constants/action-types";

export const setExperts = (experts) => {
  return {
    type: ActionTypes.SET_EXPERTS,
    payload: experts,
  };
};

export const setHome = (experts_home) => {
  return {
    type: ActionTypes.SET_HOME,
    payload: experts_home,
  };
};

export const setServices = (services) => {
  return {
    type: ActionTypes.SET_SERVICES,
    payload: services,
  };
};

export const setCategory = (categories) => {
  return {
    type: ActionTypes.SET_CATEGORY,
    payload: categories,
  };
};


