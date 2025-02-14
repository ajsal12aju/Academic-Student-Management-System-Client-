import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet, pdf } from '@react-pdf/renderer';
import config from 'config';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 45,
    paddingVertical: 40,
    gap: 20
  },
  card: {
    width: '30%',
    height: '30%',
    paddingVertical: 10,
    paddingHorizontal: 11,
    borderRadius: 7,
    // backgroundColor: '#fff',
    marginBottom: 0,
    border: '1px solid #ccc' // Add a border instead of a shadow
  },
  header: {
    alignItems: 'center',
    marginBottom: 6
  },
  instituteName: {
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5
  },
  address: {
    fontSize: 6,
    textAlign: 'center',
    lineHeight: 2
  },
  phone: {
    fontSize: 6,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 0
  },
  photo: {
    width: 60,
    height: 90,
    marginVertical: 2,
    alignSelf: 'center',
    padding: 2,
    borderWidth: 1,
    borderColor: 'rgb(226, 226, 226)',
    borderRadius: 1
  },
  infoContainer: {
    marginTop: 4
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4
  },
  label: {
    fontSize: 8,
    width: '25%'
  },
  colon: {
    fontSize: 8,
    width: '5%'
  },
  value: {
    fontSize: 8,
    width: '70%',
    fontWeight: 'bold'
  },
  studentText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 6,
    color: 'rgb(145, 145, 145)'
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50
  },
  footerText: {
    fontSize: 7,
    color: 'rgb(145, 145, 145)',
    opacity: 0.7
  }
});
const getImageUrl = (url) => {
  try {
    return `${config.ip}/${url}`;
  } catch (error) {
    console.error('Error generating image URL:', error);
    return null;
  }
};

const StudentIDCard = ({ student }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Text style={styles.instituteName}>DIAT IT</Text>
      <Text style={styles.instituteName}>INSTITUTE OF ADVANCED</Text>
      <Text style={styles.instituteName}>TECHNOLOGY</Text>
      <Text style={styles.address}>MAHARANI SHOPPING COMPLEX</Text>
      <Text style={styles.address}>KARADI, PO THAMARASSERY, KOZHIKODE,</Text>
      <Text style={styles.address}>KERALA-673573</Text>
      <Text style={styles.phone}>Ph: +91 89608 86633</Text>
    </View>
    <Image style={styles.photo} src={getImageUrl(student.photoURL) || '/placeholder.jpg'} />
    <View style={styles.infoContainer}>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{student.name}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Reg No</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{student.admissionNo}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Class</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>
          {student.course} {student.division} <Text style={{ color: 'rgb(114, 114, 114)' }}>{student.batchType}</Text>
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Mobile</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{student.mobile}</Text>
      </View>
    </View>
    <Text style={styles.studentText}>S T U D E N T</Text>
  </View>
);

const Footer = ({ pageNumber, totalPages }) => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>Printed on: {new Date().toLocaleDateString()}</Text>
    <Text style={styles.footerText}>
      Page {pageNumber} of {totalPages}
    </Text>
  </View>
);
const StudentIDPDF = ({ students }) => {
  const pageSize = 9;
  const pages = [];

  for (let i = 0; i < students.length; i += pageSize) {
    pages.push(students.slice(i, i + pageSize));
  }

  const totalPages = pages.length;

  return (
    <Document>
      {pages.map((pageStudents, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          {pageStudents.map((student) => (
            <StudentIDCard key={student._id} student={student} />
          ))}
          <Footer pageNumber={pageIndex + 1} totalPages={totalPages} />
        </Page>
      ))}
    </Document>
  );
};

export const generateStudentIDPDF = async (students) => {
  const blob = await pdf(<StudentIDPDF students={students} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'student_id_cards.pdf';
  link.click();
};

export default StudentIDPDF;
