
import React from 'react';
import { useSnackbar } from 'notistack';

const PushMessagesAlert = ({ message, variant, setError, title }) => {
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        if (message) {
            const content = (
                <div>
                    <strong>{title}</strong>
                    <br />
                    {message}
                </div>
            );

            enqueueSnackbar(content, {
                variant,
                autoHideDuration: 5000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            setError(false);
        }
    }, [message, variant, setError, enqueueSnackbar, title]);

    return null;
};

export default PushMessagesAlert;
