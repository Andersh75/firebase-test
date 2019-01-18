import * as R from "ramda/es/index.js";


const MENU_SELECTED = 'MENU_SELECTED';
const ASSUMPTIONS_STARTYEAR = 'ASSUMPTIONS_STARTYEAR';
const ASSUMPTIONS_ENDYEAR = 'ASSUMPTIONS_ENDYEAR';
const ASSUMPTIONS_SCENARIO = "ASSUMPTIONS_SCENARIO";

const ASSUMPTIONS_INVESTMENTS_FUTURE = 'ASSUMPTIONS_INVESTMENTS_FUTURE';
const ASSUMPTIONS_INVESTMENTS_INITIAL = 'ASSUMPTIONS_INVESTMENTS_INITIAL';
const ASSUMPTIONS_RENT_AMOUNT = 'ASSUMPTIONS_RENT_AMOUNT';
const ASSUMPTIONS_RENT_PERIOD = 'ASSUMPTIONS_RENT_PERIOD';
const ASSUMPTIONS_RENT_REMOVE = 'ASSUMPTIONS_RENT_REMOVE';
const ASSUMPTIONS_RENT_ADD = 'ASSUMPTIONS_RENT_ADD';
const ASSUMPTIONS_MAINTENANCE_PERMANENT = 'ASSUMPTIONS_MAINTENANCE_PERMANENT';
const ASSUMPTIONS_MAINTENANCE_DYNAMIC = 'ASSUMPTIONS_MAINTENANCE_DYNAMIC';
const ASSUMPTIONS_MAINTENANCE_NOTUSED = 'ASSUMPTIONS_MAINTENANCE_NOTUSED';
const ASSUMPTIONS_RATES_INFLATION = 'ASSUMPTIONS_RATES_INFLATION';
const ASSUMPTIONS_RATES_DISCOUNT = 'ASSUMPTIONS_RATES_DISCOUNT';

const INVESTMENTPROGRAM_DEMAND = 'INVESTMENTPROGRAM_DEMAND';
const INVESTMENTPROGRAM_VOLUMEDYNAMIC = 'INVESTMENTPROGRAM_VOLUMEDYNAMIC';
const INVESTMENTPROGRAM_VOLUMEPERMANENT = 'INVESTMENTPROGRAM_VOLUMEPERMANENT';

const STATIC_ASSUMPTIONS = 'STATIC_ASSUMPTIONS';
const STATIC_INVESTMENT = 'STATIC_INVESTMENT';



const KTH_COUNTY = 'KTH_COUNTY';
const KTH_COUNTY_SELECTED = 'KTH_COUNTY_SELECTED';
const KTH_MUNICIPALITY = 'KTH_MUNICIPALITY';
const KTH_MUNICIPALITY_SELECTED = 'KTH_MUNICIPALITY_SELECTED';
const KTH_LKF = 'KTH_LKF';
const KTH_LKF_SELECTED = 'KTH_LKF_SELECTED';

export const action = {




    
  menu_selected: (payload) => {
    return {
        type: MENU_SELECTED,
        payload: payload
    };
},
assumptions_startyear: (payload) => {
    return {
        type: ASSUMPTIONS_STARTYEAR,
        payload: payload
    };
},
assumptions_endyear: (payload) => {
    return {
        type: ASSUMPTIONS_ENDYEAR,
        payload: payload
    };
},
assumptions_scenario: (payload) => {
    return {
        type: ASSUMPTIONS_SCENARIO,
        payload: payload
    };
},
assumptions_investments_future: (payload) => {
    return {
        type: ASSUMPTIONS_INVESTMENTS_FUTURE,
        payload: payload
    };
},
assumptions_investments_initial: (payload) => {
    return {
        type: ASSUMPTIONS_INVESTMENTS_INITIAL,
        payload: payload
    };
},

assumptions_rent_remove: (payload) => {
    return {
        type: ASSUMPTIONS_RENT_REMOVE,
        payload: payload
    };
},

assumptions_rent_add: (payload) => {
    return {
        type: ASSUMPTIONS_RENT_ADD,
        payload: payload
    };
},

assumptions_rent_amount: (payload) => {
    return {
        type: ASSUMPTIONS_RENT_AMOUNT,
        payload: payload
    };
},
assumptions_rent_period: (payload) => {
    return {
        type: ASSUMPTIONS_RENT_PERIOD,
        payload: payload
    };
},
assumptions_rent_after: (payload) => {
    return {
        type: ASSUMPTIONS_RENT_AFTER,
        payload: payload
    };
},
assumptions_maintenance_permanent: (payload) => {
    return {
        type: ASSUMPTIONS_MAINTENANCE_PERMANENT,
        payload: payload
    };
},
assumptions_maintenance_dynamic: (payload) => {
    return {
        type: ASSUMPTIONS_MAINTENANCE_DYNAMIC,
        payload: payload
    };
},
assumptions_maintenance_notused: (payload) => {
    return {
        type: ASSUMPTIONS_MAINTENANCE_NOTUSED,
        payload: payload
    };
},
assumptions_rates_inflation: (payload) => {
    return {
        type: ASSUMPTIONS_RATES_INFLATION,
        payload: payload
    };
},
assumptions_rates_discount: (payload) => {
    return {
        type: ASSUMPTIONS_RATES_DISCOUNT,
        payload: payload
    };
},  
investmentprogram_demand: (payload) => {
    return {
        type: INVESTMENTPROGRAM_DEMAND,
        payload: payload
    };
},
investmentprogram_volumedynamic: (payload) => {
    return {
        type: INVESTMENTPROGRAM_VOLUMEDYNAMIC,
        payload: payload            
    };
},
investmentprogram_volumepermanent: (payload) => {
    return {
        type: INVESTMENTPROGRAM_VOLUMEPERMANENT,
        payload: payload            
    };
},
static_assumptions: (payload) => {
    return {
        type: STATIC_ASSUMPTIONS,
        payload: payload            
    };
},
static_investment: (payload) => {
    return {
        type: STATIC_INVESTMENT,
        payload: payload            
    };
},


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
}



// kth_county: (payload) => {
//   return {
//     type: KTH_COUNTY,
//     payload: payload
//   };
// },
// kth_county_selected: (payload) => {
//   return {
//     type: KTH_COUNTY_SELECTED,
//     payload: payload
//   };
// },
// kth_municipality: (payload) => {
//   return {
//     type: KTH_MUNICIPALITY,
//     payload: payload
//   };
// },
// kth_municipality_selected: (payload) => {
//   return {
//     type: KTH_MUNICIPALITY_SELECTED,
//     payload: payload
//   };
// },

// kth_lkf: (payload) => {
//   return {
//     type: KTH_LKF,
//     payload: payload
//   };
// },
// kth_lkf_selected: (payload) => {
//   return {
//     type: KTH_LKF_SELECTED,
//     payload: payload
//   };
// },
// menu_selected: (payload) => {
//   return {
//     type: MENU_SELECTED,
//     payload: payload
//   };
// },
