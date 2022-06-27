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
    const [isModalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedCar, setSelectedCar] = useState(state?.selectedCar);
    const [clickedDocument, setClickedDocument] = useState({});
    const [openDocDialog, setDocDialogOpen] = useState(false);
    const [stepsInfo, setStepsInfo] = useState(DEFAULT_DOC_DATA);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [editDocument, setEditDocument] = useState(false);

    const getAllDocuments = (response) => {
        const docsResponse = response.map((item) => {
            return {
                documentData: { ...item },
                icon: DOCUMENTS_ICONS[item.name],
                label: item.name,
                expired: item.expired,
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
            console.log('client side am primit', car);
            setSelectedCar(car);
        };
        socket.on('carUpdated', handler);
        const docsUpdateHandler = (docs) => {
            setStepsInfo(getAllDocuments(docs));
        };
        socket.on('docsListUpdate', docsUpdateHandler);
        return () => {
            socket.off('carUpdated', handler);
            socket.off('docsListUpdate', docsUpdateHandler);
        };
    }, [socket]);

    useEffect(() => {
        axios.get(`/documents/car/${selectedCar?.id}`).then((res) => {
            setStepsInfo(getAllDocuments(res.data));
            setIsLoading(false);
        });
        axios.get(`/cars/${selectedCar?.id}`).then((res) => {
            console.log('here');
            setSelectedCar(res.data);
        });
        return () => setStepsInfo(getAllDocuments([]));
    }, [selectedCar.id]);

    const deleteDocument = () => {
        const docId = _.get(clickedDocument, 'documentData.id', '');
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
                    <Tooltip title={LABELS.addDocumetTitle} enterTouchDelay={0}>
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
                            steps={stepsInfo}
                            displayTooltip={true}
                            tooltipHeader={'HELLLO'}
                            onStepDelete={(item) => {
                                setConfirmDelete(true);
                                setClickedDocument(item);
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
