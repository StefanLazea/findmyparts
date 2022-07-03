import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useGlobalContext } from 'global-context';

import axios from 'axios';
import { toast } from 'react-toastify';

import { Grid, IconButton, Tooltip, CircularProgress } from '@mui/material';
import { Add } from '@mui/icons-material';

import { CustomCard } from './components/custom-card/CustomCard';
import { AddCarDialog } from './components/add-car-dialog/AddCarDialog';
import { PageContainer } from 'components/page-container/PageContainer';

import styles from './Cars.module.scss';
import { NoData } from 'components/no-data/NoData';
import { LABELS } from 'constants/labels';

export const Cars = () => {
    const navigate = useNavigate();
    const {
        state: { userId, socket }
    } = useGlobalContext();
    const [cars, setCars] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const getCars = () => {
        axios
            .get(`/cars/users/${userId}`)
            .then((response) => {
                setCars(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    };
    const deleteCar = (id) => {
        axios.delete(`/cars/${id}`).then(() => {
            toast.success('Car deleted with success', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            socket.emit('deleteCar', id);
        });
    };
    useEffect(() => {
        getCars();
    }, []);

    useEffect(() => {
        const handler = (_cars) => {
            setCars(_cars);
        };
        socket.on('carsListUpdate', handler);
        return () => socket.off('carsListUpdate', handler);
    }, [socket]);

    return (
        <PageContainer>
            {/* todo spacing right incorrect */}
            <div className={styles.tooltipHeader}>
                <Tooltip title="Adauga o masina">
                    <IconButton
                        color="primary"
                        aria-label="grid view"
                        onClick={() => setModalOpen(true)}>
                        <Add />
                    </IconButton>
                </Tooltip>
            </div>
            {isLoading && (
                <div className={styles.centerLoading}>
                    <CircularProgress />
                </div>
            )}
            {cars.length === 0 && !isLoading && (
                <NoData subtitle={LABELS.addANewCar} />
            )}
            {cars.length !== 0 && !isLoading && (
                <Grid
                    container
                    className={styles.carsContainer}
                    rowSpacing={12}
                    spacing={{ xs: 1, sm: 1, md: 3 }}
                    columns={{ xs: 1, sm: 8, md: 12 }}>
                    {cars.map((car, index) => (
                        <Grid
                            item
                            xs={1}
                            sm={4}
                            md={4}
                            key={index}
                            classes={{ item: styles.gridItem }}>
                            <CustomCard
                                key={car.VIN}
                                carData={car}
                                onDelete={(id) => deleteCar(id)}
                                onClick={() =>
                                    navigate('/car-profile', {
                                        state: { selectedCar: car }
                                    })
                                }
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
            {isModalOpen && (
                <AddCarDialog open={isModalOpen} setOpen={setModalOpen} />
            )}
        </PageContainer>
    );
};
