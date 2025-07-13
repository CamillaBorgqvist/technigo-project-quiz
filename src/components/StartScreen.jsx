import {useState} from "react";

export const StartScreen = ({onStart}) => {
       const [name, setName] = useState ("");

        return (
          <div className="start-screen-container">
            <div className="start-welcome"> 
                <h1>It's Quiz time!</h1>
                <h2>Get prepared, start with typing your name</h2>
            </div>

            <div className="start-form-container">
                <form className="start-form" onSubmit={(event) => {
                    event.preventDefault();
                    if (name !== "") {
                        onStart(name);
                    }
                    }}
                >
                    <div className="input-row">
                        <label htmlFor="name-input">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    
                    <button className="start-button" type="submit" disabled={name === ""} >
                        Start quiz!
                    </button>
                </form>
            </div>

            <div className="start-image">
                <img src="/flag.png" alt="Brazil flag" />
            </div>
        </div>
            
        )
}