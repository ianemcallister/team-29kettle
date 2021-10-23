/*
*   SQAURE STANDARD OPS
*/

//  DECLARE DEPENDENCIES
const { Client, Environment } = require('square');

//  INITIALIZE
const client = new Client({
    environment: Environment.Production,
    accessToken: process.env.CKC_SQR_APP_TKN,
});

const teamApi = client.teamApi;

//  DEFINE MODULE
var squareStOps = {
    payments: {
        list: ListPayments,
        get: GetPayment
    },
    orders: {
        list: ListOrders,
        get: GetOrderById
    },
    subscriptiosn: {},
    invoices: {},
    items: {
        catalog: {
            batchList: GetCatalogItemsBatchList,
            list: GetCatalogItemsList
        }
    },
    customers: {
        list: ListCustomers,
        search: {
            byId: SearchCustomersById,
            byLoyaltyId: SearchCustomersByLoyaltyId
        }
    },
    loyalty: {},
    bookings: {},
    business: {
        locations: {
            list: ListLocations
        }
    },
    team: {
        team: {
            searchTeamMembers: SearchTeamMembers,
            retrieve: RetrieveTeamMember
        },
        employees: {
            list: listEmployees,
            retrieve: retrieveEmployee
        },
        labor: {
            createShift: CreateShift,
            searchShifts: SearchLaborShifts,
            deleteShift: "",
            getShift: "",
            updateShift: ""
        },
        cashDrawers: {}
    },
    financials: {},
    get: {
        customerByLoyaltyId: GetcustomerByLoyaltyId,
        loyaltyAcctByPhone: GetLoyaltyAcctByPhone,
        customerByPhone: GetCustomerByPhone
    }
};

/*
*   PRIVATE: SEARCH CUSTOMERS
*/
async function _SearchCustomers(params) {
    // LOCAL VARIABLES
    const customersApi = client.customersApi;

    try {
        const { result, ...httpResponse } = await customersApi.searchCustomers(params)
        return result;
    } catch (error) {
        console.log('_SearchCustomers Error: ', error);
    }
}

/*
*   PRIVATE: SEARCH LOYALTY
*/
async function _SearchLoyalty(params) {
    //  NOTIFY PROGRESS
    //  LOCAL VARIABLES
    const loyaltyApi = client.loyaltyApi;
    
    try {
        const { result, ...httpResponse } = await loyaltyApi.searchLoyaltyAccounts(params)
        return result;
    } catch (error) {
        console.log('_SearchLoyalty Error: ', error);
    }
}

/*
*
*/
async function ListPayments(cursor, beginTime, endTime) {
    //  NOTIFY PROGRESS
    //console.log('cursor', cursor, 'begin: ', beginTime, 'end: ', endTime);
    //  LOCAL VARIABLES
    const paymentsApi = client.paymentsApi;
    //const beginTime = '2021-07-27T00:00:00-08:00';
    //const endTime = '2021-07-27T23:59:59-08:00';
    const sortOrder = 'DESC';
    //const cursor = '';
    const locationId = 'RKNMKQF48TA6W';
    const total = ""; //10;
    const last4 = ''; //'last_42';
    const cardBrand = ''; // 'card_brand6';
    const limit = 100;
    var paymentsList = [];

    //  EXECUTE
    try {
        const { result, ...httpResponse } = await paymentsApi.listPayments(beginTime, endTime, sortOrder, cursor, locationId);
        // Get more response info...
        //const { statusCode, headers } = httpResponse;
        var theCursor = result.cursor;
        var newPayments = result.payments;
        //console.log('got this', result);
        
        //console.log('found ', newPayments.length, " records");

        if(theCursor == undefined || theCursor == "") {
            //console.log('found the bottom');
            return newPayments;

        } else {
            
            //console.log('going down');
            
            paymentsList = await ListPayments(theCursor)
            
            newPayments.forEach(function(payment) {
                paymentsList.push(payment);
            });
            
            return paymentsList;
        }
    } catch(error) {
        console.log('error', error);
        //if (error instanceof ApiError) {
        //    const errors = error.result;
            // const { statusCode, headers } = error;
        //}
    }

}

/*
*
*/
async function GetPayment(paymentId) {
    //  NOTIFY PROGRESS
    //  LOCAL VARIABLES
    const paymentsApi = client.paymentsApi;

    //  EXECUTE
    try {
        const { result, ...httpResponse } = await paymentsApi.getPayment(paymentId);
        return result
    } catch (error) {
        console.log('GetPayment Error: ', error);
    }
};

