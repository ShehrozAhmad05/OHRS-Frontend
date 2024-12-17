import React,{useState} from 'react'
import BeatLoader from "react-spinners/BeatLoader";

function Loader() {
    let [loading, setLoading] = useState(true);
    return (
        <div style={{marginTop:'150px'}}>
            <div className="sweet-loading text-center">

                <BeatLoader
                    color='#000'
                    loading={loading}
                    cssOverride= ''
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    )
}

export default Loader