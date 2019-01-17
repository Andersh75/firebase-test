const KTH_COUNTY = 'KTH_COUNTY';
const KTH_COUNTY_SELECTED = 'KTH_COUNTY_SELECTED';
const KTH_MUNICIPALITY = 'KTH_MUNICIPALITY';
const KTH_MUNICIPALITY_SELECTED = 'KTH_MUNICIPALITY_SELECTED';
const KTH_LKF = 'KTH_LKF';
const KTH_LKF_SELECTED = 'KTH_LKF_SELECTED';
const MENU_SELECTED = 'MENU_SELECTED';

export const action = {

  kth_county: (payload) => {
    return {
      type: KTH_COUNTY,
      payload: payload
    };
  },
  kth_county_selected: (payload) => {
    return {
      type: KTH_COUNTY_SELECTED,
      payload: payload
    };
  },
  kth_municipality: (payload) => {
    return {
      type: KTH_MUNICIPALITY,
      payload: payload
    };
  },
  kth_municipality_selected: (payload) => {
    return {
      type: KTH_MUNICIPALITY_SELECTED,
      payload: payload
    };
  },

  kth_lkf: (payload) => {
    return {
      type: KTH_LKF,
      payload: payload
    };
  },
  kth_lkf_selected: (payload) => {
    return {
      type: KTH_LKF_SELECTED,
      payload: payload
    };
  },
  menu_selected: (payload) => {
    return {
      type: MENU_SELECTED,
      payload: payload
    };
  },
}
