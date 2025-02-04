import React, { Fragment } from "react";
import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import logo from "./img/LogoHITC.png";

// Create Document Component
const MyDocument = ({ data }) => {
  const { cartId, totalPrice, products, orderItems } = data;
  const resource = localStorage.getItem('globalResponse');

  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      flexDirection: "column",
    },
    spaceBetween: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#3E3E3E",
    },
    titleContainer: { flexDirection: "row", marginTop: 24 },
    logo: { width: 300 },
    reportTitle: { fontSize: 16, textAlign: "center" },
    addressTitle: { fontSize: 15, fontStyle: "bold" },
    invoice: { fontWeight: "bold", fontSize: 20 },
    invoiceNumber: { fontSize: 11, fontWeight: "bold" },
    address: { fontWeight: 400, fontSize: 13 },
    theader: {
      marginTop: 20,
      fontSize: 10,
      fontStyle: "bold",
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      height: 20,
      backgroundColor: "#DEDEDE",
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },
    theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },
    tbody: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },
    total: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1.5,
      borderColor: "whitesmoke",
      borderBottomWidth: 1,
    },
    tbody2: { flex: 2, borderRightWidth: 1 },
  });

  const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <Image style={styles.logo} src={logo} />
      </View>
    </View>
  );

  const UserAddress = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View style={{ maxWidth: 200 }}>
          <Text style={styles.addressTitle}>
            {" "}
            Email:
            <Text style={styles.address}>
              {localStorage.getItem("username")}
            </Text>
          </Text>
          <Text style={styles.addressTitle}>
            {" "}
            Total Price:
            <Text style={styles.address}>{totalPrice}</Text>
            {/*.ToFixed(2)*/}
          </Text>
        </View>
      </View>
    </View>
  );

  const TableHead = () => (
    <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Items</Text>
      </View>
      <View style={styles.theader}>
        <Text>Price</Text>
      </View>
      <View style={styles.theader}>
        <Text>Qty</Text>
      </View>
      <View style={styles.theader}>
        <Text>Amount</Text>
      </View>
    </View>
  );

  const TableBody = () => {
    const dataItems = resource === "carts" ? products : orderItems;
    return dataItems.map((product) => (
      <View
        style={{ width: "100%", flexDirection: "row" }}
        key={product.productId || product.product.productId}
      >
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>{product.productName || product.product.productName}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{(product.price || product.product.price).toFixed(2)}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{product.quantity}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{((product.price * product.quantity) || (product.quantity * product.product.price)).toFixed(2)}</Text>
        </View>
      </View>
    ));
  };

  const TableTotal = () => (
    <View style={{ width: "100%", flexDirection: "row" }}>
      <View style={styles.total}>
        <Text></Text>
      </View>
      <View style={styles.total}>
        <Text></Text>
      </View>
      <View style={styles.tbody}>
        <Text>Total</Text>
      </View>
      <View style={styles.tbody}>
        <Text>{totalPrice}</Text>
        {/* .toFixed(2) */}
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle />
        <UserAddress />
        <TableHead />
        <TableBody />
        <TableTotal />
      </Page>
    </Document>
  );
};

export default MyDocument;
