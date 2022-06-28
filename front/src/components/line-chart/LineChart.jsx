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
            id: 'japan',
            color: 'hsl(274, 70%, 50%)',
            data: [
                {
                    x: 'plane',
                    y: 14
                },
                {
                    x: 'helicopter',
                    y: 192
                },
                {
                    x: 'boat',
                    y: 67
                },
                {
                    x: 'train',
                    y: 222
                },
                {
                    x: 'subway',
                    y: 234
                },
                {
                    x: 'bus',
                    y: 73
                },
                {
                    x: 'car',
                    y: 258
                },
                {
                    x: 'moto',
                    y: 24
                },
                {
                    x: 'bicycle',
                    y: 274
                },
                {
                    x: 'horse',
                    y: 293
                },
                {
                    x: 'skateboard',
                    y: 215
                },
                {
                    x: 'others',
                    y: 91
                }
            ]
        },
        {
            id: 'france',
            color: 'hsl(256, 70%, 50%)',
            data: [
                {
                    x: 'plane',
                    y: 242
                },
                {
                    x: 'helicopter',
                    y: 204
                },
                {
                    x: 'boat',
                    y: 128
                },
                {
                    x: 'train',
                    y: 171
                },
                {
                    x: 'subway',
                    y: 110
                },
                {
                    x: 'bus',
                    y: 238
                },
                {
                    x: 'car',
                    y: 53
                },
                {
                    x: 'moto',
                    y: 244
                },
                {
                    x: 'bicycle',
                    y: 41
                },
                {
                    x: 'horse',
                    y: 24
                },
                {
                    x: 'skateboard',
                    y: 76
                },
                {
                    x: 'others',
                    y: 4
                }
            ]
        },
        {
            id: 'us',
            color: 'hsl(295, 70%, 50%)',
            data: [
                {
                    x: 'plane',
                    y: 51
                },
                {
                    x: 'helicopter',
                    y: 261
                },
                {
                    x: 'boat',
                    y: 141
                },
                {
                    x: 'train',
                    y: 89
                },
                {
                    x: 'subway',
                    y: 79
                },
                {
                    x: 'bus',
                    y: 13
                },
                {
                    x: 'car',
                    y: 183
                },
                {
                    x: 'moto',
                    y: 196
                },
                {
                    x: 'bicycle',
                    y: 250
                },
                {
                    x: 'horse',
                    y: 224
                },
                {
                    x: 'skateboard',
                    y: 203
                },
                {
                    x: 'others',
                    y: 4
                }
            ]
        },
        {
            id: 'germany',
            color: 'hsl(110, 70%, 50%)',
            data: [
                {
                    x: 'plane',
                    y: 172
                },
                {
                    x: 'helicopter',
                    y: 109
                },
                {
                    x: 'boat',
                    y: 211
                },
                {
                    x: 'train',
                    y: 237
                },
                {
                    x: 'subway',
                    y: 145
                },
                {
                    x: 'bus',
                    y: 294
                },
                {
                    x: 'car',
                    y: 95
                },
                {
                    x: 'moto',
                    y: 251
                },
                {
                    x: 'bicycle',
                    y: 106
                },
                {
                    x: 'horse',
                    y: 168
                },
                {
                    x: 'skateboard',
                    y: 249
                },
                {
                    x: 'others',
                    y: 97
                }
            ]
        },
        {
            id: 'norway',
            color: 'hsl(244, 70%, 50%)',
            data: [
                {
                    x: 'plane',
                    y: 123
                },
                {
                    x: 'helicopter',
                    y: 280
                },
                {
                    x: 'boat',
                    y: 134
                },
                {
                    x: 'train',
                    y: 133
                },
                {
                    x: 'subway',
                    y: 190
                },
                {
                    x: 'bus',
                    y: 152
                },
                {
                    x: 'car',
                    y: 243
                },
                {
                    x: 'moto',
                    y: 171
                },
                {
                    x: 'bicycle',
                    y: 42
                },
                {
                    x: 'horse',
                    y: 52
                },
                {
                    x: 'skateboard',
                    y: 197
                },
                {
                    x: 'others',
                    y: 283
                }
            ]
        }
    ];
    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
                legend: 'transportation',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
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
                    translateY: 0,
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
