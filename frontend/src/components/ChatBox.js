//hagamos un chatbox para que el usuario pueda mandar mensajes a los demas usuarios, solo la parte visual
import React, {useState, useEffect, useRef} from 'react'
import { Form } from 'react-bootstrap';
import Socket from './Socket';

export default function ChatBox() {

/*   function animalAleatorio() {
    let animal = Math.floor(Math.random() * 4) + 1;
    switch (animal) {
      case 1:
        return 'Perro';
      case 2:
        return 'Gato';
      case 3:
        return 'Caballo';
      case 4:
        return 'Cabra';
      default:
        return 'Humano';
    }
  }
  
function makeid() { let text = ""; let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; for( let i=0; i < 5; i++ ) text += possible.charAt(Math.floor(Math.random() * possible.length)); return text; }
  */

  const user = JSON.parse(localStorage.getItem('userInfo'));
  const userName = user.name || 'Anonimo';
  const [mensaje, setMensaje] = useState('');
  const [mensajeLista, setMensajesLista] = useState([]);

  useEffect(() => {
    Socket.emit('conectado', {user: userName, userId: user._id});
    
  }, [user]);

  useEffect(() => {
    Socket.on('mensaje', (data) => {
      setMensajesLista([...mensajeLista, data]);
    }
    , [mensajeLista]);
  }
  , [mensajeLista]);


  const submit = (e) => {
    e.preventDefault();
    Socket.emit('mensaje', {user: userName, mensaje: mensaje, userId: user._id});
  }

  return (
    <div>
       <Form onSubmit={submit}>
        <Form.Label>Mensaje</Form.Label>
          <Form.Control type="text" placeholder="Escribe tu mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
          <button className="mt-1 btn-cart btn-custom">enviar</button>
       </Form>
    </div>
  )
}
