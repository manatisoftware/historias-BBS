import React from "react";

export function Contenido({ paragraphs}) {
  return (
    <div>
      <h4>Y la historia dice así...</h4>
        {paragraphs.length ? null : <div>Tu oportunidad de crear una nueva historia, empieza publicando ¡YA!</div>}
        {
          paragraphs.map((paragraph,index) => (
              <div key={index} className="paragraphs">
                <div className="content">{paragraph.content}</div>
                <div className="author">Autor: {paragraph.author}</div> 
              </div>
          ))
        }
      <p></p>
    </div>
  );
}
