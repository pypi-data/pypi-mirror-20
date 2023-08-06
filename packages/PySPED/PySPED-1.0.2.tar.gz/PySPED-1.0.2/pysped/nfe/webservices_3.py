# -*- coding: utf-8 -*-
#
# PySPED - Python libraries to deal with Brazil's SPED Project
#
# Copyright (C) 2010-2012
# Copyright (C) Aristides Caldeira <aristides.caldeira at tauga.com.br>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Library General Public License as
# published by the Free Software Foundation, either version 2.1 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Library General Public License for more details.
#
# You should have received a copy of the GNU Library General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# PySPED - Bibliotecas Python para o
#          SPED - Sistema Público de Escrituração Digital
#
# Copyright (C) 2010-2012
# Copyright (C) Aristides Caldeira <aristides.caldeira arroba tauga.com.br>
#
# Este programa é um software livre: você pode redistribuir e/ou modificar
# este programa sob os termos da licença GNU Library General Public License,
# publicada pela Free Software Foundation, em sua versão 2.1 ou, de acordo
# com sua opção, qualquer versão posterior.
#
# Este programa é distribuido na esperança de que venha a ser útil,
# porém SEM QUAISQUER GARANTIAS, nem mesmo a garantia implícita de
# COMERCIABILIDADE ou ADEQUAÇÃO A UMA FINALIDADE ESPECÍFICA. Veja a
# GNU Library General Public License para mais detalhes.
#
# Você deve ter recebido uma cópia da GNU Library General Public License
# juntamente com este programa. Caso esse não seja o caso, acesse:
# <http://www.gnu.org/licenses/>
#

from __future__ import division, print_function, unicode_literals

from .webservices_flags import (NFE_AMBIENTE_PRODUCAO,
                                NFE_AMBIENTE_HOMOLOGACAO,
                                WS_DPEC_CONSULTA,
                                WS_DPEC_RECEPCAO,
                                WS_NFE_AUTORIZACAO,
                                WS_NFE_CONSULTA,
                                WS_NFE_CONSULTA_AUTORIZACAO,
                                WS_NFE_CONSULTA_CADASTRO,
                                WS_NFE_CONSULTA_DESTINADAS,
                                WS_NFE_DOWNLOAD,
                                WS_NFE_INUTILIZACAO,
                                WS_NFE_SITUACAO,
                                WS_NFE_RECEPCAO_EVENTO,
                                WS_DFE_DISTRIBUICAO)


METODO_WS = {
    WS_NFE_AUTORIZACAO: {
        'webservice': 'NfeAutorizacao',
        'metodo'    : 'NfeAutorizacao',
    },
    WS_NFE_CONSULTA_AUTORIZACAO: {
        'webservice': 'NfeRetAutorizacao',
        'metodo'    : 'NfeRetAutorizacao',
    },
    WS_NFE_INUTILIZACAO: {
        'webservice': 'NfeInutilizacao2',
        'metodo'    : 'nfeInutilizacaoNF2',
    },
    WS_NFE_CONSULTA: {
        'webservice': 'NfeConsulta2',
        'metodo'    : 'nfeConsultaNF2',
    },
    WS_NFE_SITUACAO: {
        'webservice': 'NfeStatusServico2',
        'metodo'    : 'nfeStatusServicoNF2',
    },
    WS_NFE_CONSULTA_CADASTRO: {
        'webservice': 'CadConsultaCadastro2',
        'metodo'    : 'consultaCadastro2',
    },
    WS_NFE_RECEPCAO_EVENTO: {
        'webservice': 'RecepcaoEvento',
        'metodo'    : 'nfeRecepcaoEvento',
    },
    WS_NFE_DOWNLOAD: {
        'webservice': 'NfeDownloadNF',
        'metodo'    : 'nfeDownloadNF',
    },
    WS_NFE_CONSULTA_DESTINADAS: {
        'webservice': 'NfeConsultaDest',
        'metodo'    : 'nfeConsultaNFDest',
    },
    WS_DFE_DISTRIBUICAO: {
        'webservice': 'NFeDistribuicaoDFe',
        'metodo'    : 'nfeDistDFeInteresse'
    }
}

