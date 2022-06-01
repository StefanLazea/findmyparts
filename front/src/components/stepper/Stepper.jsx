import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Tooltip } from '@mui/material';

import { ColorlibStepIcon, ColorlibConnector } from './ColorlibStepIcon.jsx';

const CustomStepper = ({
    currentStep = 0,
    steps = [],
    onStepClick = () => {},
    stepperWidth = '600px',
    // tooltip = false,
    tooltipHeader = 'N/a',
    ...props
}) => {
    console.log({ steps });
    const StepLabelItem = ({ item }) => {
        return (
            <StepLabel
                StepIconComponent={(props) => {
                    const stepLabelProps = { ...props, icon: item.icon };
                    return <ColorlibStepIcon {...stepLabelProps} />;
                }}
                onClick={() => onStepClick(item)}>
                {item.label}
            </StepLabel>
        );
    };
    const _getStepItem = (item) => {
        if (props.tooltip) {
            return (
                <Tooltip title={tooltipHeader}>
                    <StepLabelItem item={item} />
                </Tooltip>
            );
        }
        return <StepLabelItem item={item} />;
    };
    return (
        <Stepper
            sx={{ width: stepperWidth }}
            alternativeLabel
            activeStep={currentStep}
            connector={<ColorlibConnector />}>
            {steps.map((item) => (
                <Step key={item.label}>{_getStepItem(item)}</Step>
            ))}
        </Stepper>
    );
};

export default CustomStepper;
