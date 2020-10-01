import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { HiPencilAlt } from "react-icons/hi";
import ReactTooltip from "react-tooltip";

import { Container } from "./styles";
import Header from "../../components/Header";
import dragonDetail from "../../assets/dragonDetail.png";
import CreateDragon from "../../components/CreateDragon";

import { useApiCallReducer } from "../../helpers/useApiCallReducer.js";

function Detail() {
  const { id } = useParams();
  const [state, dispatch] = useApiCallReducer();
  const [dragonName, setDragonName] = useState("");
  const [dragonType, setDragonType] = useState("");
  const [dragonDate, setDragonDate] = useState("");
  const [editable, setEditable] = useState([false]);

  useEffect(() => {
    fetch(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setDragonName(json.name);
        setDragonType(json.type);

        const numberDate = Date.parse(json.createdAt);
        const formatedDate = format(numberDate, "dd-MM-yyyy");
        setDragonDate(formatedDate);
      });
  }, [id]);

  const updateDragon = () => {
    dispatch({
      type: "UPDATE",
      payload: { id: id, name: dragonName, type: dragonType },
    });
  };

  const deleteDragon = () => {
    dispatch({
      type: "DELETE",
      payload: { id: id },
    });
  };

  return (
    <>
      <Header title={"Detalhes"} buttonBack />
      <Container>
        <form>
          <p>Criado em: {dragonDate}</p>
          <img alt={"Dragon Avatar"} src={dragonDetail} />
          <input
            value={dragonName}
            onChange={(e) => setDragonName(e.target.value)}
            readOnly={editable}
          />
          <input
            value={dragonType}
            onChange={(e) => setDragonType(e.target.value)}
            readOnly={editable}
          />
          <div className={editable ? "hidden" : ""}>
            <button
              aria-label="Atualizar Dragão"
              type="button"
              className="update-icon"
              onClick={() => updateDragon()}
            >
              Atualizar
            </button>
            <button
              aria-label="Excluir Dragão"
              type="button"
              className="delete-icon"
              onClick={() => deleteDragon()}
            >
              Excluir
            </button>
          </div>
        </form>
        <div
          className="edit-content"
          onClick={(e) => (editable ? setEditable(false) : setEditable(true))}
        >
          <HiPencilAlt
            data-tip="Habilitar Edição"
            aria-label="Habilitar Edição"
            className="edit-icon"
            size={60}
            color={editable ? "white" : "red"}
          />
        </div>
      </Container>
      <CreateDragon />
      <ReactTooltip />
    </>
  );
}

export default Detail;