SVRS = {
    # o servidor da consulta de cadastro é diferente dos demais...
    NFE_AMBIENTE_PRODUCAO: {
        'servidor'             : 'nfe.svrs.rs.gov.br',
        'servidor%s' % WS_NFE_CONSULTA_CADASTRO: 'svp-ws.sefazvirtual.rs.gov.br',
        WS_NFE_RECEPCAO_EVENTO: 'ws/recepcaoevento/recepcaoevento.asmx',
        WS_NFE_AUTORIZACAO      : 'ws/NfeAutorizacao/NfeAutorizacao.asmx',
        WS_NFE_CONSULTA_AUTORIZACAO : 'ws/NfeRetAutorizacao/NfeRetAutorizacao.asmx',
        WS_NFE_CONSULTA_CADASTRO: 'ws/CadConsultaCadastro/CadConsultaCadastro2.asmx',
        WS_NFE_INUTILIZACAO    : 'ws/nfeinutilizacao/nfeinutilizacao2.asmx',
        WS_NFE_CONSULTA        : 'ws/NfeConsulta/NfeConsulta2.asmx',
        WS_NFE_SITUACAO        : 'ws/NfeStatusServico/NfeStatusServico2.asmx',
    },
    NFE_AMBIENTE_HOMOLOGACAO: {
        'servidor'             : 'nfe-homologacao.svrs.rs.gov.br',
        WS_NFE_RECEPCAO_EVENTO: 'ws/recepcaoevento/recepcaoevento.asmx',
        WS_NFE_AUTORIZACAO      : 'ws/NfeAutorizacao/NfeAutorizacao.asmx',
        WS_NFE_CONSULTA_AUTORIZACAO : 'ws/NfeRetAutorizacao/NfeRetAutorizacao.asmx',
        WS_NFE_CONSULTA_CADASTRO: 'ws/CadConsultaCadastro/CadConsultaCadastro2.asmx',
        WS_NFE_INUTILIZACAO    : 'ws/nfeinutilizacao/nfeinutilizacao2.asmx',
        WS_NFE_CONSULTA        : 'ws/NfeConsulta/NfeConsulta2.asmx',
        WS_NFE_SITUACAO        : 'ws/NfeStatusServico/NfeStatusServico2.asmx',
    }
}

SVAN = {
    NFE_AMBIENTE_PRODUCAO: {
        'servidor'             : 'www.sefazvirtual.fazenda.gov.br',
        WS_NFE_RECEPCAO_EVENTO : 'RecepcaoEvento/RecepcaoEvento.asmx',
        WS_NFE_AUTORIZACAO      : 'NfeAutorizacao/NfeAutorizacao.asmx',
        WS_NFE_CONSULTA_AUTORIZACAO : 'NfeRetAutorizacao/NfeRetAutorizacao.asmx',
        WS_NFE_INUTILIZACAO    : 'NfeInutilizacao2/NfeInutilizacao2.asmx',
        WS_NFE_CONSULTA        : 'NfeConsulta2/NfeConsulta2.asmx',
        WS_NFE_SITUACAO        : 'NfeStatusServico2/NfeStatusServico2.asmx',
        WS_NFE_DOWNLOAD        : 'NfeDownloadNF/NfeDownloadNF.asmx',
    },
    NFE_AMBIENTE_HOMOLOGACAO: {
        'servidor'             : 'hom.sefazvirtual.fazenda.gov.br',
        WS_NFE_RECEPCAO_EVENTO : 'RecepcaoEvento/RecepcaoEvento.asmx',
        WS_NFE_AUTORIZACAO      : 'NfeAutorizacao/NfeAutorizacao.asmx',
        WS_NFE_CONSULTA_AUTORIZACAO : 'NfeRetAutorizacao/NfeRetAutorizacao.asmx',
        WS_NFE_INUTILIZACAO    : 'NfeInutilizacao2/NfeInutilizacao2.asmx',
        WS_NFE_CONSULTA        : 'NfeConsulta2/NfeConsulta2.asmx',
        WS_NFE_SITUACAO        : 'NfeStatusServico2/NfeStatusServico2.asmx',
        WS_NFE_DOWNLOAD        : 'NfeDownloadNF/NfeDownloadNF.asmx',
    }
}

#SCAN = {
    #NFE_AMBIENTE_PRODUCAO: {
        #'servidor'            : 'www.scan.fazenda.gov.br',
        #WS_NFE_RECEPCAO_EVENTO : 'RecepcaoEvento/RecepcaoEvento.asmx',
        #WS_NFE_AUTORIZACAO      : 'NfeAutorizacao/NfeAutorizacao.asmx',
        #WS_NFE_CONSULTA_AUTORIZACAO : 'NfeRetAutorizacao/NfeRetAutorizacao.asmx',
        #WS_NFE_INUTILIZACAO    : 'NfeInutilizacao2/NfeInutilizacao2.asmx',
        #WS_NFE_CONSULTA        : 'NfeConsulta2/NfeConsulta2.asmx',
        #WS_NFE_SITUACAO        : 'NfeStatusServico2/NfeStatusServico2.asmx'
    #},
    #NFE_AMBIENTE_HOMOLOGACAO: {
        #'servidor'            : 'hom.nfe.fazenda.gov.br',
        #WS_NFE_RECEPCAO_EVENTO : 'RecepcaoEvento/RecepcaoEvento.asmx',
        #WS_NFE_AUTORIZACAO      : 'NfeAutorizacao/NfeAutorizacao.asmx',
        #WS_NFE_CONSULTA_AUTORIZACAO : 'NfeRetAutorizacao/NfeRetAutorizacao.asmx',
        #WS_NFE_INUTILIZACAO    : 'NfeInutilizacao2/NfeInutilizacao2.asmx',
        #WS_NFE_CONSULTA        : 'NfeConsulta2/NfeConsulta2.asmx',
        #WS_NFE_SITUACAO        : 'NfeStatusServico2/NfeStatusServico2.asmx'
    #}
