import "./Home.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [date, setDate] = useState("");
  const [contacaoVenda, setContacaoVenda] = useState("");
  const [ contacaoCompra, setContacaoCompra ] = useState("");
  
  const ultimaDataConsultada = localStorage.getItem("ultimaData");

  function solicitar_cotacao(chave, date) {
    localStorage.setItem(chave, date);
  }

  useEffect(() => {
    if (ultimaDataConsultada) {
      const arrayData = ultimaDataConsultada.split("-");
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
          if(response){
            const cotacaoNestData = response.data;
            setContacaoVenda(cotacaoNestData.value[0].cotacaoVenda);
            setContacaoCompra(cotacaoNestData.value[0].cotacaoCompra);
          }
        });
    }
  }, [ultimaDataConsultada]);

  return (
    <>
      <div className="App">
        <div class="header">
          <nav class="menu">
            <span> Dolar Price Every Day </span>
          </nav>
        </div>
      </div>

      <header className="App-header">
        <body className="App-header">
          <div>
            <span>Qual data gostaria de consultar a Cotação de hoje?</span>{" "}
            <br />
            <div className="aviso">
              <span>
                {" "}
                Por favor, certifique-se que a data inserida seja a do dia de
                hoje ou dias anteriores
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
            <div className="btn">
              <input
                id="btn-submit"
                onClick={() => solicitar_cotacao("ultimaData", date)}
                name="btn"
                type="submit"
                value="Consultar"
              ></input>
            </div>
          </form>
          <div className="resultados">
            <div className="consulta">
              <span>Data consultada</span>
              <div className="infoData">
                <label>ano-mes-dia</label>
              </div>
              <div>
                <label>{ultimaDataConsultada}</label>
              </div>
            </div>
            <div className="consulta">
              <span>Cotação de Compra</span>
              <div>
                <label>R$ {contacaoCompra}</label>
              </div>
            </div>
            <div className="consulta">
              <span>Cotação de Venda</span>
              <div>
                {" "}
                <label>R$ {contacaoVenda}</label>
              </div>
            </div>
          </div>
        </body>
      </header>
    </>
  );
}

export default App;
