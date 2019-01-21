// import * as rxjs from 'rxjs';
import { Observable, pipe, of, throwError, empty, zip, combineLatest } from 'rxjs';
import { filter, mergeMap, map, multicast, catchError, retry, reduce } from "rxjs/operators";
import {LitElement, html} from 'lit-element';
import * as R from "ramda/es/index.js";


export function whcgJsonMaker(name, newValue, period, datapackage, label, key, fill) {
    function resultElementObjFactory(name, data) {

    
        return {
            object: name,
            data: data
        };
    }
    
    function dataFactory(newValue, period, datapackage, label, key, fill) {

        let data = {};
        let set = {};
        
        let defaultValue = fill ? newValue : 0;
    
        for (let i = 0; i < period; i++) {
            set[i] = defaultValue;
        }
    
        set[key] = newValue;
    
        data = {...data, [datapackage]: {
            label: label,
            set: set
        }};
    
        return data;
    }
            
    let resultItem = resultElementObjFactory(name, dataFactory(Number(newValue), period, datapackage, label, key, fill));
 
    let result = [];

    result = [...result, resultItem];

    let whcgObj = {};
    return {...whcgObj, result: result };
};






export function whcgObjMerger(whcgObjs) {

    let resultsArr = whcgObjs.map(item => item.result);

    let result = resultsArr.reduce((acc, results) => {
        return acc.concat(results);
    }, []);

    let whcgObj = {result: result};

    return whcgObj;

};







export function whcgPeriodOperator(whcgObjs, mode, name, label, datapackage) {

    let acc = 0;

    if (mode === 'multiply') {
        acc = 1;
    }

    let setKeys = Object.keys(whcgObjs.result[0].data.yearlyamounts.set);

    let setValues = setKeys.map(setKey => {
        return whcgObjs.result.reduce((acc, item, index) => {
            if (isNaN(Number(item.data.yearlyamounts.set[setKey]))) {
                return acc;
            } else {

                if(mode === 'subtract' && index > 0) {
                    return acc = acc - Number(item.data.yearlyamounts.set[setKey]);
                } else if (mode === 'multiply') {
                    return acc = acc * Number(item.data.yearlyamounts.set[setKey]);
                } else {
                    return acc = acc + Number(item.data.yearlyamounts.set[setKey]);
                } 
            }
            
        }, acc);
    });

    let whcgObj = {};
    let result = [];

    whcgObj.result = [];

    let element = resultElementObjMaker(name, dataPackageObjMaker(datapackage, label, keyValueMerger(setKeys, setValues)))
    result = [...result, element];

    whcgObj = {...whcgObj, result: result};

    return whcgObj;
}


function keyValueMerger(keys, values) {
    let tmpObj = {};
    keys.forEach((key, i) => tmpObj[key] = values[i]);
    return tmpObj;
}

function dataPackageObjMaker(datapackage, label, set) {
    return {
        [datapackage]: {
            label: label,
            set: set
        }
    };
}

function resultElementObjMaker(name, data) {
    return {
        object: name,
        data: data
    }
}



export function getRandomColor() {   
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ', 0.2)';    
}


export function whcgChartJsTransformer({whcgObj, datapackage}) {

        let result = whcgObj.result;

        let columnNames = Object.keys(result[0].data[datapackage].set);

        let sets = result.map((item) => {
            let obj = {};

            obj.label = item.object;

            obj.backgroundColor = 'hsla(24, 70%, 50%, 1)';
            obj.data = Object.values(item.data[datapackage].set);
            obj.borderColor = '#FFFFFF';
            obj.borderWidth = 1;
            return obj;
        });

        let chartJsData = {};
        chartJsData.labels = columnNames;
        chartJsData.datasets = sets;

        return chartJsData;
}




export function whcgCompounder(whcgObj, growthRate) {
     return Object.values(whcgObj.result[0].data['yearlyamounts'].set).map((value, index) => {
         return value * Math.pow((1 + Number(growthRate)), (index + 1));
     });
 }


 export function setFactory({value, period, key}) {

    let set = {};

    if (key === 'fill') {
        for (let i = 0; i < period; i++) {
            set[i] = value;    
        } 
    } else {
        for (let i = 0; i < period; i++) {
            set[i] = 0;
        } 
        set[key] = value;
    }

    return set;
}



