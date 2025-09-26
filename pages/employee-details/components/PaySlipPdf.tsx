import {
    Document,
    Page,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: "Helvetica",
        fontSize: 10,
        lineHeight: 1.6,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 6,
    },
    title: {
        fontSize: 14,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 10,
        textAlign: "center",
        marginBottom: 20,
        lineHeight: 1.4,
    },
    employeeSection: {
        marginBottom: 20,
    },
    employeeRow: {
        flexDirection: "row",
        marginBottom: 4,
    },
    employeeCol1: {
        width: "25%",
        paddingRight: 10,
    },
    employeeCol2: {
        width: "25%",
        paddingRight: 10,
    },
    employeeCol3: {
        width: "25%",
        paddingRight: 10,
    },
    employeeCol4: {
        width: "25%",
    },
    employeeLabel: {
        fontWeight: "normal",
        fontSize: 9,
    },
    tableContainer: {
        borderWidth: 1,
        borderColor: "#000",
        marginTop: 10,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableColHeader: {
        flex: 1,
        backgroundColor: "#e6e6e6",
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#000",
        fontWeight: "bold",
        textAlign: "center",
    },
    tableCol: {
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRightWidth: 1,
        borderColor: "#000",
    },
    tableColRight: {
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 8,
        // borderBottomWidth: 1,
        borderColor: "#000",
        textAlign: "right",
    },
    tableColCenter: {
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRightWidth: 1,
        // borderBottomWidth: 1,
        borderColor: "#000",
        textAlign: "center",
    },
    totalRow: {
        fontWeight: "bold",
        backgroundColor: "#f5f5f5",
    },
    totalCell: {
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#000",
        fontWeight: "bold",
        backgroundColor: "#f5f5f5",
    },
    totalCellEarning: {
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#000",
        textAlign: "right",
    },
    totalCellRight: {
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderColor: "#000",
        textAlign: "right",
    },
    netPayCell: {
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRightWidth: 1,
        borderColor: "#000",
        fontWeight: "bold",
        backgroundColor: "#f5f5f5",
        textAlign: "right",
    },
    netPayCellLast: {
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderColor: "#000",
        fontWeight: "bold",
        backgroundColor: "#f5f5f5",
        textAlign: "right",
    },
    centeredAmount: {
        textAlign: "center",
        fontSize: 12,
        marginTop: 16,
    },
    centeredWords: {
        textAlign: "center",
        fontSize: 10,
        marginBottom: 12,
    },
    signatureRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        paddingHorizontal: 20,
    },
    signatureLine: {
        width: "40%",
        borderTopWidth: 1,
        marginTop: 20,
    },
    signatureLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 20,
        fontSize: 10,
    },
    footerNote: {
        textAlign: "center",
        fontSize: 9,
        marginTop: 20,
    },
});

const PayslipPdf = () => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>Payslip</Text>
                <Text style={styles.subtitle}>
                    Zoonode Inc{"\n"}21023 Pearson Point Road{"\n"}Gateway Avenue
                </Text>

                <View style={styles.employeeSection}>
                    <View style={styles.employeeRow}>
                        <View style={styles.employeeCol1}>
                            <Text style={styles.employeeLabel}>Date of Joining</Text>
                        </View>
                        <View style={styles.employeeCol2}>
                            <Text style={styles.employeeLabel}>: 2018-06-23</Text>
                        </View>
                        <View style={styles.employeeCol3}>
                            <Text style={styles.employeeLabel}>Employee name</Text>
                        </View>
                        <View style={styles.employeeCol4}>
                            <Text style={styles.employeeLabel}>: Sally Harley</Text>
                        </View>
                    </View>
                    <View style={styles.employeeRow}>
                        <View style={styles.employeeCol1}>
                            <Text style={styles.employeeLabel}>Pay Period</Text>
                        </View>
                        <View style={styles.employeeCol2}>
                            <Text style={styles.employeeLabel}>: August 2021</Text>
                        </View>
                        <View style={styles.employeeCol3}>
                            <Text style={styles.employeeLabel}>Designation</Text>
                        </View>
                        <View style={styles.employeeCol4}>
                            <Text style={styles.employeeLabel}>: Marketing Executive</Text>
                        </View>
                    </View>
                    <View style={styles.employeeRow}>
                        <View style={styles.employeeCol1}>
                            <Text style={styles.employeeLabel}>Worked Days</Text>
                        </View>
                        <View style={styles.employeeCol2}>
                            <Text style={styles.employeeLabel}>: 26</Text>
                        </View>
                        <View style={styles.employeeCol3}>
                            <Text style={styles.employeeLabel}>Department</Text>
                        </View>
                        <View style={styles.employeeCol4}>
                            <Text style={styles.employeeLabel}>: Marketing</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.tableContainer}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>Earnings</Text>
                        <Text style={styles.tableColHeader}>Amount</Text>
                        <Text style={styles.tableColHeader}>Deductions</Text>
                        <Text style={styles.tableColHeader}>Amount</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol}>Basic</Text>
                        <Text style={styles.tableColCenter}>10000</Text>
                        <Text style={styles.tableCol}>Provident Fund</Text>
                        <Text style={styles.tableColRight}>1200</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol}>Incentive Pay</Text>
                        <Text style={styles.tableColCenter}>1000</Text>
                        <Text style={styles.tableCol}>Professional Tax</Text>
                        <Text style={styles.tableColRight}>500</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol}>House Rent Allowance</Text>
                        <Text style={styles.tableColCenter}>400</Text>
                        <Text style={styles.tableCol}>Loan</Text>
                        <Text style={styles.tableColRight}>400</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol}>Meal Allowance</Text>
                        <Text style={styles.tableColCenter}>200</Text>
                        <Text style={styles.tableCol}></Text>
                        <Text style={styles.tableColRight}></Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.totalCellEarning}>Total Earnings</Text>
                        <Text style={styles.totalCellEarning}>11600</Text>
                        <Text style={styles.totalCellEarning}>Total Deductions</Text>
                        <Text style={styles.totalCellRight}>2100</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol}></Text>
                        <Text style={styles.tableColCenter}></Text>
                        <Text style={styles.netPayCell}>Net Pay</Text>
                        <Text style={styles.netPayCellLast}>9500</Text>
                    </View>
                </View>

                <Text style={styles.centeredAmount}>9500</Text>
                <Text style={styles.centeredWords}>Nine Thousand Five Hundred</Text>

                <View style={styles.signatureLabels}>
                    <Text>Employer Signature</Text>
                    <Text>Employee Signature</Text>
                </View>

                <View style={styles.signatureRow}>
                    <View style={styles.signatureLine}></View>
                    <View style={styles.signatureLine}></View>
                </View>

                <Text style={styles.footerNote}>This is system generated payslip</Text>
            </Page>
        </Document>
    );
};

export default PayslipPdf;