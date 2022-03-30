import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Tooltip } from '@mui/material';

import { ColorlibStepIcon, ColorlibConnector } from './ColorlibStepIcon.jsx'

export default function CustomStepper({
    currentStep = 0,
    steps = [],
    onStepClick = () => { },
    stepperWidth = '600px',
    ...props }
) {
    return (
        <Stepper sx={{ width: stepperWidth }} alternativeLabel activeStep={currentStep} connector={<ColorlibConnector />}>
            {steps.map((item) => (
                <Step key={item.label}>
                    <Tooltip title="Delete">
                        <StepLabel
                            StepIconComponent={(props) => {
                                const stepLabelProps = { ...props, icon: item.icon };
                                return <ColorlibStepIcon {...stepLabelProps} />
                            }}
                            onClick={(e) => onStepClick(item)}
                        >
                            {item.label}
                        </StepLabel>
                    </Tooltip>
                </Step >
            ))
            }
        </Stepper >
    );
}
