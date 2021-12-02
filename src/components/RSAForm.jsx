import React from "react";

import { Typography } from '@mui/material';
import { Button } from '@mui/material';

import { Container } from '@mui/material';
import { TextField } from "@mui/material";
import { Box } from "@mui/system";

import { generarParDeClaves, encriptarRSA, desencriptarRSA } from '../controllers/rsa'

class RSAForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clavePublica: "",
      clavePrivada: "",

      mensajeEnClaro: "",
      clavePublicaEncriptar: "",
      clavePrivadaEncriptar: "",
      mensajeEnciptadoRSA: "",

      mensajeEncriptado: "",
      clavePublicaDesencriptar: "",
      clavePrivadaDesencriptar: "",
      mensajeDesenciptadoRSA: "",
    }
  }

  handleClickGenerarClaves = () => {
    let keypairs = generarParDeClaves();
    this.setState(() => ({
      clavePrivada: keypairs.privateKey,
      clavePublica: keypairs.publicKey,
    }));
  }

  handleClickEncriptar = () => {
    console.log(this.state.mensajeEnClaro, this.state.clavePublicaEncriptar, this.state.clavePrivadaEncriptar);
    let resMensajeEnciptadoRSA = encriptarRSA(this.state.mensajeEnClaro, this.state.clavePublicaEncriptar, this.state.clavePrivadaEncriptar);
    this.setState({
      mensajeEnciptadoRSA: resMensajeEnciptadoRSA,
    });
  }

  handleClickDesencriptar = () => {
    console.log(this.state.mensajeEncriptado, this.state.clavePublicaDesencriptar, this.state.clavePrivadaDesencriptar);
    let resMensajeDesenciptadoRSA = desencriptarRSA(this.state.mensajeEncriptado, this.state.clavePublicaDesencriptar, this.state.clavePrivadaDesencriptar);
    this.setState({
      mensajeDesenciptadoRSA: resMensajeDesenciptadoRSA
    });
  }

  handleTextFieldChange = (itemState) => (event) => {
    this.setState({
      [itemState]: event.target.value
    });
  }

  render() {
    return (
      <Box m={3} p={5} justifyContent="center">
        <Container>
          <Typography variant="h3" component="h3">
            Algoritmo RSA
          </Typography>
          <Box m={2}>
            <Button onClick={this.handleClickGenerarClaves} variant="contained">Generar claves</Button>
          </Box>
          <Box m={2}>
            <TextField variant="filled" value={this.state.clavePublica} style={{ width: '70%' }} m={2} label="Clave publica" color="primary" />
          </Box>
          <Box m={2}>
            <TextField variant="filled" value={this.state.clavePrivada} style={{ width: '70%' }} m={2} label="Clave privada" color="primary" />
          </Box>
        </Container>

        <Container>
          <Typography variant="h4" component="h4">
            Encriptar
          </Typography>
          <Box m={2}>
            <TextField onChange={this.handleTextFieldChange("mensajeEnClaro")} style={{ width: '70%' }} m={2} label="Mensaje en claro" color="primary" />
          </Box>
          <Box m={2}>
            <TextField onChange={this.handleTextFieldChange("clavePublicaEncriptar")} style={{ width: '70%' }} m={2} label="Clave publica" color="primary" />
          </Box>
          <Box m={2}>
            <TextField onChange={this.handleTextFieldChange("clavePrivadaEncriptar")} style={{ width: '70%' }} m={2} label="Clave privada" color="primary" />
          </Box>
          <Box m={2}>
            <Button onClick={this.handleClickEncriptar} variant="contained">Encriptar</Button>
          </Box>
          <Box m={2}>
            <TextField variant="filled" value={this.state.mensajeEnciptadoRSA} style={{ width: '70%' }} m={2} label="Mensaje cifrado" color="primary" />
          </Box>
        </Container>

        <Container>
          <Typography variant="h4" component="h4">
            Desencriptar
          </Typography>
          <Box m={2}>
            <TextField onChange={this.handleTextFieldChange("mensajeEncriptado")} style={{ width: '70%' }} m={2} label="Mensaje encriptado" color="primary" />
          </Box>
          <Box m={2}>
            <TextField onChange={this.handleTextFieldChange("clavePublicaDesencriptar")} style={{ width: '70%' }} m={2} label="Clave publica" color="primary" />
          </Box>
          <Box m={2}>
            <TextField onChange={this.handleTextFieldChange("clavePrivadaDesencriptar")} style={{ width: '70%' }} m={2} label="Clave privada" color="primary" />
          </Box>
          <Box m={2}>
            <Button onClick={this.handleClickDesencriptar} variant="contained">Desencriptar</Button>
          </Box>
          <Box m={2}>
            <TextField variant="filled" value={this.state.mensajeDesenciptadoRSA} style={{ width: '70%' }} m={2} label="Mensaje descifrado" color="primary" />
          </Box>
        </Container>
      </Box>
    );
  }
}

export default RSAForm;