import '../css/componentes.css';

export const saludar = (nombre) => {

    const title = document.createElement('h1');
    title.innerHTML = `Hola: ${nombre}`
    document.body.append(title);

}