export function setsPeriodOperator({sets, mode}) {

    let acc = 0;

    if (mode === 'multiply') {
        acc = 1;
    }

    let setKeys = Object.keys(sets[0]);

    let setValues = setKeys.map(setKey => {
        return sets.reduce((acc, set, index) => {
            if (isNaN(Number(set[setKey]))) {
                return acc;
            } else {

                if(mode === 'subtract' && index > 0) {
                    return acc = acc - Number(set[setKey]);
                } else if (mode === 'multiply') {
                    return acc = acc * Number(set[setKey]);
                } else {
                    return acc = acc + Number(set[setKey]);
                } 
            }
            
        }, acc);
    });

    return keyValueMerger(setKeys, setValues);
}


export function setCompounder({set, growthRate}) {
    return keyValueMerger(Object.keys(set), Object.values(set).map((value, index) => {
        return value * Math.pow((1 + Number(growthRate)), (index + 1));
    }));
}


export function singleMultiplier(values) {
    return values.reduce((acc, item) => {
        return acc * Number(item);
    }, 1);
}


export function whcgObjMaker({set, name, label, datapackage}) {
    let data = {
        [datapackage]: {
            label: label,
            set: set
        }
    };

    let resultItem = {
        object: name,
        data: data
    };

    let result = [];

    result = [...result, resultItem];

    let whcgObj = {};

    return {...whcgObj, result: result };
}


export function zipAndOperateSetsFactory(mode) {
    return function(maintOwnSets) {
        let setsPeriodOperatorData = {
            sets: R.isEmpty(maintOwnSets) ? setMaker({value: 0, period: 10, key: 0}) : maintOwnSets,
            mode: mode
        }
    
        return setsPeriodOperator(setsPeriodOperatorData);
    }
}

export function setMaker({value, period, key}) {
    let setFactoryData = {
        value: value,
        period: period,
        key: key
    }

    return setFactory(setFactoryData)
}


export function compoundedSetMaker({value, period, growthRate, key}) {
    let setFactoryData = {
        value: value,
        period: period,
        key: key
    }

    let setCompounderdata = {
        set: setFactory(setFactoryData),
        growthRate: growthRate
    }
    return setCompounder(setCompounderdata)
}




export function setChartJsObj({set, name, label, datapackage}) {

    let whcgObjMakerData = {
        set: set,
        name: name,
        label: label,
        datapackage: datapackage
    }

    let whcgChartJsTransformerData = {
        whcgObj: whcgObjMaker(whcgObjMakerData), 
        datapackage: datapackage
    }
    
    return whcgChartJsTransformer(whcgChartJsTransformerData)
}



let floatpUtil = (function () {
	function trimToUndefined(str) {
		if (str === undefined) {
			return undefined;
		}
		
		str = str.trim();
		
		return str.length > 0 ? str : undefined;
	};
	
	function Counter() {
		var counter = 0;
		return function() {
			return counter++;
		};
	};
	
	function Ring(values) {
		var i = 0;
		
		return function() {
			if (! (i < values.length)) {
				i = 0;
			}
			
			return values[i++];
		};
	};
	
	function mapm(reducer, arrs) {
		let count = undefined;
		arrs.forEach(function(arr) {
			if (count === undefined || arr.length < count)
				count = arr.length;
		});
		
		const result = [];
		for (let i = 0 ; i < count ; i++) {
			const args = [];
			arrs.forEach(function(arr) {
				args.push(arr[i]);
			});
			
			const interm = args.reduce(reducer);
			result.push(interm);
		}
		return result;
    };
    
    function mapmTwo(fn, arrs) {
		let count = undefined;
		arrs.forEach(function(arr) {
			if (count === undefined || arr.length < count)
				count = arr.length;
		});
		
		const result = [];
		for (let i = 0 ; i < count ; i++) {
			const args = [];
			arrs.forEach(function(arr) {
				args.push(arr[i]);
			});
			
			const interm = fn.apply(args);
			result.push(interm);
		}
		return result;
    };
    

	function mapplus(arrs) {
		return mapm(function(a, b) { return a + b; }, arrs);
	};
	function mapminus(arrs) {
		return mapm(function(a, b) { return a - b; }, arrs);
	};
	
	function findFunction(context, name) {
		var namespaces = name.split('.');
		var func = namespaces.pop();
		
		for(var i = 0; i < namespaces.length; i++) {
			context = context[namespaces[i]];
		}
		
		return context[func];
	};
	
	function complement(p) {
		return function() {
			return !p.apply(this, arguments);
		};
	};
	
	return {
		trimToUndefined:trimToUndefined,
		Counter:Counter,
		Ring:Ring,
		mapm:mapm,
		mapplus:mapplus,
		mapminus:mapminus,
		findFunction:findFunction,
		complement:complement
	};
})();


