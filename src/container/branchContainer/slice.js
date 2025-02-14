import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const branchSlice = createSlice({
  name: 'branch',
  initialState: {
    loading: false,
    error: null,
    courseList: null,
    studentList: null,
    studentData: null,
    studentDocList: null,
    staffList: null,
    paymentProcessing: false,
    newAdmission: null,
    admission: {}
  },
  reducers: {
    getCourses: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCoursesSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.courseList = action.payload.data;
    },
    getCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch courses';
      toast.error('failed to fetch courses');
    },
    clearCourse: (state) => {
      state.loading = false;
      state.error = null;
      state.courseList = null;
    },

    genarateAdmissionNo: (state) => {
      // state.loading = true;
      state.error = null;
    },
    genarateAdmissionNoSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.newAdmission = action.payload.data;
    },
    genarateAdmissionNoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch courses';
      toast.error('failed to fetch courses');
    },

    addStudent: (state) => {
      state.loading = true;
      state.error = null;
    },
    addStudentSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.admission = { success: true, data: action.payload };
      toast.success('Student added Successfully');
    },

    addStudentFail: (state, action) => {
      const errorMessage = action.payload?.message || 'Failed to add new student. Please try again.';

      state.loading = false;
      state.error = errorMessage;
      toast.error(errorMessage);
    },

    getStudentById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getStudentByIdSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.studentDetails = action.payload;
    },
    getStudentByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error('failed get student By Id student');
    },
    updateStudentById: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateStudentByIdSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.studentDetails = action.payload;
    },
    updateStudentByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error('failed Update student Details');
    },

    addStaff: (state) => {
      state.loading = true;
      state.error = null;
    },
    addStaffSuccess: (state) => {
      state.loading = false;
      state.error = null;
      toast.success('Staff added Successfully');
    },
    addStaffFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to add staff ';
      toast.error('failed to add new staff');
    },

    getStudentList: (state) => {
      state.loading = true;
      state.error = null;
    },
    getStudentListSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.studentData = action.payload;
    },
    getStudentListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch Students';
      toast.error('failed to Get student List');
    },

    getDocStudentList: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDocStudentListSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.studentDocList = action.payload;
      {
        action.payload.totalCount == 0 && toast.warn('No students found');
      }
    },
    getDocStudentListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch Students';
      toast.error('failed to Get student List');
    },
    clearDocData: (state) => {
      state.studentDocList = null;
    },
    getStaffList: (state) => {
      state.loading = true;
      state.error = null;
    },
    getStaffListSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.staffList = action.payload;
    },
    getStaffListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch Staff List';
      toast.error('Failed to Get Staff List');
    },

    getpaymentList: (state) => {
      state.loading = true;
      state.error = null;
    },
    getpaymentListSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.paymentList = action.payload;
    },
    getpaymentListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to Get Payment List';
      toast.error('Failed to Get Payment List');
    },

    createPaymentEntry: (state) => {
      state.loading = true;
      state.error = null;
      state.paymentProcessing = true;
      state.completedPayment = null;
    },
    createPaymentEntrySuccess: (state, action) => {
      state.loading = false;
      state.paymentProcessing = false;
      state.error = null;
      state.completedPayment = { success: true, data: action.payload };
      toast.success('Payment Completed Successfully');
    },
    createPaymentEntryFail: (state, action) => {
      state.loading = false;
      state.paymentProcessing = false;
      state.error = action.payload;
      toast.error('Failed to add Payement !');
    },
    genarateInvoice: (state) => {
      state.genaratingInvoice = true;
    },
    genarateInvoiceSuccess: (state) => {
      state.loading = false;
      state.genaratingInvoice = false;
    },
    genarateInvoiceFail: (state, action) => {
      state.loading = false;
      state.genaratingInvoice = false;
      state.error = action.payload;
      toast.error('Failed To Genarate Invoice !');
    }
  }
});

export const {
  getCourses,
  getCoursesSuccess,
  getCoursesFail,

  clearCourse,

  genarateAdmissionNo,
  genarateAdmissionNoSuccess,
  genarateAdmissionNoFail,

  addStudent,
  addStudentSuccess,
  addStudentFail,

  getStudentById,
  getStudentByIdSuccess,
  getStudentByIdFail,

  updateStudentById,
  updateStudentByIdSuccess,
  updateStudentByIdFail,

  addStaff,
  addStaffSuccess,
  addStaffFail,

  getStudentList,
  getStudentListSuccess,
  getStudentListFail,
  clearDocData,

  getDocStudentList,
  getDocStudentListSuccess,
  getDocStudentListFail,

  getStaffList,
  getStaffListSuccess,
  getStaffListFail,

  getpaymentList,
  getpaymentListSuccess,
  getpaymentListFail,

  createPaymentEntry,
  createPaymentEntrySuccess,
  createPaymentEntryFail,
  genarateInvoice,
  genarateInvoiceSuccess,
  genarateInvoiceFail
} = branchSlice.actions;
export default branchSlice.reducer;
