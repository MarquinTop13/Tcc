import { useState } from 'react';
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
    <>
      <main className={styles.mainvirus}>
        <section className={styles.Inicio}>
          <div className={styles['text-figma']}>
            <h1>O que é um Vírus</h1>
            <p>
              Um vírus é um software malicioso que se espalha entre sistemas, anexando-se a arquivos ou
              programas para causar danos, roubar dados ou prejudicar o desempenho. Sua propagação ocorre por meios como internet e dispositivos externos, sendo essencial o uso de antivírus e boas práticas de segurança.
            </p>
          </div>
          <div className={styles['text-figmaB']}>
            <h1>Como se prevenir de vírus?</h1>
            <p>Para se prevenir de vírus, é fundamental manter um antivírus atualizado e ativo no computador. Evite clicar em links desconhecidos ou abrir anexos de e-mails suspeitos. Baixe programas e arquivos apenas de sites e fontes confiáveis.
            Mantenha o sistema operacional e todos os softwares sempre atualizados. Use senhas fortes e diferentes para cada conta ou serviço online. Também é importante evitar o uso de pendrives ou dispositivos de origem duvidosa.</p>
          </div>
        </section>
        
        {/* Seção dos cards */}
        <section className={styles['secao-cards']}>
          <div className={styles['container-cards']}>
            {virusData.map((virus, index) => (
              <div key={index} className={styles.card}>
                <h2>{virus.name}</h2>
                <p>{virus.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default VR;