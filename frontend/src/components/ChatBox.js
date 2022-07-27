//hagamos un chatbox para que el usuario pueda mandar mensajes a los demas usuarios, solo la parte visual
import React, {useState, useEffect, useRef} from 'react'
import { Form } from 'react-bootstrap';
import Socket from './Socket';
import { toast } from 'react-toastify';

export default function ChatBox() {

  const user = (JSON.parse(localStorage.getItem('userInfo'))) || {name: undefined, id: undefined};
  const [mensaje, setMensaje] = useState('');
  const [mensajeLista, setMensajesLista] = useState([]);

  const handler = (e) => {
    e.preventDefault();
    toast.error('Ingresa con tu usuario para enviar mensajes');
  }

  //emite el conectado al servidor
/*   useEffect(() => {
    Socket.emit('conectado', {user: user.name, userId: user._id});
  }, [user]);
 */
  //emite por data el id del usuario y se le envia sus mensajes con su id

  useEffect(() => {
    Socket.emit('mensajesUser', {user: user._id});
    Socket.on('mensajesUser', (data) => {
      setMensajesLista(data);
    }
    );
    if(localStorage.getItem('userInfo') === null){
      setMensajesLista([]);
    return () => {
      Socket.off();
    };}
  }
  , [mensaje, user]);



  const submit = (e) => {
    e.preventDefault();
    Socket.emit('mensaje', {user: user.name, mensaje: mensaje, userId: user._id});
    setMensaje('');
  }

  return (
    <div>
      <>
      <div className="chatBox">
        {mensajeLista.reverse().map((mensaje, index) => (
          <div key={index}>
            <span><b>{mensaje.usuario}: </b></span>
            <span> {mensaje.mensaje}</span>
            <span> <i>{mensaje.fecha}</i></span>
          </div>
        ))}
      </div>
       <Form onSubmit={submit}>
        <Form.Label>Mensaje</Form.Label>
          <Form.Control type="text" placeholder="Escribe tu mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
          {user.name === undefined ? <button onClick={handler} className="mt-1 btn-cart btn-custom">enviar</button> : <button className="mt-1 btn-cart btn-custom">enviar</button>}
          
       </Form></>
    </div>
  )
}
