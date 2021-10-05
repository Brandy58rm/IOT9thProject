import React, {useState } from 'react';
import camIcon from '../../assets/cameraicon.svg'
import './style.scss';
const SelectImage =(props)=> { 
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
        setProfileImage(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  };
	
    const [profileImg, setProfileImage] = useState(camIcon)

    return (
        
            
            <>
            <div>
                <div className="img-holder">
                    <img src={profileImg} alt="" id="img" className="img" />
                </div>
                        <input type="file" accept="image/*" name="image-upload" id="input" onChange={imageHandler} />
                        <div className="label">
                        <label className="image-upload" htmlFor="input">
                            <p>Choose your Photo</p>
                        </label>
                </div>

            </div>
            </>
        
    )
	
}

export default SelectImage;