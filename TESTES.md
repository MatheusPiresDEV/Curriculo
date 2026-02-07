# Forja de Currículos - Checklist de Testes

## 1. Tela de Login

- [ ] Carregar página exibe tela de login
- [ ] Validação de campos obrigatórios funciona
- [ ] Botão "Entrar na Forja" salva dados
- [ ] Botão "Pular Tudo" cria usuário padrão
- [ ] Clique repetido em "Um anel..." ativa easter eggs
- [ ] Konami code (↑ ↑ ↓ ↓ ← → ← → B A) funciona
- [ ] Design da toca dos hobbits é visível
- [ ] Cores douradas aparecem corretamente

## 2. Dashboard

- [ ] Após login, dashboard é exibido
- [ ] Data/hora do último acesso aparece
- [ ] Abas aparecem corretamente
- [ ] Botão logout funciona e volta para login
- [ ] Status do currículo é exibido corretamente
- [ ] Botão "Exportar PDF" está desabilitado inicialmente
- [ ] Currículo em branco aparece no lado direito (desktop)

## 3. Dados Pessoais

- [ ] Campos são pré-preenchidos com dados do login
- [ ] Todos os campos podem ser editados
- [ ] Botão "Salvar Dados Pessoais" salva as mudanças
- [ ] Dados aparecem no currículo em tempo real
- [ ] Título profissional aparece no currículo

## 4. Formação Acadêmica

- [ ] Botão "+ Adicionar Curso" abre modal
- [ ] Modal tem todos os campos necessários
- [ ] Validação de campos obrigatórios funciona
- [ ] Curso concluído mostra apenas "Concluído"
- [ ] Curso não concluído calcula:
  - [ ] Previsão de término
  - [ ] Meses restantes
  - [ ] Porcentagem concluída
- [ ] Cursos aparecem na lista
- [ ] Botão deletar remove o curso
- [ ] Cursos aparecem no currículo em tempo real
- [ ] Cálculos automáticos estão corretos

### Teste Específico de Cálculo:
```
Curso: Teste
Data: Fevereiro/2026
Duração: 12 meses
Esperado: Fevereiro/2027
```

## 5. Experiência Profissional

- [ ] Botão "+ Adicionar Experiência" abre modal
- [ ] Modal tem todos os campos necessários
- [ ] Checkbox "Trabalho atual" desabilita campo de saída
- [ ] Experiências aparecem na lista
- [ ] Botão deletar remove a experiência
- [ ] Experiências aparecem no currículo
- [ ] Data de saída mostra "Atual" para trabalho atual
- [ ] Descrição (opcional) aparece quando preenchida

## 6. Skills

- [ ] Datalist aparece com 40+ sugestões
- [ ] Pode selecionar da lista
- [ ] Pode digitar skill personalizada
- [ ] Botão "+ Adicionar Skill" adiciona ao sistema
- [ ] Enter adiciona skill
- [ ] Skills aparecem como badges dourados
- [ ] Botão X no badge remove skill
- [ ] Skills aparecem no currículo
- [ ] Não permite adicionar skill duplicada

## 7. Links

- [ ] Campos de GitHub, LinkedIn e Portfólio
- [ ] Todos são opcionais
- [ ] Links salvam corretamente
- [ ] Links aparecem no currículo
- [ ] Links podem ser clicáveis

## 8. Certificados

- [ ] Upload de arquivo funciona
- [ ] Aceita PDF e imagens
- [ ] Campo de nome é preenchível
- [ ] Certificado é salvo com sucesso
- [ ] Certificados aparecem na lista
- [ ] Botão "Visualizar" faz download
- [ ] Botão "Deletar" remove certificado
- [ ] Link de certificados aparece no currículo

## 9. Editor de Cores

- [ ] Color picker para fundo
- [ ] Color picker para texto
- [ ] Color picker para destaque
- [ ] Slider de tamanho de fonte (12-24px)
- [ ] Cores aplicadas em tempo real
- [ ] Botão "Resetar para Padrão" funciona
- [ ] Cores são salvas no localStorage
- [ ] Cores persistem ao recarregar

## 10. Visualização do Currículo

- [ ] Currículo vazio é exibido inicialmente
- [ ] Currículo atualiza quando dados são adicionados
- [ ] Estrutura está completa:
  - [ ] Cabeçalho com nome e contato
  - [ ] Sobre mim (se preenchido)
  - [ ] Experiência profissional
  - [ ] Formação acadêmica
  - [ ] Skills
  - [ ] Links (se preenchidos)
  - [ ] Certificados (se existem)
- [ ] Cores aplicadas aparecem no currículo

## 11. Exportação PDF

- [ ] Botão aparece desabilitado sem dados
- [ ] Botão fica habilitado com educação ou experiência
- [ ] PDF é baixado com nome correto
- [ ] PDF contém todos os dados
- [ ] Cores e tamanho de fonte aparecem no PDF
- [ ] Formatação é preservada

