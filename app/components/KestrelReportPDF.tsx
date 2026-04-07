import {
    Document,
    Page,
    Text,
    View,
    Image,
    StyleSheet,
    Font,
    type DocumentProps,
} from '@react-pdf/renderer'
import type { ReactElement } from 'react'

const TEAL = '#6b9aaa'
const GRAY_LIGHT = '#f2f2f2'
const GRAY_MED = '#cccccc'
const BODY = '#333333'
const WHITE = '#ffffff'

const s = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontWeight: 400,
        fontSize: 10,
        color: BODY,
        backgroundColor: WHITE,
        paddingBottom: 48,
    },

    // Header
    headerBar: {
        backgroundColor: TEAL,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 28,
        marginBottom: 20,
    },
    logo: {
        width: 90,
        height: 36,
        marginRight: 16,
        objectFit: 'contain',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 700,
        color: WHITE,
        letterSpacing: 0.5,
    },

    body: { paddingHorizontal: 36 },

    // Report date
    reportDate: { fontSize: 10, marginBottom: 18 },
    semibold: { fontWeight: 600 },

    // Section headings
    sectionHeading: {
        fontSize: 13,
        fontWeight: 700,
        color: BODY,
        marginBottom: 8,
    },

    // Boxes row
    boxesRow: { flexDirection: 'row', marginBottom: 24 },
    bulletList: { flex: 1 },
    bulletItem: { flexDirection: 'row', marginBottom: 4 },
    bullet: { width: 12, fontSize: 10 },

    // Callout
    callout: {
        width: 160,
        borderWidth: 1,
        borderColor: GRAY_MED,
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
    },
    calloutLabel: {
        fontWeight: 700,
        fontSize: 10,
        marginBottom: 8,
        textAlign: 'center',
    },
    calloutDivider: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: GRAY_MED,
        marginBottom: 8,
    },
    calloutValue: { fontSize: 10, textAlign: 'center' },

    // Table
    tableHeaderRow: {
        flexDirection: 'row',
        backgroundColor: GRAY_LIGHT,
        borderWidth: 1,
        borderColor: GRAY_MED,
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    tableRow: {
        flexDirection: 'row',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: GRAY_MED,
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    tableRowAlt: { backgroundColor: GRAY_LIGHT },
    colLocation: { flex: 2.5 },
    colVisits: { flex: 1, textAlign: 'center' },
    colDate: { flex: 1.8, textAlign: 'center' },
    colRank: { flex: 2 },
    thText: { fontWeight: 700, fontSize: 10 },
    tdText: { fontSize: 10 },

    // Graph
    graphHeading: { fontSize: 13, fontWeight: 700, marginBottom: 8 },
    legendRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        marginBottom: 6,
    },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    legendLine: { width: 14, height: 2, borderRadius: 1 },
    legendText: { fontSize: 8 },
    chartImage: { width: '100%', height: 200 },
})

export interface ReportLocation {
    name: string
    visits: number
    lastVisit: string
    ranking: number
}

export interface ReportGraphPoint {
    date: string
    kestrel: number
    bat: number
    other: number
}

export interface ReportData {
    reportDateStart: string
    reportDateEnd: string
    mostUsedBox: string
    locations: ReportLocation[]
    graphData: ReportGraphPoint[]
}

interface Props {
    data: ReportData
    chartImageBase64: string
}

export function buildKestrelDocument({
    data,
    chartImageBase64,
}: Props): ReactElement<DocumentProps> {
    return (
        <Document>
            <Page size="A4" style={s.page}>

                {/* Header */}
                <View style={s.headerBar}>
                    <Image src="/Logo.png" style={s.logo} />
                    <Text style={[s.headerTitle, { position: 'absolute', left: 0, right: 0, textAlign: 'center' }]}>
                        Kestrel Boxes
                    </Text>
                </View>

                <View style={s.body}>

                    {/* Report dates */}
                    <Text style={s.reportDate}>
                        <Text style={s.semibold}>Report Dates: </Text>
                        {data.reportDateStart} – {data.reportDateEnd}
                    </Text>

                    {/* Boxes */}
                    <Text style={s.sectionHeading}>Boxes</Text>
                    <View style={s.boxesRow}>
                        <View style={s.bulletList}>
                            {data.locations.map((loc) => (
                                <View key={loc.name} style={s.bulletItem}>
                                    <Text style={s.bullet}>•</Text>
                                    <Text>{loc.name}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={s.callout}>
                            <Text style={s.calloutLabel}>Most Used Box</Text>
                            <View style={s.calloutDivider} />
                            <Text style={s.calloutValue}>{data.mostUsedBox}</Text>
                        </View>
                    </View>

                    {/* Location Breakdown */}
                    <Text style={s.sectionHeading}>Location Breakdown</Text>
                    <View style={{ marginBottom: 28 }}>
                        <View style={s.tableHeaderRow}>
                            <Text style={[s.colLocation, s.thText]}>Box Location</Text>
                            <Text style={[s.colVisits, s.thText]}># Visits</Text>
                            <Text style={[s.colDate, s.thText]}>Last Visit</Text>
                            <Text style={[s.colRank, s.thText]}>Ranking (by popularity)</Text>
                        </View>
                        {data.locations.map((loc, i) => (
                            <View
                                key={loc.name}
                                style={[s.tableRow, i % 2 !== 0 ? s.tableRowAlt : {}]}
                            >
                                <Text style={[s.colLocation, s.tdText]}>{loc.name}</Text>
                                <Text style={[s.colVisits, s.tdText]}>{loc.visits}</Text>
                                <Text style={[s.colDate, s.tdText]}>{loc.lastVisit}</Text>
                                <Text style={[s.colRank, s.tdText]}>{loc.ranking}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Graph View */}
                    <Text style={s.graphHeading}>Graph View</Text>
                    {/* <View style={s.legendRow}>
                        <Text style={[s.legendText, s.semibold]}>Legend</Text>
                        {[
                            { label: 'Kestrel', color: '#D47456' },
                            { label: 'Bat', color: '#F3BA45' },
                            { label: 'Other', color: '#72B0E5' },
                        ].map(({ label, color }) => (
                            <View key={label} style={s.legendItem}>
                                <View style={[s.legendLine, { backgroundColor: color }]} />
                                <Text style={s.legendText}>{label}</Text>
                            </View>
                        ))}
                    </View> */}
                    <Image src={chartImageBase64} style={s.chartImage} />

                </View>
            </Page>
        </Document>
    )
}