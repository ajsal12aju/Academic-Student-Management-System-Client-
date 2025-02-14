import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { createPaymentEntry, getpaymentList } from 'container/branchContainer/slice';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from 'utils/formateDate';
import { toast } from 'react-toastify';
import { IconDiscount } from '@tabler/icons-react';
import config from 'config';

const StudentPayment = ({ student }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [formValues, setFormValues] = useState(null);
  const [formActions, setFormActions] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getpaymentList({ filters: { studentId: ['eq', student?._id] } }));
  }, [dispatch, student?._id]);

  const payments = useSelector((state) => state.branch.paymentList?.data || []);
  const paymentProcessing = useSelector((state) => state.branch.paymentProcessing);
  const completedPayment = useSelector((state) => state.branch.completedPayment);
  const studentDetails = useSelector((state) => state.branch.studentDetails?.student || null);

  const paymentTypes = ['Tuition Fee', 'Admission Fee', 'Exam', 'Other'];
  const paymentModes = ['Cash', 'UPI', 'Bank Transfer', 'Cheque', 'Other'];

  const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });
  const totalPaidFee = studentDetails?.totalPaidFee || 0;

  const initialValues = {
    studentId: student?._id,
    amount: '',
    paymentType: studentDetails?.totalPaidFee == 0 ? 'Admission Fee' : 'Tuition Fee',
    paymentMode: 'UPI',
    remark: totalPaidFee === 0 ? 'Nill' : `${currentMonth} - Fee Installment`,
    paymentRef: ''
  };

  const formatAmount = (value) => {
    if (!value) return '0';
    return new Intl.NumberFormat('en-IN').format(value);
  };

  const parseAmount = (value) => {
    if (!value) return '';
    const numberString = value.toString().replace(/[^\d.]/g, '');
    const number = parseFloat(numberString);
    return isNaN(number) ? '' : number;
  };

  const validationSchema = Yup.object({
    amount: Yup.number().required('Amount is required').positive('Amount must be positive').max(1000000, 'Amount cannot exceed 1,000,000'),
    paymentType: Yup.string().required('Payment type is required').oneOf(paymentTypes, 'Invalid payment type'),
    paymentMode: Yup.string().required('Payment mode is required').oneOf(paymentModes, 'Invalid payment mode'),
    remark: Yup.string().max(200, 'remark cannot exceed 200 characters')
  });

  const FormikTextField = ({ field, form, ...props }) => {
    const errorText = form.touched[field.name] && form.errors[field.name];

    if (field.name === 'amount') {
      return (
        <TextField
          {...props}
          value={formatAmount(field.value)}
          onChange={(e) => {
            const parsedValue = parseAmount(e.target.value);
            form.setFieldValue(field.name, parsedValue);
          }}
          error={Boolean(errorText)}
          helperText={errorText}
        />
      );
    }

    return <TextField {...field} {...props} error={Boolean(errorText)} helperText={errorText} />;
  };

  const handleSubmitWithConfirmation = async (values, formikActions) => {
    setFormValues(values);
    setFormActions(formikActions);
    setIsDialogOpen(true);
  };

  const handleConfirmSubmit = async () => {
    if (!formValues || !formActions) return;

    try {
      toast.info('submitting');
      const submissionValues = {
        ...formValues,
        amount: Number(parseAmount(formValues.amount)),
        studentId: student?._id,
        passcode: passcode
      };

      await dispatch(createPaymentEntry({ submissionValues, studentDetails }));

      if (completedPayment?.success) {
        formActions.resetForm();
        toast.success('Payment submitted successfully');
      }
    } catch (error) {
      console.error('Payment submission failed:', error);
      toast.error('Payment submission failed');
    } finally {
      formActions.setSubmitting(false);
      setIsDialogOpen(false);
      setPasscode('');
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setPasscode('');
    if (formActions) {
      formActions.setSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Student Payment Form
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmitWithConfirmation}>
          {(formik) => {
            useEffect(() => {
              if (completedPayment?.success) {
                formik.resetForm();
              }
            }, [completedPayment?.success]);

            return (
              <Form>
                <Grid container columnGap={3}>
                  <Grid item xs={12} sm={5.5}>
                    <Field
                      name="amount"
                      component={FormikTextField}
                      fullWidth
                      label="Amount"
                      required
                      margin="normal"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <Typography variant="body1">₹</Typography>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={5.5}>
                    <Field name="paymentType" component={FormikTextField} select fullWidth label="Payment Type" required margin="normal">
                      {paymentTypes.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={5.5}>
                    <Field name="remark" component={FormikTextField} fullWidth label="Remark" required multiline rows={1} margin="normal" />
                  </Grid>

                  <Grid item xs={12} sm={5.5}>
                    <Field name="paymentMode" component={FormikTextField} select fullWidth label="Payment Mode" required margin="normal">
                      {paymentModes.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>

                  {formik.values.paymentMode !== 'Cash' && (
                    <Grid item xs={12} sm={5.5}>
                      <Field
                        name="paymentRef"
                        component={FormikTextField}
                        fullWidth
                        label={`${formik.values.paymentMode} Reference No`}
                        margin="normal"
                      />
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={paymentProcessing}>
                      {formik.isSubmitting ? 'Submitting...' : 'Submit Payment'}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Paper>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle variant="subtitle1">Confirm Payment</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter passcode to confirm the payment of ₹{formatAmount(formValues?.amount)}.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Passcode"
            type="password"
            fullWidth
            variant="outlined"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ padding: '0px 24px 24px 24px' }}>
          <Button size="small" onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            size="small"
            onClick={handleConfirmSubmit}
            color="primary"
            disabled={passcode!==config.passCode}
            variant="contained"
          >
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom>
            Payment History
          </Typography>
          <Grid sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            <Typography variant="caption" gutterBottom>
              Balance To Pay {formatAmount(studentDetails?.pendingFeeAmount)}{' '}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Total Paid {formatAmount(studentDetails?.totalPaidFee)}{' '}
            </Typography>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 120 }}>Date</TableCell>
                <TableCell sx={{ minWidth: 100 }}>Amount</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Payment Type</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Payment Mode</TableCell>
                <TableCell sx={{ minWidth: 200 }}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments?.length > 0 ? (
                payments?.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell sx={{ minWidth: 120 }}>{formatDate(payment.createdAt)}</TableCell>
                    <TableCell sx={{ minWidth: 100 }}>₹{formatAmount(payment.amount)}</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>{payment.paymentType}</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>{payment.paymentMode}</TableCell>
                    <TableCell sx={{ minWidth: 200 }}>{payment.remark || ' - '}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" style={{ height: '50px' }}>
                    <Typography variant="subtitle2">No Payment History 🕜</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="outlined"
          color="secondary"
          size="small"
          disabled
          sx={{
            margin: 2,
            '@media print': { display: 'none' }
          }}
        >
          <IconDiscount stroke={2} /> Discount{' '}
        </Button>
      </Paper>
    </Box>
  );
};

export default StudentPayment;
