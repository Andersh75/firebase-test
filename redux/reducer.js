import * as R from "ramda/es/index.js";

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

    
  


      case 'MENU_SELECTED':
      return {...state, menu: {...state.menu, selected: action.payload}}
  case 'ASSUMPTIONS_STARTYEAR':
      return {...state, assumptions: {...state.assumptions, startyear: action.payload}}
  case 'ASSUMPTIONS_ENDYEAR':

      tmp7 = {...state.investmentprogram}

      //YEAR ARRAY
      tmp3 = R.range(+action.payload.startyear, +action.payload.endyear + 1)


      //VALUE ZERO FOR ALL YEARS IN ARRAY
      tmp1 = {}
      tmp3.forEach(year => {
          tmp1[year] = '0';
      })


      //ARRAY OF ALL COST NAMES
      let keysOfObj = Object.keys(tmp7);



      //ARRAYS WITH ALL CORRECT VALUES FOR COST NAMES IN SCENARIO
      tmp6 = keysOfObj.map(item => {

          let myObject = {...tmp1};
          for (var property in myObject) {
              if (tmp7[item]['scenario' + +action.payload.scenario][property] != undefined) {
                  myObject[property] = tmp7[item]['scenario' + +action.payload.scenario][property]
              }
          }

          return {...myObject}
      })


      keysOfObj.forEach((prop, index) => {
          tmp7[prop]['scenario' + +action.payload.scenario] = tmp6[index];
      })            

       return {...state, assumptions: {...state.assumptions, ['scenario' + +action.payload.scenario]: {...state.assumptions['scenario' + +action.payload.scenario], endyear: action.payload.endyear}}, investmentprogram: {...tmp7}}

  case 'ASSUMPTIONS_SCENARIO':
      return {...state, assumptions: {...state.assumptions, scenario: action.payload}}
  




  



  //OK
  case 'ASSUMPTIONS_RENT_REMOVE':
      tmp1 = +action.payload.index / 2;
      tmp2 = R.remove(tmp1, 1, [...state.assumptions.rent['scenario' + chosenScenario].period])
      tmp3 = R.remove(tmp1, 1, [...state.assumptions.rent['scenario' + chosenScenario].amount])
      return {...state, assumptions: {...state.assumptions, rent: {...state.assumptions.rent, ['scenario' + chosenScenario]: {...state.assumptions.rent['scenario' + chosenScenario], amount: tmp3, period: tmp2}}}}

  //OK
  case 'ASSUMPTIONS_RENT_ADD':
      tmp1 = R.insert(math.ceil(+action.payload.index / 2), '0', [...state.assumptions.rent['scenario' + chosenScenario].amount])
      tmp2 = R.insert(math.ceil(+action.payload.index / 2), '0', [...state.assumptions.rent['scenario' + chosenScenario].period])
      return {...state, assumptions: {...state.assumptions, rent: {...state.assumptions.rent, ['scenario' + chosenScenario]: {...state.assumptions.rent['scenario' + chosenScenario], amount: tmp1, period: tmp2}}}}

  //OK
  case 'ASSUMPTIONS_RENT_AMOUNT':
      newArr = [...state.assumptions.rent['scenario' + chosenScenario].amount]
      newArr[action.payload.order] = action.payload.value;
      return {...state, assumptions: {...state.assumptions, rent: {...state.assumptions.rent, ['scenario' + chosenScenario]: {...state.assumptions.rent['scenario' + chosenScenario], amount: newArr}}}}

  //OK 
  case 'ASSUMPTIONS_RENT_PERIOD':
      newArr = [...state.assumptions.rent['scenario' + chosenScenario].period]
      newArr[action.payload.order] = action.payload.value;
      return {...state, assumptions: {...state.assumptions, rent: {...state.assumptions.rent, ['scenario' + chosenScenario]: {...state.assumptions.rent['scenario' + chosenScenario], period: newArr}}}}

  //OK
  case 'ASSUMPTIONS_INVESTMENTS_FUTURE':
      newArr = {...state.assumptions.investments['scenario' + chosenScenario]};
      newArr.future = action.payload.value
      return {...state, assumptions: {...state.assumptions, investments: {...state.assumptions.investments, ['scenario' + chosenScenario]: {...newArr}}}}
  
  //OK
  case 'ASSUMPTIONS_INVESTMENTS_INITIAL':
      newArr = {...state.assumptions.investments['scenario' + chosenScenario]};
      newArr.initial = action.payload.value
      return {...state, assumptions: {...state.assumptions, investments: {...state.assumptions.investments, ['scenario' + chosenScenario]: {...newArr}}}}

  //OK
  case 'ASSUMPTIONS_MAINTENANCE_PERMANENT':
      newArr = {...state.assumptions.maintenance['scenario' + chosenScenario]};
      newArr.permanent = action.payload.value
      return {...state, assumptions: {...state.assumptions, maintenance: {...state.assumptions.maintenance, ['scenario' + chosenScenario]: {...newArr}}}}
  
  //OK
  case 'ASSUMPTIONS_MAINTENANCE_DYNAMIC':
      newArr = {...state.assumptions.maintenance['scenario' + chosenScenario]};
      newArr.dynamic = action.payload.value
      return {...state, assumptions: {...state.assumptions, maintenance: {...state.assumptions.maintenance, ['scenario' + chosenScenario]: {...newArr}}}}

  //OK
  case 'ASSUMPTIONS_MAINTENANCE_NOTUSED':
      newArr = {...state.assumptions.maintenance['scenario' + chosenScenario]};
      newArr.notused = action.payload.value
      return {...state, assumptions: {...state.assumptions, maintenance: {...state.assumptions.maintenance, ['scenario' + chosenScenario]: {...newArr}}}}

  //OK
  case 'ASSUMPTIONS_RATES_INFLATION':
      newArr = {...state.assumptions.rates['scenario' + chosenScenario]};
      newArr.inflation = action.payload.value
      return {...state, assumptions: {...state.assumptions, rates: {...state.assumptions.rates, ['scenario' + chosenScenario]: {...newArr}}}}
  
  //OK
  case 'ASSUMPTIONS_RATES_DISCOUNT':
      newArr = {...state.assumptions.rates['scenario' + chosenScenario]};
      newArr.discount = action.payload.value
      return {...state, assumptions: {...state.assumptions, rates: {...state.assumptions.rates, ['scenario' + chosenScenario]: {...newArr}}}}

  //OK
  case 'INVESTMENTPROGRAM_DEMAND':
      return {...state, investmentprogram: {...state.investmentprogram, demand: {...state.investmentprogram.demand, ['scenario' + chosenScenario]: {...state.investmentprogram.demand['scenario' + chosenScenario], [action.payload.key]: action.payload.value}}}};
  
  //OK
  case 'INVESTMENTPROGRAM_VOLUMEDYNAMIC':
      return {...state, investmentprogram: {...state.investmentprogram, volumedynamic: {...state.investmentprogram.volumedynamic, ['scenario' + chosenScenario]: {...state.investmentprogram.volumedynamic['scenario' + chosenScenario], [action.payload.key]: action.payload.value}}}};
  
  //OK
  case 'INVESTMENTPROGRAM_VOLUMEPERMANENT':
      return {...state, investmentprogram: {...state.investmentprogram, volumepermanent: {...state.investmentprogram.volumepermanent, ['scenario' + chosenScenario]: {...state.investmentprogram.volumepermanent['scenario' + chosenScenario], [action.payload.key]: action.payload.value}}}};




  case 'STATIC_ASSUMPTIONS':
      return {...state}
  case 'STATIC_INVESTMENT':
      return {...state}




    default:
      return state;
  }
}
