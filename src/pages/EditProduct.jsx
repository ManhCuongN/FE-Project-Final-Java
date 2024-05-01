// components
import PageHeader from '@layout/PageHeader';
import ProductEditor from '@widgets/ProductEditor';
import UpdateProductModal from '@widgets/UpdateProductModal';

import Modal from '@mui/material/Modal';

const EditProduct = () => {
  
    
    return (
        <>
            <PageHeader title="Product Editor"/>
            <ProductEditor/>
            {/* <Modal
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: "100%"
      }}
      open={true}
    //   onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={{ width: 1000, height: 500, overflowY: 'auto' }}>
        <UpdateProductModal />
      </div>
    </Modal> */}
        </>
    )
}

export default EditProduct