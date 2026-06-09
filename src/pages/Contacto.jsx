import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useTheme } from "../context/ThemeContext";

function Contacto() {
    const { darkMode } = useTheme();
    const [email, setEmail] = useState("");
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [calle, setCalle] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [errores, setErrores] = useState({});
    const [enviado, setEnviado] = useState(false);
    
    function validarFormulario() {
        const nuevosErrores = {};
        if (nombre.trim() === "") {
            nuevosErrores.nombre = "El nombre es requerido";
        }
        if (email.trim() === "") {
            nuevosErrores.email = "El email es requerido";
        }
        else if (!email.includes("@")) {
            nuevosErrores.email = "El email no es válido";
        }
        if (telefono.trim() === "") {
            nuevosErrores.telefono = "El teléfono es requerido";
        }
        if (calle.trim() === "") {
            nuevosErrores.calle = "La calle es requerida";
        }
        if (localidad.trim() === "") {
            nuevosErrores.localidad = "La localidad es requerida";
        }
        return nuevosErrores;
    }

    function manejarEnvio(e) {
        e.preventDefault();
        const erroresValidacion = validarFormulario();
        if (Object.keys(erroresValidacion).length > 0) {
            setErrores(erroresValidacion);
            return;
        }
        setErrores({});
        setEnviado(true);
        setNombre("");
        setEmail("");
        setTelefono("");
        setCalle("");
        setLocalidad("");
    }
    return (
        <Container  className="mt-5 mb-5">
            <Card className={`mb-4 ${darkMode ? "bg-dark text-white border-dark" : "bg-light text-dark border-light"}`}>
                <Card.Body>
                    <Card.Title>Formulario de Contacto</Card.Title>
                    <Card.Text>
                       Si tiene alguna queja o consulta, no dude en contactarnos completando el siguiente formulario. Nos comprometemos a responder a la brevedad posible. 
                    </Card.Text>
                </Card.Body>
            </Card>
            {enviado && (
                <div className="alert alert-success" role="alert">
                    ¡Formulario enviado con éxito!
                </div>
            )}
            <Form onSubmit={manejarEnvio}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Tu nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        isInvalid={!!errores.nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.nombre}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={!!errores.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Tu teléfono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        isInvalid={!!errores.telefono}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.telefono}
                    </Form.Control.Feedback>
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Calle</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tu dirección (calle)"
                                value={calle}
                                onChange={(e) => setCalle(e.target.value)}
                                isInvalid={!!errores.calle}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errores.calle}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Localidad</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tu localidad"
                                value={localidad}
                                onChange={(e) => setLocalidad(e.target.value)}
                                isInvalid={!!errores.localidad}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errores.localidad}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Tu mensaje"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        </Container>
    );
}
export default Contacto;