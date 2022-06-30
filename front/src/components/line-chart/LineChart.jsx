import React from 'react';
import { ResponsiveLine } from '@nivo/line';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const LineChart = ({ ...props }) => {
    const data = [
        {
            id: 'Rovigneta',
            color: 'hsl(274, 70%, 50%)',
            data: [
                {
                    x: 'AG77VOB',
                    y: 662
                },
                {
                    x: 'AG99VOB',
                    y: 111
                },
                {
                    x: 'AG67VOB',
                    y: 888
                },
                {
                    x: 'AG12GOR',
                    y: 88
                }
            ]
        },

        {
            id: 'ITP',
            color: 'hsl(295, 70%, 50%)',
            data: [
                {
                    x: 'AG77VOB',
                    y: 120
                },
                {
                    x: 'AG99VOB',
                    y: 0
                },
                {
                    x: 'AG67VOB',
                    y: 300
                },
                {
                    x: 'AG12GOR',
                    y: 109
                }
            ]
        },

        {
            id: 'RCA',
            color: 'hsl(244, 70%, 50%)',
            data: [
                {
                    x: 'AG77VOB',
                    y: 1200
                },
                {
                    x: 'AG99VOB',
                    y: 532
                },
                {
                    x: 'AG67VOB',
                    y: 789
                },
                {
                    x: 'AG12GOR',
                    y: 111
                }
            ]
        }
    ];
    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 50, bottom: 100, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'număr de înmatriculare',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'preț',
                legendOffset: -45,
                legendPosition: 'middle'
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 100,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );
};
