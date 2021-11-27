import './style.scss'

import Header from '../../components/Header/header'
import Input from '../../components/Input/input'
import UserIcon from '../../assets/userIcon.png'
import { useHistory } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import config from '../../config'
import Schedule from '../../components/Schedule/schedule'
import Button from '../../components/Button/button'


import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './map.css';


mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const ViewPatient = () =>{


   
  
    // Initialize map when component mounts

    //////
    const history = useHistory()
    const location = useLocation()
    const [info,setInfo] = React.useState()
    const [schedule,setSchedule]=React.useState()
    
    useEffect(()=>{
        const hasLogin = localStorage.getItem("login");
        if (!hasLogin) {
          history.push("/login");
        }

      
        try{


            var url = `${config.backendURL}carer/${location.state.state.user.id}/patient/${location.state.idPatient}`;
            let h = new Headers();
            
            
            h.append('authorization', `Bearer ${location.state.state.token}`)
            console.log(h)
            
            let req= new Request(url,{
                method: 'GET',
                headers:h

                
            });

                fetch(req)
            .then((response)=>{
                response.json().then((data) => {
                    
                    setInfo(data)
                    setSchedule(data.patient.schedule)
                    
                    
                    
                })
            })
            .catch((err)=>{
                console.log(err)
            })

        }
        catch(error) {
            
            console.error(error);
        }



    },[location])




/////////////////////////////
    const mapContainerRef = useRef(null);

    const [lng, setLng] = useState(-117.00371);
    const [lat, setLat] = useState(32.5027);
    const [zoom, setZoom] = useState(10);

    // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
    
    

    // create the popup
    let markerPopup = new mapboxgl.Popup({offset: 25})
    .setHTML("test");

    new mapboxgl.Marker().setLngLat([lng,lat]).setPopup(markerPopup).addTo(map);
    // // Create default markers
    // geoJson.features.map((feature) =>
    //   new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map)
    // );

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps














    ////////////////////

    const goToHome = () =>{
        history.push({
            pathname:"/",
            state:location.state.state
        })
    }
    const goToAddPrescription = () =>{
        history.push({
            pathname:"/addPrescription",
            state:info,
            data:location.state.state
                
        })
       
    }

    
   
    console.log(location)
    console.log(info)
  
    
 
    return(
        <>
            <div className="viewContainer">
                <Header onClickHome={goToHome}/>
                <div className="generalContent">
                    <div className="leftContent">
                       
                        <div className="locationContent">
                            <div>
                                <h1>Current Location</h1>
                            </div>
                            <div className="patientLocation">
                            <Input style={{width:"80%", color:"#fff", background:"#40C4FF", fontSize: "20pt"}} value={"Tijuas, baja california, 220131, "}  />
                            </div>
                        </div>
                        <div className="profileContent">
                            <div>
                                <h1>Patient Profile</h1>
                            </div>
                            <div className="patientContent">
                                <div className="photoInfoContainer">
                                    <div className="imgContainer">
                                        <img src={UserIcon} alt="userIMG" />
                                    </div>
                                    <div className="infoContainer">
                                        {info ?
                                            <h2>{`${info.patient.name} ${info.patient.lastName}`}</h2>
                                            :
                                            <h2>Nombre Completo</h2>
                                        }
                                        <div className="ageGnreContainer">
                                            {info ?
                                            <h2>{`Age:${info.patient.age}`}</h2>
                                            :
                                            <h2>Age:?</h2>
                                            }
                                            {info ?
                                            <h2>{`Gender:${info.patient.gender}`}</h2>
                                            :
                                            <h2>Gender:? </h2>
                                            }
                                        </div>
                                        {info ?
                                            <h2>{`Date of Birth:${info.patient.dob}`}</h2>
                                            :
                                            <h2>Date of Birth:?</h2>
                                            }
                                            
                                    </div>
                                </div>
                                
                                <div className="generalContainerMedicine">
                                    <div className="titleMedicine"><h2>Medicine</h2></div>
                                    <div className="headerMedice">
                                        <h4>Name</h4>
                                        <h4>Every</h4>
                                        <h4>Start on</h4>
                                        <h4>Notes</h4>
                                        <h4>Total Dosis</h4>

                                    </div>
                                    <div className="scrolling">

                                        {schedule? schedule.map((s)=>
                                            <Schedule
                                            name={s.medication.name}
                                            takeEvery={s.takeEvery}
                                            startingOn={s.startingOn}
                                            notes={s.notes}
                                            totalDosis={s.totalDosis}
                                            key={s.id}
                                            ></Schedule>
                                        ):
                                        <div>No schedule</div>
                                            

                                        }
                                    </div>
                                </div>
                                <div className="buttonsContainer">
                                    <div>
                                        <Button className="buttonDash">DashBoard</Button>

                                    </div>
                                    <div>
                                        <Button onClick={goToAddPrescription} className="buttonAdd">Add</Button>
                                        <Button className="buttonEdit">Edit</Button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        

                    </div>
                    <div className="rightContent">
                        <div className="right">
                        <div>
                            <div className="sidebarStyle">
                                <div>
                                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                                </div>
                            </div>
                            <div className="map-container" ref={mapContainerRef} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}
export default ViewPatient