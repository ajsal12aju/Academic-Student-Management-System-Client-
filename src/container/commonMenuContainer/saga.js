import { call, takeEvery } from "redux-saga/effects";
import config from "config";
import commonApi from "container/api";
import { getMenuDataCountFail, getMenuDataCountSuccess, getMenuDataFail, getMenuDataSuccess } from "./slice";


// function* getMenuDataFn(action) {
//     try {
//         const { endPoint, params } = action.payload;

//         const query = {
//             from: params?.from || 0,
//             size: params?.size || 8,
//             filters: params?.filters || null
//         };

//         if (params?.searchField && params?.searchTerm) {
//             query[params.searchField] = params.searchTerm.toUpperCase();
//         }

//         const queryString = new URLSearchParams(query).toString();

//         const apiUrl = `${config.testip}${endPoint}?${queryString}`;
//         // const apiUrl = `${config.testip}${endPoint}?from=${query.from}&size=${query.size}&${query.searchField}=${query.searchTerm.toUpperCase()}`;

//         let apiParams = {
//             api: apiUrl,
//             method: "GET",
//             successAction: getMenuDataSuccess(),
//             failAction: getMenuDataFail(),
//             authourization: null,
//         };

//         yield call(commonApi, apiParams);
//     } catch (error) {
//         console.error("Error in getMenuDataFn:", error);
//     }
// }

function* getMenuDataFn(action) {
    try {
        const { endPoint, params } = action.payload;

        const query = {
            from: params?.from || 0,
            size: params?.size || 8,
        };

        // Add search term and field if provided
        if (params?.searchField && params?.searchTerm) {
            query[params.searchField] = params.searchTerm.toUpperCase();
        }

        // Map filters dynamically
        if (params?.filters && params.filters.length > 0) {
            params.filters.forEach((filter) => {
                query[filter.field] = filter.value.toUpperCase();
            });
        }

        // Construct query string
        const queryString = new URLSearchParams(query).toString();

        // Construct API URL
        const apiUrl = `${config.testip}${endPoint}?${queryString}`;

        // API parameters
        let apiParams = {
            api: apiUrl,
            method: "GET",
            successAction: getMenuDataSuccess(),
            failAction: getMenuDataFail(),
            authourization: null,
        };

        // Call API
        yield call(commonApi, apiParams);
    } catch (error) {
        console.error("Error in getMenuDataFn:", error);
    }
}



function* getMenuDataCountFn(action) {
    try {
        const { endPoint, params } = action.payload;

        // Construct filters for count API
        const query = new URLSearchParams({
            filters: JSON.stringify(params?.filters || {}),
        }).toString();

        const apiUrl = `${config.testip}/method/frappe.client.get_count?doctype=${endPoint}&${query}`;

        // Prepare API call parameters
        let apiParams = {
            api: apiUrl,
            method: "GET",
            successAction: getMenuDataCountSuccess(),
            failAction: getMenuDataCountFail(),
            authourization: "testToken",
            key: config.apiKey,
        };

        yield call(commonApi, apiParams);
    } catch (error) {
        console.error("Error in getMenuDataCountFn:", error);
    }
}



export default function* commonMenuActionWacther() {
    yield takeEvery('commonMenu/getMenuData', getMenuDataFn);
    yield takeEvery('commonMenu/getMenuDataCount', getMenuDataCountFn);
}