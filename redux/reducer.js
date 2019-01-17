export function reducer(state, action) {
  let tmp1;
  let tmp2;
  let tmp3;
  let tmp4;
  let tmp5;
  let tmp6;
  let tmp7;
  let tmp8;
  let tmp9;

  switch (action.type) {
    case "KTH_COUNTY":
      return { ...state, kth: { ...state.kth, county: action.payload } };

    case "KTH_COUNTY_SELECTED":
      tmp1 = {
        ...state,
        kth: { ...state.kth, county: [...state.kth.county] }
      }.kth.county.map(item => {
        tmp2 = { ...item };
        tmp2.selected = false;
        action.payload.forEach(selected => {
          if (selected.id == tmp2.id) {
            tmp2.selected = true;
          }
        });

        return { ...tmp2 };
      });
      return { ...state, kth: { ...state.kth, county: [...tmp1] } };
    case "KTH_MUNICIPALITY":
      return { ...state, kth: { ...state.kth, municipality: action.payload } };

    case "KTH_MUNICIPALITY_SELECTED":
      tmp1 = {
        ...state,
        kth: { ...state.kth, municipality: [...state.kth.municipality] }
      }.kth.municipality.map(item => {
        tmp2 = { ...item };
        tmp2.selected = false;
        action.payload.forEach(selected => {
          if (selected.id == tmp2.id) {
            tmp2.selected = true;
          }
        });

        return { ...tmp2 };
      });
      return { ...state, kth: { ...state.kth, municipality: [...tmp1] } };

    case "KTH_LKF":
      return { ...state, kth: { ...state.kth, lkf: action.payload } };

    case "KTH_LKF_SELECTED":
      tmp1 = {
        ...state,
        kth: { ...state.kth, lkf: [...state.kth.lkf] }
      }.kth.lkf.map(item => {
        tmp2 = { ...item };
        tmp2.selected = false;
        action.payload.forEach(selected => {
          if (selected.id == tmp2.id) {
            tmp2.selected = true;
          }
        });

        return { ...tmp2 };
      });
      return { ...state, kth: { ...state.kth, lkf: [...tmp1] } };

    
    case "MENU_SELECTED":
      return { ...state, menu: { ...state.menu, selected: action.payload } };


    default:
      return state;
  }
}