#}

SVC_AN = {
    NFE_AMBIENTE_PRODUCAO: {
        'servidor'            : 'www.svc.fazenda.gov.br',
        WS_NFE_RECEPCAO_EVENTO : 'RecepcaoEvento/RecepcaoEvento.asmx',
        WS_NFE_AUTORIZACAO      : 'NfeAutorizacao/NfeAutorizacao.asmx',
        WS_NFE_CONSULTA_AUTORIZACAO : 'NfeRetAutorizacao/NfeRetAutorizacao.asmx',
        WS_NFE_CONSULTA        : 'NfeConsulta2/NfeConsulta2.asmx',
        WS_NFE_SITUACAO        : 'NfeStatusServico2/NfeStatusServico2.asmx'
    },
    NFE_AMBIENTE_HOMOLOGACAO: {
        'servidor'            : 'hom.nfe.fazenda.gov.br',
        WS_NFE_RECEPCAO_EVENTO : 'RecepcaoEvento/RecepcaoEvento.asmx',
        WS_NFE_AUTORIZACAO      : 'NfeAutorizacao/NfeAutorizacao.asmx',
        WS_NFE_CONSULTA_AUTORIZACAO : 'NfeRetAutorizacao/NfeRetAutorizacao.asmx',
        WS_NFE_CONSULTA        : 'NfeConsulta2/NfeConsulta2.asmx',
        WS_NFE_SITUACAO        : 'NfeStatusServico2/NfeStatusServico2.asmx'
    }
}

SVC_RS = {
    NFE_AMBIENTE_PRODUCAO: {
        'servidor'             : 'nfe.svrs.rs.gov.br',
        WS_NFE_RECEPCAO_EVENTO: 'ws/recepcaoevento/recepcaoevento.asmx',
        WS_NFE_AUTORIZACAO      : 'ws/NfeAutorizacao/NfeAutorizacao.asmx',
        WS_NFE_CONSULTA_AUTORIZACAO : 'ws/NfeRetAutorizacao/NfeRetAutorizacao.asmx',
        WS_NFE_CONSULTA        : 'ws/NfeConsulta/NfeConsulta2.asmx',
        WS_NFE_SITUACAO        : 'ws/NfeStatusServico/NfeStatusServico2.asmx',
    },
    NFE_AMBIENTE_HOMOLOGACAO: {
        'servidor'             : 'nfe-homologacao.svrs.rs.gov.br',
        WS_NFE_RECEPCAO_EVENTO: 'ws/recepcaoevento/recepcaoevento.asmx',
        WS_NFE_AUTORIZACAO      : 'ws/NfeAutorizacao/NfeAutorizacao.asmx',
        WS_NFE_CONSULTA_AUTORIZACAO : 'ws/NfeRetAutorizacao/NfeRetAutorizacao.asmx',
        WS_NFE_CONSULTA        : 'ws/NfeConsulta/NfeConsulta2.asmx',
        WS_NFE_SITUACAO        : 'ws/NfeStatusServico/NfeStatusServico2.asmx',
    }
}

DPEC = {
    NFE_AMBIENTE_PRODUCAO: {
        'servidor'     : 'www.nfe.fazenda.gov.br',
        WS_DPEC_CONSULTA: 'SCERecepcaoRFB/SCERecepcaoRFB.asmx',
        WS_DPEC_RECEPCAO: 'SCEConsultaRFB/SCEConsultaRFB.asmx'
    },
    NFE_AMBIENTE_HOMOLOGACAO: {
        'servidor'     : 'hom.nfe.fazenda.gov.br',
        WS_DPEC_CONSULTA: 'SCERecepcaoRFB/SCERecepcaoRFB.asmx',
        WS_DPEC_RECEPCAO: 'SCEConsultaRFB/SCEConsultaRFB.asmx'
    }
}

