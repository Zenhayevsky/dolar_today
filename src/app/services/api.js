
import { useEffect } from "react";
import axios from "axios";


function ApiServices(date) {

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
              }
            })
            .catch(function (error) {
              console.log("Please, choose a date that is the same as today or earlier");
            });
        }
      }, [date]);

};


export default ApiServices;