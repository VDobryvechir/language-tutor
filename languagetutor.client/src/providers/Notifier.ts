type NotifyKind = 'error' | 'info';

export interface NotifyData {
    message: string;
    kind: NotifyKind | null;
};

export type NotifyListener = (data: NotifyData) => void;

let notifyListener: NotifyListener | null = null;

export const HideNotification = { kind: null, message: '' };

export const setNotifyListener = (fn: NotifyListener): void => {
    notifyListener = fn;
};

export const showError = (message: string): void => {
    if (notifyListener) {
        notifyListener({
            message: message,
            kind: 'error',
        });
    }
};

export const showInfo = (message: string): void => {
    if (notifyListener) {
        notifyListener({
            message: message,
            kind: 'info',
        });
    }
};
