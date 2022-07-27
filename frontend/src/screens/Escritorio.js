import React, {useState, useEffect, useRef} from 'react'
import { Form } from 'react-bootstrap';
import Socket from '../components/Socket.js';
import { toast } from 'react-toastify';
import { Helmet } from "react-helmet-async";

export default function Escritorio() {

  //trae todos los mensajes de la base de datos
  const [mensajeLista, setMensajesLista] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState('');
  
  const divRef = useRef(null);
  useEffect(() => {
    Socket.emit('todosMensajes')
    Socket.on('todosMensajes', (data) => {
      setMensajesLista(data);
    }
    );
  }
  , [mensajeLista]);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  , [mensajeLista]);

  const submit = (e) => {
    e.preventDefault();
    Socket.emit('mensajesAdmin', {user: user, mensaje: mensaje, userId: userId});
  }

  return (
    <div>
      <Helmet>
        <title>Escritorio</title>
      </Helmet>
      <div>
    <>
    <div className="chatBox rounded p-2">
      {mensajeLista.map((mensaje, index) => (
        <div key={index}>
          <span><b>{mensaje.usuario}: </b></span>
          <span> {mensaje.mensaje} - </span>
          <span>
            {mensaje.usuario != "Admin" ?  <button className='btn btn-secondary btn-sm' onClick={()=> (setUserId(mensaje.idUsuario), setUser(mensaje.usuario))}> responder </button>
            :
              <> <i>Le respondiste a: <b>{mensaje.receptor}</b></i></>
          }
            </span> <br></br>
          <span> <i>{mensaje.fecha}</i></span>
        </div>
      ))}
      <div ref={divRef}></div>
    </div>
     <Form onSubmit={submit}>
      <Form.Label>Respondiendo a <b>{user ? user : "nadie"}</b></Form.Label>
        <Form.Control type="text" placeholder="Escribe tu mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
        <button type="submit" className="mt-1 btn-cart btn-custom">enviar</button> 
        
     </Form></>
  </div></div>
  )
}
