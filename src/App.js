import React, { useState, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { SelectExcel, addExcel } from './redux/reduxSlice/LeaveSlice';
import TableListDatalist from './component/TableListDatalist';
import * as XLSX from 'xlsx/xlsx.mjs';
import imageicon from './image/30516.jpg';
import { convertDateT030, convertDateT031,convertDateT28} from './component/Function';

function App() {
  const dispatch = useDispatch();
  const listExcel = useSelector(SelectExcel);


  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }


  useEffect(() => {

  }, [dispatch, listExcel])

  // function parseNewDate(str, i) {
  //   var mdy = str.split('/');
  //   var daynew = parseInt(mdy[0]) + i;
  //   var newDay = daynew + '/' + mdy[1] + '/' + mdy[2];
  //   return newDay;
  // }


  function parseDateNOchange(str) {
    var mdy = "";
    var newDay = ""
    if (str.length == 10) {
      mdy = str.split('/');
      newDay = mdy[0] + '/' + mdy[1] + '/' + mdy[2];
    }
    else {
      console.log("กรุณาตรวจสอบ formate file")
    }


    return newDay;
  }

  // convert วันที่กรณีสร้างวันที่ run ตามช่วงวันที่ขอลา  
  function parseConvertDate(strdate, endate, i) {

    if (strdate.length == 10 && endate.length == 10) {


      var myend = endate.split('/');
      var mdy = strdate.split('/');
      var newDay = "";
      var newmonth = "";



      if (mdy[1] === myend[1]) { //กรณีที่ลาภายในเดือนเดียวกัน

        var daynew = parseInt(mdy[0]) + i;
        if (daynew < 10) {
          daynew = '0' + daynew
        }
        newDay = daynew + '/' + mdy[1] + '/' + mdy[2];


      }
      else if (mdy[1] !== myend[1]) { //  กรณีที่ที่ลาข้ามเดือน

        var daynew = parseInt(mdy[0]) + i;

        if (mdy[1] === '01' && daynew > 31) {
          newmonth = myend[1];
          daynew = convertDateT031(daynew)
        }
        else if (mdy[1] === '02' && daynew > 28) {
          newmonth = myend[1];
          daynew = convertDateT28(daynew)
        }
        else if (mdy[1] === '03' && daynew > 31) {

          newmonth = myend[1];
          daynew = convertDateT031(daynew)

        }
        else if (mdy[1] === '04' && daynew > 30) {
          newmonth = myend[1];
          daynew = convertDateT030(daynew)

        }
        else if (mdy[1] === '05' && daynew > 31) {

          newmonth = myend[1];
          daynew = convertDateT031(daynew)
        }
        else if (mdy[1] === '06' && daynew > 30) {
          daynew = convertDateT030(daynew)
          newmonth = myend[1];
        }
        else if (mdy[1] === '07' && daynew > 31) {
          daynew = convertDateT031(daynew)
          newmonth = myend[1];
        }
        else if (mdy[1] === '08' && daynew > 31) {
 
          daynew = daynew = convertDateT031(daynew);
          newmonth = myend[1];
        }
        else if (mdy[1] === '09' && daynew > 30) {
    
          daynew = daynew = convertDateT030(daynew)
          newmonth = myend[1];
        }
        else if (mdy[1] === '10' && daynew > 31) {
          daynew = convertDateT031(daynew)
          newmonth = myend[1];
        }
        else if (mdy[1] === '11' && daynew > 30) {

          daynew = convertDateT030(daynew)
          newmonth = myend[1];
        }
        else if (mdy[1] === '12' && daynew > 31) {
          daynew = convertDateT031(daynew)
          newmonth = myend[1];
        }
        else {
          newmonth = mdy[1]
        }
        if (daynew < 10) {
          daynew = '0' + daynew
        }
        newDay = daynew + '/' + newmonth + '/' + mdy[2]
      }
    }
    else {
      console.log('กรุณาตรวจสอบ formate file')
    }

    return newDay;
  }

  //แปลงวันที่ให้เป็น formate ตามต้องการ
  function parseDate(str) {
    if (str.length == 10) {
      var mdy = str.split('/');
      return new Date(mdy[2], mdy[1] - 1, mdy[0]);
    }
    else {
      console.log('กรุณาตรวจสอบ formate file')
    }

  }
  // function convertDatemont(dnew){
  //   var dw="";
  //   if(dnew==31){
  //     dw=1;
  //   }
  //  else if(dnew==32){
  //     dw=2;
  //   }
  //   else if(dnew==33){
  //     dw=3;
  //   }
  //   else if(dnew==34){
  //     dw=4;
  //   }
  //   else if(dnew==35){
  //     dw=5;
  //   }
  //   else if(dnew==36){
  //     dw=6;
  //   }
  //   else if(dnew==37){
  //     dw=7;
  //   }
  //   else if(dnew==38){
  //     dw=8;
  //   }
  //   else if(dnew==39){
  //     dw=9;
  //   }
  //   else if(dnew==40){
  //     dw=10;
  //   }
  //   else if(dnew==41){
  //     dw=11;
  //   }
  //   else if(dnew==42){
  //     dw=12;
  //   }
  //   else if(dnew==43){
  //     dw=13;
  //   }
  //   else if(dnew==44){
  //     dw=14;
  //   }

  //   return dw;

  // }


  // กรณีที่เลือกไฟล์ เพื่อแสดงเป็น json
  const handleUpload = (e) => {
    e.preventDefault();
    var Array = [];
    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: 'binary' });
      const wsname = readedData.SheetNames[0];

      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      if (dataParse[0][0] !== 'Number' || dataParse[0][1] !== 'Name' || dataParse[0][2] !== 'Department' || dataParse[0][3] !== 'Leave Type'
        || dataParse[0][4] !== 'Status' || dataParse[0][5] !== 'Applied Date' || dataParse[0][6] !== 'Start Date' || dataParse[0][8] !== 'End Date'
        || dataParse[0][9] !== 'Session Time' || dataParse[0][10] !== 'No Of Days' || dataParse[0][11] !== 'Remarks' || dataParse[0][12] !== 'App Comment') {
        // console.log('กรุณาตัวสอบ formate file')
        alert('กรุณาตัวสอบ formate file')
      }
      else {
        // console.log('ok')

        for (let i = 1; i < dataParse.length; i++) {

          const opject = {
            "Number": dataParse[i][0],
            "Name": dataParse[i][1],
            "Department": dataParse[i][2],
            "LeaveType": dataParse[i][3],
            "Status": dataParse[i][4],
            "AppliedDate": dataParse[i][5],
            "StartDate": dataParse[i][6],
            // "Call": dataParse[i][7],
            "EndDate": dataParse[i][8],
            "SessionTime": dataParse[i][9],
            "NoOfDays": dataParse[i][10],
            "Remarks": dataParse[i][11],
            "AppComment": dataParse[i][12],
            "date_length": datediff(parseDate(dataParse[i][6]), parseDate(dataParse[i][8])) + 1
          }
          Array.push(opject)
        }

        Array.map((item, index) => {

          if (item.date_length > 1) {

            for (let i = 0; i < item.date_length; i++) {
              var SessionTime = ""
              if (item.SessionTime === undefined || item.SessionTime === "") {
                SessionTime = "";
              }
              else {
                SessionTime = item.SessionTime
              }

              var leaveData = {
                "Number": item.Number,
                "Name": item.Name,
                "Department": item.Department,
                "LeaveType": item.LeaveType,
                "Status": item.Status,
                "AppliedDate": item.AppliedDate,
                "StartDate": parseConvertDate(item.StartDate, item.EndDate, i),
                // "Call": item.Call,
                "EndDate": item.EndDate,
                "SessionTime": SessionTime,
                "NoOfDays": 1,
                "Remarks": item.Remarks,
                "AppComment": item.AppComment,
                "date_length": ""
              }
              dispatch(addExcel(leaveData))
            }
          }
          else {
            // console.log(item.SessionTime)
            var SessionTime = ""
            if (item.SessionTime === undefined || item.SessionTime === "") {
              SessionTime = "";
            }
            else {
              SessionTime = item.SessionTime
            }
            var leaveData = {
              "Number": item.Number,
              "Name": item.Name,
              "Department": item.Department,
              "LeaveType": item.LeaveType,
              "Status": item.Status,
              "AppliedDate": item.AppliedDate,
              "StartDate": parseDateNOchange(item.StartDate),
              // "Call": item.Call,
              "EndDate": item.EndDate,
              "SessionTime": SessionTime,
              "NoOfDays": item.NoOfDays,
              "Remarks": item.Remarks,
              "AppComment": item.AppComment,
              "date_length": ""
            }
            dispatch(addExcel(leaveData))
          }
        }

        )
      }
    };
    reader.readAsBinaryString(f)
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ margin: 20 }}>
        <b>
          <label style={{ fontSize: 20 }}>Swan Convert file xslx </label>
        </b>
      </div>
      <div style={{ background: '#E7913F', margin: 5, padding: 10 }}>
        <img src={imageicon} alt="Logo" style={{ width: 100, height: 50 }} />
        <center>
          <input
            type='file'
            onChange={handleUpload}
            name='file'
          />
        </center>
        <div style={{ width: '100%' }}><button style={{ marginLeft: '90%' }} onClick={() => window.location.reload()}>Reset Data</button></div>
      </div>
      <div style={{ width: '100%' }}>
        {/* {JSON.stringify(listExcel)} */}
        <TableListDatalist data={listExcel} />
      </div>
    </div>
  );
}

export default App;
