import React from 'react';
import { useNavigate } from 'react-router-dom';

const PdfViewer = () => {
    const navigate = useNavigate();
    const image=localStorage.getItem('pic')
    // const pdfUrl = localStorage.getItem('uploadedFile');  

    const handleEdit = () => {
      
        navigate('/pdf');
    };

    return (
        <div style={{ position: 'relative' }}>
            <button
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                onClick={handleEdit}
            >
                Edit
            </button>
            <iframe
                src={image}
                style={{ width: '100%', height: '100vh' }}
                title="PDF Viewer"
            />
        </div>
    );
};

export default PdfViewer;
