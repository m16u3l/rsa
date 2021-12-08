import React from "react";

import {
  Box,
  Card,
  TextField,
  Container,
  Typography,
  Button,
  Grid,

} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { generarParDeClaves, encriptarRSA, desencriptarRSA } from '../utils/rsa'

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

      image: false,
      mensajeImagenDesenciptadoRSA: "",
      clavePrivadaDesencriptarImagen: "",
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
    let resMensajeEnciptadoRSA = encriptarRSA(this.state.mensajeEnClaro, this.state.clavePublicaEncriptar);
    this.setState({
      mensajeEnciptadoRSA: resMensajeEnciptadoRSA,
    });
  }

  handleClickDesencriptar = () => {
    let resMensajeDesenciptadoRSA = desencriptarRSA(this.state.mensajeEncriptado, this.state.clavePrivadaDesencriptar);
    this.setState({
      mensajeImagenDesenciptadoRSA: this.state.image ? resMensajeDesenciptadoRSA : "",
      mensajeDesenciptadoRSA: this.state.image ? "" : resMensajeDesenciptadoRSA
    });
  }

  handleClickEncriptarImagen = () => {
    let resMensajeDesenciptadoRSA = encriptarRSA(this.state.image, this.state.publica);
    this.setState({
      mensajeDesenciptadoRSA: resMensajeDesenciptadoRSA
    });
  }

  handleTextFieldChange = (itemState) => (event) => {
    this.setState({
      [itemState]: event.target.value,
    });
  }

  handleChangeImage = (event) => {
    let self = this;
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onload = (upload) => {
      self.setState({
        mensajeEnClaro: upload.target.result,
        image: true
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    const imagenParaEncriptar = this.state.mensajeEnClaro !== "" && this.state.image ? (<Box p={2}>
      <Typography pb={2} variant="h5" component="h5" >Imagen para encriptar:</Typography>
      <img width="100%" height="auto" alt='Uploaded' src={this.state.mensajeEnClaro} />
    </Box>) : <div />;
    const imagenDescriptada = this.state.mensajeImagenDesenciptadoRSA !== "" && this.state.image ? (<Box p={2}>
      <Typography pb={2} variant="h5" component="h5" >Imagen desencriptada:</Typography>
      <img width="100%" height="auto" alt='Uploaded' src={this.state.mensajeImagenDesenciptadoRSA} />
    </Box>) : <div />;

    return (
      <Box mr={2} pr={2} justifyContent="center">
        <Container mb={4}>
          <Box mb={2}>
            <Typography textAlign="center" variant="h3" component="h3">
              Algoritmo GP-1
            </Typography>
          </Box>
          <Card>
            <Box m={2}>
              <Button onClick={this.handleClickGenerarClaves} variant="contained">Generar claves</Button>
            </Box>
            <Box m={2}>
              <TextField variant="filled" value={this.state.clavePublica} style={{ width: '100%' }} m={2} label="Clave publica" color="primary" />
            </Box>
            <Box m={2}>
              <TextField variant="filled" value={this.state.clavePrivada} style={{ width: '100%' }} m={2} label="Clave privada" color="primary" />
            </Box>
          </Card>
        </Container>

        <Grid m={4} container>
          <Grid item xs={6}>
            <Box m={2}>
              <Typography variant="h4" component="h4">
                Encriptar
              </Typography>
            </Box>
            <Box m={2}>
              <TextField onChange={this.handleTextFieldChange("mensajeEnClaro")} style={{ width: '100%' }} m={2} label="Mensaje en claro" color="primary" />
            </Box>
            <Box m={2}>
              <TextField onChange={this.handleTextFieldChange("clavePublicaEncriptar")} style={{ width: '100%' }} m={2} label="Clave publica" color="primary" />
            </Box>
            <Box m={2}>
              <Grid container>
                <Grid item xs={6}>
                  <Button onClick={this.handleClickEncriptar} variant="contained">Encriptar</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" component="label" endIcon={<FileUploadIcon />}>
                    Subir Imagen
                    <input onChange={this.handleChangeImage} type="file" hidden />
                  </Button>
                </Grid>
                <Grid mt={2} item xs={12}>
                  <Typography variant="body2" component="p" >Si selecciona subir imagen, la imagen remplaza el mensaje en claro</Typography>
                </Grid>
              </Grid>
            </Box >
            <Box m={2}>
              <TextField variant="filled" value={this.state.mensajeEnciptadoRSA} style={{ width: '100%' }} m={2} label="Mensaje cifrado" color="primary" />
            </Box>
            {imagenParaEncriptar}
          </Grid>
          <Grid item xs={6}>
            <Box m={2}>
              <Typography variant="h4" component="h4">
                Desencriptar
              </Typography>
            </Box>
            <Box m={2}>
              <TextField onChange={this.handleTextFieldChange("mensajeEncriptado")} style={{ width: '100%' }} m={2} label="Mensaje encriptado" color="primary" />
            </Box>
            <Box m={2}>
              <TextField onChange={this.handleTextFieldChange("clavePrivadaDesencriptar")} style={{ width: '100%' }} m={2} label="Clave privada" color="primary" />
            </Box>
            <Box m={2}>
              <Button onClick={this.handleClickDesencriptar} variant="contained">Desencriptar</Button>
            </Box>
            <Box m={2}>
              <Typography variant="body2" component="p" >
                Para desencriptar una imagen, copie el mensaje encriptado
              </Typography>
            </Box>
            <Box m={2}>
              <TextField variant="filled" value={this.state.mensajeDesenciptadoRSA} style={{ width: '100%' }} m={2} label="Mensaje desecriptado" color="primary" />
            </Box>
            {imagenDescriptada}
          </Grid>
        </Grid>
      </Box >
    );
  }
}

export default RSAForm;