export function mapmv(fn, arrs) {

    let count = undefined;
    arrs.forEach(function(arr) {
        if (count === undefined || arr.length < count)
            count = arr.length;
    });
    
    const result = [];
    for (let i = 0 ; i < count ; i++) {
        const args = [];
        arrs.forEach(function(arr) {
            args.push(arr[i]);
        });

        
        const interm = fn.apply(null, args);
        result.push(interm);
    }

    return result;
};






















export function RxSetMaker({value, period, compoundRate}) {
    if(compoundRate === 0) {
        return rx.latestCombiner([value, period, of('fill')]).pipe(
            rx.undefinedElementRemover,
            rx.setMaker
        )
    } else {
        return rx.latestCombiner([value, period, compoundRate]).pipe(
            rx.undefinedElementRemover,
            rx.compoundedSetMaker
        )
    }
}


export function RxZip(values) {
    return rx.latestCombiner(values).pipe(
        rx.undefinedElementRemover,
        rx.zip
    )
}

export function RxSingleMultiplier(values) {
    return rx.latestCombiner(values).pipe(
        rx.undefinedElementRemover,
        rx.singleMultiplier
    )
}

export function RxZipAndMultiplySets(values) {
    return rx.latestCombiner(values).pipe(
        rx.undefinedElementRemover,
        rx.zipAndMultiplySets
    )
}

export function RxZipAndAddSets(values) {
    return rx.latestCombiner(values).pipe(
        rx.undefinedElementRemover,
        rx.zipAndAddSets
    )
}

export function RxZipAndSubtractSets(values) {
    return rx.latestCombiner(values).pipe(
        rx.undefinedElementRemover,
        rx.zipAndSubtractSets
    )
}

