# Política de Privacidade do BOAR

Versão 1.0 · Vigente a partir de 30 de setembro de 2026 · Contato: privacy@boarapp.com

> Esta é uma tradução da [versão em inglês](../../PRIVACY.md). Se as duas forem diferentes, prevalece
> a versão em inglês, exceto quando a lei local exigir o contrário. Para titulares no Brasil, os
> direitos previstos na LGPD e no Código de Defesa do Consumidor se aplicam em qualquer caso.

O BOAR é um aplicativo de pesquisa com IA offline para Android e iOS, e boarapp.com é o seu site. O
BOAR é um projeto de código aberto mantido por [MAINTAINER] ("nós"), que é o responsável pelos dados
pessoais descritos aqui (o "controlador", nos termos do GDPR e da Lei Geral de Proteção de Dados
Pessoais, LGPD, Lei nº 13.709/2018).

Esta política cobre o aplicativo BOAR (a versão padrão e a versão offline) e o site boarapp.com. Ela
foi escrita para atender ao GDPR da União Europeia e do Reino Unido, à LGPD, à CCPA/CPRA da Califórnia
e a leis semelhantes, e vale para todas as pessoas, onde quer que estejam.

## Em resumo

- **Suas perguntas, respostas, conversas e documentos nunca saem do seu celular.** O BOAR responde
  com um modelo que roda no próprio celular. Não há conta, publicidade, nem ferramentas de análise ou
  de relatório de falhas no aplicativo.
- **O aplicativo só usa a internet quando você pede:** para baixar modelos e pacotes, para buscar um
  modelo no Hugging Face e para compartilhar uma avaliação. A versão offline não tem permissão de
  acesso à internet.
- **Compartilhar uma avaliação é opcional.** Você vê tudo o que será enviado antes de confirmar. O que
  se torna público é o modelo e o chip do celular com as suas notas, nunca algo que identifique você.

## 1. O que fica no seu celular

Os dados abaixo são tratados apenas no seu aparelho e nunca são enviados pelo BOAR para nós ou para
qualquer outra pessoa:

- suas perguntas e as respostas do BOAR, as conversas e os seus resumos;
- os documentos que você importa e as coleções criadas a partir deles;
- a base de conhecimento e as buscas feitas nela;
- sua localização: lida do GPS do celular apenas quando você pergunta sobre lugares próximos, usada no
  próprio celular e nunca enviada (o BOAR não usa serviço de localização pela rede nem geocodificador);
- o registro de desempenho do BOAR (modelo, velocidade e memória de cada resposta), que nunca inclui
  suas perguntas ou respostas e só sai do celular se você mesmo o exportar;
- seus ajustes e uma chave de segurança que o BOAR cria no hardware seguro do celular para o
  compartilhamento.

Você pode apagar tudo isso em Ajustes → "Apagar tudo", ou desinstalando o aplicativo.

**O que não conseguimos proteger:** o BOAR ainda não criptografa esses dados além do que o sistema
operacional do celular já faz para todos os aplicativos. No Android, os dados do BOAR ficam fora do
backup na nuvem e da transferência entre aparelhos. No iOS, a pasta de documentos do aplicativo
aparece no app Arquivos e pode entrar no seu backup do iCloud. Quem controla o seu celular consegue
ler o que está nele.

## 2. Quando o aplicativo usa a internet

A versão padrão só se conecta à internet nos casos abaixo, sempre iniciados por você. Nada é enviado
em segundo plano.

### 2.1 Download de modelos, pacotes de conhecimento e lugares