AN = {
    NFE_AMBIENTE_PRODUCAO: {
        'servidor': 'www.nfe.fazenda.gov.br',
        WS_NFE_RECEPCAO_EVENTO   : 'RecepcaoEvento/RecepcaoEvento.asmx',
        WS_NFE_CONSULTA_DESTINADAS: 'NFeConsultaDest/NFeConsultaDest.asmx',
        WS_NFE_DOWNLOAD: 'NfeDownloadNF/NfeDownloadNF.asmx',
        WS_DFE_DISTRIBUICAO: 'NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx',
    },
    NFE_AMBIENTE_HOMOLOGACAO: {
        'servidor': 'hom.nfe.fazenda.gov.br',
        WS_NFE_RECEPCAO_EVENTO   : 'RecepcaoEvento/RecepcaoEvento.asmx',
        WS_NFE_CONSULTA_DESTINADAS: 'NFeConsultaDest/NFeConsultaDest.asmx',
        WS_NFE_DOWNLOAD: 'NfeDownloadNF/NfeDownloadNF.asmx',
        WS_DFE_DISTRIBUICAO: 'NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx',
    },
}

UFAM = {
    NFE_AMBIENTE_PRODUCAO: {
        'servidor'              : 'nfe.sefaz.am.gov.br',
        WS_NFE_RECEPCAO_EVENTO  : 'services2/services/RecepcaoEvento',
        WS_NFE_AUTORIZACAO       : 'services2/services/NfeAutorizacao',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'services2/services/NfeRetAutorizacao',
        WS_NFE_INUTILIZACAO     : 'services2/services/NfeInutilizacao2',
        WS_NFE_CONSULTA         : 'services2/services/NfeConsulta2',
        WS_NFE_SITUACAO         : 'services2/services/NfeStatusServico2',
        WS_NFE_CONSULTA_CADASTRO: 'services2/services/cadconsultacadastro2',
    },
    NFE_AMBIENTE_HOMOLOGACAO: {
        'servidor'            : 'homnfe.sefaz.am.gov.br',
        WS_NFE_RECEPCAO_EVENTO  : 'services2/services/RecepcaoEvento',
        WS_NFE_AUTORIZACAO       : 'services2/services/NfeAutorizacao',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'services2/services/NfeRetAutorizacao',
        WS_NFE_INUTILIZACAO     : 'services2/services/NfeInutilizacao2',
        WS_NFE_CONSULTA         : 'services2/services/NfeConsulta2',
        WS_NFE_SITUACAO         : 'services2/services/NfeStatusServico2',
        WS_NFE_CONSULTA_CADASTRO: 'services2/services/cadconsultacadastro2',
    }
}

UFBA = {
    NFE_AMBIENTE_PRODUCAO: {
        'servidor'             : 'nfe.sefaz.ba.gov.br',
        WS_NFE_AUTORIZACAO       : 'webservices/NfeAutorizacao/NfeAutorizacao.asmx',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'webservices/NfeRetAutorizacao/NfeRetAutorizacao.asmx',
        WS_NFE_CONSULTA         : 'webservices/NfeConsulta/NfeConsulta.asmx',
        WS_NFE_SITUACAO         : 'webservices/NfeStatusServico/NfeStatusServico.asmx',
        WS_NFE_INUTILIZACAO     : 'webservices/nfenw/nfeinutilizacao2.asmx',
        WS_NFE_CONSULTA_CADASTRO: 'webservices/nfenw/CadConsultaCadastro2.asmx',
        WS_NFE_RECEPCAO_EVENTO  : 'webservices/sre/recepcaoevento',
    },
    NFE_AMBIENTE_HOMOLOGACAO: {
        'servidor'            : 'hnfe.sefaz.ba.gov.br',
        WS_NFE_AUTORIZACAO       : 'webservices/NfeAutorizacao/NfeAutorizacao.asmx',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'webservices/NfeRetAutorizacao/NfeRetAutorizacao.asmx',
        WS_NFE_CONSULTA         : 'webservices/NfeConsulta/NfeConsulta.asmx',
        WS_NFE_SITUACAO         : 'webservices/NfeStatusServico/NfeStatusServico.asmx',
        WS_NFE_INUTILIZACAO     : 'webservices/nfenw/nfeinutilizacao2.asmx',
        WS_NFE_CONSULTA_CADASTRO: 'webservices/nfenw/CadConsultaCadastro2.asmx',
        WS_NFE_RECEPCAO_EVENTO  : 'webservices/sre/recepcaoevento',
    }
}


