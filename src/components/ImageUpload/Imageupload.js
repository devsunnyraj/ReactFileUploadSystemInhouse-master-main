import React,{useState} from "react";
import axios from "axios";

const url = "http://localhost:4000/user/uploads"

const createPost = async newImage => {
  try{
    await axios.post(url,newImage)
  }catch(error){
    console.log(error)
  } 
}

const ImageUpload = () => {
  const [postImage, setPostImage] = useState({fileName : "", myFile : ""})

  const [imgSrc,setImgSrc]= useState("")

  const handleFileUpload = async e =>{
    const file = e.target.files[0]
    const fileName = file.name
    const base64Img = await convertToBase64(file)
    setPostImage({...postImage,fileName:fileName, myFile:base64Img})
  }

  const handleSubmit = e =>{
    e.preventDefault()
    createPost(postImage)
    console.log("Uploaded");


    try{
      axios.post(`${url}/getimg`,{fileName:postImage.fileName})
      .then(res=>{
        const result = res.data
        setImgSrc(result.fileName.myFile)
      })
    }catch(error){
      console.log(error)
    }
  }

    return(
        <form onSubmit={handleSubmit}>
            <img style={{width: "200px"}} src={imgSrc} alt="Uploaded Image"/>
            <input onChange={e => handleFileUpload(e)} type="file" label="Image" name="myFile" id="file-Upload" accept=".jpeg, .png, .jpg"/>
            <button type="submit" onSubmit={handleSubmit}>submit</button>
        </form>
    )
}

function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
}

export default ImageUpload