export function getElement(name, item, index, arr) {
    // this.selectedmenu = 0;
    // this.selected = 0;

    switch(name) {
        case 'x-grid':
        return html`<x-grid .props=${item.json_schema} type="bar" class="${item.ui_schema.ui_classnames}-${index % 5}" @gridchanged="${e => this.gridChangedHandler(e, index)}"></x-grid>`

        case 'x-gridbox':
        return html`<x-gridbox .props=${item.json_schema} type="bar" class="${item.ui_schema.ui_classnames}-${index % 5}" @gridchanged="${e => this.gridChangedHandler(e, index)}"></x-gridbox>`


        case 'x-chart':
        return html`<x-chart .test=${item.json_schema} type="bar" class="${item.ui_schema.ui_classnames}-${index % 2}"></x-chart>`

        case 'x-main':
        return html`<x-main .props=${item.json_schema} scenario=${this.scenario} @scenariochanged="${e => this.scenarioChangedHandler(e)}" @tablechanged="${e => this.tableChangedHandler(e)}" @addrowchanged="${e => this.addRowChangedHandler(e)}" @removerowchanged="${e => this.removeRowChangedHandler(e)}" @rowchanged="${e => this.rowChangedHandler(e)}"  @gridchanged="${e => this.gridChangedHandler(e)}" @tablepagingchanged="${e => this.tablePagingChangedHandler(e)}"></x-main>
        `
        case 'x-header':
        return html`<x-header class="header" .props=${item.json_schema} selected=${this.selectedmenu} @menuchanged="${(event) => this.menuchangedHandler(event)}" @loggedout="${(event) => this.loggedoutHandler(event)}" @loggedin="${(event) => this.loggedinHandler(event)}"></x-header>
        `



        case 'x-menulogin':
        return html`<x-menulogin .props=${item.json_schema} @menuchanged="${(event) => this.menuchangedHandler(event)}"></x-menulogin>`

        case 'x-assumption-row-comment':
        return html`<div>${item.data_schema}</div>`

        case 'x-assumption-row-label':
        return html`<div>${this.removehidden ? html`<img src="../images/minus.svg" class="svg hidden" @click="${() => this.removeClickHandler()}">` : html``}${this.remove ? html`<img src="../images/minus.svg" class="svg" @click="${() => this.removeClickHandler()}">` : html``}${this.add ? html`<img src="../images/add-circular-outlined-button.svg" class="svg" @click="${() => this.addClickHandler()}">` : html``}${item.data_schema}</div>`

        case 'x-table-row-label':
        return html`
        <div class="label ${item.ui_schema.ui_options.color == 'header' ? 'header' : ''} ${item.ui_schema.ui_options.type == 'sum' ? 'label--sum' : ''}">${item.data_schema}</div>`

        // case 'x-rowslabel-label':
        // return html`
        // <div class="rowslabel">${item.data_schema}</div>
        // `
        case 'x-assumption-row':
        return html`<x-assumption-row
        class="${item.ui_schema.ui_classnames}"  
        ?remove=${R.length(arr.json_schema) > 2 && index % 2 === 0 && this.button.data_schema ? true : false}
        ?removehidden=${R.length(arr.json_schema) <= 2 && index % 2 === 0 && this.button.data_schema ? true : false}  
        ?add=${index % 2 !== 0 && this.button.data_schema ? true : false} 
        index=${index} 
        .props=${R.is(Array, item.json_schema) ? item.json_schema : item} 
        @removerow="${() => this.removeRowHandler(index)}" @addrow="${() => this.addRowHandler(index)}" 
        @rowchanged="${(event) => this.rowChangedHandler(event, index)}">
    </x-assumption-row>`

        case 'x-subheader':
        return html`<x-subheader class="${item.ui_schema.ui_classnames}" .props=${item.json_schema} @scenariochanged="${(e) => this.scenarioChangedHandler(e)}"></x-subheader>`


        case 'x-main-header':
        return html`<x-main-header class="${item.ui_schema.ui_classnames}" .props=${item.json_schema} @tablepagingchanged="${(e) => this.tablePagingChangedHandler(e)}"></x-main-header>`;

        case 'x-rowsandlabel':
        return html`<x-rowsandlabel class="${item.ui_schema.ui_classnames}" .props=${item.json_schema} selected=${this.selectedscenario} @rowchanged="${(event) => this.rowChangedHandler(event, index)}" @addrowchanged="${(event) => this.addRowChangedHandler(event, index)}" @removerowchanged="${(event) => this.removeRowChangedHandler(event, index)}"></x-rowsandlabel>`;

        case 'x-table-row':
        return html`<x-table-row class="${item.ui_schema.ui_classnames}" .props=${item.json_schema} @rowchanged="${(event) => this.rowChangedHandler(event, index)}"></x-table-row>`

        case 'x-table':
        return html`<x-table class="${item.ui_schema.ui_classnames}" .props=${item.json_schema} @tablechanged="${(event) => this.tableChangedHandler(event, index)}"></x-table>`

        case 'x-input':
        return html`<x-input class="${item.ui_schema.ui_classnames}" .props=${item} @cellchanged="${item.ui_schema.ui_actions && item.ui_schema.ui_actions.changeevent ? (event) => this.cellChangedHandler(event, index) : ''}"></x-input>`;

        case 'x-button':
        return html`<x-button class="${item.ui_schema.ui_classnames}" .props=${item} @click="${() => this.scenarioChangedHandler(index)}"></x-button>`;

        case 'x-menu-button':
        return html`<x-menu-button class="${item.ui_schema.ui_classnames}" .props=${item} @menuchanged="${() => this.menuchangedHandler(index)}"></x-menu-button>`;
        
        case 'x-icon':
        return html`<x-icon class="${item.ui_schema.ui_classnames}" .props=${item} @loggedout="${(e) => this.loggedoutHandler(e)}"  @loggedin="${(e) => this.loggedinHandler(e)}"></x-icon>`;
        
        case 'x-login':
        return html`<x-login .props=${item}></x-login>`

    }
}