UFCE = {
    NFE_AMBIENTE_PRODUCAO: {
        'servidor'              : 'nfe.sefaz.ce.gov.br',
        WS_NFE_AUTORIZACAO       : 'nfe2/services/NfeAutorizacao',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'nfe2/services/NfeRetAutorizacao',
        WS_NFE_INUTILIZACAO     : 'nfe2/services/NfeInutilizacao2',
        WS_NFE_CONSULTA         : 'nfe2/services/NfeConsulta2',
        WS_NFE_SITUACAO         : 'nfe2/services/NfeStatusServico2',
        WS_NFE_CONSULTA_CADASTRO: 'nfe2/services/CadConsultaCadastro2',
        WS_NFE_RECEPCAO_EVENTO  : 'nfe2/services/RecepcaoEvento',
    },
    NFE_AMBIENTE_HOMOLOGACAO: {
        'servidor'              : 'nfeh.sefaz.ce.gov.br',
        WS_NFE_AUTORIZACAO       : 'nfe2/services/NfeAutorizacao',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'nfe2/services/NfeRetAutorizacao',
        WS_NFE_INUTILIZACAO     : 'nfe2/services/NfeInutilizacao2',
        WS_NFE_CONSULTA         : 'nfe2/services/NfeConsulta2',
        WS_NFE_SITUACAO         : 'nfe2/services/NfeStatusServico2',
        WS_NFE_CONSULTA_CADASTRO: 'nfe2/services/CadConsultaCadastro2',
        WS_NFE_RECEPCAO_EVENTO  : 'nfe2/services/RecepcaoEvento',
    }
}


UFGO = {
    NFE_AMBIENTE_PRODUCAO: {
        'servidor'              : 'nfe.sefaz.go.gov.br',
        WS_NFE_RECEPCAO_EVENTO  : 'nfe/services/v2/RecepcaoEvento',
        WS_NFE_AUTORIZACAO       : 'nfe/services/v2/NfeAutorizacao',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'nfe/services/v2/NfeRetAutorizacao',
        WS_NFE_INUTILIZACAO     : 'nfe/services/v2/NfeInutilizacao2',
        WS_NFE_CONSULTA         : 'nfe/services/v2/NfeConsulta2',
        WS_NFE_SITUACAO         : 'nfe/services/v2/NfeStatusServico2',
        WS_NFE_CONSULTA_CADASTRO: 'nfe/services/v2/CadConsultaCadastro2',
    },
    NFE_AMBIENTE_HOMOLOGACAO: {
        'servidor'              : 'homolog.sefaz.go.gov.br',
        WS_NFE_RECEPCAO_EVENTO  : 'nfe/services/v2/RecepcaoEvento',
        WS_NFE_AUTORIZACAO       : 'nfe/services/v2/NfeAutorizacao',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'nfe/services/v2/NfeRetAutorizacao',
        WS_NFE_INUTILIZACAO     : 'nfe/services/v2/NfeInutilizacao2',
        WS_NFE_CONSULTA         : 'nfe/services/v2/NfeConsulta2',
        WS_NFE_SITUACAO         : 'nfe/services/v2/NfeStatusServico2',
        WS_NFE_CONSULTA_CADASTRO: 'nfe/services/v2/CadConsultaCadastro2',
    }
}

#UFMA = {
    #NFE_AMBIENTE_PRODUCAO: {
        #'servidor': 'sistemas.sefaz.ma.gov.br',
        #WS_NFE_CONSULTA_CADASTRO: 'wscadastro/CadConsultaCadastro2',
    #}
#}

UFMT = {
#NFeAutorizacao  3.10    https://nfe.sefaz.mt.gov.br/nfews/v2/services/NfeAutorizacao?wsdl
#NFeRetAutorizacao   3.10    https://nfe.sefaz.mt.gov.br/nfews/v2/services/NfeRetAutorizacao?wsdl

    NFE_AMBIENTE_PRODUCAO: {
        'servidor'              : 'nfe.sefaz.mt.gov.br',
        WS_NFE_AUTORIZACAO       : 'nfews/v2/services/NfeAutorizacao',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'nfews/v2/services/NfeRetAutorizacao',
        WS_NFE_INUTILIZACAO     : 'nfews/v2/services/NfeInutilizacao2',
        WS_NFE_CONSULTA         : 'nfews/v2/services/NfeConsulta2',
        WS_NFE_SITUACAO         : 'nfews/v2/services/NfeStatusServico2',
        WS_NFE_CONSULTA_CADASTRO: 'nfews/v2/services/CadConsultaCadastro2',
        WS_NFE_RECEPCAO_EVENTO  : 'nfews/v2/services/RecepcaoEvento',
    },
    NFE_AMBIENTE_HOMOLOGACAO: {
        'servidor'              : 'homologacao.sefaz.mt.gov.br',
        WS_NFE_AUTORIZACAO       : 'nfews/v2/services/NfeAutorizacao',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'nfews/v2/services/NfeRetAutorizacao',
        WS_NFE_INUTILIZACAO     : 'nfews/v2/services/NfeInutilizacao2',
        WS_NFE_CONSULTA         : 'nfews/v2/services/NfeConsulta2',
        WS_NFE_SITUACAO         : 'nfews/v2/services/NfeStatusServico2',
        WS_NFE_CONSULTA_CADASTRO: 'nfews/v2/services/CadConsultaCadastro2',
        WS_NFE_RECEPCAO_EVENTO  : 'nfews/v2/services/RecepcaoEvento',
    }
}

