import React from 'react'
import DataTable from 'react-data-table-component';
import {Spinner} from 'react-bootstrap';

const Datatable = (props) => {

    const CustomLoader = () => (
        <div style={{ padding: '24px', textAlign: 'center' }}>
            <Spinner animation="border" variant="secondary" role="status"></Spinner>
            <p><small className="text-muted">Veuillez patientez...</small></p>
        </div>
    );

    const NoData = () => (
        <div style={{ padding: '10px', textAlign: 'center' }}>
            <h6 className="text-muted">Aucune données</h6>
        </div>
    );

    
    const paginationComponentOptions = {
        rowsPerPageText: 'Ligne par pages',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Tous',
    };

    const customStyles = {
        headRow: {
        	style: {
        		border: 'none',
        	},
        },
        headCells: {
        	style: {
        		color: '#202124',
        		fontSize: '15px',
                fontWeight: 600,
        	},
        },
        rows: {
        	highlightOnHoverStyle: {
        		backgroundColor: 'rgb(230, 244, 244)',
        		borderBottomColor: '#FFFFFF',
        		borderRadius: '25px',
        		outline: '1px solid #FFFFFF',
        	},
            style: {
                fontSize: '14px',
        		paddingTop: '10px',
                paddingBottom: '10px',
        	},
        },
        pagination: {
        	style: {
        		border: 'none',
        	},
        },
    };

  return (
        <DataTable
            columns={props.columns}
            data={props.data}
            pagination
            noDataComponent={<NoData />}
            customStyles={customStyles}
            progressPending={props.pending}
            progressComponent={<CustomLoader />}
            highlightOnHover
            pointerOnHover
            paginationComponentOptions={paginationComponentOptions}
            paginationResetDefaultPage={props.paginationResetDefaultPage}
            persistTableHead
        />
  )
}

export default Datatable;