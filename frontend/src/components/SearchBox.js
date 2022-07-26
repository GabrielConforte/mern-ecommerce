import React from "react";
import { Form } from "react-bootstrap";
//importa useNavigate from react-router-dom
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
    const navigate = useNavigate();

    const [search, setSearch] = React.useState("");

    const submit = (e) => {
        e.preventDefault();
        navigate(search ? `/search/${search}` : "/search");
    }


    return (
        <Form className="d-flex me-auto m-2" onSubmit={submit} type="text" placeholder="Buscar">
            <Form.Control type="text"
                name='q'
                id="q"
                onChange={(e) => setSearch(e.target.value)}>
                </Form.Control>
                <button type="submit" className="btn-custom btn-chat ms-2"><i className="fas fa-search"></i></button>
        </Form>
     
    );
    }