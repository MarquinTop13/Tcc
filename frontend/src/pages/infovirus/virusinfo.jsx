import { useState } from 'react';
import Cabecalho2 from "../../components/HeaderPages";
import './virusinfo.scss';

function VR() {

  const virusData = [
    {
      name: 'Ransomware',
      description: 'Criptografa arquivos inteiros no seu computador ou na rede de uma empresa, tornando-os inacessíveis.'
    },
    {
      name: 'Fileless Malware',
      description: 'Não usa arquivos executáveis tradicionais (.exe). Em vez disso, reside e opera diretamente na memória RAM do computador ou usa ferramentas legítimas e recursos do sistema operacional (como PowerShell, WMI, ou o próprio Registro do Windows) para executar atividades maliciosas.'
    },
    {
      name: 'Infostealers',
      description: 'Projetados para roubar informações sensíveis, como senhas salvas, cookies, dados de cartão de crédito, e informações de carteiras de criptomoedas.'
    },
    {
      name: 'Coinminers',
      description: 'Malware que explora recursos de mineração de criptomoedas. Instala softwares que utilizam o poder de processamento (CPU e GPU) do seu dispositivo sem seu consentimento para minerar criptomoedas (como Monero) para o atacante.'
    },
    {
      name: 'Worms',
      description: 'Diferente de um vírus que precisa de um arquivo hospedeiro, o Worm é independente e se auto-replica, explorando vulnerabilidades de segurança de rede (como falhas em programas de e-mail ou sistemas operacionais) para se espalhar para outras máquinas sem a intervenção do usuário.'
    },
    {
      name: 'Malvertising',
      description: 'Injeta código malicioso em redes de publicidade online legítimas. O malware é entregue por meio de um anúncio, muitas vezes sem que o usuário precise clicar nele.'
    },
    {
      name: 'Scareware',
      description: 'Esse vírus faz o seguinte: ele coloca pop-ups falsos e anúncios também, tentando dessa forma alarmar a vítima, por exemplo ele manda mensagens no seu dispositivo como um antivírus falso, assim caso a vítima desse ataque clique no arquivo malicioso é hackeada. De tantos vírus existentes esse de longe é um dos mais comuns.'
    }
  ];

  return (
      <main className={`MainVirus`}>
        <Cabecalho2 />
        {/* Seção dos cards */}
        <section className={`secao-cards`}>
          <div className={`container-cards`}>
            {virusData.map((virus, index) => (
              <div key={index} className={`card`}>
                <h2>{virus.name}</h2>
                <p>{virus.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
  );
}

export default VR;