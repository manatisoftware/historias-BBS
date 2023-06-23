import React from "react";

export function NoTokensMessage({ selectedAddress }) {
  return (
    <>
      <h4>¡Uuupss!</h4>
      <p>No tienes tokens JJTON que te permiten acceder a continuar el cuento.</p>
      <p>
        Encuentra amigos que los tengan o busca las siguientes etiquetas en Twitter: 
        <br />
        <br />
        <code>#JJTON #ecosistemaJJTON #DameJJTONs</code>
      </p>
    </>
  );
}
