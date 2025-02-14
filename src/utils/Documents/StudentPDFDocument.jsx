import React from 'react';
import { Document, Page, Text, StyleSheet, Image, View } from '@react-pdf/renderer';
import config from 'config';
// Import footer image - make sure the path is correct
import footerImage from 'assets/images/diat_footer.png';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    backgroundColor: '#fff'
  },
  header: {
    marginBottom: 20,
    textAlign: 'center'
  },
  branchName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#364152',
    marginBottom: 5
  },
  address: {
    fontSize: 10,
    color: '#364152',
    marginBottom: 3
  },
  phone: {
    fontSize: 10,
    color: '#364152',
    marginBottom: 15
  },
  title: {
    fontSize: 14,
    fontWeight: 'medium',
    marginBottom: 8,
    textAlign: 'center'
  },
  section: {
    border: '2 dashed rgb(221, 221, 221)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff'
  },
  row: {
    paddingLeft: 3,
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5
  },
  primaryDetailsContainer: {
    flexDirection: 'row'
  },
  primaryDetails: {
    flex: 5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  photoContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  label: {
    marginRight: 1,
    flex: 2,
    fontWeight: 'bold'
  },
  value: {
    color: '#364152',
    flex: 3
  },
  photo: {
    width: 75,
    height: 100,
    objectFit: 'cover',
    borderRadius: 8
  },
  qrCode: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    height: 100
  },
  twoColumnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  column: {
    width: '50%'
  }
});

const StudentPDFDocument = ({ student, qrCodeUrl }) => {
  const primaryDetails = [
    { label: 'Name', value: student?.name },
    { label: 'Admission No', value: student?.admissionNo },
    { label: 'Course', value: student?.courseName },
    { label: 'Batch', value: `${student?.batchYear} - ${student?.batchMonth.slice(0, 3).toUpperCase()} (${student?.batchType})` },
    { label: 'Division', value: student?.division },
    { label: 'Roll No', value: student?.rollNo },
    {
      label: 'Admission Date',
      value: student?.admissionDate
        ? new Date(student?.admissionDate).toLocaleDateString('en-GB') // DD/MM/YYYY format
        : ''
    },
    { label: 'Placement', value: student?.placement ? 'Yes' : 'No' },
    { label: 'Course Fee', value: `Rs. ${student?.courseFee}` }
  ];

  const otherDetails = [
    { label: 'Mobile', value: student?.mobile },
    { label: 'Email', value: student?.email },
    { label: 'Gender', value: student?.gender },
    {
      label: 'DOB',
      value: student?.dob
        ? new Date(student?.dob).toLocaleDateString('en-GB') 
        : ''
    }, 
    { label: 'State', value: student?.state },
    { label: 'District', value: student?.district },
    { label: 'Pin code', value: student?.pinCode },
    { label: 'Address', value: student?.address },
    { label: 'Guardian Name', value: student?.guardianName },
    { label: 'Guardian Mobile', value: student?.guardianMobile },
    { label: 'Qualification', value: student?.qualification },
    { label: 'Blood Group', value: student?.bloodGroup },
    { label: 'Identification Marks', value: student?.identificationMarks },
    { label: 'Health Condition', value: student?.healthCondition }
  ];

  // Safely handle image URLs
  const getImageUrl = (url) => {
    try {
      return `${config.ip}/${url}`;
    } catch (error) {
      console.error('Error generating image URL:', error);
      return null;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.branchName}>{student?.branch?.branch_name}</Text>
          <Text style={styles.address}>VC TOWER, KARDI, THAMARASSERY, 673603</Text>
          <Text style={styles.phone}>Phone: +91 9516007008</Text>
          <Text style={styles.title}>Student Registration</Text>
        </View>

        {/* Primary Details Section */}
        <View style={styles.section}>
          <View style={styles.primaryDetailsContainer}>
            {/* Primary Details in Two Columns */}
            <View style={styles.primaryDetails}>
              {primaryDetails.map((detail, index) => (
                <View key={index} style={styles.column}>
                  <View style={styles.row}>
                    <Text style={styles.label}>{detail.label}:</Text>
                    <Text style={styles.value}>{detail.value || '-'}</Text>
                  </View>
                </View>
              ))}
            </View>
            {/* Photo Section */}
            <View style={styles.photoContainer}>
              {student?.photoURL ? (
                <Image style={styles.photo} src={getImageUrl(student?.photoURL)} />
              ) : (
                <Text style={styles.value}>Photo !</Text>
              )}
            </View>
          </View>
        </View>

        {/* Other Details Section */}
        <View style={styles.section}>
          <View style={styles.twoColumnContainer}>
            {otherDetails.map((detail, index) => (
              <View key={index} style={styles.column}>
                <View style={styles.row}>
                  <Text style={styles.label}>{detail.label}:</Text>
                  <Text style={styles.value}>{detail.value || '-'}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* QR Code */}
        {qrCodeUrl && <Image style={styles.qrCode} src={qrCodeUrl} />}

        {/* Footer */}
        <View style={styles.footer}>
          <Image src={footerImage} style={{ width: '100%', height: '100%' }} />
        </View>
      </Page>
    </Document>
  );
};

export default StudentPDFDocument;
