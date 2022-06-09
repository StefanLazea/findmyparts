import * as React from 'react';

import { IconButton } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import EditIcon from '@mui/icons-material/Edit';

import { Tooltip } from '@mui/material';
import { CustomTooltipMessage } from '../tooltip-message/CustomTooltipMessage';
import { ColorlibStepIcon, ColorlibConnector } from './ColorlibStepIcon.jsx';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './Stepper.module.scss';
const CustomStepper = ({
    currentStep = 0,
    steps = [],
    onStepClick = () => {},
    stepperWidth = '600px',
    ...props
}) => {
    const StepLabelItem = ({ item, onStepDelete }) => {
        return (
            <StepLabel
                StepIconComponent={(props) => {
                    const stepLabelProps = {
                        ...props,
                        icon: item.icon,
                        //if item is expired and data comes from backedn
                        expired: item.expired,
                        exists: item.exists
                    };
                    return (
                        <ColorlibStepIcon
                            {...stepLabelProps}
                            onClick={() => onStepClick(item)}
                        />
                    );
                }}>
                {onStepDelete && item.exists ? (
                    <DeleteActionLabel
                        item={item}
                        onStepDelete={onStepDelete}
                    />
                ) : (
                    item.label
                )}
            </StepLabel>
        );
    };

    const DeleteActionLabel = ({ item, onStepDelete }) => {
        return (
            <div className={styles.labelActionsContainer}>
                <span>{item.label}</span>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="close"
                    classes={{ root: styles.deleteIcon }}
                    onClick={() => onStepDelete(item)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        );
    };
    return (
        <Stepper
            sx={{ width: stepperWidth }}
            alternativeLabel
            activeStep={currentStep}
            connector={<ColorlibConnector />}>
            {steps.map((item) => (
                <Tooltip
                    title={<CustomTooltipMessage item={item} />}
                    enterTouchDelay={0}
                    key={item.label}>
                    <Step key={item.label}>
                        <StepLabelItem
                            item={item}
                            onStepDelete={props.onStepDelete}
                        />
                    </Step>
                </Tooltip>
            ))}
        </Stepper>
    );
};

export default CustomStepper;
