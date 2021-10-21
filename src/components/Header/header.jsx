import './style.scss'
import React from 'react';
import logo from '../../assets/logo.png'
import homeIcon from '../../assets/home.svg'
import dashboardIcon from '../../assets/dashboard.svg'
import settingsIcon from '../../assets/settings.svg'



const Header = () =>{
    return(
        <>
            
            <header >
                <img src={logo} alt="" />
                <div className="iconContainer">
                    <div>
                        <a href="#"><img src={homeIcon} alt="" /></a>

                    </div>
                    <div>
                        <a href="#"><img src={dashboardIcon} alt="" /></a>

                    </div>
                        <div>
                        <a href="#"><img src={settingsIcon} alt="" /></a>

                    </div>
                </div>   

            </header>
               
            
        </>
    )
}

export default Header