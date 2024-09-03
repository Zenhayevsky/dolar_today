import "./Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Modal from "react-modal";

function App() {
  const [date, setDate] = useState("");
  const [contacaoVenda, setContacaoVenda] = useState("");
  const [contacaoCompra, setContacaoCompra] = useState("");

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "20px",
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (date) {
      const arrayData = date.split("-");
      const dataFormatada =
        arrayData[1] + "-" + arrayData[2] + "-" + arrayData[0];
      axios
        .get(
          `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?%40dataCotacao='${dataFormatada}'&%24format=json`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET",
            },
          }
        )
        .then((response) => {
          if (response) {
            const cotacaoNestData = response.data;
            setContacaoVenda(cotacaoNestData.value[0].cotacaoVenda);
            setContacaoCompra(cotacaoNestData.value[0].cotacaoCompra);
          }
        })
        .catch(function (error) {
          console.log("Please, choose a date that is the same as today or earlier");
        });
    }
  }, [date]);

  return (
    <div id="page">
      <div className="App">
        <div class="header">
          <nav class="menu">
            <span> Dolar Price Every Day </span>
          </nav>
        </div>
      </div>

      <body className="App-body">
        <div>
          <span className="title">Which date would you like to consult?</span>{" "}
          <br />
          <div className="aviso">
            <span>
              {" "}
              Please make sure the date entered is today or the previous day
            </span>
          </div>
        </div>
        <form>
          <div className="dataCotacao">
            <input
              id="date"
              type="date"
              name="data-inserida"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </form>
        <div className="restults">
          <div className="consulta">
            <span>Chosen date</span>
            <div className="infoData">
              <label>year-month-day</label>
            </div>
            <div>
              <label>{date}</label>
            </div>
          </div>
          <div className="consulta">
            <span>Purchase Quotation</span>
            <div>
              <label>R$ {contacaoCompra}</label>
            </div>
          </div>
          <div className="consulta">
            <span>Sales Quotation</span>
            <div>
              <label>R$ {contacaoVenda}</label>
            </div>
          </div>
        </div>
        <div className="aviso">
          <span>Price of 1 US dollar in Brazilian reais</span>
        </div>
      </body>

      <div className="footer">
        <div class="footerStruct">
          <hr />
          <nav class="copyright">
            <span>
              {" "}
              © 2024 Zenitha serviços de informática LTDA. All rights reserved.{" "}
            </span>
          </nav>
        </div>
      </div>
      <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Wrong date Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}> Invalid date </h2>
          <div>Please choose the date today or before it.</div>
          <button className="CloseModal" onClick={closeModal}>
            OK
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default App;
