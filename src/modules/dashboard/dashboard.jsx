import React,{useEffect} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import drilldown from 'highcharts/modules/drilldown'
import Header from '../../components/Header/header';
import config from '../../config'
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import './dashboard.scss'
const Dashboard = () =>{
    const history=useHistory();
    const location=useLocation();
    console.log(location)
    drilldown(Highcharts)

    const [option,setOption] = React.useState({
        chart: {
          type: "column"
        },
        title: {
          text: "Drill Down"
        },
        series: [
          {
            name: "Things",
            colorByPoint: true,
            data: [
              {
                name: "Animals",
                y: 5,
                drilldown: "1"
              },
              {
                name: "Fruits",
                y: 2,
                drilldown: "3"
              },
              {
                name: "Cars",
                y: 0,
                drilldown: "4"
              }
            
            ]
          }
        ],
        drilldown: {
          series: [
              
            {
              id: "animals",
              data: [["Cats", 4], ["Dogs", 2], ["Cows", 1], ["Sheep", 2], ["Pigs", 1]]
            },
            {
              id: "fruits",
              data: [
                {
                  name: "Apples",
                  y: 4,
                  drilldown: "apple_id"
                },
                {
                  name: "Oranges",
                  y: 2
                }
                // ['Banana',6]
              ]
            },
            {
              id: "apple_id",
              data: [
                {
                  name: "Nested Apples",
                  y: 5
                }
              ]
            },
            {
              id: "cars",
              data: [["Toyota", 4], ["Opel", 2], ["Volkswagen", 2]]
            }
          ]
        }
    });
    
    


    useEffect(() => {
        if (location.state == undefined){
            localStorage.removeItem('login');
            
        }
        
        const hasLogin = localStorage.getItem("login");
        

        if (!hasLogin) {
        history.push("/login");
        }
        console.log(location.pathname); // result: '/'
        console.log(location.state); // result: 'some_value'
    
        //Call to API
        const arrayPatient=location.state.patients;
        const finalData=[]

        arrayPatient.map((data)=>{

            try{


                var url = `${config.backendURL}carer/${location.state.state.user.id}/patient/${data.id}`;
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
                        finalData.push({
                            name: data.patient.name,
                            y: data.patient.schedule.length,
                            drilldown: data.patient.id
                          }
                        )
                    })
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            catch(error) {
                console.error(error);
            }
        } 
        )
        const json=[{
            name: "Things",
            colorByPoint: true,
            data: finalData
            }
        ]
        console.log(finalData)
        // setOption({
        //     ...option,
        //     series:json
        // })
        console.log(option)
    }, [location]);
   
    return(
        <>
            <div className="dashboardContainer" >
                <Header></Header>
                <div className="chartContent">
                <HighchartsReact highcharts={Highcharts} options={option} />
                </div>
            </div>
        </>
    )
}

export default Dashboard