UFMS = {
#NFeAutorizacao  3.10    https://nfe.fazenda.ms.gov.br/producao/services2/NfeAutorizacao
#NFeRetAutorizacao   3.10    https://nfe.fazenda.ms.gov.br/producao/services2/NfeRetAutorizacao

    NFE_AMBIENTE_PRODUCAO: {
        'servidor'              : 'nfe.fazenda.ms.gov.br',
        WS_NFE_RECEPCAO_EVENTO  : 'producao/services2/RecepcaoEvento',
        WS_NFE_AUTORIZACAO       : 'producao/services2/NfeAutorizacao',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'producao/services2/NfeRetAutorizacao',
        WS_NFE_CONSULTA_CADASTRO: 'producao/services2/CadConsultaCadastro2',
        WS_NFE_INUTILIZACAO     : 'producao/services2/NfeInutilizacao2',
        WS_NFE_CONSULTA         : 'producao/services2/NfeConsulta2',
        WS_NFE_SITUACAO         : 'producao/services2/NfeStatusServico2',
    },
    NFE_AMBIENTE_HOMOLOGACAO: {
        'servidor'             : 'homologacao.nfe.ms.gov.br',
        WS_NFE_RECEPCAO_EVENTO  : 'homologacao/services2/RecepcaoEvento',
        WS_NFE_AUTORIZACAO       : 'homologacao/services2/NfeAutorizacao',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'homologacao/services2/NfeRetAutorizacao',
        WS_NFE_CONSULTA_CADASTRO: 'homologacao/services2/CadConsultaCadastro2',
        WS_NFE_INUTILIZACAO     : 'homologacao/services2/NfeInutilizacao2',
        WS_NFE_CONSULTA         : 'homologacao/services2/NfeConsulta2',
        WS_NFE_SITUACAO         : 'homologacao/services2/NfeStatusServico2',
    }
}

UFMG = {
    NFE_AMBIENTE_PRODUCAO: {
        'servidor'              : 'nfe.fazenda.mg.gov.br',
        WS_NFE_AUTORIZACAO       : 'nfe2/services/NfeAutorizacao',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'nfe2/services/NfeRetAutorizacao',
        WS_NFE_INUTILIZACAO     : 'nfe2/services/NfeInutilizacao2',
        WS_NFE_CONSULTA         : 'nfe2/services/NfeConsulta2',
        WS_NFE_SITUACAO         : 'nfe2/services/NfeStatus2',
        WS_NFE_CONSULTA_CADASTRO: 'nfe2/services/cadconsultacadastro2',
        WS_NFE_RECEPCAO_EVENTO  : 'nfe2/services/RecepcaoEvento',
    },
    NFE_AMBIENTE_HOMOLOGACAO: {
        'servidor'             : 'hnfe.fazenda.mg.gov.br',
        WS_NFE_AUTORIZACAO       : 'nfe2/services/NfeAutorizacao',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'nfe2/services/NfeRetAutorizacao',
        WS_NFE_INUTILIZACAO     : 'nfe2/services/NfeInutilizacao2',
        WS_NFE_CONSULTA         : 'nfe2/services/NfeConsulta2',
        WS_NFE_SITUACAO         : 'nfe2/services/NfeStatus2',
        WS_NFE_CONSULTA_CADASTRO: 'nfe2/services/cadconsultacadastro2',
        WS_NFE_RECEPCAO_EVENTO  : 'nfe2/services/RecepcaoEvento',
    }
}

UFPR = {
    NFE_AMBIENTE_PRODUCAO: {
        'servidor'              : 'nfe.fazenda.pr.gov.br',
        WS_NFE_AUTORIZACAO       : 'nfe/NFeAutorizacao3',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'nfe/NFeRetAutorizacao3',
        WS_NFE_INUTILIZACAO     : 'nfe/NFeInutilizacao3',
        WS_NFE_CONSULTA         : 'nfe/NFeConsulta3',
        WS_NFE_SITUACAO         : 'nfe/NFeStatusServico3',
        WS_NFE_CONSULTA_CADASTRO: 'nfe/CadConsultaCadastro2',
        WS_NFE_RECEPCAO_EVENTO  : 'nfe/NFeRecepcaoEvento',
    },
    NFE_AMBIENTE_HOMOLOGACAO: {
        'servidor'              : 'homologacao.nfe.fazenda.pr.gov.br',
        WS_NFE_AUTORIZACAO       : 'nfe/NFeAutorizacao3',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'nfe/NFeRetAutorizacao3',
        WS_NFE_INUTILIZACAO     : 'nfe/NFeInutilizacao3',
        WS_NFE_CONSULTA         : 'nfe/NFeConsulta3',
        WS_NFE_SITUACAO         : 'nfe/NFeStatusServico3',
        WS_NFE_CONSULTA_CADASTRO: 'nfe/CadConsultaCadastro2',
        WS_NFE_RECEPCAO_EVENTO  : 'nfe/NFeRecepcaoEvento',
    }
}