export function getData(value, index) {
    switch(value) {
        case 'color':
        return +this.scenario - 1 == index ? 'grey' : 'none'
        case 'page':
        return +this.page
        case 'selected':
        return +this.scenario - 1 == index ? true : false
        case 'selectedmenu':
        return +this.selectedmenu == index ? true : false
        default:
        return this.period.map((element, index) => {
            let fn = getFunction.call(this, value)["fn"];
            let prop = getFunction.call(this, value)["prop"];
            return fn(
              element,
              prop,
              index,
              this.period
            );
          });
    }

  }


  const delay = (duration) =>
  new Promise(resolve => setTimeout(resolve, duration));

export async function recurse(item) {
    if(item.json_schema.type == 'String') {
        return await item.json_schema;
    }

    if(item.json_schema.type == 'Number') {
        return await item.json_schema;
    }

    if(item.json_schema.type == 'Boolean') {
        return await item.json_schema
    }

    if(item.json_schema.type == 'Array') {
        let orderedproperties = await Promise.all(item.data_schema.map(async (element, index) => {

            let ui_schema = {...item.ui_schema, merged: item.ui_schema.ui_merged ? item.ui_schema.ui_merged : false}
            
            if(ui_schema.ui_options) {
                let values = await Promise.all(Object.keys(ui_schema.ui_options).map(async(key) => {

                    if(ui_schema.ui_options[key].fn) {
                        return await this[ui_schema.ui_options[key].fn].call(this, ui_schema.ui_options[key].parameter, index)
                    } else {
                        return await ui_schema.ui_options[key]
                    }
                }))

                
                ui_schema = {...ui_schema, ui_options: R.zipObj(Object.keys(ui_schema.ui_options), values)}

                return await {...item, data_schema: item.data_schema[index], json_schema: item.json_schema.items, ui_schema: {...ui_schema, index: index}}   


            } else {
                return await {...item, data_schema: item.data_schema[index], json_schema: item.json_schema.items, ui_schema: {...ui_schema, index: index}}   


            }

            // if(ui_schema.ui_options) {
            //     Object.keys(ui_schema.ui_options).forEach(async(key) => {
            //         if(ui_schema.ui_options[key].fn) {
            //             ui_schema = {...ui_schema, ui_options: {...ui_schema.ui_options, [key]: await this[ui_schema.ui_options[key].fn].call(this, ui_schema.ui_options[key].parameter, index)}}
            //         }
            //     })
            // }


        }))
        let respons = await Promise.all(orderedproperties.map(async(orderedproperty) => {
            return await {...orderedproperty, type: orderedproperty.json_schema.type, json_schema: await recurse.call(this, orderedproperty)};
        }))

        // console.log('RESPONS IN ARRAY', respons)

        return respons
    }
    
    if(item.json_schema.type == 'Object') {
        
        let orderedproperties = await Promise.all(item.ui_schema.ui_order.map(async(element, index) => {   
                
            if(item.data_schema[element].fn) {
                item.data_schema[element] = await this[item.data_schema[element].fn].call(this, item.data_schema[element].parameter)
                return await {json_schema: {...item.json_schema.properties[element]}, name: element, ui_schema: {...item.ui_schema[element], name: element, merged: item.ui_schema.ui_merged ? item.ui_schema.ui_merged : false}, data_schema: item.data_schema[element]}

            } else {
                return await {json_schema: {...item.json_schema.properties[element]}, name: element, ui_schema: {...item.ui_schema[element], name: element, merged: item.ui_schema.ui_merged ? item.ui_schema.ui_merged : false}, data_schema: item.data_schema[element]}
            }
        }))

        let respons = await Promise.all(orderedproperties.map(async(orderedproperty) => {
            return await {...orderedproperty, type: orderedproperty.json_schema.type, json_schema: await recurse.call(this, orderedproperty)}
        }))

        // console.log('RESPONS IN OBJECT', respons)

        return respons
    }
}







