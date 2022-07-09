import { combineReducers } from "redux";
import { expertsReducer, selectedExpertsReducer,HomeReducer,servicesReducer,categoryReducer } from "./expertsReducer";
const reducers = combineReducers({
  allExperts: expertsReducer,
  expert: selectedExpertsReducer,
  home:HomeReducer,
  allservices:servicesReducer,
  categories:categoryReducer
});
export default reducers;