async function ListOrders(cursor) {
    //  NOTIFY PROGRESS
    //  LOCAL VARIABLES
    const ordersApi = client.ordersApi;
    const bodyLocationIds = ['057P5VYJ4A5X1', '18YC4JDH91E1H'];
    const bodyQueryFilterStateFilterStates = ['COMPLETED'];
    const bodyQueryFilterStateFilter= {
        states: bodyQueryFilterStateFilterStates,
    };

    const bodyQueryFilterDateTimeFilterCreatedAt = {};
    bodyQueryFilterDateTimeFilterCreatedAt.startAt = 'start_at8';
    bodyQueryFilterDateTimeFilterCreatedAt.endAt = 'end_at4';

    const bodyQueryFilterDateTimeFilterUpdatedAt = {};
    bodyQueryFilterDateTimeFilterUpdatedAt.startAt = 'start_at6';
    bodyQueryFilterDateTimeFilterUpdatedAt.endAt = 'end_at6';

    const bodyQueryFilterDateTimeFilterClosedAt = {};
    bodyQueryFilterDateTimeFilterClosedAt.startAt = '2018-03-03T20:00:00+00:00';
    bodyQueryFilterDateTimeFilterClosedAt.endAt = '2019-03-04T21:54:45+00:00';

    const bodyQueryFilterDateTimeFilter = {};
    bodyQueryFilterDateTimeFilter.createdAt = bodyQueryFilterDateTimeFilterCreatedAt;
    bodyQueryFilterDateTimeFilter.updatedAt = bodyQueryFilterDateTimeFilterUpdatedAt;
    bodyQueryFilterDateTimeFilter.closedAt = bodyQueryFilterDateTimeFilterClosedAt;

    const bodyQueryFilterFulfillmentFilterFulfillmentTypes = ['SHIPMENT'];
    const bodyQueryFilterFulfillmentFilterFulfillmentStates = ['CANCELED', 'FAILED'];
    const bodyQueryFilterFulfillmentFilter = {};
    bodyQueryFilterFulfillmentFilter.fulfillmentTypes = bodyQueryFilterFulfillmentFilterFulfillmentTypes;
    bodyQueryFilterFulfillmentFilter.fulfillmentStates = bodyQueryFilterFulfillmentFilterFulfillmentStates;

    const bodyQueryFilterSourceFilterSourceNames = ['source_names8'];
    const bodyQueryFilterSourceFilter = {};
    bodyQueryFilterSourceFilter.sourceNames = bodyQueryFilterSourceFilterSourceNames;

    const bodyQueryFilterCustomerFilterCustomerIds = ['customer_ids5', 'customer_ids6'];
    const bodyQueryFilterCustomerFilter = {};
    bodyQueryFilterCustomerFilter.customerIds = bodyQueryFilterCustomerFilterCustomerIds;

    const bodyQueryFilter = {};
    bodyQueryFilter.stateFilter = bodyQueryFilterStateFilter;
    bodyQueryFilter.dateTimeFilter = bodyQueryFilterDateTimeFilter;
    bodyQueryFilter.fulfillmentFilter = bodyQueryFilterFulfillmentFilter;
    bodyQueryFilter.sourceFilter = bodyQueryFilterSourceFilter;
    bodyQueryFilter.customerFilter = bodyQueryFilterCustomerFilter;

    const bodyQuerySort = {
        sortField: 'CLOSED_AT',
    };
    bodyQuerySort.sortOrder = 'DESC';

    const bodyQuery = {};
    bodyQuery.filter = bodyQueryFilter;
    bodyQuery.sort = bodyQuerySort;

    const body = {};
    body.locationIds = bodyLocationIds;
    body.cursor = 'cursor0';
    body.query = bodyQuery;
    body.limit = 3;
    body.returnEntries = true;

    try {
    const { result, ...httpResponse } = await ordersApi.searchOrders(body);
        // Get more response info...
        // const { statusCode, headers } = httpResponse;
    } catch(error) {
        //if (error instanceof ApiError) {
        //    const errors = error.result;
            // const { statusCode, headers } = error;
        //}
    }
}

/*
*
*/
async function GetOrderById(id) {
    //  NOTIFY PROGRESS
    console.log('GetOrderById: ', id);
    //  LOCAL VARIABLES
    const ordersApi = client.ordersApi;
    //  EXECUTE
    try {
        const { result, ...httpResponse } = await ordersApi.retrieveOrder(id);
        // Get more response info...
        // const { statusCode, headers } = httpResponse;
        return result;
    } catch(error) {
        console.log(error);
        if (error instanceof ApiError) {
            const errors = error.result;
            console.log("GetOrderById Error: ", errors);
            // const { statusCode, headers } = error;
        }
    }
};

/*
*
*/
async function GetCatalogItemsBatchList(list) {
    //  NOTIFY PROGRESS
    //  LOCAL VARIABLES
    const catalogApi = client.catalogApi;
    const body = {
        objectIds: list,
    };
    body.includeRelatedObjects = true;
    body.catalogVersion = undefined;

    //  EXECTE
    try {
        const { result, ...httpResponse } = await catalogApi.batchRetrieveCatalogObjects(body);
        // Get more response info...
        // const { statusCode, headers } = httpResponse;
        return result;
      } catch(error) {
        if (error instanceof ApiError) {
            console.log(error);
            const errors = error.result;
            // const { statusCode, headers } = error;
        }
      }
}