export const rx = {
    latestCombiner: function(streams) {
        return combineLatest(...streams);
    },
    undefinedElementRemover: mergeMap(val => {
        let j = 0;
        if (val.length) {
            for(var i = 0; i < val.length; i++) {
                if(val[i] === undefined) {
                    j = 1;
                }
            }
        }

        if (j === 1) {
            return empty();
        } else {
            return of(val); 
        }
    }),
    zip: map((val) => {
        return R.zip(val[0], val[1]);
    }),
    singleMultiplier: mergeMap(x => {
        return of(x.reduce((acc, item) => acc*Number(item), 1));
      }),
    setMaker: mergeMap(values => {
        return of(setMaker({value: values[0], period: values[1], key: values[2]}))
    }),
    compoundedSetMaker: mergeMap(values => {
        return of(compoundedSetMaker({value: values[0], period: values[1], growthRate: values[2], key: 'fill'}))
    }),
    zipAndMultiplySets: mergeMap(sets => {
        return of(zipAndOperateSetsFactory('multiply')(sets))
    }),
    zipAndAddSets: mergeMap(sets => {
        return of(zipAndOperateSetsFactory('add')(sets))
    }),
    zipAndSubtractSets: mergeMap(sets => {
        return of(zipAndOperateSetsFactory('subtract')(sets))
    }),
    setMakerPeriod: function(period) {
        return mergeMap(values => {


            // let testArr = values.map(value => {
            //     return setMaker({value: value[1], period: period, key: value[0]})
            // })

            return of(values.map(value => {
                return setMaker({value: value[1], period: period, key: value[0]})
            }))

            //return of(testArr);


            //return of([setMaker({value: values[0][1], period: period, key: values[0][0]}), setMaker({value: values[1][1], period: period, key: values[1][0]}), setMaker({value: values[2][1], period: period, key: values[2][0]})])
        });
    },
}


export async function getRenderData(schemas) {
        let orderedproperties = schemas.call(this).ui_schema.ui_order.map((item, index) => {
            return {json_schema: {...schemas.call(this).json_schema.properties[item]}, index: index, name: item, ui_schema: {...schemas.call(this).ui_schema[item], name: item, merged: schemas.call(this).ui_schema.ui_merged ? schemas.call(this).ui_schema.ui_merged : false}, data_schema: schemas.call(this).data_schema[item]};
        })
    
        let renderdata;

        renderdata = await Promise.all(orderedproperties.map(async(orderedproperty) => {
            return {...orderedproperty, type: orderedproperty.json_schema.type, json_schema: await recurse.call(this, orderedproperty)}
        }))

      return renderdata;
}



export function aggregateArr(refArr, arr){
    return arr.map((item, index) => {
        let sum = 0;
         for (var i = 0; i <= index; i++) {
             sum = math.add(sum, +arr[i]);
         }
         return sum;
    })
 }

 export function getValuesOfSubarray(index, items) {
    return items.map(item => {
        return item[index]
    })
}

export function getValuesOfObject(obj) {
    return Object.values(obj)
}

export function sipper(arrays) {

   
    let longest = 0;
    if (arrays.length > 0) {
        arrays.forEach((array, index) => {
            if (array.length > arrays[longest].length) {
                longest = index;
            }
        })

        return arrays[longest].map((item, index) => {
            return arrays.map((element, ind) => {
                return element[index] != undefined ? element[index] : "HIDE";
            })
        })
    } else {
        return arrays;
    }
}

export function getYearArray(startYear, endYear) {
    return R.range(+startYear, +endYear + 1).map((item) => {
        return String(item)
    })
}

export function getValuesOfSubarray2(index, items) {
    return items.map(item => {
        return item[index] != undefined ? item[index] : '0';
    })
}

