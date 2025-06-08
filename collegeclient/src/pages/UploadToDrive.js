import axios from 'axios'

const uploadToDrive = async(doc)=>{
    try {
      const response = await axios.post('http://localhost:5001/file/upload-to-drive',doc)
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Error");
      console.log(error);
      return error?.response?.data
    }
}

export default uploadToDrive;