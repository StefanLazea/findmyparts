import * as React from 'react';
import _ from 'lodash';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Tooltip } from '@mui/material';
import { CustomTooltipMessage } from '../tooltip-message/CustomTooltipMessage';
import { ColorlibStepIcon, ColorlibConnector } from './ColorlibStepIcon.jsx';

const CustomStepper = ({
    currentStep = 0,
    steps = [],
    onStepClick = () => {},
    stepperWidth = '600px'
}) => {
    const StepLabelItem = ({ item }) => {
        return (
            <StepLabel
                StepIconComponent={(props) => {
                    const stepLabelProps = {
                        ...props,
                        icon: item.icon,
                        //if item is expired and data comes from backedn
                        expired: item.expired && item.exists
                    };
                    return <ColorlibStepIcon {...stepLabelProps} />;
                }}
                onClick={() => onStepClick(item)}>
                {item.label}
            </StepLabel>
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
                    key={item.label}>
                    <Step key={item.label}>
                        <StepLabelItem item={item} />
                    </Step>
                </Tooltip>
            ))}
        </Stepper>
    );
};

export default CustomStepper;