export function getAggregatedTableDataArray(scenarios, startyear, endyear, dataArray) {
    let yearsArr = scenarios.map(scenario => {
        return getYearArray(startyear, endyear[scenario])
    })

    return dataArray.map(row => {
        return sipper(scenarios.map(scenario => {
            return aggregateArr(yearsArr[scenario], getValuesOfSubarray2(scenario, row));    
        }))
    })

}

export function getTableDataArray(startyear, endyear, scenarios, rowData) {
    let yearsArr = scenarios.map(scenario => {
        return getYearArray(startyear, endyear[scenario])
    })

    return rowData.map(row => {
        return sipper(yearsArr.map((years, index) => {
            return years.map(year => {
                return row[year] != undefined ? row[year][index] : 'HIDE';
            })
        }))
    })
}


export function getRateArr(arr, rate, sign) {

    return arr.map((item, index) => {
        switch(sign) {
            case '*':
                return math.multiply( 1, math.pow((1 + +rate), index));
            case '/':
                return math.divide(1, math.pow((1 + +rate), index + 1));
            default:
            console.log('Sorry, ' + sign + ' is not available.');
        }
        
    })
}


export function distributeFn(item, index, length, max) {
    let sum = [];
    for (let i = 0; i < (index + 1); i++) {
        sum.push(0);
    }

    for (let i = 0; i < (length - index - 1); i++) {
        if (i < max) {
            sum.push(item);
        } else {
            sum.push(0);
        }
    }
    return sum
}

/**
 * Converts values below zero to zero
 * @param {Array} arr array to work with
 */
export function trimArr(arr) {
    return arr.map(item => {
        return item >= 0 ? +item : 0;
    })
}


export function getFlatCosts(cost, startyear, endyear, scenario) {
    return getYearArray(startyear, endyear).map(() => {
        return +cost[scenario];
    })
}

export function prepareRender(processedSchema) {
    if (processedSchema != undefined && processedSchema.type == "Array") {
        return processedSchema.json_schema
    } else if (processedSchema != undefined && processedSchema != false) {
        return [processedSchema]
    } else {
        return undefined
    }
}


export function toRender(renderdata) {
    return renderdata != undefined ? renderdata.map((item, index) => {
        if (!R.is(Array, item)) {
            
            if (item.ui_schema.merged != true) {
                if (item.type == 'Array') {
                    
                    return item.json_schema.map((element, index) => {
                        
                        if (element.data_schema != 'HIDE') {
                            return getElement.call(this, element.ui_schema.ui_widget, element, index, item);
                        }
                    })
                } else {
                    
                    if (item.data_schema != 'HIDE') {
                        if (item.ui_schema.ui_widget != undefined) {
                            return getElement.call(this, item.ui_schema.ui_widget, item, index, item);
                        } else {
                           
                            return item.data_schema
                        }
                        
                    }
                }
            } else {
                
                if (item.type == 'Array' || item.type == 'Object') {
                    return toRender.call(this, item.json_schema)
                } else {
                    return getElement.call(this, item.ui_schema.ui_widget, item, index, item);
                }
                
            }
        } else {
            return toRender.call(this, item)
        }

    }) : ""
}

export function aggregater(arr) {
    return arr.map((item, index) => {
      let sum = 0;
      for (var i = 0; i <= index; i++) {
        sum = math.add(sum, +arr[i]);
      }
      return sum;
    });
  }

  export function identity(item) {
    return item;
  }
  
  export function getFunction(data) {
    switch (data) {
      case "identity":
        return {
          fn: identity.bind(this),
          prop: "identity"
        };
    }
  }

  function arrayMultiplier(array) {
    return array.reduce((acc, val) => {
      return val === "HIDE" ? +acc : +acc * +val;
    }, 1);
  }

  function mathRound(item) {
    return math.round(item);
  }

  function mathDivide(dividend, divisor) {
    return math.divide(dividend, divisor);
  }

  function getRealCosts(cost, period) {
    return period.map(() => {
      return +cost;
    });
  }

  export function arrayAdder(array) {
    return array.reduce((acc, val) => {
      return val === "HIDE" ? +acc : +acc + +val;
    }, 0);
  }

  export function arrayAggregator(arr) {
    return arr.map((item, index) => {
      let sum = 0;
      for (var i = 0; i <= index; i++) {
        sum = math.add(sum, +arr[i]);
      }
      return sum;
    });
  }


  export function getPeriodArray(startyear, endyear) {
    return R.range(+startyear, +endyear + 1);
  }

  export function addArraysAndSip(array) {
    return sipper(array).map(arrayAdder);
  }