/*
*
*/
async function GetCatalogItemsList() {
    //  NOTIFY PROGRESS
    //  LOCAL VARIABLES
    const catalogApi = client.catalogApi;
    const cursor = undefined;
    const types = undefined;
    const catalogVersion = undefined; //126;

    //  EXECTE
    
    try {
        const { result, ...httpResponse } = await catalogApi.listCatalog(cursor, types, catalogVersion);
        // Get more response info...
        // const { statusCode, headers } = httpResponse;
        return result
    } catch(error) {
        console.log(error);
        if (error instanceof ApiError) {
            const errors = error.result;
            // const { statusCode, headers } = error;
            console.log("GetCatalogItemsList Error: ", errors);
        }
    }
}

/*
*
*/
async function ListCustomers(cursor) {
    //  NOTIFY PROGRESS
    //  LOCAL VARIALES
    const customersApi = client.customersApi;
    //const cursor = undefined; //'cursor6';
    const sortField = 'DEFAULT';
    const sortOrder = 'DESC';
    var customerList = [];

    //  EXECUTE
    try {
        const { result, ...httpResponse } = await customersApi.listCustomers(cursor, sortField, sortOrder);
        // Get more response info...
        // const { statusCode, headers } = httpResponse;
        var theCursor = result.cursor;
        var newCustomers = result.customers;
        
        console.log('found ', newCustomers.length, " records");

        if(theCursor == undefined || theCursor == "") {
            console.log('found the bottom');
            return newCustomers;

        } else {
            
            console.log('going down');
            
            customerList = await ListCustomers(theCursor)
            
            newCustomers.forEach(function(customer) {
                customerList.push(customer);
            });
            
            return customerList;
        }
    } catch (error) {
        console.log('Error: ', error);
    }
}

/*
*   SEARCH CUSTOMERS BY LOYALTY ID
*/
async function SearchCustomersByLoyaltyId(loyaltyId) {
    //  NOTIFY PROGRESS
    //  LOCAL VARIABLES
    const loyaltyApi = client.loyaltyApi;
    
    //  EXECUTE
    try {
        const { result, ...httpResponse } = await loyaltyApi.retrieveLoyaltyAccount(loyaltyId);
        return result.loyaltyAccount;
    } catch (error) {
        console.log('SearchCustomersByLoyaltyId Error: ', error);
    }
};

/*
*   SEARCH CUSTOMERS BY ID
*/
async function SearchCustomersById(customerId) {
    //  NOTIFY PROGERSS
    //  LOCAL VARIABLES
    const customersApi = client.customersApi;
    //  EXECUTE
    try {
        const { result, ...httpResponse } = await customersApi.retrieveCustomer(customerId);
        return result.customer;
    } catch (error) {
        console.log('SearchCustomersById Error: ', error);
    }
};

/*
*   GET
*/
async function GetcustomerByLoyaltyId(loyaltyId) {
    //  NOTIFY PROGRESS
    //  LOCAL VARIABLES
    //  EXECUTE
    try {
        var loyaltyRecord = await SearchCustomersByLoyaltyId(loyaltyId);
        var customerRecord = await SearchCustomersById(loyaltyRecord.customerId);
        return customerRecord;
    } catch (error) {
        console.log('GetcustomerByLoyaltyId error: ', error);
    }
};

/*
*   GET LOYALTY ACCOUNT BY PHONE
*/
async function GetLoyaltyAcctByPhone(phone) {
    //  NOTIFY PROGRESS
    console.log('GetLoyaltyAcctByPhone: ', phone);
    //  LOCAL VARIABLES
    try {
        var acctsList = await _SearchLoyalty({
            limit: 1,
            query: {
                mappings: [
                    {
                        type: 'PHONE',
                        value: phone
                    }
                ]
            }
        });

        if(acctsList.loyaltyAccounts == undefined) {
            console.log('Square/stdops/GetLoyaltyAcctByPhone: no loyalty with that phone number');
            console.log(acctsList.loyaltyAccounts);
            return undefined;
        } else if (typeof(acctsList.loyaltyAccounts) == 'object'){
            console.log('Square/stdops/GetLoyaltyAcctByPhone: found loyalty record');
            return acctsList.loyaltyAccounts[0];
        } else {
            console.log("Square didn't wait");
        }
        
        
    } catch (error) {
        console.log('GetLoyaltyAcctByPhone Error: ', error);
    }
}

