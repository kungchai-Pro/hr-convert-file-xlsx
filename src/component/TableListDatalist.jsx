import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import * as  XLSX from 'xlsx/xlsx.mjs';
import * as FileSaver from "file-saver";
import { Link } from 'react-router-dom';





const customStyles = {
    headRow: {
        style: {
            border: 'none',
            backgroundColor: '#28B463'
        },
    },
    headCells: {
        style: {
            color: '#ffff',
            fontSize: '14px',
        },
    },
    rows: {
        highlightOnHoverStyle: {
            backgroundColor: 'rgb(230, 244, 244)',
            borderBottomColor: '#FFFFFF',
            borderRadius: '25px',
            outline: '1px solid #FFFFFF',
        },
    },
    pagination: {
        style: {
            border: 'none',
        },
    },
};



const columns = [
    // {
    //     name: 'file',
    //     selector: row =><img src={row.partFile} width="50" height="50" /> ,
    //     sortable: true,
    // },
    {
        name: 'Number',
        selector: row => row.Number.toString(),
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.Name,
        sortable: true,
    },
    {
        name: 'Department',
        selector: row => row.Department,
        sortable: true,
        grow: 1,
    },
    {
        name: 'LeaveType',
        selector: row => row.LeaveType,
        sortable: true,
    },
    {
        name: 'Status',
        selector: row => row.Status,
        sortable: true,
        grow: 2,
    },
    {
        name: 'AppliedDate',
        selector: row => row.AppliedDate,
        sortable: true,
    },
    {
        name: 'StartDate',
        selector: row => row.StartDate,
        sortable: true,
    },
    {
        name: 'EndDate',
        selector: row => row.EndDate,
        sortable: true,
    },
    {
        name: 'SessionTime',
        selector: row => row.SessionTime,
        sortable: true,
        grow: 1,
    },
    {
        name: 'NoOfDays',
        selector: row => row.NoOfDays,
        sortable: true,
        grow: 1,
    },
    {
        name: 'Remarks',
        selector: row => row.Remarks,
        sortable: true,
        grow: 1,
    },
    {
        name: 'AppComment',
        selector: row => row.AppComment,
        sortable: true,
        grow: 1,
    },



];





const TableListDatalist = (dataAll) => {
    // console.log(data.data)
    var data = dataAll.data;

    const tableData = {
        columns,
        data,
        exportHeaders: false,
        print: false,
        export: false
    };

    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (apiData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

     var  fileName=`export-${+ (new Date()).getTime()}`
    return (
        <div>
            <div style={{ width: '100%', marginLeft: '90%', padding: 10 }}>
                {/* {data[0] && <Export onExport={() => downloadCSV(data)} />} */}
                {data[0] && <button onClick={(e) => exportToCSV(data, fileName)}>Export</button>}
            </div>
            <DataTableExtensions
                {...tableData}
            >
                
                <DataTable
                    //  title=""
                    columns={columns}
                    //  actions={actionsMemo}
                    // data={datalist} 
                    customStyles={customStyles}
                    pagination
                    highlightOnHover
                />
            </DataTableExtensions>
        </div>
    );
};
export default TableListDatalist;