Quando você configura o BOAR ou toca em "Baixar", o celular busca o arquivo no **Hugging Face**
(huggingface.co) ou no **GitHub** (github.com, raw.githubusercontent.com). O BOAR envia apenas o
pedido do arquivo. Como em qualquer site, esses serviços veem o seu endereço IP, o horário e o arquivo
pedido, conforme as suas próprias políticas de privacidade ([Hugging Face](https://huggingface.co/privacy),
[GitHub](https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement)).
Nós não recebemos nada disso.

### 2.2 Busca de modelos no Hugging Face

Se você usar "Buscar no Hugging Face", o BOAR envia as palavras da sua busca para a API pública do
Hugging Face, apenas no momento da busca. Aplica-se a política de privacidade do Hugging Face.

### 2.3 Compartilhamento de uma avaliação (opcional)

A tela "Avaliação" pode rodar o conjunto fixo de perguntas de teste do BOAR e, se você escolher
**"Compartilhar resultados"**, enviar a avaliação para nós, para que qualquer pessoa possa comparar o
desempenho dos modelos em celulares diferentes. Antes de qualquer envio, o aplicativo mostra cada
campo. Recebemos:

- **sobre o celular:** plataforma, versão do sistema e nível de API, marca e modelo, chipset e seu
  fabricante, nome da placa, RAM total, número de núcleos da CPU, recursos da CPU e velocidade dos
  núcleos;
- **sobre a avaliação:** versões do aplicativo e do conjunto de testes e, para cada pergunta de teste,
  o modelo usado, a resposta que o BOAR escreveu para a *nossa* pergunta fixa, as fontes encontradas,
  tempos, memória e se a resposta terminou;
- **uma chave de segurança criada para o BOAR no hardware seguro do celular.** A sua parte pública e,
  no primeiro compartilhamento, o certificado do fabricante do celular comprovam que a avaliação vem de
  um celular real rodando o aplicativo oficial. O certificado também mostra o nível de atualização de
  segurança do celular e se o bootloader está bloqueado. A chave não está ligada a você, às suas contas
  nem ao seu número de telefone;
- **um hash com chave do seu endereço IP** (SHA-256 com um segredo que só o servidor conhece), usado
  apenas para limitar quantas avaliações uma mesma rede pode enviar.

Nunca recebemos suas próprias perguntas, conversas, documentos, nome, contatos ou localização.

**O que é público:** a marca e o modelo do celular, o chipset, a RAM, as informações dos núcleos, as
versões do aplicativo e do teste, e as notas e velocidades de cada modelo. Isso aparece nos resultados
públicos, que qualquer pessoa pode ler. A chave, o hash do IP, as respostas e os detalhes do
certificado nunca são públicos.

**Revisão:** alguns celulares genuínos não conseguem comprovar que a sua chave está em hardware seguro.
As avaliações deles são guardadas, mas ficam ocultas até a equipe do BOAR revisá-las.

### 2.4 Entrada por voz

A entrada por voz fica desligada até você ativá-la. No iPhone e no Android 12 ou mais recente, a fala
é reconhecida no próprio celular. Em alguns celulares Android mais antigos, a voz usa o serviço de fala
do próprio celular, que pode enviar o áudio ao seu fornecedor (geralmente o Google). O BOAR avisa e
pede a sua autorização antes. Aplica-se a política de privacidade desse fornecedor, e nós nunca
recebemos o áudio nem o texto.

### 2.5 Abrir um lugar em um aplicativo de mapas

Se você tocar em "Abrir no mapa" em um lugar, o BOAR entrega as coordenadas desse lugar ao aplicativo
de mapas que você escolher. A partir daí, aplica-se a política de privacidade desse aplicativo.

### 2.6 A versão offline

A versão offline do BOAR não tem permissão de acesso à internet. Nada da seção 2 se aplica a ela:
modelos e pacotes são importados de arquivos, e nada pode ser compartilhado.

## 3. O site (boarapp.com)

- **Hospedagem:** o boarapp.com é hospedado pela Vercel, que registra os acessos (endereço IP, horário,
  página) para manter e proteger o site ([política de privacidade da Vercel](https://vercel.com/legal/privacy-policy)).
- **Análise de uso, apenas com o seu consentimento:** se você aceitar os cookies de análise, o site usa
  o Google Analytics 4 para contar visitas e ver quais páginas são lidas. Ele coleta sua localização
  aproximada, o aparelho, o navegador e as páginas que você visita; o Google Analytics 4 não armazena
  endereços IP. Se você recusar, o Google Analytics não é carregado e não grava cookies. Você pode
  mudar sua escolha a qualquer momento em **Configurações de cookies**, no rodapé de todas as páginas.
  Veja [como o Google usa os dados](https://policies.google.com/technologies/partner-sites).

## 4. Por que tratamos os dados (bases legais)

| O quê | Por quê | Base legal (GDPR / LGPD) |
|---|---|---|
| Uma avaliação compartilhada e os dados do celular | Para publicar resultados comparáveis, porque você pediu | Consentimento (art. 6(1)(a) do GDPR; art. 7º, I, da LGPD) |
| A chave de segurança, o certificado e o hash do IP | Para impedir avaliações falsas, automatizadas ou repetidas | Legítimo interesse em manter os resultados honestos (art. 6(1)(f) do GDPR; art. 7º, IX, da LGPD) |
| Análise de uso do site | Para entender como o site é usado | Consentimento |
| Registros de acesso do site | Para manter e proteger o site | Legítimo interesse |

Você pode revogar o consentimento a qualquer momento. Isso não afeta o que foi feito antes, e, no caso
de uma avaliação compartilhada, revogar significa nos pedir que a apaguemos (seção 7).

Não vendemos seus dados pessoais, não os compartilhamos para publicidade direcionada e não os usamos
para tomar decisões automatizadas sobre você.

## 5. Quem trata os dados

- **Supabase** guarda as avaliações compartilhadas, na Amazon Web Services nos Estados Unidos
  (us-west-2), conforme os termos de tratamento de dados da Supabase.
- **Vercel** hospeda o site. **Google** fornece a análise de uso, apenas com consentimento.
- **Hugging Face** e **GitHub** fornecem os downloads (seção 2.1), como serviços independentes.

Alguns deles ficam nos Estados Unidos. Quando a lei exige, as transferências são amparadas pelas
cláusulas contratuais padrão dos fornecedores ou por garantias equivalentes (art. 46 do GDPR; art. 33
da LGPD).

## 6. Por quanto tempo guardamos

| Dado | Guardado por |
|---|---|
| Códigos de compartilhamento de uso único | Apagados após 1 hora |
| Hash do IP em uma avaliação compartilhada | 7 dias, depois apagado (os limites só consideram as últimas 24 horas) |
| Avaliações compartilhadas, suas respostas, os dados do celular e a chave | Enquanto existirem os resultados públicos, ou até você pedir que sejam apagados |
| Análise de uso do site | 2 meses (o menor prazo do Google Analytics) |

As avaliações não podem ser alteradas depois de guardadas. Só nós podemos apagá-las, e fazemos isso
quando você pede.

## 7. Seus direitos

Onde quer que você esteja, pode nos pedir que:

- informemos o que temos sobre você e lhe entreguemos uma cópia (acesso, portabilidade);
- corrijamos ou apaguemos esses dados (eliminação);
- deixemos de usá-los ou limitemos o seu uso, ou você pode se opor à forma como os usamos;
- consideremos revogado o seu consentimento.

**Como pedir:** envie um e-mail para privacy@boarapp.com. O BOAR não tem contas, então só conseguimos
encontrar seus dados pelo identificador de compartilhamento do celular. O aplicativo o mostra depois de
um compartilhamento e em Ajustes → "Sobre". Inclua-o no seu e-mail. Respondemos em até 30 dias (15 dias
no Brasil; 45 dias pela CCPA), sem nenhum custo.

**Conforme o lugar onde você vive:**

- **União Europeia, EEE e Reino Unido:** você também pode reclamar à sua autoridade de proteção de
  dados.
- **Brasil (LGPD, art. 18):** como titular, você tem os direitos acima e também à confirmação de que
  tratamos seus dados, à anonimização de dados desnecessários, à informação sobre com quem os
  compartilhamos e à revisão do consentimento. Você pode apresentar reclamação à ANPD (Autoridade
  Nacional de Proteção de Dados).
- **Califórnia (CCPA/CPRA) e outros estados dos EUA com leis de privacidade:** você tem o direito de
  saber, apagar, corrigir e de se opor à venda ou ao compartilhamento. Não vendemos nem compartilhamos
  informações pessoais, e não trataremos você de forma diferente por exercer seus direitos.

## 8. Crianças e adolescentes

O BOAR não se destina a menores de 13 anos, ou de 16 anos onde a lei local fixar essa idade para o
consentimento (por exemplo, em partes da União Europeia). Não coletamos dados pessoais deles de forma
consciente. Se você acredita que uma criança compartilhou uma avaliação, fale conosco e a apagaremos.

## 9. Segurança

As avaliações compartilhadas são assinadas com a chave de hardware do celular e enviadas por HTTPS. O
servidor confere cada assinatura e cada código de uso único, e as avaliações guardadas não podem ser
alteradas nem apagadas, exceto por nós. O banco de dados é privado, com exceção das notas públicas.
Nenhum sistema é perfeitamente seguro. Se um incidente puser seus dados em risco, avisaremos as
autoridades e as pessoas afetadas, como a lei exige.

## 10. Alterações

Quando esta política mudar, atualizaremos a versão e a data acima e descreveremos a mudança no
histórico do repositório. Em mudanças relevantes, o aplicativo ou o site avisará você antes que elas
passem a valer.

## 11. Contato

Pedidos e dúvidas sobre privacidade: **privacy@boarapp.com**.
O código-fonte, incluindo cada ponto em que o aplicativo usa a rede, é público em
[github.com/rferrari/boar-app](https://github.com/rferrari/boar-app).
