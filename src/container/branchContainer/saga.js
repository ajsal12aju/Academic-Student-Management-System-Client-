import { call, put, takeEvery } from 'redux-saga/effects';
import config from 'config';
import commonApi from 'container/api';
import {
  addStaffFail,
  addStaffSuccess,
  addStudentFail,
  addStudentSuccess,
  createPaymentEntryFail,
  createPaymentEntrySuccess,
  genarateAdmissionNoFail,
  genarateAdmissionNoSuccess,
  genarateInvoice,
  genarateInvoiceFail,
  getCoursesFail,
  getCoursesSuccess,
  getDocStudentListFail,
  getDocStudentListSuccess,
  getpaymentList,
  getpaymentListFail,
  getpaymentListSuccess,
  getStaffListFail,
  getStaffListSuccess,
  getStudentById,
  getStudentByIdFail,
  getStudentByIdSuccess,
  getStudentListFail,
  getStudentListSuccess
} from './slice';
import { pdf } from '@react-pdf/renderer';
import React from 'react';
import InvoiceDocument from 'utils/Documents/InvoiceDocument';
import { saveAs } from 'file-saver';
function* getCoursesFn() {
  try {
    let params = {
      api: `${config.ip}/course`,
      method: 'GET',
      successAction: getCoursesSuccess(),
      failAction: getCoursesFail(),
      authourization: 'token',
      key: config.apiKey
    };
    yield call(commonApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* addStudentFn(action) {
  try {
    const values = action.payload;
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    let params = {
      api: `${config.ip}/student/new`,
      method: 'POST',
      successAction: addStudentSuccess(),
      failAction: addStudentFail(),
      authorization: 'token',
      body: formData
    };

    yield call(commonApi, params);
  } catch (error) {
    console.log(error);
  }
}
function* createPaymentEntryFn(action) {
  try {
    const values = action.payload.submissionValues;
    const student = action.payload.studentDetails;
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    let params = {
      api: `${config.ip}/payment`,
      method: 'POST',
      successAction: createPaymentEntrySuccess(),
      failAction: createPaymentEntryFail(),
      authorization: 'token',
      body: JSON.stringify(values)
    };

    const res = yield call(commonApi, params);
    if (res) {
      yield put(getpaymentList({ filters: { studentId: ['eq', values?.studentId] } }));
      yield put(getStudentById({ id: values?.studentId }));
      yield put(genarateInvoice({ payment_data: res?.completedPayment }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* generateInvoiceFn(action) {
  const payment_data = action.payload.payment_data;
  try {
    const pdfDoc = pdf(React.createElement(InvoiceDocument, { payment_data }));
    const blob = yield call([pdfDoc, pdfDoc.toBlob]);
    saveAs(blob, `DIAT_${payment_data.invoiceNo}.pdf`);
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  } catch (error) {
    yield put(genarateInvoiceFail());
    console.error('Error generating PDF:', error);
  }
}

function* getStudentListFn(action) {
  try {
    // Access filters directly from action.payload since it's already nested
    const filters = action.payload.filters;

    const encodedFilters = encodeURIComponent(JSON.stringify(filters || {}));

    let params = {
      api: `${config.ip}/student/all?filters=${encodedFilters}`,
      method: 'GET',
      successAction: getStudentListSuccess(),
      failAction: getStudentListFail(),
      authourization: 'token',
      key: config.apiKey
    };

    yield call(commonApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* getDocStudentListFn(action) {
  try {
    const { filters } = action.payload;
    const encodedFilters = encodeURIComponent(JSON.stringify(filters));

    let params = {
      api: `${config.ip}/student/all?filters=${encodedFilters}`,
      method: 'GET',
      successAction: getDocStudentListSuccess(),
      failAction: getDocStudentListFail(),
      authourization: 'token',
      key: config.apiKey
    };
    yield call(commonApi, params);
  } catch (error) {
    console.error(error);
  }
}

function* getStudentByIdFn(action) {
  const id = action.payload.id;

  try {
    let params = {
      api: `${config.ip}/student/${id}`,
      method: 'GET',
      successAction: getStudentByIdSuccess(),
      failAction: getStudentByIdFail(),
      authourization: 'token',
      key: config.apiKey
    };
    const paymentRes = yield call(commonApi, params);
    if (paymentRes?.data) {
      yield put(getStudentById({ id: paymentRes.data.completedPayment.studentId }));
    }
  } catch (error) {
    console.log(error);
  }
}
function* getpaymentListFn(action) {
  const { filters } = action.payload;
  try {
    const encodedFilters = encodeURIComponent(JSON.stringify(filters));

    let params = {
      api: `${config.ip}/payment?filters=${encodedFilters}`,
      method: 'GET',
      successAction: getpaymentListSuccess(),
      failAction: getpaymentListFail(),
      authourization: 'token',
      key: config.apiKey
    };

    yield call(commonApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* genarateAdmissionNoFn(action) {
  try {
    const { batchCode, batchYM, batchType, division, course, classCode } = action.payload;

    let params = {
      api: `${config.ip}/student/admissionNo`,
      method: 'POST',
      successAction: genarateAdmissionNoSuccess(),
      failAction: genarateAdmissionNoFail(),
      authorization: 'token',
      key: config.apiKey,
      body: JSON.stringify({
        batchCode,
        batchYM,
        batchType,
        division,
        course,
        classCode
      })
    };

    yield call(commonApi, params);
  } catch (error) {
    console.error('Error in genarateAdmissionNoFn saga:', error);
  }
}

function* getStaffListFn() {
  try {
    let params = {
      api: `${config.ip}/staff/all`,
      method: 'GET',
      successAction: getStaffListSuccess(),
      failAction: getStaffListFail(),
      authourization: 'token',
      key: config.apiKey
    };
    yield call(commonApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* addStaffFn(action) {
  try {
    const data = action.payload;
    let params = {
      api: `${config.ip}/staff/new`,
      method: 'POST',
      successAction: addStaffSuccess(),
      failAction: addStaffFail(),
      authourization: 'token',
      body: data
    };
    yield call(commonApi, params);
  } catch (error) {
    console.log(error);
  }
}

export default function* branchActionWatcher() {
  yield takeEvery('branch/getCourses', getCoursesFn);
  yield takeEvery('branch/genarateAdmissionNo', genarateAdmissionNoFn);
  yield takeEvery('branch/addStudent', addStudentFn);
  yield takeEvery('branch/createPaymentEntry', createPaymentEntryFn);
  yield takeEvery('branch/genarateInvoice', generateInvoiceFn);
  yield takeEvery('branch/getStudentList', getStudentListFn);
  yield takeEvery('branch/getDocStudentList', getDocStudentListFn);
  yield takeEvery('branch/getStudentById', getStudentByIdFn);
  yield takeEvery('branch/getpaymentList', getpaymentListFn);
  yield takeEvery('branch/getStaffList', getStaffListFn);
  yield takeEvery('branch/addStaff', addStaffFn);
}
