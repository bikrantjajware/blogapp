import React from 'react'
import './Settings.css';

const Settings = () => {
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settigsUpdateTitle">Update Your Account</span>
                    <span className="settigsDeleteTitle">Delete Your Account</span>
                </div>

                <form action="" className="settingsForm">
                    <label>Username:</label>
                    <input type="text" placeholder="bikrant"/>
                    <label>Email:</label>
                    <input type="email" placeholder="bikrant@mail.com"/>
                    <label>Password:</label>
                    <input type="password" />
                    <button type="submit" className="settingsSubmit">Update</button>
                </form>
            </div>
        </div>
    )
}

export default Settings;