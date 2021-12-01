import React,{useEffect} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import drilldown from 'highcharts/modules/drilldown'
import Header from '../../components/Header/header';
import config from '../../config'
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button/button"
import './dashboard.scss'
const Dashboard = () =>{
    const history=useHistory();
    const location=useLocation();
    
    
    const [disabled, setDisabled]=React.useState(false)
    const [option,setOption] = React.useState({
        chart: {
          type: "column"
        },
        title: {
          text: "Total of Schedule"
        },
        series: [
          {
            name: "Patients",
            colorByPoint: true,
            data: [
              // {
              //   name: "Armando",
              //   y: 4,
              //   drilldown: "16"
              // },
              // {
              //   name: "Violeta",
              //   y: 2,
              //   drilldown: "15"
              // },
              // {
              //   name: "Lucia",
              //   y: 1,
              //   drilldown: "8"
              // },
              // {
              //   name: "Lucia",
              //   y: 1,
              //   drilldown: "8"
              // },
              // {
              //   name: "Lucia",
              //   y: 1,
              //   drilldown: "8"
              // }
            ],
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
    
    

    const finalData=[]
    const dripData=[]
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
      

      arrayPatient.map((data)=>{
            var url = `${config.backendURL}carer/${location.state.state.user.id}/patient/${data.id}`;
            let h = new Headers();
            
            
            h.append('authorization', `Bearer ${location.state.state.token}`)
           
            
            let req= new Request(url,{
                method: 'GET',
                headers:h

                
            });

            fetch(req)
            .then((response)=>{   
                response.json().then((data) => {
                    console.log(data)
                    finalData.push({
                        name: data.patient.name,
                        y: data.patient.schedule.length,
                        drilldown: data.patient.id.toString(),
                        
                      }
                    )
                    const schedule=data.patient.schedule;
                    // console.log(schedule)
                    // schedule.forEach(s => {

                    //   dripData.push({
                    //     id:data.patient.id.toString(),
                    //     data:  [
                    //       {
                    //         name:s.medication.name,
                    //         y:s.totalDosis
                    //       }
                    //     ]
                    //   }
                    // )
                    // });
                    
                   
                    dripData.push({
                      id:data.patient.id.toString(),
                      data:[]
                    })
                  


                    for (var i = 0; i < schedule.length; i++) {
                      // dripData.push({
                      //   data:[{
                      //     name:schedule[i].medication.name,
                      //     y:schedule[i].totalDosis
                      //   }]

                      // })
                      dripData[i].data.push({
                        name:schedule[i].medication.name,
                        y:schedule[i].totalDosis
                      })
                      
                    }
                    
                    
                })
                
                
            })
            .catch((err)=>{
                console.log(err)
            })
            
        
        
      } 
      )
      console.log(finalData)
      console.log(dripData)
      
    }, []);
    console.log(option)
    
    const updateData = () =>{
      setDisabled(true)
      const data=[
        {
          name: "Patients",
          colorByPoint: true,
          data: finalData
        }
      ]
      // console.log(data)
      setOption({
        ...option,
        series:data,
        drilldown:{
          series:dripData
        }
      })
    }

    drilldown(Highcharts)
    return(
        <>
            <div className="dashboardContainer" >
                <Header></Header>
                <div className="chartContent">
                <HighchartsReact highcharts={Highcharts}  options={option} oneToOne={true}   allowChartUpdate={true}/>
                </div>
                <div>
                  <Button onClick={updateData} disabled={disabled}>See Patients Data</Button>
                </div>
            </div>
        </>
    )
}

export default Dashboard