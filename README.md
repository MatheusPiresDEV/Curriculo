# Forja de Currículos - A Forja de Currículos da Terra Média

Um site completo para criar, editar e exportar currículos com design medieval inspirado em O Senhor dos Anéis, utilizando HTML, CSS puro e JavaScript com armazenamento em localStorage.

## 🎯 Funcionalidades

### 1. Autenticação Local
- Tela de login inspirada na toca dos Hobbits
- Dados armazenados apenas em localStorage
- Easter eggs escondidos para diversão

### 2. Gerenciamento de Dados Pessoais
- Nome completo, data de nascimento, e-mail
- Telefone e endereço
- Título profissional
- Seção "Sobre mim"

### 3. Formação Acadêmica
- Adicionar múltiplos cursos
- Campos: Nome do curso, Instituição, Data de início, Duração
- Cálculo automático de:
  - Previsão de término (se não concluído)
  - Tempo restante em meses
  - Porcentagem concluída
- Marcação de curso como concluído

### 4. Experiência Profissional
- Múltiplas entradas de experiência
- Campos: Cargo, Empresa, Data de entrada, Data de saída
- Opção para marcar como "trabalho atual"
- Descrição de atividades (opcional)

### 5. Habilidades (Skills)
- Lista suspensa com 40+ skills sugeridas:
  - Linguagens de programação
  - Frameworks web
  - Bancos de dados
  - Ferramentas
  - Soft skills
- Possibilidade de adicionar skills personalizadas
- Gerenciamento completo (add/remove)

### 6. Links Opcionais
- GitHub
- LinkedIn
- Portfólio pessoal

### 7. Certificados
- Upload de arquivos (PDF, imagens)
- Armazenamento em base64 no localStorage
- Visualização e download

### 8. Editor de Currículo
- Personalização de cores:
  - Cor de fundo
  - Cor do texto
  - Cor de destaque
- Ajuste de tamanho de fonte
- Visualização em tempo real

### 9. Exportação em PDF
- Download automático do currículo
- Mantém formatação e personalizações

### 10. Visualização em Tempo Real
- Currículo sempre visível e atualizado
- Atualizações instantâneas conforme dados são preenchidos

## 🎨 Design e Estilo

### Paleta de Cores
- **Fundo Principal**: #1a1a1a (preto muito escuro)
- **Fundo Secundário**: #2d2d2d
- **Destaque**: #d4af37 (ouro)
- **Texto**: #f5f5f5 (branco suave)

### Tipografia
- Fonte medieval: Georgia, Garamond, serif
- Titles com efeito de sombra
- Texto com luminância de ouro

### Design Responsivo
- Mobile First
- Flexível em tablets e desktops
- Layout otimizado para telas pequenas

## 📱 Responsividade

- **Mobile** (< 480px): Layout ajustado, fonte reduzida
- **Tablet** (480px - 768px): Layout em dois pontos de quebra
- **Desktop** (> 768px): Layout completo com visualização lateral do currículo

## 🔐 Armazenamento em localStorage

Todos os dados são salvos em localStorage:
```javascript
- user: Dados pessoais
- education: Formação
- experience: Experiência
- skills: Habilidades
- links: Links opcionais
- certificates: Certificados (base64)
- editorSettings: Personalizações
```

## 🎁 Easter Eggs

1. **Clique na frase "Um anel para governar..."** - Sequência de diálogos do Anel Único
2. **Konami Code** (↑ ↑ ↓ ↓ ← → ← → B A) - Modo invertido especial

## 🚀 Como Usar

1. **Abrir o site**: Abra `index.html` em um navegador
2. **Primeira visita**: Preencha seus dados de cadastro ou clique "Pular Tudo"
3. **Adicionar dados**: Use as abas para preencher informações
4. **Visualizar currículo**: Veja em tempo real à medida que preenche
5. **Personalizar**: Vá para a aba "Editor" para ajustar cores e fontes
6. **Exportar**: Clique em "Exportar PDF" para baixar seu currículo

## 📋 Campos Obrigatórios vs Opcionais

### Obrigatórios
- Nome completo
- Data de nascimento
- E-mail

### Altamente Recomendados
- Título profissional
- Experiência profissional (pelo menos 1)
- Formação (pelo menos 1)
- Skills (pelo menos 1)

### Opcionais
- Telefone
- Endereço
- Sobre mim
- GitHub, LinkedIn, Portfólio
- Certificados

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, Gradientes, Animações
- **JavaScript ES6+**: Manipulação DOM, localStorage, geração PDF
- **html2pdf.js**: Para exportação em PDF

## 💾 Backup de Dados

Recomenda-se periodicamente:
1. Clicar em "Exportar PDF" para salvar uma cópia
2. Ou exportar dados do localStorage via console:
```javascript
// No console do navegador
JSON.stringify(localStorage)
```

## 🔄 Redefinir Dados

Para limpar todos os dados:
```javascript
// No console do navegador
localStorage.clear()
// Depois recarregue a página
```

## 📱 Navegadores Suportados

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Opera 47+

## 🎯 Fluxo de Uso Recomendado

1. **Dados Pessoais**: Começar preenchendo nome, email, data de nascimento
2. **Formação**: Adicionar cursos e previsões de término
3. **Experiência**: Documentar histórico profissional
4. **Skills**: Listar habilidades técnicas e soft skills
5. **Links**: Adicionar links para portfólio e redes sociais
6. **Editor**: Personalizar aparência conforme preferência
7. **Exportar**: Baixar PDF quando estiver satisfeito

## 🐛 Troubleshooting

### Dados não são salvos
- Verifique se localStorage está habilitado no navegador
- Não use modo privado/incógnito

### PDF não exporta corretamente
- Tente novamente com menos dados
- Atualize a página e tente novamente

### Cores não aparecem corretamente
- Limpe o cache do navegador
- Verifique as configurações do editor

## 📄 Licença

Projeto livre para uso pessoal.

## 🎭 Tema e Inspiração

Design completamente temático sobre O Senhor dos Anéis, com:
- Paleta medieval
- Easter eggs da saga
- Referências ao Anel Único
- Tipografia clássica
- Sem uso de emojis (conforme solicitação)

---

**Versão 1.0** - Forja de Currículos está pronta para uso!