/*
*   GET CUSTOMER BY PHONE
*/
async function GetCustomerByPhone(phone) {
    //  NOTIFY PROGRESS
    //  LOCAL VARIABLES
    try {
        var customerRecords = await _SearchCustomers({
            limit: 1,
            query: {
                filter: {
                    phoneNumber: {
                        exact: phone
                    }
                }
            }
        });
        
        if(customerRecords.customers == undefined) {
            console.log('Square/stdops/GetCustomerByPhone: no customers with that phone number');
            console.log(customerRecords);
            return undefined;
        } else if (typeof(customerRecords) == 'object'){
            console.log('Square/stdops/GetCustomerByPhone: found customer record');
            return customerRecords.customers[0];
        } else {
            console.log("Square didn't wait");
        }
        

    } catch (error) {
        console.log('GetCustomerByPhone Error: ', error);
    }
    //  RETURN VALUE
};

/*
*   SEARCH LABOR SHIFTS
*/
async function SearchLaborShifts(params) {
    //  NOTIFY PROGRESS
    //  LOCAL VARIABLES
    const laborApi = client.laborApi;
    console.log(params);
    
    //  EXECUTE
    try {
        const { result, ...httpResponse } = await laborApi.searchShifts(params);
        // Get more response info...
        // const { statusCode, headers } = httpResponse;
        return result
    } catch (error) {
        console.log('SearchLaborShifts error: ');
        console.log(error);
    }
};

/*
*   SEARCH LABOR SHIFTS
*/
async function SearchTeamMembers(params) {
    //  NOTIFY PROGRESS
    //  LOCAL VARIABLES
    const employeesApi = client.employeesApi;
    console.log(params);
    
    //  EXECUTE
    try {
        const { result, ...httpResponse } = await employeesApi.searchTeamMembers(params);
        // Get more response info...
        // const { statusCode, headers } = httpResponse;
        return result
    } catch (error) {
        console.log('SearchTeamMembers error: ');
        console.log(error);
    }
};

async function RetrieveTeamMember(employeeId) {
    //  NOTIFY PROGRESS
    
    //  DEFINE LOCAL VARIABLES
    //  EXECUTE
    try {
        const { result, ...httpResponse } = await teamApi.retrieveTeamMember(employeeId);
        // Get more response info...
        // const { statusCode, headers } = httpResponse;
        //console.log('RetrieveTeamMember', employeeId, result);
        return result
    } catch (error) {
        console.log('RetrieveTeamMember error: ');
        console.log(error);
    }
};

/*
*   LIST LOCATIONS
*/
async function ListLocations() {
    //  NOTIFY PROGRESS
    console.log('listing locations');
    //  LOCAL VARIABLES
    const locationsApi = client.locationsApi;
    
    //  EXECUTE
    try {
        const { result, ...httpResponse } = await locationsApi.listLocations();
        // Get more response info...
        // const { statusCode, headers } = httpResponse;
        console.log(result);
        return result
    } catch (error) {
        console.log('ListLocations error: ');
        console.log(error);
    }
};

/*
*   LIST EMPLOYEES
*/
async function listEmployees() {
    //  NOTIFY PROGRESS
    //  LOCAL VARIABLES
    const employeesApi = client.employeesApi;
    const locationId = 'RKNMKQF48TA6W';
    const status = 'INACTIVE';
    const limit = 100;
    const cursor = undefined;
    
    //  EXECUTE
    try {
        const { result, ...httpResponse } = await employeesApi.listEmployees(locationId, status, limit, cursor)
        // Get more response info...
        // const { statusCode, headers } = httpResponse;
        console.log(result);
        return result
    } catch (error) {
        console.log('ListLocations error: ');
        console.log(error);
    }
};

/*
*   RETREIVE EMPLOYEE
*/
async function retrieveEmployee() {
    //  NOTIFY PROGRESS
    //  LOCAL VARIABLES
    const employeesApi = client.employeesApi;
    const locationId = 'RKNMKQF48TA6W';
    const status = 'ACTIVE';
    const limit = 10;
    const cursor = undefined;
    
    //  EXECUTE
    try {
        const { result, ...httpResponse } = await employeesApi.listEmployees(locationId, status, limit, cursor)
        // Get more response info...
        // const { statusCode, headers } = httpResponse;
        return result
    } catch (error) {
        console.log('ListLocations error: ');
        console.log(error);
    }
};


/*
*   CREATE SHIFT
*/
async function CreateShift(params) {
    //  NOTIFY PROGRESS
    //  LOCAL VARIABLES
    const laborApi = client.laborApi;
    
    //  EXECUTE
    try {
        const { result, ...httpResponse } = await laborApi.createShift(params);
        // Get more response info...
        // const { statusCode, headers } = httpResponse;
        return result
    } catch (error) {
        console.log('CreateShift error: ');
        console.log(error);
    }
};


//  EXPORT MODULE
module.exports = squareStOps;