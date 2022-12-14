import React from 'react'

function Alert(props) {

    const capitalize=(word)=>{
        if(word==="danger"){
            word="error"
        }
        const lower=word.toLowerCase();
        return lower.charAt(0).ToUppercase()+lower.slice(1);
    }
    return (
        
        props.alert && <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>{props.alert.type}</strong>:{props.alert.msg}
        </div>
        
        
    )
}

export default Alert