UFPE = {
    NFE_AMBIENTE_PRODUCAO: {
        'servidor'              : 'nfe.sefaz.pe.gov.br',
        WS_NFE_RECEPCAO_EVENTO  : 'nfe-service/services/RecepcaoEvento',
        WS_NFE_AUTORIZACAO       : 'nfe-service/services/NfeAutorizacao',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'nfe-service/services/NfeRetAutorizacao',
        WS_NFE_INUTILIZACAO     : 'nfe-service/services/NfeInutilizacao2',
        WS_NFE_CONSULTA         : 'nfe-service/services/NfeConsulta2',
        WS_NFE_SITUACAO         : 'nfe-service/services/NfeStatusServico2',
        WS_NFE_CONSULTA_CADASTRO: 'nfe-service/services/CadConsultaCadastro2',
    },
    NFE_AMBIENTE_HOMOLOGACAO: {
        'servidor'             : 'nfehomolog.sefaz.pe.gov.br',
        WS_NFE_RECEPCAO_EVENTO  : 'nfe-service/services/RecepcaoEvento',
        WS_NFE_AUTORIZACAO       : 'nfe-service/services/NfeAutorizacao',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'nfe-service/services/NfeRetAutorizacao',
        WS_NFE_INUTILIZACAO     : 'nfe-service/services/NfeInutilizacao2',
        WS_NFE_CONSULTA         : 'nfe-service/services/NfeConsulta2',
        WS_NFE_SITUACAO         : 'nfe-service/services/NfeStatusServico2',
        WS_NFE_CONSULTA_CADASTRO: 'nfe-service/services/CadConsultaCadastro2',
    }
}


UFRS = {
    NFE_AMBIENTE_PRODUCAO: {
        'servidor'              : 'nfe.sefazrs.rs.gov.br',
        WS_NFE_RECEPCAO_EVENTO  : 'ws/recepcaoevento/recepcaoevento.asmx',
        WS_NFE_AUTORIZACAO       : 'ws/NfeAutorizacao/NFeAutorizacao.asmx',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'ws/NfeRetAutorizacao/NFeRetAutorizacao.asmx',
        WS_NFE_CONSULTA_CADASTRO: 'ws/cadconsultacadastro/cadconsultacadastro2.asmx',
        WS_NFE_CONSULTA_DESTINADAS: 'ws/nfeConsultaDest/nfeConsultaDest.asmx',
        WS_NFE_DOWNLOAD         : 'ws/nfeDownloadNF/nfeDownloadNF.asmx',
        WS_NFE_INUTILIZACAO     : 'ws/NfeInutilizacao/NfeInutilizacao2.asmx',
        WS_NFE_CONSULTA         : 'ws/NfeConsulta/NfeConsulta2.asmx',
        WS_NFE_SITUACAO         : 'ws/NfeStatusServico/NfeStatusServico2.asmx',
    },
    NFE_AMBIENTE_HOMOLOGACAO: {
        'servidor'             : 'homologacao.nfe.sefaz.rs.gov.br',
        WS_NFE_RECEPCAO_EVENTO  : 'ws/recepcaoevento/recepcaoevento.asmx',
        WS_NFE_AUTORIZACAO       : 'ws/NfeAutorizacao/NFeAutorizacao.asmx',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'ws/NfeRetAutorizacao/NFeRetAutorizacao.asmx',
        WS_NFE_CONSULTA_CADASTRO: 'ws/cadconsultacadastro/cadconsultacadastro2.asmx',
        WS_NFE_CONSULTA_DESTINADAS: 'ws/nfeConsultaDest/nfeConsultaDest.asmx',
        WS_NFE_DOWNLOAD         : 'ws/nfeDownloadNF/nfeDownloadNF.asmx',
        WS_NFE_INUTILIZACAO     : 'ws/NfeInutilizacao/NfeInutilizacao2.asmx',
        WS_NFE_CONSULTA         : 'ws/NfeConsulta/NfeConsulta2.asmx',
        WS_NFE_SITUACAO         : 'ws/NfeStatusServico/NfeStatusServico2.asmx',
    }
}


