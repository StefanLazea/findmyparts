import React, { useEffect, useState } from 'react';

import { Grid, MenuItem, TextField } from '@mui/material';
import _ from "lodash"

import styles from './CarDetails.module.scss'

export const CarDetails = ({ carDetails, ...props }) => {

    return (
        <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4} sm={4} md={4} className={styles.imageElement}>
                <img
                    src={_.get(carDetails, "selectedCar.image", "https://via.placeholder.com/300")}
                    alt={"to update"}
                    className={styles.img}
                    loading="lazy"
                />
            </Grid>
            <Grid item xs={4} sm={4} md={8}>
                <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} columns={{ xs: 12, sm: 4, md: 12 }} align="center" justify="center" alignItems="center" >
                    <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="VIN"
                            defaultValue={_.get(carDetails, "selectedCar.VIN", "-")}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Model"
                            defaultValue={_.get(carDetails, "selectedCar.model", "-")}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Marca"
                            defaultValue={_.get(carDetails, "selectedCar.brand", "-")}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Numar inmatriculare"
                            defaultValue={_.get(carDetails, "selectedCar.numberPlate", "-")}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                        <TextField
                            value={"test"}
                            onChange={(e) => { }}
                            select // tell TextField to render select
                            label="Caroserie"
                            disabled
                            classes={{ root: styles.formControl }}
                        >
                            <MenuItem key={1} value="test">
                                Test 1
                            </MenuItem>
                            <MenuItem key={2} value="test2">
                                Test 2
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                        <TextField
                            value={"test"}
                            onChange={(e) => { }}
                            select // tell TextField to render select
                            label="Combustibil"
                            disabled
                            classes={{ root: styles.formControl }}
                        >
                            <MenuItem key={1} value="test">
                                Test 1
                            </MenuItem>
                            <MenuItem key={2} value="test2">
                                Test 2
                            </MenuItem>
                        </TextField>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    );
}

