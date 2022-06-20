import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useGlobalContext } from 'global-context';

import axios from 'axios';
import { toast } from 'react-toastify';
import _ from 'lodash';

import { IconButton, Tooltip, CircularProgress } from '@mui/material';
import { CarRepair, DocumentScanner, EditRoad, Add } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

import CustomStepper from 'components/stepper/Stepper';
import { PageContainer } from 'components/page-container/PageContainer';
import { ConfirmDialog } from 'components/confirm-dialog/ConfirmDialog';

import { DocumentDetailDialog } from '../components/document-detail-dialog/DocumentDetailDialog';
import { AddDocumentDialog } from '../components/add-document-dialog/AddDocumentDialog';
import { CarDetails } from '../components/car-details-editable/CarDetails';

import styles from './CarProfile.module.scss';
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
    const [editMode, setEditMode] = useState(false);
    const [selectedCar, setSelectedCar] = useState(state?.selectedCar);
    const [clickedDocument, setClickedDocument] = useState({});
    const [openDocDialog, setDocDialogOpen] = useState(false);
    const [stepsInfo, setStepsInfo] = useState(DEFAULT_DOC_DATA);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [toDeleteDoc, setToDeleteDoc] = useState({});
    const [editDocument, setEditDocument] = useState(false);

    const setStepperProgress = (
        isITPAvailable,
        isRcaAvailable,
        isRovAvailable
    ) => {
        if (isITPAvailable) {
            setStep((prev) => {
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

    const gatherDocsData = (response) => {
        const isRcaAvailable = response.some(
            (item) => item.name === 'RCA' && !item.expired
        );
        const isITPAvailable = response.some(
            (item) => item.name === 'ITP' && !item.expired
        );
        const isRovAvailable = response.some(
            (item) => item.name === 'ROVIGNETA' && !item.expired
        );
        console.log({ isITPAvailable, isRcaAvailable, isRovAvailable });
        setStepperProgress(isITPAvailable, isRcaAvailable, isRovAvailable);
        setStepsInfo(getAllDocuments(response));
    };

    useEffect(() => {
        const handler = (car) => {
            console.log('client side am primit', car);
            setSelectedCar(car);
        };
        socket.on('carUpdated', handler);
        const docsUpdateHandler = (docs) => {
            console.log('client side am primit', docs);
            gatherDocsData(docs);
        };
        socket.on('docsListUpdate', docsUpdateHandler);
        return () => {
            socket.off('carUpdated', handler);
            socket.off('docsListUpdate', docsUpdateHandler);
        };
    }, [socket]);

    useEffect(() => {
        axios.get(`/documents/car/${selectedCar?.id}`).then((res) => {
            gatherDocsData(res.data);
            setIsLoading(false);
        });
        return () => setStep(-1);
    }, []);

    useEffect(() => {
        getCarDetails();
    }, [selectedCar.id]);

    const getCarDetails = () => {
        axios.get(`/cars/${selectedCar?.id}`).then((res) => {
            console.log('here');
            setSelectedCar(res.data);
        });
    };

    const deleteDocument = () => {
        const docId = _.get(toDeleteDoc, 'documentData.id', '');
        if (docId === '') {
            return;
        }
        axios.delete(`/documents/${docId}`).then(() => {
            socket.emit('deleteDoc', selectedCar?.id);
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
    useEffect(() => {
        console.log(clickedDocument);
    }, [clickedDocument]);
    return (
        <PageContainer>
            <div className={styles.header}>
                <span className={styles.title}>
                    Masina ta, {selectedCar?.numberPlate}
                </span>

                <Tooltip
                    title={'Editeaza informatiile despre masina ta.'}
                    enterTouchDelay={0}>
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
                    <Tooltip
                        title={'Adauga un nou document'}
                        enterTouchDelay={0}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => {
                                setEditDocument(false);
                                setModalOpen(true);
                            }}>
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
                                setToDeleteDoc(item);
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
                    carId={selectedCar?.id}
                    car={selectedCar}
                    document={clickedDocument?.documentData}
                    edit={editDocument}
                />
            )}
            {!_.isEmpty(clickedDocument) &&
                !_.isEmpty(clickedDocument.documentData) && (
                    <DocumentDetailDialog
                        documentDetail={clickedDocument}
                        open={openDocDialog}
                        setOpen={setDocDialogOpen}
                        headerActions={
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="close"
                                onClick={() => {
                                    setEditDocument(true);
                                    setDocDialogOpen(false);
                                    setModalOpen(true);
                                }}>
                                <EditIcon />
                            </IconButton>
                        }
                    />
                )}
            {confirmDelete && (
                <ConfirmDialog
                    open={confirmDelete}
                    setOpen={setConfirmDelete}
                    onConfirmClick={() => deleteDocument()}
                    message={LABELS.deleteItemMessage}
                />
            )}
        </PageContainer>
    );
};