UFSP = {
    NFE_AMBIENTE_PRODUCAO: {
        'servidor'              : 'nfe.fazenda.sp.gov.br',
        WS_NFE_AUTORIZACAO       : 'ws/nfeautorizacao.asmx',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'ws/nferetautorizacao.asmx',
        WS_NFE_INUTILIZACAO     : 'ws/nfeinutilizacao2.asmx',
        WS_NFE_CONSULTA         : 'ws/nfeconsulta2.asmx',
        WS_NFE_SITUACAO         : 'ws/nfestatusservico2.asmx',
        WS_NFE_CONSULTA_CADASTRO: 'ws/cadconsultacadastro2.asmx',
        WS_NFE_RECEPCAO_EVENTO  : 'ws/recepcaoevento.asmx',
    },
    NFE_AMBIENTE_HOMOLOGACAO: {
        'servidor'             : 'homologacao.nfe.fazenda.sp.gov.br',
        WS_NFE_AUTORIZACAO       : 'ws/nfeautorizacao.asmx',
        WS_NFE_CONSULTA_AUTORIZACAO  : 'ws/nferetautorizacao.asmx',
        WS_NFE_INUTILIZACAO     : 'ws/nfeinutilizacao2.asmx',
        WS_NFE_CONSULTA         : 'ws/nfeconsulta2.asmx',
        WS_NFE_SITUACAO         : 'ws/nfestatusservico2.asmx',
        WS_NFE_CONSULTA_CADASTRO: 'ws/cadconsultacadastro2.asmx',
        WS_NFE_RECEPCAO_EVENTO  : 'ws/recepcaoevento.asmx',
    }
}

#
# Informação obtida em
# http://www.nfe.fazenda.gov.br/portal/webServices.aspx
#  Última verificação: 15/08/2014 16:22
#
# UF que utilizam a SVAN - Sefaz Virtual do Ambiente Nacional: MA, PA, PI
# UF que utilizam a SVRS - Sefaz Virtual do RS:
# - Para serviço de Consulta Cadastro: AC, RN, PB, SC
# - Para demais serviços relacionados com o sistema da NF-e: AC, AL, AP, DF, PB, RJ, RN, RO, RR, SC, SE, TO
# Autorizadores: AM BA CE GO MG MA MS MT PE PR RS SP
#

ESTADO_WS = {
    'AC': SVRS,
    'AL': SVRS,
    'AM': UFAM,
    'AP': SVRS,
    'BA': UFBA,
    'CE': UFCE,
    'DF': SVRS,
    'ES': SVRS,
    'GO': UFGO,
    'MA': SVAN,
    'MG': UFMG,
    'MS': UFMS,
    'MT': UFMT,
    'PA': SVAN,
    'PB': SVRS,
    'PE': UFPE,
    'PI': SVAN,
    'PR': UFPR,
    'RJ': SVRS,
    'RN': SVRS,
    'RO': SVRS,
    'RR': SVRS,
    'RS': UFRS,
    'SC': SVRS,
    'SE': SVRS,
    'SP': UFSP,
    'TO': SVRS,
}


#
# Informação obtida em
# http://www.nfe.fazenda.gov.br/portal/webServices.aspx
#  Última verificação: 15/08/2014 16:22
#
# Autorizadores em contingência:
# - UF que utilizam a SVC-AN - Sefaz Virtual de Contingência Ambiente Nacional: AC, AL, AP, DF, ES, MG, PB, RJ, RN, RO, RR, RS, SC, SE, SP, TO
# - UF que utilizam a SVC-RS - Sefaz Virtual de Contingência Rio Grande do Sul: AM, BA, CE, GO, MA, MS, MT, PA, PE, PI, PR
#

ESTADO_WS_CONTINGENCIA = {
    'AC': SVC_AN,
    'AL': SVC_AN,
    'AM': SVC_RS,
    'AP': SVC_AN,
    'BA': SVC_RS,
    'CE': SVC_RS,
    'DF': SVC_AN,
    'ES': SVC_AN,
    'GO': SVC_RS,
    'MA': SVC_RS,
    'MG': SVC_AN,
    'MS': SVC_RS,
    'MT': SVC_RS,
    'PA': SVC_RS,
    'PB': SVC_AN,
    'PE': SVC_RS,
    'PI': SVC_RS,
    'PR': SVC_RS,
    'RJ': SVC_AN,
    'RN': SVC_AN,
    'RO': SVC_AN,
    'RR': SVC_AN,
    'RS': SVC_AN,
    'SC': SVC_AN,
    'SE': SVC_AN,
    'SP': SVC_AN,
    'TO': SVC_AN,
}
