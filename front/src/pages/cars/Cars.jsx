import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useGlobalContext } from 'global-context';

import axios from 'axios';
import { toast } from 'react-toastify';

import { Grid, IconButton, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';

import { CustomCard } from './components/custom-card/CustomCard';
import { AddCarDialog } from './components/add-car-dialog/AddCarDialog';
import { PageContainer } from 'components/page-container/PageContainer';

import styles from './Cars.module.scss';

export const Cars = () => {
    const navigate = useNavigate();
    const {
        state: { userId, socket }
    } = useGlobalContext();
    const [cars, setCars] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    const getCars = () => {
        axios.get(`/cars/users/${userId}`).then((response) => {
            setCars(response.data);
        });
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
            console.log('client side am primit', _cars);
            setCars(_cars);
        };
        socket.on('carsListUpdate', handler);
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
            <Grid
                container
                className={styles.carsContainer}
                rowSpacing={4}
                spacing={{ xs: 1, sm: 3, md: 6 }}
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
                            md={12}
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
            {isModalOpen && (
                <AddCarDialog open={isModalOpen} setOpen={setModalOpen} />
            )}
        </PageContainer>
    );
};
