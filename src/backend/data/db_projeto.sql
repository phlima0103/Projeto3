BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "favorito" (
	"data"	TEXT NOT NULL,
	"id_usuario"	INTEGER NOT NULL,
	"id_tabela"	INTEGER NOT NULL,
	PRIMARY KEY("id_usuario","id_tabela","data"),
	FOREIGN KEY("id_usuario") REFERENCES "usuario"("id_usuario"),
	FOREIGN KEY("id_tabela") REFERENCES "tabela"("id")
);
CREATE TABLE IF NOT EXISTS "tabela" (
	"id"	INTEGER NOT NULL,
	"id_bd"	char(255) NOT NULL,
	"nome"	char(200) NOT NULL,
	"categoria"	char(150) NOT NULL,
	"descricao"	char(200) NOT NULL,
	"criticidade"	boolean NOT NULL,
	"dado_sensivel"	boolean NOT NULL,
	"verificacao_governanca"	boolean NOT NULL,
	"defasagem"	char(255) NOT NULL,
	"database"	char(255) NOT NULL,
	"caminho"	char(255) NOT NULL,
	"script_alimentacao"	char(255) NOT NULL,
	"eng_ingestao"	char(255) NOT NULL,
	"owner"	char(255) NOT NULL,
	"steward"	char(255) NOT NULL,
	"ajuste_nomenclatura"	char(255) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "campo" (
	"id_tabela"	INTEGER NOT NULL,
	"nome"	char(255) NOT NULL,
	"descricao"	char(255) NOT NULL,
	"tipo"	char(255) NOT NULL,
	PRIMARY KEY("id_tabela"),
	FOREIGN KEY("id_tabela") REFERENCES "tabela"("id")
);
CREATE TABLE IF NOT EXISTS "feedback" (
	"id_tabela"	INTEGER NOT NULL,
	"avaliacao"	char(255),
	"comentario"	char(255),
	PRIMARY KEY("id_tabela")
);
CREATE TABLE IF NOT EXISTS "pasta" (
	"id_pasta"	INTEGER NOT NULL,
	"nome"	char(255) NOT NULL,
	"id_usuario"	char(255) NOT NULL,
	PRIMARY KEY("id_pasta" AUTOINCREMENT),
	FOREIGN KEY("id_usuario") REFERENCES "usuario"("id_usuario")
);
CREATE TABLE IF NOT EXISTS "tabela_pasta" (
	"id_tabela"	INTEGER NOT NULL,
	"id_pasta"	INTEGER NOT NULL,
	PRIMARY KEY("id_tabela","id_pasta"),
	FOREIGN KEY("id_pasta") REFERENCES "pasta"("id_pasta"),
	FOREIGN KEY("id_tabela") REFERENCES "tabela"("id")
);
CREATE TABLE IF NOT EXISTS "solicitacoes" (
	"id_solicitacao"	INTEGER NOT NULL,
	"id_usuario"	NUMERIC NOT NULL,
	"data"	DATETIME NOT NULL,
	"sql_code"	INTEGER NOT NULL,
	PRIMARY KEY("id_solicitacao" AUTOINCREMENT),
	FOREIGN KEY("id_usuario") REFERENCES "usuario"("id_usuario")
);
CREATE TABLE IF NOT EXISTS "usuario" (
	"id_usuario"	INTEGER NOT NULL UNIQUE,
	"nome"	TEXT NOT NULL,
	PRIMARY KEY("id_usuario" AUTOINCREMENT)
);
INSERT INTO "favorito" ("data","id_usuario","id_tabela") VALUES ('30/05/2023',1,10),
 ('30/05/2023',1,20),
 ('30/05/2023',1,43);
INSERT INTO "tabela" ("id","id_bd","nome","categoria","descricao","criticidade","dado_sensivel","verificacao_governanca","defasagem","database","caminho","script_alimentacao","eng_ingestao","owner","steward","ajuste_nomenclatura") VALUES (1,'DB_PAN_DL_CURATED.CLOUDTRAIL_AWSLOGS_TEMP','CLOUDTRAIL_AWSLOGS_TEMP','engenharia-de-dados','Tabela contém log de eventos do ambiente do Data Lake.','N','N','S','D-1','DB_PAN_DL_CURATED','s3://pansegs3bucketcloudtrailprod/awslogs/135628704092/cloudtrail/us-east-1/2022/05/06/','-','-','Samir Migliani','Rafael Cordeiro de Araujo','S'),
 (2,'DB_PAN_DL_CURATED.CLOUDTRAIL_AWSLOGS_TEMP2','CLOUDTRAIL_AWSLOGS_TEMP2','engenharia-de-dados','Tabela contém log de eventos do ambiente do Data Lake.','N','N','N','D-1','DB_PAN_DL_CURATED','s3://pansegs3bucketcloudtrailprod/awslogs/135628704092/cloudtrail/us-east-1/2022/05/06/','-','-','Samir Migliani','Rafael Cordeiro de Araujo','S'),
 (3,'DB_PAN_DL_SPEC.DB_PAN_DL_SPEC.VW_BANCO_DIGITAL_ONBOARDING_ONBOARDING_CADASTRO','DB_PAN_DL_SPEC.VW_BANCO_DIGITAL_ONBOARDING_ONBOARDING_CADASTRO','banco-digital','Tabela armazena as informação de cadastro dos clientesno onboarding do cliente de banco digital.','N','N','S','D-1','DB_PAN_DL_SPEC','-','-','-','Marcio Sidnei Savio','Gabriel Lopes Cardoso','S'),
 (4,'DB_PAN_DL_SPEC.TABELA_FLAG_MOR_VALIDO','TABELA_FLAG_MOR_VALIDO','credito','Tabela do crivo com dados de mor válido, com a flag de sim ou não e a identificação da operação de crivo.','N','N','N','D-1','DB_PAN_DL_SPEC','s3://pan-dl-prd-spec/politica/concessao/cartao/credito/tabela_flag_mor_valido/','-','-','Gabriel Trabuco Coutinho','Denise Messias Lopes','S'),
 (5,'DB_PAN_DL_RAW.TB_BANCO_DIGITAL_AB_COBRANCA_TITULOS','TB_BANCO_DIGITAL_AB_COBRANCA_TITULOS','banco-digital','Tabela contém títulos de cobrança','S','S','N','H-1','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/banco-digital/ab-cobranca/titulos','-','marco.mafra@grupopan.com','Marcio Sidnei Savio','Gabriel Lopes Cardoso','N'),
 (6,'DB_PAN_DL_RAW.TB_BANCO_DIGITAL_CRIVO45_DMS_CAMPO','TB_BANCO_DIGITAL_CRIVO45_DMS_CAMPO','credito','Tabela contém normalização dos campos utilizados em operações.','S','S','S','H-1','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/banco-digital/crivo45/campo/','cw_s3_raw_crivo45dig_dms','klaus.cabral@grupopan.com','Gabriel Trabuco Coutinho','Denise Messias Lopes','N'),
 (7,'DB_PAN_DL_RAW.TB_ADQUIRENCIA_ADIQ_BRAND_ECOMM','TB_ADQUIRENCIA_ADIQ_BRAND_ECOMM','adquirencia','Tabela de/para com todas as bandeiras de cartões aceitas para pagamentos do mundo digital.','N','N','S','D-1','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/adquirencia/adiq/brand-ecomm/','cw_s3_raw_adiq','gustavo.visachi@grupopan.com','Denis Fernando Freitas','Rodrigo Honorio de Lima','N'),
 (8,'DB_PAN_DL_RAW.TB_ADQUIRENCIA_ADIQ_BRAND_LIST','TB_ADQUIRENCIA_ADIQ_BRAND_LIST','adquirencia','Tabela de/para com todas as bandeiras de cartões aceitas para pagamentos na maquininha de cartão adquirida pelo cliente.','N','N','S','D-1','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/adquirencia/adiq/brand-list/','cw_s3_raw_adiq','lucas.rsantos@grupopan.com','Denis Fernando Freitas','Rodrigo Honorio de Lima','N'),
 (9,'DB_PAN_DL_RAW.TB_ATENDIMENTO_ALMAVIVA_ECH','TB_ATENDIMENTO_ALMAVIVA_ECH','atendimento','Tabela contém os dados referente a ligação que foi feita com o cliente. Detalhando os dados de operação, tempo médio de atendimento, tempo médio operacional, transferência, etc. O arquivos é referente ao produto: Cartões.','N','N','N','D-1','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/atendimento/almaviva/ech/','cw_s3_raw_almaviva','paulo.costa@grupopan.com','Katsuyuki Vittor Nakai','Evandro Pedron','N'),
 (10,'DB_PAN_DL_CURATED.TB_ATENDIMENTO_ATENTO_ECH','TB_ATENDIMENTO_ATENTO_ECH','atendimento','Tabela contém os dados da ligação que foi feita com o cliente, temos todos os dados de operação, tempo médio de atendimento, tempo médio operacional, transferência, etc. Os arquivos são referente aos produtos: Financeira, Cartões e Digital. Tabela criada para camada de consumo com dados deduplicados (considera última partição)','N','N','N','D-1','DB_PAN_DL_CURATED','s3://pan-dl-prd-curated/atendimento/atento/ech/','cw_s3_curated_atendimento_ech','paulo.costa@grupopan.com','Katsuyuki Vittor Nakai','Evandro Pedron','N'),
 (11,'DB_PAN_DL_RAW.TB_BACEN_SCR_3040','TB_BACEN_SCR_3040','bureaux','Tabela contém dados de endividamento de clientes no mercado, resultado da consulta realizada sob demanda ao Sistema de Informações de Créditos do Banco Central (SCR), com base na autorização dos clientes. Traz informações detalhadas sobres os status de vencimento (até 3 dias, de 3 a 45, etc)','N','N','N','M-2','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/bureaux/bacen/scr-3040/','cw_s3_bacen_scr_raw','matheus.nascimento@grupopan.com','Samir Migliani','Rafael Cordeiro de Araujo','N'),
 (12,'DB_PAN_DL_RAW.TB_BACEN_SCR_3040_API','TB_BACEN_SCR_3040_API','bureaux','Tabela armazena dados de endividamento de clientes no mercado, resultado da consulta realizada sob demanda ao Sistema de Informações de Créditos do Banco Central (SCR), com base na autorização dos clientes. Traz informações extras e detalhadas sobres os status de vencimento (até 3 dias, de 3 a 45, etc) que possuem fonte no processo batch','N','N','N','M-2','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/bureaux/bacen/scr-3040-api/api/','cw_s3_raw_bureaux_bacen_scr_api','andre.lsilva@grupopan.com','Samir Migliani','Rafael Cordeiro de Araujo','N'),
 (13,'DB_PAN_DL_VAR.TB_BOOK_CADASTRO_CPF','TB_BOOK_CADASTRO_CPF','cadastro','Tabela contém o book de variáveis do assunto cadastro no grão de CPF com dados cadastrais e contato. Inicialmente os dados originam das bases da Serasa e está em nível Brasil, ou seja, não somente clientes do Banco PAN.','N','S','S','D-1','DB_PAN_DL_VAR','s3://pan-dl-prd-var/book/cadastro_cpf','-','klaus.cabral@grupopan.com','Felipe Henrique Rubim','-','N'),
 (14,'DB_PAN_DL_RAW.TB_CADASTRO_POSITIVO_JDPOS_CADASTRO_CIP_EMAIL','TB_CADASTRO_POSITIVO_JDPOS_CADASTRO_CIP_EMAIL','cadastro-positivo','Tabela lista os e-mail cadastrais (de pessoas físicas e jurídicas), enviados para o mercado (Bureaux: SPC, Serasa, Transunion, BVS e QUOD) no cadastro positivo.','N','S','S','D-1','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/cadastro-positivo/jdpos/cadastro_cip_email','-','humberto.santos@grupopan.com','Rafael Cordeiro de Araujo','Jaqueline Andrade Batalha','N'),
 (15,'DB_PAN_DL_RAW.TB_CADASTRO_POSITIVO_JDPOS_CADASTRO_CIP_ENDERECO','TB_CADASTRO_POSITIVO_JDPOS_CADASTRO_CIP_ENDERECO','cadastro-positivo','Tabela lista os endereços cadastrais (de pessoas físicas e jurídicas), enviados para o mercado (Bureaux: SPC, Serasa, Transunion, BVS e QUOD) no cadastro positivo.','N','S','S','D-1','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/cadastro-positivo/jdpos/cadastro_cip_endereco','-','humberto.santos@grupopan.com','Rafael Cordeiro de Araujo','Jaqueline Andrade Batalha','N'),
 (16,'DB_PAN_DL_RAW.TB_ATENDIMENTO_SENSIVEL_RCP_TABELA_FINSDESEMANA','TB_ATENDIMENTO_SENSIVEL_RCP_TABELA_FINSDESEMANA','cartoes','Tabela de atendimento com dados dos atendimentos recebidos nos fins de semana','N','S','S','D-1','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/atendimento-sensivel/rcp/tabela_finsdesemana/','-','gabriel.sgoncalves@grupopan.com','Juliana Aparecida Lazzarini','Renata Tamagusuku Sanzoni','N'),
 (17,'DB_PAN_DL_LEGACY.TB_BI_ODS_RL_CRT_ACORDO','TB_BI_ODS_RL_CRT_ACORDO','cartoes','Tabela de Cartões que contém a descrição e status de acordos  com clientes, informando código do cliente, nº da negociação, motivo de cancelamento do acordo, parcelas, taxas adm.','N','S','N','D-1','DB_PAN_DL_LEGACY','s3://pan-dl-prd-legacy/bi-ods/rl-crt-acordo/','cw_legacy_bi_ods','gabriel.sgoncalves@grupopan.com','Juliana Aparecida Lazzarini','Renata Tamagusuku Sanzoni','N'),
 (18,'DB_PAN_DL_LEGACY.TB_BI_ODS_RL_CGO_CONVENIO_GRUPO','TB_BI_ODS_RL_CGO_CONVENIO_GRUPO','consignado','Tabela de DE/PARA que demonstra os convênios (órgãos/empresas) detentoras da folha de pagamento dos beneficiários do consignado. Exibe status dos convênios e seus respectivos Ids.','N','S','S','D-1','DB_PAN_DL_LEGACY','s3://pan-dl-prd-legacy/bi-ods/rl-cgo-convenio-grupo/','cw_legacy_bi_ods','gustavo.visachi@grupopan.com','Daniel Reis de Almeida Prado','Pedro Luiz Oliveira','N'),
 (19,'DB_PAN_DL_LEGACY.TB_BI_ODS_RL_CGO_CTRO','TB_BI_ODS_RL_CGO_CTRO','consignado','Tabela detalha todos os contratos existentes para o produto consignado, trazendo informações tais como: valor do contrato, cpf do cliente, valor de juros, quantidade de parcelas, tipos de produto envolvidos na negociação, status da operação, etc.','N','N','N','D-1','DB_PAN_DL_LEGACY','s3://pan-dl-prd-legacy/bi-ods/rl-cgo-ctro/','cw_legacy_bi_ods','gustavo.visachi@grupopan.com','Daniel Reis de Almeida Prado','Pedro Luiz Oliveira','N'),
 (20,'DB_PAN_DL_RAW.TB_CONTABIL_SCRPAN_3040_CLIENTE','TB_CONTABIL_SCRPAN_3040_CLIENTE','contabil','Tabela contém dados das operações do clientes enviados ao BACEN via arquivo DOC34.xml','N','N','N','D-30','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/contabil/bacen/3040/cliente/','-','douglas.encinas@grupopan.com','Marcos Roberto Alves dos Santos','Gilberto de Oliveira Souza','N'),
 (21,'DB_PAN_DL_RAW.TB_CONTABIL_SCRPAN_3040_GARANTIA','TB_CONTABIL_SCRPAN_3040_GARANTIA','contabil','Tabela contém dados de garantia das Operações do clientes enviados ao BACEN via arquivo DOC34.xml','N','N','N','D-30','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/contabil/bacen/3040/garantia/','-','douglas.encinas@grupopan.com','Marcos Roberto Alves dos Santos','Gilberto de Oliveira Souza','N'),
 (22,'DB_PAN_DL_RAW.TB_CRM_ABRTELECOM_NAO_PERTURBE_BLOQUEIO','TB_CRM_ABRTELECOM_NAO_PERTURBE_BLOQUEIO','crm','Tabela contendo todos os telefones das pessoas (clientes ou não) cadastradas no Portal da ABNT (Não Me Pertube) que não desejam contato com empresas de Telecom (Vivo, Claro, Tim e etc.) e bancos.','N','N','N','ONLINE','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/crm/abrtelecom/entrada/raw/crm/crm-retorno-nao-perturbe/bloqueio/','cw_s3_raw_crm_nao_perturbe','andre.lsilva@grupopan.com','Marcelo Cordeiro Araujo','Diogo Teixeira Pires','N'),
 (23,'DB_PAN_DL_RAW.TB_CRM_ABRTELECOM_NAO_PERTURBE_BLOQUEIO2','TB_CRM_ABRTELECOM_NAO_PERTURBE_BLOQUEIO2','crm','Tabela contendo todos os telefones das pessoas (clientes ou não) cadastradas no Portal da ABNT (Não Me Pertube) que não desejam contato com empresas de Telecom (Vivo, Claro, Tim e etc.) e bancos. Tabela na visão com CPF.','N','N','N','ONLINE','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/crm/abrtelecom/entrada/raw/crm/crm-retorno-nao-perturbe/bloqueio2/','cw_s3_raw_crm_nao_perturbe','andre.lsilva@grupopan.com','Marcelo Cordeiro Araujo','Diogo Teixeira Pires','N'),
 (24,'DB_PAN_DL_LEGACY.TB_BI_ODS_RL_CPE_RENEGOCIACOES','TB_BI_ODS_RL_CPE_RENEGOCIACOES','emprestimo-pessoal','Tabela armazena informações detalhadas das renegociações de operações de Crédito Pessoal.','N','N','N','D-1','DB_PAN_DL_LEGACY','s3://pan-dl-prd-legacy/bi-ods/rl-cpe-renegociacoes/','cw_legacy_bi_ods','marco.mafra@grupopan.com','Tiago Scrivano','Gabriel Lopes Cardoso','N'),
 (25,'DB_PAN_DL_RAW.TB_EMPRESTIMO_PESSOAL_ACESSOPANCP_TUSU','TB_EMPRESTIMO_PESSOAL_ACESSOPANCP_TUSU','emprestimo-pessoal','Tabela de Usuários','N','N','N','D-1','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/emprestimo_pessoal/acessopancp/tusu/','-','gustavo.visachi@grupopan.com','Tiago Scrivano','Gabriel Lopes Cardoso','N'),
 (27,'DB_PAN_DL_LEGACY.TB_BI_ODS_RL_FMR_ANALISES','TB_BI_ODS_RL_FMR_ANALISES','formalizacao','Tabela que contém os dados de rastreio da análise realizada na mesa, trazendo a data de inicio e fim, usuário e código do usuário, o status da análise, podendo resultar em Aprovada, Recusada, Pedenciada ou ainda Abandonada, também contêm em qual fila a proposta foi','N','N','N','D-1','DB_PAN_DL_LEGACY','s3://pan-dl-prd-legacy/bi-ods/rl-fmr-analises/','cw_legacy_bi_ods','paulo.rocha@grupopan.com','Andre Celidonio Mansur Haddad','Jessica Frontaroli','N'),
 (28,'DB_PAN_DL_LEGACY.TB_BI_ODS_RL_FMR_ANALISESINTEGRACOES','TB_BI_ODS_RL_FMR_ANALISESINTEGRACOES','formalizacao','Tabela contém registro de controle de integração entre o sistema PAD(onde é realizada a análise destes contratos) e Formalizador digital(sistema em que as pessoas estão formalizando seus contratos dos produtos).','N','N','N','D-1','DB_PAN_DL_LEGACY','s3://pan-dl-prd-legacy/bi-ods/rl-fmr-analisesintegracoes/','cw_legacy_bi_ods','paulo.rocha@grupopan.com','Andre Celidonio Mansur Haddad','Jessica Frontaroli','N'),
 (29,'DB_PAN_DL_RAW.TB_FRAUDE_FINGERPRINT','TB_FRAUDE_FINGERPRINT','fraudes','Tabela que comtempla informações relativa aos acessos de visitas aos sites do Pan (Device ID) disponibilidas pelo fornecedor Fingerprint.','N','N','N','D-1','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/fraudes/fingerprint/','-','andre.lsilva@grupopan.com','Roberto Giuliani','Fabiana Pasquali Dantas da Silva','S'),
 (30,'DB_PAN_DL_RAW.TB_FRAUDES_FALCON_CCM_QUEUE_SKIP_CASE','TB_FRAUDES_FALCON_CCM_QUEUE_SKIP_CASE','fraudes','Tabela que armazenam dados de fraudes de cases de SKIP, do PAN PRD, com dados de criação, e dados das últimas atualizações','N','N','N','D-1','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/fraudes/falcon/ccm-queue-skip-case/','-','-','Roberto Giuliani','Fabiana Pasquali Dantas da Silva','N'),
 (31,'DB_PAN_DL_RAW.TB_GOVERNANCA_JIRA','TB_GOVERNANCA_JIRA','governanca-ti','Tabela consolida os dados do Jira, todos os chamados (change, problem e incident) e todo o conteúdo de ITBM.','S','S','S','M-3','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/governanca/jira/','-','andre.lsilva@grupopan.com','Adriana Akemi Kira','Edson Fernandes Marques Silva','S'),
 (32,'DB_PAN_DL_RAW.TB_GTI_CONECTAPAN_INCIDENT','TB_GTI_CONECTAPAN_INCIDENT','governanca-ti','Tabela do Conecta Pan com conteúdo dos Incidentes ocorrido no Conecta PAN','N','N','S','D-2','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/governanca/conectapan/incident/','cw_s3_raw_api_cconectapan','rodrigo.schneider.ext@panonline.com.br','Adriana Akemi Kira','Edson Fernandes Marques Silva','S'),
 (33,'DB_PAN_DL_LEGACY.TB_INTERFACES_CLI_RCZ_HIST','TB_INTERFACES_CLI_RCZ_HIST','informacoes-estrategicas','Tabela consolida clientes do Banco (conta corrente não encerrada e saldo devedor + limite disponível > )','N','N','S','D-30','DB_PAN_DL_LEGACY','s3://pan-dl-prd-legacy/interfaces/cli-rcz-hist/','-','-','Rodolfo Cerezer','Leonidio Amorim Fonseca','N'),
 (34,'DB_PAN_DL_LEGACY.TB_INTERFACES_CLI_RCZ_HIST_PROD','TB_INTERFACES_CLI_RCZ_HIST_PROD','informacoes-estrategicas','Tabela consolida clientes Geridos do Banco nos seus respectivos produtos (apenas os clientes que atendem o cir)','N','N','S','D-30','DB_PAN_DL_LEGACY','s3://pan-dl-prd-legacy/interfaces/cli-rcz-hist-prod/','-','-','Rodolfo Cerezer','Leonidio Amorim Fonseca','N'),
 (35,'DB_PAN_DL_RAW.TB_INVESTIMENTOS_B3_COMMODITIES_OPENPOSITION','TB_INVESTIMENTOS_B3_COMMODITIES_OPENPOSITION','investimentos','Tabela armazena posição aberta de commodities','N','N','N','D-30','DB_PAN_DL_LEGACY','s3://pan-dl-prd-raw/investimentos/b3/commodities_openposition/','-','klaus.cabral@grupopan.com','Marcio Sidnei Savio','-','N'),
 (36,'DB_PAN_DL_RAW.TB_INVESTIMENTOS_B3_COMMODITIES_OPTIONINSTRUMENT','TB_INVESTIMENTOS_B3_COMMODITIES_OPTIONINSTRUMENT','investimentos','Tabela armazena o instrumento de opção de commodities','N','N','S','D-30','DB_PAN_DL_LEGACY','s3://pan-dl-prd-raw/investimentos/b3/commodities_optioninstrument/','-','klaus.cabral@grupopan.com','Marcio Sidnei Savio','-','N'),
 (37,'DB_PAN_DL_RAW.TB_JURIDICO_PANJUD_ADVOGADO','TB_JURIDICO_PANJUD_ADVOGADO','juridico','Tabeça de Jurídico com dadados dos Advogados das Partes, com informações do Nome dos ADV, nº e UF da OAB','N','N','S','D-1','DB_PAN_DL_LEGACY','s3://pan-dl-prd-raw/juridico/panjud/advogado/','-','gustavo.visachi@grupopan.com','Alessandro Wada','Priscila Sawada Ueno','N'),
 (38,'DB_PAN_DL_CURATED.TB_JURIDICO_PANJUD_ADVOGADO','TB_JURIDICO_PANJUD_ADVOGADO','juridico','Tabeça de Jurídico com dadados dos Advogados das Partes, com informações do Nome dos ADV, nº e UF da OAB','N','N','S','D-1','DB_PAN_DL_CURATED','s3://pan-dl-prd-curated/juridico/panjud/advogado/','-','gustavo.visachi@grupopan.com','Alessandro Wada','Priscila Sawada Ueno','N'),
 (39,'DB_PAN_DL_RAW.TB_MARKETING_ADJUST','TB_MARKETING_ADJUST','marketing','Tabela armazena dados de desempenho de deeplinks e dos principais funis dentro do nosso aplicativo','N','S','S','D-1','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/marketing/adjust/','-','ian.schimpf@grupopan.com','Felipe Melare Romano','Caroline de Sousa Anacleto','N'),
 (40,'DB_PAN_DL_CURATED.TB_MARKETING_ADJUST_AD_REVENUE','TB_MARKETING_ADJUST_AD_REVENUE','marketing','Tabela armazena dados de desempenho de deeplinks e dos principais funis dentro do nosso aplicativo, específico para o tipo de atividade ad revenue. Tabela criada para camada de consumo com dados deduplicados (considera última partição)','N','S','S','D-1','DB_PAN_DL_CURATED','s3://pan-dl-prd-curated/marketing/adjust/ad_revenue/','-','ian.schimpf@grupopan.com','Felipe Melare Romano','Caroline de Sousa Anacleto','N'),
 (41,'DB_PAN_DL_RAW.TB_MARKETPLACE_MOSAICO_ACCOUNTS','TB_MARKETPLACE_MOSAICO_ACCOUNTS','marketplace','Tabela contendo um ''de-para'' de ID Mosaico X CPF dos clientes da Loja PAN.','S','S','S','ONLINE','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/marketplace/mosaico/accounts/','cw_s3_raw_adq_accounts','lucas.rsantos@grupopan.com','-','-','N'),
 (42,'DB_PAN_DL_RAW.TB_MARKETPLACE_MOSAICO_CASHBACK_PAYMENT','TB_MARKETPLACE_MOSAICO_CASHBACK_PAYMENT','marketplace','Tabela contém base de pagamentos do cashback referente aos pedidos realizados no Marketplace.','S','S','S','ONLINE','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/marketplace/mosaico/mongo/cashback_payment/','cw_s3_raw_moisaico_mongo','lucas.rsantos@grupopan.com','-','-','N'),
 (43,'DB_PAN_DL_RAW.TB_OB_GUIA_BOLSO_GBCONNECT_ACCOUNTS_STATEMENTS','TB_OB_GUIA_BOLSO_GBCONNECT_ACCOUNTS_STATEMENTS','open-finance','Tabela armazena extrato bancário bruto do produto conta corrente e resumo da fatura do cartão de crédito (exceto transações) do Cliente Pan em outros Bancos (Original, Inter, Nubank, Caixa, Santander, Bradesco, Banco do Brasil e Itau)','N','S','N','30MIN','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/openbanking/gbconnect-accounts-statements/','jb_ing_raw_openbaking_gbconnect_accounts_statements','jaqueline.batalha@grupopan.com','Renato Akira Losano Murakami','Camila Ferreira Fonseca','S'),
 (44,'DB_PAN_DL_RAW.TB_OB_GUIA_BOLSO_GBCONNECT_CREDIT_VARIABLES','TB_OB_GUIA_BOLSO_GBCONNECT_CREDIT_VARIABLES','open-finance','Tabela armazena extrato bancário bruto do produto conta corrente e resumo da fatura do cartão de crédito (exceto transações) do Cliente Pan em outros Bancos (Original, Inter, Nubank, Caixa, Santander, Bradesco, Banco do Brasil e Itau)','N','S','S','30MIN','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/openbanking/gbconnect-credit-variables/','jb_ing_raw_openbaking_gbconnect_credit_variables','jaqueline.batalha@grupopan.com','Renato Akira Losano Murakami','Camila Ferreira Fonseca','S'),
 (45,'DB_PAN_DL_RAW.TB_OPERACOES_PRP_AUTH_ACTION','TB_OPERACOES_PRP_AUTH_ACTION','operacoes','Tabela de controle de acesso as ações das telas (botões) do Portal de Reembolso. Demonstra os grupos de acesso que poderão acionar determinadas telas/comandos no portal.','S','N','S','ONLINE','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/operacoes/gestao-reembolso/auth-action/','cw_s3_raw_prp','fabian.sardagna@grupopan.com','Leandro De Souza Ciscar','Murielson Silva Santos','N'),
 (46,'DB_PAN_DL_LEGACY.TB_BI_ODS_RL_PRP_COMUNICACAO','TB_BI_ODS_RL_PRP_COMUNICACAO','operacoes','Tabela armazena os dados de envio e efetivação das comunicações feitas entre o Portal de Reembolso e o cliente, com os Ids de protocolo e Ids de mensagens. Essas comunicações são feitas sempre que o reembolso estiver constando como bloqueado em sistema.','S','S','S','ONLINE','DB_PAN_DL_LEGACY','s3://pan-dl-prd-legacy/bi-ods/rl-prp-comunicacao/','cw_legacy_bi_ods','marco.mafra@grupopan.com','Leandro De Souza Ciscar','Murielson Silva Santos','N'),
 (47,'DB_PAN_DL_LEGACY.TB_BI_ODS_RL_RH_COD_FUNCIONARIOS','TB_BI_ODS_RL_RH_COD_FUNCIONARIOS','pessoas','Tabela que armazena os colaboradores ativos no Banco PAN','S','S','N','D-1','DB_PAN_DL_LEGACY','s3://pan-dl-prd-legacy/bi-ods/rl-rh-cod-funcionarios/','cw_legacy_bi_ods','paulo.rocha@grupopan.com','Leticia Toledo Mathias Galvao','Joyce Cezar Barbosa','N'),
 (48,'DB_PAN_DL_LEGACY.VW_BI_ODS_RL_RH_COD_FUNCIONARIOS','VW_BI_ODS_RL_RH_COD_FUNCIONARIOS','pessoas','View que consolida os colaboradores ativos no Banco PAN. Visualização considera última partição da tabela TB_BI_ODS_RL_RH_COD_FUNCIONARIOS','N','N','S','D-1','DB_PAN_DL_LEGACY','-','-','-','Leticia Toledo Mathias Galvao','Joyce Cezar Barbosa','N'),
 (49,'DB_PAN_DL_RAW.TB_PLD_AML_BASE_PAN','TB_PLD_AML_BASE_PAN','pld','Tabela contém a base disponibilizada pelo fornecedor AML Due Diligence tem por finalidade permitir acesso aos dados do Módulo base de notícias desabonadoras. Este acesso é feito via SFTP e retorna os dados em formato CSV. O resultado é especificado por colunas relevantes à lista e aos cadastro','S','N','S','D-7','DB_PAN_DL_LEGACY','s3://pan-dl-prd-raw/pld/aml/base_pan/','cw_s3_raw_api_aml','joao.duarte.ext@panonline.com.br','Laerte Xavier Vieira','Mariana Duprat Ruggeri','N'),
 (50,'DB_PAN_DL_RAW.TB_PLD_AML_CARGA_PEP','TB_PLD_AML_CARGA_PEP','pld','Tabela armazena informações do site AML Due Diligence, que tem como finalidade permitir acesso aos dados do Módulo Pessoas Politicamente Expostas (PEP). Este acesso é feito via site e retorna os dados em formato CSV. O resultado é especificado por colunas relevantes à lista e aos cadastro','S','N','S','D-7','DB_PAN_DL_LEGACY','s3://pan-dl-prd-raw/pld/aml/carga_pep/','cw_s3_raw_api_aml','joao.duarte.ext@panonline.com.br','Laerte Xavier Vieira','Mariana Duprat Ruggeri','N'),
 (51,'DB_PAN_DL_LEGACY.TB_BI_ODS_RL_CAD_MODELO_DECISAO_ACORDO','TB_BI_ODS_RL_CAD_MODELO_DECISAO_ACORDO','recuperacao-credito','Tabela armazena o status do pedido do cliente.','N','N','S','D-1','DB_PAN_DL_LEGACY','s3://pan-dl-prd-legacy/bi-ods/rl-cad-modelo-decisao-acordo/','-','alexandre.azevedo@grupopan.com','Marco Aurelio Santiago','-','N'),
 (52,'DB_PAN_DL_LEGACY.TB_BI_ODS_RL_CBR_API_CONSULTA_EVENT','TB_BI_ODS_RL_CBR_API_CONSULTA_EVENT','recuperacao-credito','Tabela que detalha os acionamentos de cobrança realizados pelas Assessorias/Call Centers via API-Ticket (ferramenta interna desenvolvida pelo PAN). Traz informações sobre os métodos/ações de consultas que foram realizadas pelo operador com o cliente em linha (por ex','N','N','S','D-1','DB_PAN_DL_LEGACY','s3://pan-dl-prd-legacy/bi-ods/rl-cbr-api-consulta-event/','cw_legacy_bi_ods','alexandre.azevedo@grupopan.com','Marco Aurelio Santiago','-','N'),
 (53,'DB_PAN_DL_LEGACY.TB_BI_ODS_REL_CGO05','TB_BI_ODS_REL_CGO05','reserva-dados-tecnicos','Tabela de consignado com dados gerais dos clientes, como nome, CPF, Empregador, valor da parcela, se está adimplente ou inadimplente, e valor em atraso','N','N','S','D-1','DB_PAN_DL_LEGACY','s3://pan-dl-prd-legacy/bi-ods/rel-cgo05/','cw_legacy_bi_ods','marco.mafra@grupopan.com','Rafael Cordeiro de Araujo','Diogo Tenorio Dos Santos','N'),
 (54,'DB_PAN_DL_LEGACY.TB_BI_ODS_REL_DWRHDI01_MENSAL','TB_BI_ODS_REL_DWRHDI01_MENSAL','reserva-dados-tecnicos','Tabela contendo dados das informações de login/logoff dos clientes Pan, com contato do TXT de confirmação, a descrição do evento, código da mensagem e data','N','N','S','D-1','DB_PAN_DL_LEGACY','s3://pan-dl-prd-legacy/bi-ods/rel-dwrhdi01-mensal/','cw_legacy_bi_ods','marco.mafra@grupopan.com','Rafael Cordeiro de Araujo','Diogo Tenorio Dos Santos','N'),
 (55,'DB_PAN_DL_LEGACY.TB_BI_ODS_RL_RCR_MATRIZ_RISCO_CREDITO','TB_BI_ODS_RL_RCR_MATRIZ_RISCO_CREDITO','riscos','Tabela contém as informações de Rating, Atraso, Saldo e Provisão dos contratos de crédito do Banco. Importante destacar que somente são exibidas nesta tabela as visões de contratos vigentes (até o mês anterior a sua liquidação). Como ela é incremental (traz a “foto” da in','N','N','S','D-30','DB_PAN_DL_LEGACY','s3://pan-dl-prd-legacy/bi-ods/rl-rcr-matriz-risco-credito/','cw_legacy_bi_ods','alexandre.azevedo@grupopan.com','Thiago Jose dos Santos Gomes','Daniel Giancotti Rezende','N'),
 (56,'DB_PAN_DL_LEGACY.TB_CADASTRO_PRODUTO_HIST','TB_CADASTRO_PRODUTO_HIST','riscos','Tabela De/Para de produtos x código de produto e segmento. contém relação de todos os produtos do Banco.','N','N','S','SOB DEMANDA','DB_PAN_DL_LEGACY','s3://pan-dl-prd-legacy/interfaces/tb-cadastro-produto-hist/','Tabela estática - Carga manual one shot','-','Thiago Jose dos Santos Gomes','Daniel Giancotti Rezende',''),
 (57,'DB_PAN_DL_RAW.TB_SAUDEPAN_TBSDP_CBRN_CNTR','TB_SAUDEPAN_TBSDP_CBRN_CNTR','saude','Tabela armazena a solicitação de compraça ao dados bancários da conta do cliente','N','N','S','ONLINE','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/saudepan/cdcsaudecore/saudepan/cdcsaudecore/TBSDP_CBRN_CNTR/','cw_s3_saude_pan','andre.lsilva@grupopan.com','Denis Fernando Freitas','Rodrigo Honorio de Lima','N'),
 (58,'DB_PAN_DL_RAW.TB_SAUDEPAN_TBSDP_CNTR','TB_SAUDEPAN_TBSDP_CNTR','saude','Tabela armazena dados do contrato do cliente dentro do Saúde Pan, tanto para contrato ativos quando encerrados.','N','N','S','ONLINE','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/saudepan/cdcsaudecore/saudepan/cdcsaudecore/TBSDP_CNTR/','cw_s3_saude_pan','andre.lsilva@grupopan.com','Denis Fernando Freitas','Rodrigo Honorio de Lima','N'),
 (59,'DB_PAN_DL_RAW.TB_VEICULOS_ACESSOPANVEIC_TPROT','TB_VEICULOS_ACESSOPANVEIC_TPROT','veiculos','Tabela de veículos com e parâmetros das operações de rotina','N','N','S','D-1','DB_PAN_DL_RAW','s3://pan-dl-prd-raw/veiculos/acessopanveic/tprot/','-','renan.marinho@grupopan.com','Leandro Fernandes Sa De Almeida Prado','Fernando Novaes Martins Ferreira','N'),
 (60,'DB_PAN_DL_CURATED.TB_VEICULOS_ACESSOPANVEIC_TPROT','TB_VEICULOS_ACESSOPANVEIC_TPROT','veiculos','Tabela de veículos com e parâmetros das operações de rotina','N','N','S','D-1','DB_PAN_DL_CURATED','s3://pan-dl-prd-curated/veiculos/acessopanveic/tprot/','-','renan.marinho@grupopan.com','Leandro Fernandes Sa De Almeida Prado','Fernando Novaes Martins Ferreira','N'),
 (61,'teste','tommy','muitobom','mutio bom bom bom','true','true','true','rafinha','davi','caminho das indias','salsicha','delgado','rapha','boss','tem');
INSERT INTO "campo" ("id_tabela","nome","descricao","tipo") VALUES (1,'id_bd','ID único da tabela dentro do Catálogo.','string'),
 (2,'nome','nome da tabela referenciada pelo id_bd','string'),
 (3,'categoria','categoria da tabela','string'),
 (4,'descricao','descricao sobre o que a tabela se trata','string'),
 (5,'criticidade','identifica se a tabela contem dados criticos','boolean'),
 (6,'dado_sensivel','identifica se a tabela contem dado sensivel','boolean'),
 (7,'verificacao_governanca','verifica se os dados foram verificados na governanca','boolean'),
 (8,'defasagem','Esses dados estão “atrasados” quanto tempo em relação ao tempo real? As abreviações são MIN para minutos, H para horas, D para dias, M para meses, A para anos, seguidos de -N onde N é a defasagem. ','integer'),
 (9,'database','database de onde o dado da tabela esta vindo','string'),
 (10,'caminho','caminho por onde a tabela esta se originando','string'),
 (11,'script_alimentacao','por onde essa tabela esta sendo alimentada','string'),
 (12,'eng_ingestao','Nome completo do Engenheiro de Dados que realizou a ingestão da tabela no sistema em referência.','string'),
 (13,'owner','Nome completo do Owner do Conjunto de Dados ao qual a tabela pertence. É o nome que consta na página de Owners e Stewards.','string'),
 (14,'steward','Nome completo do Steward responsável pela tabela. É a pessoa que possui as informações de negócio sobre a tabela, e pode responder sobre as expectativas de qualidade de dados, contexto de negócio etc. ','string'),
 (15,'ajuste_nomenclatura','Indica se a tabela está dentro ou fora do padrão de nomenclatura. Controle da Governança de Dados.','boolean');
INSERT INTO "feedback" ("id_tabela","avaliacao","comentario") VALUES (10,'4','Teste'),
 (37,'','oioiaidoiasudaskdjashdjabdncbzjxcugcsgduagduasd'),
 (56,'4','Teste');
INSERT INTO "pasta" ("id_pasta","nome","id_usuario") VALUES (1,'Pasta 1','1'),
 (2,'Pasta 2','1'),
 (3,'Pasta 3','1'),
 (5,'teste_pastinha','1'),
 (8,'TESTE_1','1');
INSERT INTO "tabela_pasta" ("id_tabela","id_pasta") VALUES (1,2);
INSERT INTO "solicitacoes" ("id_solicitacao","id_usuario","data","sql_code") VALUES (1,1,'03/29/2021%2005:50:06','UPDATE tabelas SET nome=''Paulo'' WHERE id=61');
INSERT INTO "usuario" ("id_usuario","nome") VALUES (1,'Raphaela');
COMMIT;
