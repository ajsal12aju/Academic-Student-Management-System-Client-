import { Box, Grid, Typography, Button } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import config from 'config';
import QRCode from 'qrcode';
import pdfIcon from 'assets/images/pdf_icon.png';
import StudentPDFDocument from 'utils/Documents/StudentPDFDocument';
import { pdf } from '@react-pdf/renderer';
import {  IconUser } from '@tabler/icons-react';
import { formatDate } from 'utils/formateDate';

const StudentsDetail = ({ student }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const printRef = useRef(null);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrCode = await QRCode.toDataURL(`${config.studentUrl}?id=${student?._id}`);
        setQrCodeUrl(qrCode);
      } catch (error) {
        console.error('Error generating QR Code:', error);
      }
    };

    generateQRCode();
  }, [student]);

  const handleGeneratePDF = async () => {
    if (!student) return;

    const blob = await pdf(<StudentPDFDocument student={student} qrCodeUrl={qrCodeUrl} />).toBlob();

    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');

    const link = document.createElement('a');
    link.href = url;
    link.download = `${student?.name}_${student?.admissionNo}_diat.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatAmount = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-IN').format(value);
  };

  const primaryDetails = [
    { label: 'Name', value: student?.name },
    { label: 'Admission No', value: student?.admissionNo },
    { label: 'Batch', value: `${student?.batchYear} - ${student?.batchMonth?.slice(0, 3).toUpperCase()} (${student?.batchType})` },
    { label: 'Course', value: student?.courseName },
    { label: 'Roll No', value: student?.rollNo },
    { label: 'Division', value: student?.division },
    { label: 'Admission Date', value: student?.admissionDate ? formatDate(student?.admissionDate) : '' },
    { label: 'Total Fee', value: `₹ ${formatAmount(student?.courseFee)}` }
  ];

  const otherDetails = [
    { label: 'Mobile', value: student?.mobile },
    { label: 'Email', value: student?.email },
    { label: 'Gender', value: student?.gender },
    { label: 'DOB', value: student?.dob ? formatDate(student?.dob) : '' },
    { label: 'Branch', value: student?.branch?.branch_name },
    { label: 'State', value: student?.state },
    { label: 'District', value: student?.district },
    { label: 'Place', value: student?.place },
    { label: 'Post Office', value: student?.postOffice },
    { label: 'House No', value: student?.houseNo },
    { label: 'Guardian Name', value: student?.guardianName },
    { label: 'Guardian Mobile', value: student?.guardianMobile },
    { label: 'Qualification', value: student?.qualification },
    { label: 'Blood Group', value: student?.bloodGroup },
    { label: 'Identification Marks', value: student?.identificationMarks },
    { label: 'Health Condition', value: student?.healthCondition },
    { label: 'Placement', value: student?.placement ? 'Yes' : 'No' }
  ];

  return (
    <Box sx={{ p: 1 }}>
      <div ref={printRef} id="print-area">
        <Grid
          container
          mt={0}
          sx={{
            border: '2px dashed rgb(221, 221, 221)',
            borderRadius: '8px',
            padding: '16px',
            bgcolor: 'background.default'
          }}
          direction={{ xs: 'column-reverse', md: 'row' }}
        >
          {/* <Grid container spacing={2} justifyContent={'center'} direction={{ xs: 'column-reverse', md: 'row' }}> */}

          <Grid item xs={10}>
            <Grid container spacing={2}>
              {primaryDetails.map((detail, index) => (
                <Grid item xs={12} md={index % 2 === 0 ? 5 : 6} key={index}>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 'bold', mr: 1 }}>
                      {detail.label}:
                    </Typography>
                    <Typography variant="body1">{detail.value || '-'}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Student Photo */}
          <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                marginBottom: '15px',
                width: '90px',
                height: '120px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                backgroundColor: '#f0f0f0', // Light gray background for the fallback icon
                border: '1px solid #ddd' // Optional border
              }}
            >
              {student?.photoURL ? (
                <img
                  src={`${config.ip}/${student?.photoURL}`}
                  alt="Student"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                />
              ) : (
                <IconUser stroke={2} size={80} color="#666" /> // Fallback icon
                // <IconUser stroke={2} />
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Other Details */}
        <Grid
          container
          mt={2}
          sx={{
            border: '2px dashed rgb(221, 221, 221)',
            borderRadius: '8px',
            padding: '16px',
            bgcolor: 'background.default'
          }}
        >
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {otherDetails.map((detail, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.primary',
                        fontWeight: 'bold',
                        mr: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {detail.label}:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {detail.value || '-'}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* QR Code */}
        <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
          {qrCodeUrl && (
            <Box>
              <img
                src={qrCodeUrl}
                alt="Student QR Code"
                style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </Box>
          )}
        </Grid>
      </div>

      <Button
        onClick={handleGeneratePDF}
        variant="outlined"
        color="secondary"
        sx={{
          marginBottom: 2,
          '@media print': { display: 'none' }
        }}
      >
        <img title="download pdf" id="pdfBTN" src={pdfIcon} alt="" height={20} /> Get PDF{' '}
      </Button>
      <Box></Box>
    </Box>
  );
};

export default StudentsDetail;
