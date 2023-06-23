import React from "react";

export function ContenidoNuevo({ setContent }) {
  return (
    <div>
      <h4>Contenido Nuevo</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const storyID = formData.get("storyID");
          const content = formData.get("content");

          if (storyID && content) {
            setContent(storyID, content);
          }
        }}
      >
        <div className="form-group">
          <label>ID de la historia</label>
          <input
            className="form-control"
            type="number"
            name="storyID"
            placeholder="1"
            required
          />
          <label>Nuevo parrafo de la historia</label>
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="nuevo contenido"
            required
          />
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Publicar" />
        </div>
      </form>
    </div>
  );
}