function multiplyArraysAndSip(array) {
    return sipper(array).map(arrayMultiplier);
  }

  function getPropertyFromName(name) {
      return this[name]
  };

  function getValuesFromObject(item) {
      return Object.values(item)
    };

function getValuesFromObjectByName(name) {
    return getValuesFromObject(getPropertyFromName.call(this, name))
}

function getGrowthArray(item) {
    return getRateArr(getValuesFromObjectByName.call(this, item.space), getPropertyFromName.call(this, item.growthRate), "*")
}

function getDiscountArray(item) {
    return getRateArr(getValuesFromObjectByName.call(this, item.space), getPropertyFromName.call(this, item.discountRate), "/")
}

function createRealPriceArray(item) {
    return getRealCosts(getPropertyFromName.call(this, item.name), getPropertyFromName.call(this, item.period))
}

function createRealInvestmentPriceArray(item) {
    return getRealCosts(getPropertyFromName.call(this, item.investment), getPropertyFromName.call(this, item.period))
}

function createRealCostArray(item) {
    return multiplyArraysAndSip([getValuesFromObjectByName.call(this, item.space), createRealPriceArray.call(this, item)]).map(mathRound);
}

export function discountArrayWith(obj) {
    return function (item) {
      multiplyArraysAndSip.call(this, [getDiscountArray.call(this, obj), item]).map(mathRound);
    }
  }





export function getRealCostArray(item, realPriceArray) {
        return multiplyArraysAndSip([aggregater(getValuesFromObjectByName.call(this, item.space)), realPriceArray]).map(mathRound);
      }

export function getDiscountedRealCostArray(item, realPriceArray) {
    return multiplyArraysAndSip([getDiscountArray.call(this, item), getRealCostArray.call(this, item, realPriceArray)]).map(mathRound);
}






export function createRealAggregatedCostArray(item) {
    return aggregater.call(this, createRealCostArray.call(this, item));
}






export function createNominalAggregatedCostArray(item) {
    return multiplyArraysAndSip([getGrowthArray.call(this, item), createRealAggregatedCostArray.call(this, item)]).map(mathRound);
  }

  export function createDiscountedNominalAggregatedCostArray(item) {
    return multiplyArraysAndSip([getDiscountArray.call(this, item), createNominalAggregatedCostArray.call(this, item)]).map(mathRound);
  }







export function createNominalCostArray(item) {
    return multiplyArraysAndSip([getGrowthArray.call(this, item), createRealCostArray.call(this, item)]).map(mathRound);
  }






export function createPositiveOnlyNominalCostArray(item) {
    return createNominalCostArray.call(this, item).map(item => {
      return item > 0 ? mathRound(item) : 0;
    });
  }

  export function createDiscountedPositiveOnlyNominalCostArray(item) {
    return multiplyArraysAndSip([getDiscountArray.call(this, item), createPositiveOnlyNominalCostArray.call(this, item)]).map(mathRound);
  }






export function createDepreciationArray(item) {
    return mathRound(addArraysAndSip.call(this, trimArr.call(this, multiplyArraysAndSip.call(this, [createNominalCostArray.call(this, item), createRealInvestmentPriceArray.call(this, item)])).map(
      (element, index, arr) => {
        return distributeFn.call(this, 
          element,
          index,
          arr.length,
          mathRound(mathDivide(1, getPropertyFromName.call(this, item.name)))
        );
      }
    )));
  }


  export function createDiscountedDepreciationArray(item) {
    return multiplyArraysAndSip([getDiscountArray.call(this, item), createDepreciationArray.call(this, item)]).map(mathRound);
  }
