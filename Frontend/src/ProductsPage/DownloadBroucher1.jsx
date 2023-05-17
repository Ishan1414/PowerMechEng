import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './ProductPage.css';
const PDF_FILE_URL = 'https://raw.githubusercontent.com/aditya191201/MAVS_SRC/master/rupeshticket.pdf'

function DownloadBroucher(){
    const downloadFileAtURL = (url) =>{
        const fileName = url.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = url;
        aTag.setAttribute("download",fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    };
    return(
        <>
        <div className="download-broucher">
           
            <button onClick={()=>{downloadFileAtURL(PDF_FILE_URL)}}>
            <FontAwesomeIcon icon={faFile} style={{ fontSize: '30px' , marginRight:'10px', marginTop: '10px'}}/>
            Download Broucher</button>
        </div>
        
        </>
    )
}

export default DownloadBroucher