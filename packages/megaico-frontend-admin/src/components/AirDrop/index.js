import React, { useState } from 'react';
import withMainLayout from './../HOC/withMainLayout';
import { BtnLoading } from '../Loader/BtnLoading';
import Loader from '../Loader/Loader';
import { StartAirDrop } from '../../Redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Countdown from './countdown';
import browserRoute from '../../Routes/browserRoutes';
import { Link } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Stack } from '@mui/material';

const AirDropS = () => {
  const dispatch = useDispatch();
  const airDropData = useSelector((state) => state.auth.AirdropData);
  const [StartValue, setStartValue] = useState(new Date());
  const [EndValue, setEndValue] = useState(new Date());
  const [disabled, setDisabled] = useState(false);
  const handleStart = (newValue) => {
    setStartValue(newValue);
  };
  const handleEnd = (newValue) => {
    setEndValue(newValue);
  };
  const startAirdrop = () => {
    setDisabled(true);
    dispatch(StartAirDrop(StartValue, EndValue, setDisabled));
    console.log('start', StartValue, EndValue);
  };
  const countDownDate = Number(airDropData?.closingTime + '000');
  console.log('AIR DROP DATA', airDropData);

  return (
    <>
      <div class='page-content'>
        <div class='container-fluid'>
          <div class='card-head b-card-headpadding'>
            <h2 style={{ color: '#252726', fontSize: 18, fontWeight: 700 }}>
              Start Air Drop
            </h2>
          </div>
          <div class='content-area card'>
            <div class='card-innr card-innr-fix2' style={{ height: '729px' }}>
              <div className='m-4'>
                {' '}
                {airDropData?.open && (
                  <Countdown countDownDate={countDownDate} />
                )}
              </div>

              <div class='row'>
                <div class='col-lg-5'>
                  <div class='input-item input-with-label'>
                    <label class='input-item-label'>Start Date and Time</label>
                    <div class='relative'>
                      {/* <input
                        class="input-bordered date-picker"
                        value={StartValue}
                        onChange={handleStart}
                        type="date"
                        id="startDateAndTime"
                        name="startDateAndTime"
                      />  */}
                      {/* <span class="input-icon input-icon-right date-picker-icon">
                        <em class="ti ti-calendar"></em>
                      </span> */}
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <DateTimePicker
                            value={StartValue}
                            onChange={handleStart}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </div>
                  </div>
                </div>
                <div class='col-lg-5'>
                  <div class='input-item input-with-label'>
                    <label class='input-item-label'>End Date and Time</label>
                    <div class='relative'>
                      {/* <input
                        class="input-bordered date-picker"
                        value="03/08/2022 12:18 pm"
                        type="text"
                        id="date-of-birth"
                        name="date-of-birth"
                      />
                      <span class="input-icon input-icon-right date-picker-icon">
                        <em class="ti ti-calendar"></em>
                      </span> */}
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <DateTimePicker
                            value={EndValue}
                            onChange={handleEnd}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </div>
                  </div>
                </div>
                <div class='col-lg-2 '>
                  <Link
                    class='b2-icon-dropdown'
                    to={browserRoute.AIR_DROP_LIST}
                  >
                    View Applications{' '}
                    <em class='fas fa-angle-right ml-2 b-line-height'></em>
                  </Link>
                </div>
                <div class='col-12 b-btn1'>
                  <button
                    onClick={startAirdrop}
                    disabled={disabled}
                    class='b-button-hovereffect'
                  >
                    {airDropData.open ? 'Update' : 'Start'}
                    {disabled && <BtnLoading height='18px' width='18px' />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* // OLD CODE
      <div class="page-content">
        <div class="container">
          <div className="">
            <div className="page-content">
              <div className="">
                <div className=" p-5 card content-area">
                  <h4 className="card-title">
                    {airDropData?.open ? "Air Drop Running" : "Start Air Drop"}
                    <Link
                      className="float-right badge-lg"
                      to={browserRoute.AIR_DROP_LIST}
                    >
                      View Applications
                    </Link>
                  </h4>
                  {airDropData?.open && (
                    <Countdown countDownDate={countDownDate} />
                  )}

                  <div
                    className={`d-flex p-2 ${
                      airDropData.open ? "mt-5 pt-5" : ""
                    }`}
                  >
                    <div className="m-2 col-6">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <DateTimePicker
                            value={StartValue}
                            onChange={handleStart}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </div>
                    <div className="m-2 col-6">
                      <h3 className="card-title">End</h3>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <DateTimePicker
                            label="End Date and Time"
                            value={EndValue}
                            onChange={handleEnd}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      onClick={startAirdrop}
                      className="btn btn-primary float-right"
                      disabled={disabled}
                    >
                      {airDropData.open ? "Update" : "Start"}
                      {disabled && <BtnLoading height="18px" width="18px" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
  // <!-- .page-content -->
};

export default withMainLayout(AirDropS);
