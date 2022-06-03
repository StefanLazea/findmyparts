import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useGlobalContext } from 'global-context';

import axios from 'axios';
import { toast } from 'react-toastify';

import { IconButton, Tooltip, CircularProgress } from '@mui/material';
import { CarRepair, DocumentScanner, EditRoad, Add } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

import CustomStepper from 'components/stepper/Stepper';
import { AddDocumentDialog } from '../components/add-document-dialog/AddDocumentDialog';
import { CarDetails } from '../components/car-details-editable/CarDetails';
import { PageContainer } from 'components/page-container/PageContainer';
import { ConfirmDialog } from 'components/confirm-dialog/ConfirmDialog';
import styles from './CarProfile.module.scss';
import { DocumentDetailDialog } from '../components/document-detail-dialog/DocumentDetailDialog';
import _ from 'lodash';
import { LABELS } from 'constants/labels';

const DEFAULT_DOC_DATA = [
    {
        label: 'ITP',
        icon: <CarRepair />,
        expired: true,
        exists: false
    },
    {
        label: 'RCA',
        icon: <DocumentScanner />,
        expired: true,
        exists: false
    },
    {
        label: 'Rovigneta',
        icon: <EditRoad />,
        expired: true,
        exists: false
    }
];

const DOCUMENTS_ICONS = {
    ITP: <CarRepair />,
    RCA: <DocumentScanner />,
    Rovigneta: <EditRoad />
};

export const CarProfile = () => {
    const { state } = useLocation();
    const {
        state: { socket }
    } = useGlobalContext();

    const [step, setStep] = useState(-1);
    const [isModalOpen, setModalOpen] = useState(false);
    const [triggerRender, setTriggerRender] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedCar, setSelectedCar] = useState(state?.selectedCar);
    const [clickedDocument, setClickedDocument] = useState({});
    const [openDocDialog, setDocDialogOpen] = useState(false);
    const [stepsInfo, setStepsInfo] = useState(DEFAULT_DOC_DATA);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [toDeleteItem, setToDeleteItem] = useState({});
    const setStepperProgress = (
        isITPAvailable,
        isRcaAvailable,
        isRovAvailable
    ) => {
        if (isITPAvailable) {
            setStep((prev) => {
                // console.log('prev', prev);
                return prev + 1;
            });
            if (isRcaAvailable) {
                setStep((prev) => prev + 1);
                if (isRovAvailable) {
                    setStep((prev) => prev + 1);
                }
            }
        }
    };

    const getAllDocuments = (response) => {
        const docsResponse = response.map((item) => {
            return {
                documentData: { ...item },
                icon: DOCUMENTS_ICONS[item.name],
                label: item.name,
                expired: item.expired,
                //not the best approach
                exists: true
            };
        });
        const allSteps = stepsInfo.map((stepInfo) => {
            const found = docsResponse.filter(
                (item) => item.label === stepInfo.label
            );
            return found.length === 0 ? stepInfo : found[0];
        });
        return allSteps;
    };

    useEffect(() => {
        const handler = (car) => {
            // console.log('client side am primit', car);
            setSelectedCar(car);
        };
        socket.on('carUpdated', handler);
    }, [socket]);

    useEffect(() => {
        axios.get(`/documents/car/${state?.selectedCar?.id}`).then((res) => {
            const response = res.data;
            const isRcaAvailable = response.some(
                (item) => item.name === 'RCA' && !item.expired
            );
            const isITPAvailable = response.some(
                (item) => item.name === 'ITP' && !item.expired
            );
            const isRovAvailable = response.some(
                (item) => item.name === 'ROVIGNETA' && !item.expired
            );
            setStepperProgress(isITPAvailable, isRcaAvailable, isRovAvailable);
            setStepsInfo(getAllDocuments(res.data));
            setIsLoading(false);
        });
        return () => setStep(-1);
    }, [triggerRender]);

    useEffect(() => {
        getCarDetails();
    }, [state?.selectedCar?.id]);

    const getCarDetails = () => {
        axios.get(`/cars/${state?.selectedCar?.id}`).then((res) => {
            setSelectedCar(res.data);
        });
    };

    const deleteDocument = () => {
        console.log(toDeleteItem);
        const docId = _.get(toDeleteItem, 'documentData.id', '');
        if (docId === '') {
            console.log('err to be thrown');
            return;
        }
        axios.delete(`/documents/${docId}`).then((res) => {
            toast.success(LABELS.documentDeleted, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        });
    };
    return (
        <PageContainer>
            <div className={styles.header}>
                <span className={styles.title}>
                    Masina ta, {selectedCar?.numberPlate}
                </span>

                <Tooltip title={'Editeaza informatiile despre masina ta.'}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="close"
                        onClick={() => setEditMode((prev) => !prev)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </div>

            <CarDetails
                carData={selectedCar}
                editMode={editMode}
                setEditMode={setEditMode}
            />
            <div className={styles.carProfileStepper}>
                <div className={styles.addButton}>
                    <Tooltip title={'Adauga un nou document'}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setModalOpen(true)}>
                            <Add />
                        </IconButton>
                    </Tooltip>
                </div>

                <div className={styles.stepContainer}>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <CustomStepper
                            currentStep={step}
                            steps={stepsInfo}
                            displayTooltip={true}
                            tooltipHeader={'HELLLO'}
                            onStepDelete={(item) => {
                                setConfirmDelete(true);
                                setToDeleteItem(item);
                            }}
                            onStepClick={(item) => {
                                setClickedDocument(item);
                                setDocDialogOpen(true);
                            }}
                        />
                    )}
                </div>
            </div>

            {isModalOpen && (
                <AddDocumentDialog
                    open={isModalOpen}
                    setOpen={setModalOpen}
                    reRender={() => setTriggerRender((prev) => !prev)}
                    carId={state?.selectedCar?.id}
                    car={state?.selectedCar}
                />
            )}
            {!_.isEmpty(clickedDocument) && (
                <DocumentDetailDialog
                    documentDetail={clickedDocument}
                    open={openDocDialog}
                    setOpen={setDocDialogOpen}
                />
            )}
            {confirmDelete && (
                <ConfirmDialog
                    open={confirmDelete}
                    setOpen={setConfirmDelete}
                    onConfirmClick={() => deleteDocument()}
                    message={'Are you sure you want to delete this item?'}
                />
            )}
        </PageContainer>
    );
};
