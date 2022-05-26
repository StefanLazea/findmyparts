import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify'
import { Grid, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';

import { CustomCard } from './components/custom-card/CustomCard';
import { AddCarDialog } from './components/add-car-dialog/AddCarDialog';
import { PageContainer } from 'components/page-container/PageContainer'
import "./Cars.scss";

export const Cars = (props) => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([])
    const [isModalOpen, setModalOpen] = useState(false);
    const reRender = () => {
        getCars();
    }
    const getCars = () => {
        axios.get(`/cars`).then(response => {
            setCars(response.data)
        })
    }
    const deleteCar = (id) => {
        axios.delete(`/cars/${id}`).then(res => {
            toast.success("Car deleted with success", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            getCars();
        })
    }
    useEffect(() => {
        getCars();
    }, [])

    return (

        <PageContainer>
            {/* todo spacing right incorrect */}
            <IconButton color="primary" aria-label="grid view" onClick={() => setModalOpen(true)}><Add /></IconButton>

            <Grid container rowSpacing={4} spacing={{ xs: 1, sm: 3, md: 6 }} columns={{ xs: 1, sm: 8, md: 12 }}>
                {cars.map((car, index) =>
                    <Grid item xs={1} sm={4} md={4} key={index}>
                        <CustomCard
                            md={12}
                            key={car.VIN}
                            carData={car}
                            onDelete={(id) => deleteCar(id)}
                            onClick={() =>
                                navigate("/car-profile", {
                                    state: { selectedCar: car }
                                })
                            } />
                    </Grid >
                )}
            </Grid>
            {isModalOpen && <AddCarDialog open={isModalOpen} setOpen={setModalOpen} reRender={reRender} />}

        </PageContainer>
    );
}

