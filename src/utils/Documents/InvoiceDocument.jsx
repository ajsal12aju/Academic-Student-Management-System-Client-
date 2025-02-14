import React from 'react';
import { Page, Document, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import numberToWords from 'number-to-words';
import logo from 'assets/images/logos/diat_logo__to_pdf_-removebg-preview.png';
// import logo from 'assets/images/logos/diat_basic_logo.png';

const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    position: 'relative'
  },
  watermark: {
    position: 'absolute',
    fontSize: 100,
    color: '#e0e0e0',
    opacity: 0.2,
    transform: 'rotate(-45deg)',
    top: '40%',
    left: '30%',
    fontWeight: 800,
    zIndex: -1
    // fontWeight: 'extrabold'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center'
  },
  logo: {
    width: 100,
    height: 70,
    textAlign: 'center',
    objectFit: 'contain'
  },
  companyDetails: {
    marginLeft: 60,
    fontSize: 9,
    textAlign: 'center',
    lineHeight: 1.2
  },
  header: {
    marginRight: 50,
    fontSize: 12,
    fontWeight: 800,
    textAlign: 'center'
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    marginTop: 4
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50
  },
  signature: {
    fontSize: 8,
    textAlign: 'center',
    width: '100%'
  }
});

const InvoiceDocument = ({ payment_data }) => {
  const billDate = new Date(payment_data.createdAt).toLocaleDateString('en-GB');
  const amount = payment_data.amount;
  const taxableAmount = Math.floor(amount * 0.82);
  const gstAmount = amount - taxableAmount;
  const amountInWords = numberToWords.toWords(amount);

  const username = payment_data.createdByName.split('@')[0];
  const printedDate = new Date().toLocaleDateString('en-GB');
  const printedTime = new Date().toLocaleTimeString('en-US', { hour12: true });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark}>DIAT</Text>

        <View style={styles.headerContainer}>
          <Image src={logo} style={styles.logo} />
          <View>
            <Text style={styles.header}>DIALOGUE INSTITUTE OF ADVANCED TECHNOLOGY</Text>
            <Text style={styles.companyDetails}>
              Maharani shopping complex karadi{'\n'}
              Thamarassery Pincode: 673573{'\n'}
              Phone: +91 89608 86633
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={{ textAlign: 'center', marginBottom: 10, fontSize: 12, opacity: 0.6 }}>RECEIPT</Text>

        <View style={{ marginBottom: 10 }}>
          <View style={styles.row}>
            <Text>Name: {payment_data.studentName}</Text>
            <Text>Admission No: {payment_data.admissionNo}</Text>
          </View>
          <View style={styles.row}>
            <Text>Date: {billDate}</Text>
            <Text>Receipt No: {payment_data.invoiceNo}</Text>
          </View>
        </View>

        <View style={{ ...styles.row, borderBottomWidth: 0.5, paddingBottom: 5, marginBottom: 5 }}>
          <Text style={{ width: '10%' }}>Sl No</Text>
          <Text style={{ width: '30%', textAlign: 'center' }}>Payment Type</Text>
          <Text style={{ width: '40%', textAlign: 'center' }}>Description</Text>
          <Text style={{ width: '20%', textAlign: 'right' }}>Amount</Text>
        </View>

        <View style={styles.row}>
          <Text style={{ width: '10%' }}>1</Text>
          <Text style={{ width: '30%', textAlign: 'center' }}>{payment_data.paymentType}</Text>
          <Text style={{ width: '40%', textAlign: 'center' }}>{payment_data.remark}</Text>
          <Text style={{ width: '20%', textAlign: 'right' }}>{formatAmount(amount)}</Text>
        </View>

        <View style={{ ...styles.row, borderTopWidth: 0.5, paddingTop: 5, marginTop: 10 }}>
          <Text>Net Amount</Text>
          <Text>{formatAmount(taxableAmount)}</Text>
        </View>

        <View style={styles.row}>
          <Text>GST 18%</Text>
          <Text>{formatAmount(gstAmount)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={{ fontWeight: 'bold' }}>Total Amount</Text>
          <Text style={{ fontWeight: 'bold' }}>{formatAmount(amount)}</Text>
        </View>

        <Text style={{ marginTop: 10 }}>Grand Total in Words: Rupees {amountInWords} only</Text>

        <Text style={{ marginTop: 5 }}>
          Total Paid: {formatAmount(payment_data.currentPending)}
        </Text>
        <Text style={{ marginTop: 5 }}>
          Balance To Pay: {payment_data.currentPending === 0 ? 'Fee Completed' : formatAmount(payment_data.currentPending)}
        </Text>

        <View style={styles.signatureSection}>
          <View style={styles.signature}>
            <Text>Signature & Seal</Text>
          </View>
        </View>

        <Text
          style={{
            position: 'absolute',
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 8
          }}
        >
          Recieved by : {username} | Printed: {printedDate} {printedTime}
        </Text>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
