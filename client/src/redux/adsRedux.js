import axios from "axios";
import { API_URL } from "../config";
import shortid from "shortid";

export const getAllAds = ({ ads }) => ads.data;
export const getRequest = ({ ads }) => ads.requests;
export const getAdById = ({ ads }, id) => ads.data.find((ad) => ad._id === id);

const reducerName = "ads";
const createActionName = (name) => `app/${reducerName}/${name}`;

const ADD_AD = createActionName("ADD_AD");
const EDIT_AD = createActionName("EDIT_AD");
const REMOVE_AD = createActionName("REMOVE_AD");
const SEARCH_AD = createActionName("SEARCH_AD");

const START_REQUEST = createActionName("START_REQUEST");
const END_REQUEST = createActionName("END_REQUEST");
const ERROR_REQUEST = createActionName("ERROR_REQUEST");

const LOAD_ADS = createActionName("LOAD_ADS");

export const addAd = (payload) => ({ payload, type: ADD_AD });
export const editAd = (payload) => ({ payload, type: EDIT_AD });
export const removeAd = (payload) => ({ payload, type: REMOVE_AD });
export const searchAd = (searchPhrase) => ({
  payload: { searchPhrase },
  type: SEARCH_AD,
});

export const startRequest = (payload) => ({ payload, type: START_REQUEST });
export const endRequest = (payload) => ({ payload, type: END_REQUEST });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });

export const loadAds = (payload) => ({ payload, type: LOAD_ADS });

export const loadAdsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: "LOAD_ADS" }));
    try {
      const res = await axios.get(`${API_URL}/ads`);
      dispatch(loadAds(res.data));
      dispatch(endRequest({ name: "LOAD_ADS" }));
    } catch (e) {
      dispatch(errorRequest({ name: "LOAD_ADS", error: e.message }));
    }
  };
};

export const createAd = (ad) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: "ADD_AD" }));
    try {
      const res = await axios.post(`${API_URL}/ads`, ad);
      dispatch(addAd(res));
      dispatch(endRequest({ name: "ADD_AD" }));
    } catch (e) {
      dispatch(errorRequest({ name: "ADD_AD", error: e.message }));
    }
  };
};

export const updateAd = (ad) => async (dispatch) => {
  dispatch(startRequest({ name: "EDIT_AD" }));
  try {
    const res = await axios.put(`${API_URL}/ads/${ad.id}`);
    dispatch(editAd(res));
    dispatch(endRequest({ name: "EDIT_AD" }));
  } catch (e) {
    dispatch(errorRequest({ name: "EDIT_AD", error: e.message }));
  }
};

export const deleteAd = (id) => async (dispatch) => {
  dispatch(startRequest({ name: "REMOVE_AD" }));
  try {
    const res = await axios.delete(`${API_URL}/ads/${id}`);
    dispatch(removeAd(res));
    dispatch(endRequest({ name: "REMOVE_AD" }));
  } catch (e) {
    dispatch(errorRequest({ name: "REMOVE_AD", error: e.message }));
  }
};

export const findAdBySearchPhrase = (searchPhrase) => async (dispatch) => {
  dispatch(startRequest({ name: "SEARCH_AD" }));
  try {
    const res = await axios.get(`${API_URL}/ads/search/${searchPhrase}`);
    dispatch(loadAds(res.data));
    dispatch(endRequest({ name: "SEARCH_AD" }));
  } catch (e) {
    dispatch(errorRequest({ name: "SEARCH_AD", error: e.message }));
  }
};

const initialState = {
  data: [],
  requests: {
    pending: false,
    error: null,
    success: null,
  },
};

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_ADS:
      return { ...statePart, data: [...action.payload] };
    case ADD_AD:
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
        id: shortid(),
      };
    case EDIT_AD:
      return [
        ...statePart.map((ad) =>
          ad.id === action.payload.id ? { ...ad, ...action.payload } : ad
        ),
      ];
    case REMOVE_AD:
      return [...statePart.filter((ad) => ad.id !== action.payload.id)];
    case SEARCH_AD:
      return {
        ...statePart,
        data: [
          ...statePart.data.filter((ad) =>
            ad.title.includes(action.payload.searchPhase)
          ),
        ],
      };
    case START_REQUEST:
      return {
        ...statePart,
        request: {
          pending: true,
          error: null,
          success: false,
        },
      };
    case END_REQUEST:
      return {
        ...statePart,
        request: {
          pending: false,
          error: null,
          success: true,
        },
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        request: {
          pending: false,
          error: action.payload.error,
          success: false,
        },
      };
    default:
      return statePart;
  }
}
