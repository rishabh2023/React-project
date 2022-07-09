import { ActionTypes } from "../constants/action-types";
const intialState = {
  experts: [],
  
};
const intialhomeState = {
  home: [],
  
};
const intialserviceState = {
  services: [],
  
};
const intialcategoryState = {
  category: [],
  
};

export const expertsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_EXPERTS:
      return { ...state, experts: payload };
    default:
      return state;
  }
};

export const selectedExpertsReducer = (state = {}, { type, payload }) => {
  
  switch (type) {
    case ActionTypes.SELECTED_EXPERT:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_EXPERT:
      return {};
    default:
      return state;
  }
};


export const HomeReducer = (state = intialhomeState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_HOME:
      return { ...state, home: payload };
    default:
      return state;
  }
};

export const servicesReducer = (state = intialserviceState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SERVICES:
      return { ...state, services: payload };
    default:
      return state;
  }
};

export const categoryReducer = (state = intialcategoryState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CATEGORY:
      return { ...state, category: payload };
    default:
      return state;
  }
};