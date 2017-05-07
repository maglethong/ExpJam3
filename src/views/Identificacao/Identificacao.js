import React, {Component} from 'react';
import {Card, CardBlock, CardHeader, Table, Col, Row} from 'reactstrap';
import report from '../../report';

function formatTimestamp(timestamp) {
  let date = new Date(timestamp * 1000);
  return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
}

function formatEnum(value) {
  return value
      .split('_')
      .join(' ')
      .toLowerCase()
      .replace(/\b\w/g, l => l.toUpperCase());
}

const data = report.identificacao;

data.dataRegistro = formatTimestamp(data.dataRegistro);
data.dataFundacao = formatTimestamp(data.dataFundacao);
data.situacaoCnpj.updatedAt = formatTimestamp(data.situacaoCnpj.updatedAt);
data.situacaoCnpj.status = formatEnum(data.situacaoCnpj.status);
data.tipoSociedade = formatEnum(data.tipoSociedade);
data.ramo = formatEnum(data.ramo);
data.opTributaria = formatEnum(data.opTributaria);
data.filiais = data.filiais.join(", ");

class Identificacao extends Component {
  render() {

    return (
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              Identificação / Localização (Atualizado em {data.dataRegistro})
            </CardHeader>
            <CardBlock>
              <Table striped size="sm">
                <tbody>
                <tr>
                  <th style={{textAlign:"right"}}>CNPJ</th>
                  <td>{data.cnpj}</td>
                  <td> </td><td> </td>
                  <th style={{textAlign:"right"}}>Situação do CNPJ em {data.situacaoCnpj.updatedAt}:</th>
                  <td>{data.situacaoCnpj.status}</td>
                </tr>
                <tr>
                  <th style={{textAlign:"right"}}>Razão Social</th>
                  <td>{data.razaoSocial}</td>
                  <td> </td><td> </td><td> </td><td> </td>
                </tr>
                <tr>
                  <th style={{textAlign:"right"}}>Tipo de Sociedade</th>
                  <td>{data.tipoSociedade}</td>
                  <td> </td><td> </td><td> </td><td> </td>
                </tr>
                <tr>
                  <th style={{textAlign:"right"}}>Registro</th>
                  <td>{data.registro}</td>
                  <th style={{textAlign:"right"}}>Data do Registro</th>
                  <td>{data.dataRegistro}</td>
                  <th style={{textAlign:"right"}}>NIRE</th>
                  <td>{data.nire}</td>
                </tr>
                <tr>
                  <th style={{textAlign:"right"}}>Endereço</th>
                  <td>{data.endereco.logradouro}</td>
                  <td> </td><td> </td><td> </td><td> </td>
                </tr>
                <tr>
                  <th style={{textAlign:"right"}}>Cidade</th>
                  <td>{data.endereco.cidade} ({data.endereco.uf})</td>
                  <th style={{textAlign:"right"}}>Bairro</th>
                  <td>{data.endereco.bairro}</td>
                  <th style={{textAlign:"right"}}>CEP</th>
                  <td>{data.endereco.cep}</td>
                </tr>
                <tr>
                  <th style={{textAlign:"right"}}>Telefone</th>
                  <td>{data.telefone}</td>
                  <td> </td><td> </td>
                  <th style={{textAlign:"right"}}>FAX</th>
                  <td>{data.fax}</td>
                </tr>
                <tr>
                  <th style={{textAlign:"right"}}>Home Pate</th>
                  <td><a href={data.web}>{data.web}</a></td>
                  <td> </td><td> </td><td> </td><td> </td>
                </tr>
                <tr>
                  <th style={{textAlign:"right"}}>Fundação</th>
                  <td>{data.dataFundacao}</td>
                  <td> </td><td> </td><td> </td><td> </td>
                </tr>
                <tr>
                  <th style={{textAlign:"right"}}>Filiais</th>
                  <td>{data.filiais}</td>
                  <td> </td><td> </td>
                  <th style={{textAlign:"right"}}>Qtde Filiais</th>
                  <td>{data.quantFiliais}</td>
                </tr>
                <tr>
                  <th style={{textAlign:"right"}}>Ramo</th>
                  <td>{data.ramo}</td>
                  <td> </td><td> </td><td> </td><td> </td>
                </tr>
                <tr>
                  <th style={{textAlign:"right"}}>Cod. Atividade Serasa</th>
                  <td>{data.codSerasa}</td>
                  <td> </td><td> </td>
                  <th style={{textAlign:"right"}}>Qtde Empregados</th>
                  <td>{data.quantEmpregados}</td>
                </tr>
                <tr>
                  <th style={{textAlign:"right"}}>Opção Tributária</th>
                  <td>{data.opTributaria}</td>
                  <th style={{textAlign:"right"}}>Imp. s/ Compras</th>
                  <td>{data.impSemCompras}%</td>
                  <th style={{textAlign:"right"}}>Exp. s/ Vendas</th>
                  <td>{data.expSemCompras}%</td>
                </tr>
                </tbody>
              </Table>
            </CardBlock>
          </Card>
        </div>
    )
  }
}

export default Identificacao;
