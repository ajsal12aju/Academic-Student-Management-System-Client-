import React from 'react';
import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';
import { formatCurrency } from './formateCurrency';
import { formatDate } from 'utils/formateDate';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    position: 'relative'
  },
  table: {
    display: 'table',
    width: '100%',
    marginTop: 0
  },
  tableTitle: {
    flexDirection: 'row',
    backgroundColor: '#acdafa',
    color: '#858585',
    fontWeight: 'heavy',
    padding: 2,
    fontSize: 11,
    textAlign: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#25a1fa',
    color: 'white',
    fontWeight: 'heavy',
    padding: 4,
    textAlign: 'center'
  },

  tableRow: {
    flexDirection: 'row'
  },
  tableCell: {
    padding: 5,
    textAlign: 'center'
  },
  tableCellLast: {
    padding: 5,
    textAlign: 'center'
  },
  rowAlt: {
    backgroundColor: '#f9f9f9'
  },
  indexCell: {
    padding: 5,
    textAlign: 'center',
    width: '8%'
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#aaa'
  },
  watermark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 50,
    color: '#e0e0e0',
    opacity: 0.1,
    zIndex: -1
  }
});

const calculateColumnWidths = (fields) => {
  const numFields = fields.length;
  const widthPercentage = 100 / numFields;

  return fields.map(() => `${widthPercentage}%`);
};

const GenarateTablePDF = ({haveIndex, data, fields, pageTitle }) => {
  const columnWidths = calculateColumnWidths(fields);
  const currentDate = new Date().toLocaleString();

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.tableTitle}>
          <Text style={{ ...styles.tableCell, width: '94%', textTransform: 'uppercase' }}>{pageTitle || 'Data List'}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            {haveIndex && <Text style={styles.indexCell}>Index</Text>}
            {fields.map((field, i) => (
              <Text style={[styles.tableCell, { width: columnWidths[i] }, i === fields.length - 1 && styles.tableCellLast]} key={i}>
                {field.label}
              </Text>
            ))}
          </View>

          {data?.map((item, index) => {
            const rowStyle = index % 2 === 0 ? {} : styles.rowAlt;

            return (
              <View style={[styles.tableRow, rowStyle]} key={index}>
                {haveIndex && <Text style={styles.indexCell}>{index + 1}</Text>}
                {fields.map((field, i) => {
                  let value = item[field.key] || 'N/A';

                  if (field.format === 'currency') {
                    value =`${ formatCurrency(value)}`;
                  } else if (field.format === 'date') {
                    value = formatDate(value);
                  }

                  return (
                    <Text style={[styles.tableCell, { width: columnWidths[i] }, i === fields.length - 1 && styles.tableCellLast]} key={i}>
                      {value}
                    </Text>
                  );
                })}
              </View>
            );
          })}
        </View>

        <Text style={styles.watermark}>Confidential</Text>

        <View style={styles.footer}>
          <Text>Printed on {currentDate}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default GenarateTablePDF;
