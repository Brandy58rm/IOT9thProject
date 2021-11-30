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
                name: "Armando",
                y: 4,
                drilldown: "16"
              },
              {
                name: "Violeta",
                y: 2,
                drilldown: "15"
              },
              {
                name: "Lucia",
                y: 1,
                drilldown: "8"
              },
              {
                name: "Lucia",
                y: 1,
                drilldown: "8"
              },
              {
                name: "Lucia",
                y: 1,
                drilldown: "8"
              }
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
                        drilldown: data.patient.id.toString()
                      }
                    )
                })
                
                
            })
            .catch((err)=>{
                console.log(err)
            })
            
        
        
      } 
      )
      console.log(finalData)
      
      // const data=[
      //   {
      //     name: "Patients",
      //     colorByPoint: true,
      //     data: finalData
      //   }
      // ]
      // console.log(data)
      setOption({
        ...option,
        series:[{
            name: "Patients",
            colorByPoint: true,
            data: finalData
        }]
      })
      console.log(option)
      // setOption({
      //     ...option,
      //     series:data,
         
      // })
    //   setOption({
    //     chart: {
    //       type: "column"
    //     },
    //     title: {
    //       text: "Drill Down"
    //     },
    //     series: [
    //       {
    //         name: "Patients",
    //         colorByPoint: true,
    //         data: finalData,
    //       }
    //     ],
    //     drilldown: {
    //       series: [
              
    //         {
    //           id: "animals",
    //           data: [["Cats", 4], ["Dogs", 2], ["Cows", 1], ["Sheep", 2], ["Pigs", 1]]
    //         },
    //         {
    //           id: "fruits",
    //           data: [
    //             {
    //               name: "Apples",
    //               y: 4,
    //               drilldown: "apple_id"
    //             },
    //             {
    //               name: "Oranges",
    //               y: 2
    //             }
    //             // ['Banana',6]
    //           ]
    //         },
    //         {
    //           id: "apple_id",
    //           data: [
    //             {
    //               name: "Nested Apples",
    //               y: 5
    //             }
    //           ]
    //         },
    //         {
    //           id: "cars",
    //           data: [["Toyota", 4], ["Opel", 2], ["Volkswagen", 2]]
    //         }
    //       ]
    //     }
    // })
      
    }, []);
    
    drilldown(Highcharts)
    return(
        <>
            <div className="dashboardContainer" >
                <Header></Header>
                <div className="chartContent">
                <HighchartsReact highcharts={Highcharts}  options={option} />
                </div>
            </div>
        </>
    )
}

export default Dashboard