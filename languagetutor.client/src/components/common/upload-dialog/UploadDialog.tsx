import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import translate from '../../../i18n/translate';
import { uploadMedia } from '../../../providers/DownloadUtils';
import "./UploadDialog.css";
export interface Props {
    open: boolean;
    operation: string;
    url: string;
    method: string;
    onClose: (value: string) => void;
}
const UploadDialog = ({ onClose, operation, open, url, method }: Props) => {

    const handleClose = () => {
        onClose("");
    };

    const handleFile = (event: any) => {
        const formData = new FormData();
        const file = event.target.files[0];
        formData.append('file', file);
        uploadMedia(url, method, formData).then((res: any) => {
            console.log(res);
            onClose(res);
        });
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{translate(operation || "Action")}</DialogTitle>
            <div className="upload-dialog__content">
                <input
                    accept="*/*"
                    className="upload-dialog__input"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleFile}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="outlined" component="span" className="upload-dialog__button">
                        { translate("Upload") }
                    </Button>
                </label> 
            </div>
        </Dialog>
    );
}

export default UploadDialog;
