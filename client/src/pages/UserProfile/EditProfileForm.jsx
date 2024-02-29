import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from '../../actions/users.js';

const EditProfileForm = ({ setSwitch }) => {
    const currentUser = useSelector((state) => state.currentUserReducer);
    const darkMode = useSelector((state) => state.themeReducer.darkMode);

    const [name, setName] = useState(currentUser?.result?.name);
    const [about, setAbout] = useState(currentUser?.result?.about);
    const [tags, setTags] = useState([]);

    const dispatch = useDispatch()

    const handleCancel = () => {
        setSwitch(false);
    }

    const handleSubmit = (e) => {
      
      e.preventDefault();
      if(tags.length === 0){
        dispatch(updateProfile(currentUser?.result?._id, {name, about, tags: currentUser?.results?.tags}))
      }else{
        dispatch(updateProfile(currentUser?.result?._id, {name, about, tags}))
      }
      setSwitch(false);
    }

  return (
    <div>
      <h1 className='edit-profile-title'>
        Edit Your Profile
      </h1>
      <h2 className='edit-profile-title-2'>
        Public information
      </h2>
      <form className='edit-profile-form' onSubmit={handleSubmit}>
        <label htmlFor="name">
            <h3>Display name</h3>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        </label>
        <label htmlFor="about">
            <h3>About me</h3>
            <textarea id="about" cols="30" rows="10" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
        </label>
        <label htmlFor="tags">
            <h3>Watched Tags</h3>
            <p>Add tags separated by 1 space</p>
            <input type="text" id='tags' onChange={(e) => setTags(e.target.value.split(" "))}/>
        </label><br/>
        <input type="submit" value="Save profile" className={`user-submit-btn ${darkMode ? "user-submit-btn-dark" : ""}`} />
        <button type="button" className={`user-cancel-btn ${darkMode ? "user-cancel-btn-dark" : ""}`} onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )
}

export default EditProfileForm
