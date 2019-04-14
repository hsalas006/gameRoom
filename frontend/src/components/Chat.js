
import React from "react";

const Chat = (props) =>{
    return (<div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalCenterTitle">Chat: </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {JSON.stringify(props.msn)}
                </div>
                <div className="modal-footer">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Escribir mensaje" aria-label="Escribir mensaje" aria-describedby="button-addon2"/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Enviar</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>)
}    

export default Chat;