## 12. localStorage

- [ ] Dados persistem ao recarregar página
- [ ] Logout limpa dados
- [ ] Cada campo salva nos dados corretos:
  - [ ] user
  - [ ] education
  - [ ] experience
  - [ ] skills
  - [ ] links
  - [ ] certificates
  - [ ] editorSettings
  - [ ] lastAccess
  - [ ] lastCurriculumUpdate

## 13. Responsividade

### Mobile (< 480px)
- [ ] Layout em coluna única
- [ ] Abas scrollam horizontalmente
- [ ] Botões adequados para toque
- [ ] Modais se ajustam à tela
- [ ] Texto legível

### Tablet (480-768px)
- [ ] Layout em 2 colunas onde apropriado
- [ ] Currículo não aparece no lado (está sobreposto)
- [ ] Formulários ficam legíveis
- [ ] Imagem

### Desktop (> 768px)
- [ ] Currículo aparece no lado direito
- [ ] Layout é confortável
- [ ] Abas não scrollam (todas visíveis)

## 14. Easter Eggs

- [ ] Clique repetido em "Um anel..." exibe 5 mensagens
- [ ] Mensagens mudam progressivamente
- [ ] Último clique mostra resultado especial
- [ ] Texto brilha com efeito dourado
- [ ] Konami code causa inversão de cores
- [ ] Há um delay antes de voltar ao normal

## 15. Tratamento de Erros

- [ ] Aviso ao tentar adicionar skill duplicada
- [ ] Aviso ao tentar exportar PDF sem dados
- [ ] Aviso ao tentar adicionar certificado sem nome
- [ ] Modal fecha ao clicar fora dele
- [ ] Cancelar fecha modal sem salvar

## 16. Usabilidade

- [ ] Primeira visita é intuitiva
- [ ] Navegação entre abas é clara
- [ ] Instruções são claras quando necessário
- [ ] Cores indicam diferentes tipos de botões
- [ ] Estado do sistema é sempre claro

## 17. Performance

- [ ] Página carrega rapidamente
- [ ] Não há lag ao digitar
- [ ] Transições são suaves
- [ ] localStorage não causa lentidão
- [ ] PDF exporta em tempo razoável

## 18. Design Temático

- [ ] Paleta medieval é consistente
- [ ] Ouro é destacado corretamente
- [ ] Sem emojis (conforme solicitado)
- [ ] Tipografia serif é apropriada
- [ ] Efeitos de sombra funcionam

## Checklist de Regressão Completa

Executar estes testes em ordem após cada alteração maior:

1. [ ] Teste completo de login e autenticação
2. [ ] Teste de preenchimento de todos os campos
3. [ ] Teste de cálculos de educação (diferentes durações)
4. [ ] Teste de export PDF
5. [ ] Teste de limpeza e logout
6. [ ] Teste em diferentes navegadores
7. [ ] Teste em diferentes resoluções de tela
8. [ ] Teste de localStorage (F12 > Application)
9. [ ] Teste de todos os easter eggs
10. [ ] Teste de performance com muitos dados

## Dados de Teste Sugeridos

### Usuário 1 - Desenvolvedor Júnior
```
Nome: João Pedro Silva
Nascimento: 15/01/2000
Email: joao@example.com
Telefone: (11) 99999-0000
Endereço: Rua A, 123, São Paulo
Título: Desenvolvedor Full Stack Junior
```

Educação:
```
Curso: Análise de Sistemas
Instituição: FATEC
Início: 02/2021
Duração: 24 meses
```

Experiência:
```
Cargo: Desenvolvedor Junior
Empresa: Tech Company
Entrada: 01/2023
Saída: - (Atual)
Descrição: Desenvolvimento de aplicações web
```

Skills:
- JavaScript
- React
- Node.js
- PostgreSQL
- Proatividade

### Usuário 2 - Profissional Sênior
```
Nome: Maria da Silva Santos
Nascimento: 20/05/1985
Email: maria@example.com
Telefone: (21) 98888-0000
Endereço: Av. Paulista, 1000, São Paulo
Título: Gerente de Projetos TI
```

Educação:
```
Curso 1: Administração
Instituição: USP
Início: 02/2003
Duração: 48 meses (Concluído)

Curso 2: MBA Gestão de Projetos
Instituição: FGV
Início: 01/2015
Duração: 24 meses (Concluído)
```

Experiência:
```
Exp 1: Desenvolvedora
Empresa: Company A
Entrada: 03/2007
Saída: 05/2010

Exp 2: Tech Lead
Empresa: Company B
Entrada: 06/2010
Saída: 12/2015

Exp 3: Gerente de Projetos
Empresa: Company C
Entrada: 01/2016
Saída: - (Atual)
```

Skills:
- Liderança
- Comunicação
- Gestão de Projetos
- Excel
- Power BI
- SQL
- Colaboração
- Resolução de problemas

---

**Último Atualizado:** 06/02/2026
**Versão do Sistema:** 1.0
