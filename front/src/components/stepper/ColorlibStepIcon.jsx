import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import StepConnector, {
    stepConnectorClasses
} from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';

//connection line
export const ColorlibConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: '#6FF394'
        }
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: '#6FF394'
        }
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1
    },
    [`& .${stepConnectorClasses.expired}`]: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1
    }
}));
const getItemColor = (ownerState) => {
    if (ownerState.active || ownerState.completed) {
        return {
            backgroundColor: '#19AC43',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
        };
    } else if (ownerState.expired && ownerState.exists) {
        return {
            backgroundColor: '#D96C06',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
        };
    } else {
        return {
            backgroundColor: '#DD1C1A',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
        };
    }
};
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...getItemColor(ownerState)
    // ...(ownerState.active && {
    //     backgroundColor: '#19AC43',
    //     boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
    // }),
    // ...(ownerState.completed && {
    //     backgroundColor: '#19AC43',
    //     boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
    // })
    // ...(ownerState.expired && ownerState.exists && !ownerState.active
    //     ? {
    //           backgroundColor: '#D96C06',
    //           boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
    //       }
    //     : {
    //           backgroundColor: '#DD1C1A',
    //           boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
    //       })
}));

export const ColorlibStepIcon = (props) => {
    const { active, completed, expired, exists, className } = props;

    console.log({ active, completed, expired, exists, props });
    return (
        <ColorlibStepIconRoot
            ownerState={{
                completed,
                active,
                expired,
                exists
            }}
            onClick={props.onClick}
            className={className}>
            {completed && props.showCheck ? <Check /> : props.icon}
        </ColorlibStepIconRoot>
    );
};

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
    /**
     * Show check as icon if step is completed
     * @default false
     */
    showCheck: PropTypes.bool
};

ColorlibStepIcon.defaultProps = {
    showCheck: false
};
