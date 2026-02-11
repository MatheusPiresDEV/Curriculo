// ==================== GERENCIAMENTO DE DADOS EM LOCALSTORAGE ====================
const StorageManager = {
    getUser() {
        return JSON.parse(localStorage.getItem('user')) || null;
    },
    
    saveUser(data) {
        localStorage.setItem('user', JSON.stringify(data));
        updateLastUpdate();
    },
    
    getCurriculum() {
        return JSON.parse(localStorage.getItem('curriculum')) || null;
    },
    
    saveCurriculum(data) {
        localStorage.setItem('curriculum', JSON.stringify(data));
        localStorage.setItem('lastCurriculumUpdate', new Date().toISOString());
        updateLastUpdate();
    },
    
    getEducation() {
        return JSON.parse(localStorage.getItem('education')) || [];
    },
    
    saveEducation(data) {
        localStorage.setItem('education', JSON.stringify(data));
        updateCurriculumPreview();
    },
    
    getExperience() {
        return JSON.parse(localStorage.getItem('experience')) || [];
    },
    
    saveExperience(data) {
        localStorage.setItem('experience', JSON.stringify(data));
        updateCurriculumPreview();
    },
    
    getSkills() {
        return JSON.parse(localStorage.getItem('skills')) || [];
    },
    
    saveSkills(data) {
        localStorage.setItem('skills', JSON.stringify(data));
        updateCurriculumPreview();
    },
    
    getLinks() {
        return JSON.parse(localStorage.getItem('links')) || {};
    },
    
    saveLinks(data) {
        localStorage.setItem('links', JSON.stringify(data));
        updateCurriculumPreview();
    },
    
    getCertificates() {
        return JSON.parse(localStorage.getItem('certificates')) || [];
    },
    
    saveCertificates(data) {
        localStorage.setItem('certificates', JSON.stringify(data));
        updateCurriculumPreview();
    },
    
    getEditorSettings() {
        return JSON.parse(localStorage.getItem('editorSettings')) || {
            // Default preview settings adjusted to match requested template
            bgColor: '#ffffff',
            textColor: '#000000',
            accentColor: '#0b66d6',
            fontSize: '12',
            fontFamily: 'Arial'
        };
    },
    
    saveEditorSettings(data) {
        localStorage.setItem('editorSettings', JSON.stringify(data));
        applyEditorSettings(data);
    }
};

// ==================== INICIALIZAÇÃO ==================== 
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 DOMContentLoaded - Inicializando aplicação...');
    
    try {
        setupEventListeners();
        console.log('✅ Event listeners registrados');
    } catch (e) {
        console.error('❌ Erro ao registrar event listeners:', e);
    }
    
    const user = StorageManager.getUser();
    
    if (user) {
        console.log('👤 Usuário encontrado:', user.fullName);
        showMainScreen();
        loadUserData();
    } else {
        console.log('🚪 Nenhum usuário - Mostrando login');
        showLoginScreen();
        setupLoginEasterEggs();
    }
    
    updateLastAccess();
    console.log('✅ Aplicação inicializada com sucesso');
});

function setupEventListeners() {
    console.log('🔌 Registrando event listeners...');
    
    // Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        console.log('✅ loginForm listener');
    }
    const skipBtn = document.querySelector('.btn-skip');
    if (skipBtn) {
        skipBtn.addEventListener('click', handleSkipLogin);
        console.log('✅ skipBtn listener');
    }
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
        console.log('✅ logoutBtn listener');
    }
    
    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    console.log(`📑 Encontrados ${tabBtns.length} botões de tab`);
    tabBtns.forEach(btn => {
        btn.addEventListener('click', switchTab);
    });
    
    // Formulários
    const personalForm = document.getElementById('personalForm');
    if (personalForm) {
        personalForm.addEventListener('submit', handlePersonalForm);
        console.log('✅ personalForm listener');
    }
    const linksForm = document.getElementById('linksForm');
    if (linksForm) {
        linksForm.addEventListener('submit', handleLinksForm);
        console.log('✅ linksForm listener');
    }
    
    // Educação
    const addEducationBtn = document.getElementById('addEducationBtn');
    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', () => {
            console.log('🎓 Clique em Adicionar Curso');
            openModal('educationModal');
        });
        console.log('✅ addEducationBtn listener');
    } else {
        console.warn('⚠️ addEducationBtn NÃO ENCONTRADO');
    }
    
    const educationForm = document.getElementById('educationForm');
    if (educationForm) {
        educationForm.addEventListener('submit', handleEducationSubmit);
        console.log('✅ educationForm listener');
    }
    const courseCompleted = document.getElementById('courseCompleted');
    if (courseCompleted) {
        courseCompleted.addEventListener('change', handleCourseCompletedChange);
        console.log('✅ courseCompleted listener');
    }
    
    // Experiência
    const addExperienceBtn = document.getElementById('addExperienceBtn');
    if (addExperienceBtn) {
        addExperienceBtn.addEventListener('click', () => {
            console.log('💼 Clique em Adicionar Experiência');
            openModal('experienceModal');
        });
        console.log('✅ addExperienceBtn listener');
    } else {
        console.warn('⚠️ addExperienceBtn NÃO ENCONTRADO');
    }
    
    const experienceForm = document.getElementById('experienceForm');
    if (experienceForm) {
        experienceForm.addEventListener('submit', handleExperienceSubmit);
        console.log('✅ experienceForm listener');
    }
    const currentJob = document.getElementById('currentJob');
    if (currentJob) {
        currentJob.addEventListener('change', handleCurrentJobChange);
        console.log('✅ currentJob listener');
    }
    
    // Skills
    const addSkillBtn = document.getElementById('addSkillBtn');
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', () => {
            console.log('🎯 Clique em Adicionar Skill (abrindo modal)');
            openModal('skillsModal');
        });
        console.log('✅ addSkillBtn listener');
    } else {
        console.warn('⚠️ addSkillBtn NÃO ENCONTRADO');
    }

    // Botão para adicionar múltiplas skills selecionadas
    const addSelectedSkillsBtn = document.getElementById('addSelectedSkillsBtn');
    if (addSelectedSkillsBtn) {
        addSelectedSkillsBtn.addEventListener('click', () => {
            console.log('🎯 Clique em Adicionar Selecionadas');
            addSelectedSkills();
        });
        console.log('✅ addSelectedSkillsBtn listener');
    } else {
        console.warn('⚠️ addSelectedSkillsBtn NÃO ENCONTRADO');
    }
    
    const skillsInput = document.getElementById('skillsInput');
    if (skillsInput) {
        skillsInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                console.log('📝 Enter pressionado em skillsInput');
                e.preventDefault();
                addSkill();
            }
        });
        console.log('✅ skillsInput listener');
    } else {
        console.warn('⚠️ skillsInput NÃO ENCONTRADO');
    }

    // Listener do formulário do modal de skills
    const skillsForm = document.getElementById('skillsForm');
    if (skillsForm) {
        skillsForm.addEventListener('submit', handleSkillsSubmit);
        console.log('✅ skillsForm listener');
    } else {
        console.warn('⚠️ skillsForm NÃO ENCONTRADO');
    }
    
    // Certificados
    const addCertificateBtn = document.getElementById('addCertificateBtn');
    if (addCertificateBtn) {
        addCertificateBtn.addEventListener('click', handleAddCertificate);
        console.log('✅ addCertificateBtn listener');
    } else {
        console.warn('⚠️ addCertificateBtn NÃO ENCONTRADO');
    }
    
    // Editor
    const bgColor = document.getElementById('bgColor');
    if (bgColor) {
        bgColor.addEventListener('change', updateEditorSettings);
        console.log('✅ bgColor listener');
    }
    const textColor = document.getElementById('textColor');
    if (textColor) {
        textColor.addEventListener('change', updateEditorSettings);
        console.log('✅ textColor listener');
    }
    const accentColor = document.getElementById('accentColor');
    if (accentColor) {
        accentColor.addEventListener('change', updateEditorSettings);
        console.log('✅ accentColor listener');
    }
    const fontSize = document.getElementById('fontSize');
    if (fontSize) {
        fontSize.addEventListener('change', updateEditorSettings);
        console.log('✅ fontSize listener');
    }
    const fontFamily = document.getElementById('fontFamily');
    if (fontFamily) {
        fontFamily.addEventListener('change', updateEditorSettings);
        console.log('✅ fontFamily listener');
    }
    const resetEditorBtn = document.getElementById('resetEditorBtn');
    if (resetEditorBtn) {
        resetEditorBtn.addEventListener('click', resetEditor);
        console.log('✅ resetEditorBtn listener');
    }
    
    // Dashboard
    const createCurriculumBtn = document.getElementById('createCurriculumBtn');
    if (createCurriculumBtn) {
        createCurriculumBtn.addEventListener('click', createCurriculum);
        console.log('✅ createCurriculumBtn listener');
    }
    const exportPdfBtn = document.getElementById('exportPdfBtn');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', exportPDF);
        console.log('✅ exportPdfBtn listener');
    }
    const editCurriculumBtn = document.getElementById('editCurriculumBtn');
    if (editCurriculumBtn) {
        editCurriculumBtn.addEventListener('click', () => switchTab({target: {dataset: {tab: 'editor'}}}));
        console.log('✅ editCurriculumBtn listener');
    }
    
    console.log('✅ Todos os event listeners registrados com sucesso');
}

// ==================== AUTENTICAÇÃO ==================== 
function handleLogin(e) {
    e.preventDefault();
    console.log('🔐 handleLogin() - Tentando fazer login...');
    
    const fullName = document.getElementById('fullName').value;
    const birthDate = document.getElementById('birthDate').value;
    const email = document.getElementById('email').value;
    
    console.log(`📝 Dados: ${fullName}, ${birthDate}, ${email}`);
    
    if (!fullName || !birthDate || !email) {
        console.error('❌ Campos obrigatórios vazios');
        showAlert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    const user = {
        fullName: fullName,
        birthDate: birthDate,
        email: email,
        phone: document.getElementById('phone').value || '',
        address: document.getElementById('address').value || '',
        createdAt: new Date().toISOString()
    };
    
    console.log('💾 Salvando usuário em localStorage...');
    StorageManager.saveUser(user);
    localStorage.setItem('lastAccess', new Date().toISOString());
    console.log('✅ Usuário salvo com sucesso');
    
    console.log('📺 Mostrando tela principal...');
    showMainScreen();
    console.log('✅ Tela principal mostrada');
    
    loadUserData();
    console.log('✅ Login concluído com sucesso!');
}

function handleSkipLogin() {
    const user = {
        fullName: 'Usuário',
        birthDate: new Date().toISOString().split('T')[0],
        email: 'usuario@example.com',
        phone: '',
        address: '',
        createdAt: new Date().toISOString()
    };
    
    StorageManager.saveUser(user);
    localStorage.setItem('lastAccess', new Date().toISOString());
    
    showMainScreen();
    loadUserData();
}

function handleLogout() {
    localStorage.clear();
    location.reload();
}

// ==================== TELAS ==================== 
function showLoginScreen() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('mainScreen').style.display = 'none';
}

function showMainScreen() {
    console.log('📺 showMainScreen() - Exibindo tela principal...');
    const loginScreen = document.getElementById('loginScreen');
    const mainScreen = document.getElementById('mainScreen');
    
    if (!loginScreen) {
        console.error('❌ loginScreen NÃO ENCONTRADO');
        return;
    }
    if (!mainScreen) {
        console.error('❌ mainScreen NÃO ENCONTRADO');
        return;
    }
    
    console.log('👁️ Ocultando tela de login...');
    loginScreen.style.display = 'none';
    console.log('👁️ Exibindo tela principal...');
    mainScreen.style.display = 'flex';
    
    console.log('🎨 Atualizando currículo preview...');
    updateCurriculumPreview();
    console.log('🎨 Aplicando configurações do editor...');
    // Forçar configurações de visualização conforme solicitado pelo usuário
    const forcedSettings = {
        bgColor: '#ffffff',
        textColor: '#000000',
        accentColor: '#0b66d6',
        fontSize: '12',
        fontFamily: 'Arial'
    };
    try {
        StorageManager.saveEditorSettings(forcedSettings);
        console.log('✅ Editor settings forçados para preview (Arial 12, preto, links azuis)');
    } catch (e) {
        console.warn('⚠️ Não foi possível salvar editorSettings:', e);
    }
    applyEditorSettings(StorageManager.getEditorSettings());
    
    // Renderizar seletor de skills
    try {
        renderSkillsSelector();
    } catch (e) {
        console.warn('⚠️ Erro ao renderizar skills selector:', e);
    }
    
    // Renderizar lista de skills
    try {
        renderSkills();
    } catch (e) {
        console.warn('⚠️ Erro ao renderizar skills list:', e);
    }
    
    console.log('✅ showMainScreen() concluído com sucesso');
}

// ==================== CARREGAR DADOS ==================== 
function loadUserData() {
    const user = StorageManager.getUser();
    
    if (user) {
        // Dados pessoais
        document.getElementById('editFullName').value = user.fullName || '';
        document.getElementById('editBirthDate').value = user.birthDate || '';
        document.getElementById('editEmail').value = user.email || '';
        document.getElementById('editPhone').value = user.phone || '';
        document.getElementById('editAddress').value = user.address || '';
        document.getElementById('professionalTitle').value = user.professionalTitle || '';
        document.getElementById('aboutMe').value = user.aboutMe || '';
        
        // Links
        const links = StorageManager.getLinks();
        document.getElementById('githubLink').value = links.github || '';
        document.getElementById('linkedinLink').value = links.linkedin || '';
        document.getElementById('portfolioLink').value = links.portfolio || '';
        
        // Skills
        renderSkills();
        
        // Educação
        renderEducation();
        
        // Experiência
        renderExperience();
        
        // Certificados
        renderCertificates();
    }
    
    updateCurriculumPreview();
}

// ==================== DADOS PESSOAIS ==================== 
function handlePersonalForm(e) {
    e.preventDefault();
    
    const user = StorageManager.getUser();
    user.fullName = document.getElementById('editFullName').value;
    user.birthDate = document.getElementById('editBirthDate').value;
    user.email = document.getElementById('editEmail').value;
    user.phone = document.getElementById('editPhone').value;
    user.address = document.getElementById('editAddress').value;
    user.professionalTitle = document.getElementById('professionalTitle').value;
    user.aboutMe = document.getElementById('aboutMe').value;
    
    StorageManager.saveUser(user);
    updateCurriculumPreview();
    showAlert('Dados pessoais salvos com sucesso!');
}

// Variáveis de edição para modais
let editingEducationId = null;
let editingExperienceId = null;

// ==================== FORMAÇÃO ==================== 
function handleEducationSubmit(e) {
    e.preventDefault();
    console.log('📚 handleEducationSubmit() - Salvando curso...');
    
    const education = {
        id: Date.now(),
        courseName: document.getElementById('courseName').value,
        institution: document.getElementById('institution').value,
        startMonth: document.getElementById('startMonth').value,
        duration: parseInt(document.getElementById('duration').value),
        completed: document.getElementById('courseCompleted').checked
    };
    
    console.log('📝 Dados do curso:', education);
    
    const educations = StorageManager.getEducation();
    if (editingEducationId) {
        // Editar existente
        const idx = educations.findIndex(c => c.id === editingEducationId);
        if (idx >= 0) {
            education.id = editingEducationId;
            educations[idx] = education;
            console.log('✏️ Curso editado:', education);
        }
        editingEducationId = null;
    } else {
        educations.push(education);
        console.log('➕ Curso adicionado:', education);
    }
    StorageManager.saveEducation(educations);
    console.log(`✅ Curso salvo! Total: ${educations.length}`);
    closeModal('educationModal');
    document.getElementById('educationForm').reset();
    renderEducation();
}

function handleCourseCompletedChange(e) {
    const durationMonths = parseInt(document.getElementById('duration').value) || 0;
    const startMonth = document.getElementById('startMonth').value;
    
    if (e.target.checked) {
        document.getElementById('completionDetails').style.display = 'block';
        document.getElementById('completionInfo').innerHTML = 'Curso marcado como concluído.';
    } else {
        if (startMonth && durationMonths > 0) {
            const [year, month] = startMonth.split('-').map(Number);
            const startDate = new Date(year, month - 1);
            const endDate = new Date(startDate.getTime() + durationMonths * 30 * 24 * 60 * 60 * 1000);
            
            const now = new Date();
            const timeRemaining = endDate - now;
            const monthsRemaining = Math.ceil(timeRemaining / (30 * 24 * 60 * 60 * 1000));
            const progressPercent = Math.min(100, Math.max(0, 100 - ((monthsRemaining / durationMonths) * 100)));
            
            document.getElementById('completionDetails').style.display = 'block';
            document.getElementById('completionInfo').innerHTML = `
                Previsão de término: ${endDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} <br>
                Meses restantes: ${monthsRemaining > 0 ? monthsRemaining : 'Concluído'} <br>
                Progresso: ${Math.round(progressPercent)}%
            `;
        }
    }
}

function renderEducation() {
    console.log('🎓 renderEducation() chamado');
    const educations = StorageManager.getEducation();
    const container = document.getElementById('educationList');
    
    if (!container) {
        console.warn('⚠️ educationList container NÃO ENCONTRADO');
        return;
    }
    
    container.innerHTML = '';
    
    if (educations.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">Nenhum curso adicionado ainda.</p>';
        console.log('ℹ️ Nenhum curso adicionado');
        return;
    }
    
    console.log(`📚 Renderizando ${educations.length} curso(s)`);
    educations.forEach(edu => {
        const completionInfo = getEducationInfo(edu);
        
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-content">
                <div class="list-item-title">${edu.courseName}</div>
                <div class="list-item-subtitle">${edu.institution}</div>
                <div class="list-item-subtitle">Início: ${formatMonth(edu.startMonth)}</div>
                <div class="list-item-subtitle">${completionInfo}</div>
            </div>
            <div class="list-item-buttons">
                <button class="btn-secondary" onclick="editEducation(${edu.id})">Editar</button>
                <button class="btn-delete" onclick="deleteEducation(${edu.id})">Deletar</button>
            </div>
        `;
        container.appendChild(item);
    });
}

function editEducation(id) {
    const educations = StorageManager.getEducation();
    const edu = educations.find(e => e.id === id);
    if (!edu) return;
    editingEducationId = id;
    document.getElementById('courseName').value = edu.courseName || '';
    document.getElementById('institution').value = edu.institution || '';
    document.getElementById('startMonth').value = edu.startMonth || '';
    document.getElementById('duration').value = edu.duration || '';
    document.getElementById('courseCompleted').checked = !!edu.completed;
    if (edu.completed) document.getElementById('completionDetails').style.display = 'block';
    else document.getElementById('completionDetails').style.display = 'none';
    openModal('educationModal');
}

function deleteEducation(id) {
    const educations = StorageManager.getEducation();
    const filtered = educations.filter(e => e.id !== id);
    StorageManager.saveEducation(filtered);
    renderEducation();
}

// ==================== EXPERIÊNCIA ==================== 
function handleExperienceSubmit(e) {
    e.preventDefault();
    console.log('💼 handleExperienceSubmit() - Salvando experiência...');
    
    const experience = {
        id: Date.now(),
        jobTitle: document.getElementById('jobTitle').value,
        company: document.getElementById('company').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        currentJob: document.getElementById('currentJob').checked,
        description: document.getElementById('jobDescription').value
    };
    
    console.log('📝 Dados da experiência:', experience);
    
    const experiences = StorageManager.getExperience();
    if (editingExperienceId) {
        const idx = experiences.findIndex(ex => ex.id === editingExperienceId);
        if (idx >= 0) {
            experience.id = editingExperienceId;
            experiences[idx] = experience;
            console.log('✏️ Experiência editada:', experience);
        }
        editingExperienceId = null;
    } else {
        experiences.push(experience);
        console.log('➕ Experiência adicionada:', experience);
    }
    StorageManager.saveExperience(experiences);
    console.log(`✅ Experiência salva! Total: ${experiences.length}`);
    closeModal('experienceModal');
    document.getElementById('experienceForm').reset();
    renderExperience();
}

function handleCurrentJobChange(e) {
    if (e.target.checked) {
        document.getElementById('endDate').value = '';
        document.getElementById('endDate').disabled = true;
    } else {
        document.getElementById('endDate').disabled = false;
    }
}

function renderExperience() {
    console.log('💼 renderExperience() chamado');
    const experiences = StorageManager.getExperience();
    const container = document.getElementById('experienceList');
    
    if (!container) {
        console.error('❌ experienceList container NÃO ENCONTRADO');
        return;
    }
    
    container.innerHTML = '';
    
    if (experiences.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">Nenhuma experiência adicionada ainda.</p>';
        console.log('ℹ️ Nenhuma experiência adicionada');
        return;
    }
    
    console.log(`🏢 Renderizando ${experiences.length} experiência(s)`);
    
    experiences.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-content">
                <div class="list-item-title">${exp.jobTitle}</div>
                <div class="list-item-subtitle">${exp.company}</div>
                <div class="list-item-subtitle">
                    ${formatMonth(exp.startDate)} - ${exp.currentJob ? 'Atual' : formatMonth(exp.endDate)}
                </div>
                ${exp.description ? `<div class="list-item-subtitle">${exp.description}</div>` : ''}
            </div>
            <div class="list-item-buttons">
                <button class="btn-secondary" onclick="editExperience(${exp.id})">Editar</button>
                <button class="btn-delete" onclick="deleteExperience(${exp.id})">Deletar</button>
            </div>
        `;
        container.appendChild(item);
    });
}

function editExperience(id) {
    const experiences = StorageManager.getExperience();
    const exp = experiences.find(e => e.id === id);
    if (!exp) return;
    editingExperienceId = id;
    document.getElementById('jobTitle').value = exp.jobTitle || '';
    document.getElementById('company').value = exp.company || '';
    document.getElementById('startDate').value = exp.startDate || '';
    document.getElementById('endDate').value = exp.endDate || '';
    document.getElementById('currentJob').checked = !!exp.currentJob;
    document.getElementById('jobDescription').value = exp.description || '';
    if (exp.currentJob) document.getElementById('endDate').disabled = true;
    else document.getElementById('endDate').disabled = false;
    openModal('experienceModal');
}

function deleteExperience(id) {
    const experiences = StorageManager.getExperience();
    const filtered = experiences.filter(e => e.id !== id);
    StorageManager.saveExperience(filtered);
    renderExperience();
}

// ==================== SKILLS ==================== 
function addSelectedSkills() {
    console.log('➕ addSelectedSkills() chamado');
    const checkboxes = document.querySelectorAll('.skill-checkbox:checked');
    
    if (checkboxes.length === 0) {
        console.warn('⚠️ Nenhuma skill selecionada');
        createToast('Selecione pelo menos uma skill!', 'warning');
        return;
    }

    const selectedSkills = Array.from(checkboxes).map(cb => cb.value);
    console.log(`✅ ${selectedSkills.length} skill(s) selecionada(s):`, selectedSkills);

    const skills = StorageManager.getSkills();
    let addedCount = 0;

    selectedSkills.forEach(skillName => {
        if (!skills.includes(skillName)) {
            skills.push(skillName);
            addedCount++;
        }
    });

    if (addedCount > 0) {
        StorageManager.saveSkills(skills);
        console.log(`✅ ${addedCount} skill(s) adicionada(s)`);
        createToast(`${addedCount} skill(s) adicionada(s) com sucesso!`, 'success');
        renderSkills();
        renderSkillsSelector();
    } else {
        console.log('ℹ️ Todas as skills já foram adicionadas');
        createToast('Todas essas skills já foram adicionadas!', 'info');
    }
}

function addSkill() {
    // Adiciona skill usando o campo rápido (skillsInput)
    const input = document.getElementById('skillsInput');
    if (!input) {
        console.error('❌ skillsInput NÃO ENCONTRADO');
        return;
    }
    addSkillByName(input.value.trim());
}

function addSkillByName(skillName) {
    console.log('➕ addSkillByName() chamado para:', skillName);
    if (!skillName) {
        console.warn('⚠️ Campo vazio');
        createToast('Digite uma skill antes de salvar.', 'warning');
        return;
    }

    const skills = StorageManager.getSkills();
    console.log(`🔍 Skills existentes: ${JSON.stringify(skills)}`);

    if (!skills.includes(skillName)) {
        skills.push(skillName);
        StorageManager.saveSkills(skills);
        console.log(`✅ Skill adicionada: "${skillName}"`);
        renderSkills();
        // limpar inputs (tanto modal quanto quick-input)
        const quick = document.getElementById('skillsInput'); if (quick) quick.value = '';
        const modalInput = document.getElementById('skillNameModal'); if (modalInput) modalInput.value = '';
        createToast('Skill adicionada com sucesso!', 'success');
        try { closeModal('skillsModal'); } catch(e){}
    } else {
        console.warn(`⚠️ Skill duplicada: "${skillName}"`);
        createToast('Esta skill já foi adicionada!', 'warning');
    }
}

function handleSkillsSubmit(e) {
    e.preventDefault();
    const modalInput = document.getElementById('skillNameModal');
    if (!modalInput) return;
    const name = modalInput.value.trim();
    addSkillByName(name);
}

function renderSkills() {
    console.log('🎨 renderSkills() chamado');
    const skills = StorageManager.getSkills();
    const container = document.getElementById('skillsList');
    
    if (!container) {
        console.error('❌ skillsList container NÃO ENCONTRADO');
        return;
    }
    
    container.innerHTML = '';
    
    if (skills.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">Nenhuma skill adicionada ainda.</p>';
        console.log('ℹ️ Nenhuma skill adicionada');
        return;
    }
    
    console.log(`🏷️ Renderizando ${skills.length} skill(s)`);
    skills.forEach(skill => {
        const badge = document.createElement('div');
        badge.className = 'skill-badge';
        badge.innerHTML = `
            ${skill}
            <button type="button" onclick="deleteSkill('${skill}')">×</button>
        `;
        container.appendChild(badge);
    });
}

// Renderizar seletor de skills (checkboxes)
function renderSkillsSelector() {
    console.log('🎯 renderSkillsSelector() chamado');
    const predefinedSkills = [
        // Linguagens
        'JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'PHP', 'Go', 'Rust', 'R', 'SQL', 'NoSQL', 'MATLAB', 'Kotlin', 'Swift',
        // Web
        'HTML', 'CSS', 'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django',
        // Banco de Dados
        'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
        // DevOps & Ferramentas
        'GitHub', 'Docker', 'Kubernetes', 'Linux', 'DevOps', 'Cloud AWS', 'Cloud Azure', 'Cloud GCP',
        // Soft Skills
        'Comunicação', 'Trabalho em equipe', 'Liderança', 'Resolução de problemas', 'Pensamento crítico', 'Gestão de tempo', 
        'Adaptabilidade', 'Criatividade', 'Gerenciamento de projetos', 'Agile', 'Scrum', 'Atendimento ao cliente',
        'Vendas', 'Marketing', 'Pesquisa', 'Apresentação', 'Mentoria', 'Documentação', 'Testes',
        // Dados
        'Power BI', 'Tableau', 'Excel Avançado', 'Visualização de dados', 'Análise de dados'
    ];

    const selector = document.getElementById('skillsSelector');
    if (!selector) {
        console.error('❌ skillsSelector NÃO ENCONTRADO');
        return;
    }

    selector.innerHTML = '';
    const currentSkills = StorageManager.getSkills();

    // Criar grade de checkboxes
    predefinedSkills.forEach(skill => {
        const isChecked = currentSkills.includes(skill);
        const label = document.createElement('label');
        label.className = 'skill-checkbox-label';
        label.innerHTML = `
            <input type="checkbox" class="skill-checkbox" value="${skill}" ${isChecked ? 'checked' : ''}>
            <span>${skill}</span>
        `;
        selector.appendChild(label);
    });

    console.log(`✅ Renderizado seletor com ${predefinedSkills.length} skills`);
}

function deleteSkill(skillName) {
    const skills = StorageManager.getSkills();
    const filtered = skills.filter(s => s !== skillName);
    StorageManager.saveSkills(filtered);
    renderSkills();
}

    // ==================== LINKS ====================
    function handleLinksForm(e) {
        e.preventDefault();

        const links = {
            github: document.getElementById('githubLink').value,
            linkedin: document.getElementById('linkedinLink').value,
            portfolio: document.getElementById('portfolioLink').value
        };

        StorageManager.saveLinks(links);
        showAlert('Links salvos com sucesso!');
    }


// ==================== CERTIFICADOS ==================== 
function handleAddCertificate() {
    const fileInput = document.getElementById('certificateFile');
    const nameInput = document.getElementById('certificateName');
    
    if (!fileInput.files.length || !nameInput.value.trim()) {
        showAlert('Selecione um arquivo e digite um nome para o certificado.');
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const certificate = {
            id: Date.now(),
            name: nameInput.value,
            file: e.target.result,
            type: file.type
        };
        
        const certificates = StorageManager.getCertificates();
        certificates.push(certificate);
        StorageManager.saveCertificates(certificates);
        
        fileInput.value = '';
        nameInput.value = '';
        renderCertificates();
        showAlert('Certificado adicionado com sucesso!');
    };
    
    reader.readAsDataURL(file);
}

function renderCertificates() {
    const certificates = StorageManager.getCertificates();
    const container = document.getElementById('certificatesList');
    container.innerHTML = '';
    
    if (certificates.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">Nenhum certificado adicionado ainda.</p>';
        return;
    }
    
    certificates.forEach(cert => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-content">
                <div class="list-item-title">${cert.name}</div>
                <div class="list-item-subtitle">Adicionado em ${new Date(cert.id).toLocaleDateString()}</div>
            </div>
            <div class="list-item-buttons">
                <button class="btn-edit" onclick="downloadCertificate(${cert.id})">Visualizar</button>
                <button class="btn-delete" onclick="deleteCertificate(${cert.id})">Deletar</button>
            </div>
        `;
        container.appendChild(item);
    });
}

function downloadCertificate(id) {
    const certificates = StorageManager.getCertificates();
    const cert = certificates.find(c => c.id === id);
    
    if (cert) {
        const link = document.createElement('a');
        link.href = cert.file;
        link.download = cert.name;
        link.click();
    }
}

function deleteCertificate(id) {
    const certificates = StorageManager.getCertificates();
    const filtered = certificates.filter(c => c.id !== id);
    StorageManager.saveCertificates(filtered);
    renderCertificates();
}

// ==================== EDITOR ==================== 
function updateEditorSettings() {
    const settings = {
        bgColor: document.getElementById('bgColor').value,
        textColor: document.getElementById('textColor').value,
        accentColor: document.getElementById('accentColor').value,
        fontSize: document.getElementById('fontSize').value,
        fontFamily: document.getElementById('fontFamily').value
    };
    
    StorageManager.saveEditorSettings(settings);
    applyEditorSettings(settings);
}

function applyEditorSettings(settings) {
    const curriculum = document.getElementById('curriculum');
    
    if (curriculum) {
        curriculum.style.backgroundColor = settings.bgColor;
        curriculum.style.color = settings.textColor;
        curriculum.style.fontSize = settings.fontSize + 'px';
        curriculum.style.fontFamily = settings.fontFamily || 'Arial';
        
        // Atualizar cores de seções
        const titles = curriculum.querySelectorAll('.curriculum-section-title');
        titles.forEach(title => {
            title.style.borderBottomColor = settings.accentColor;
            // Manter a cor do título como a cor de texto (preto) solicitada
            title.style.color = settings.textColor;
        });
        
        const header = curriculum.querySelector('.curriculum-header');
        if (header) {
            header.style.borderBottomColor = settings.accentColor;
        }
    }
}

function resetEditor() {
    const defaultSettings = {
        bgColor: '#1a1a1a',
        textColor: '#f5f5f5',
        accentColor: '#d4af37',
        fontSize: '16',
        fontFamily: 'Arial'
    };
    
    document.getElementById('bgColor').value = defaultSettings.bgColor;
    document.getElementById('textColor').value = defaultSettings.textColor;
    document.getElementById('accentColor').value = defaultSettings.accentColor;
    document.getElementById('fontSize').value = defaultSettings.fontSize;
    document.getElementById('fontFamily').value = defaultSettings.fontFamily;
    
    StorageManager.saveEditorSettings(defaultSettings);
    applyEditorSettings(defaultSettings);
}

// ==================== CURRÍCULO EM TEMPO REAL ==================== 
function updateCurriculumPreview() {
    const user = StorageManager.getUser();
    const education = StorageManager.getEducation();
    const experience = StorageManager.getExperience();
    const skills = StorageManager.getSkills();
    const links = StorageManager.getLinks();
    const certificates = StorageManager.getCertificates();
    
    // Cabeçalho limpo (modelo solicitado)
    let html = '<div class="curriculum-header">';
    html += `<div class="curriculum-name">${user?.fullName || 'Seu Nome'}</div>`;
    if (user?.professionalTitle) html += `<div class="curriculum-title">${user.professionalTitle}</div>`;
    // contato em linhas separadas na ordem solicitada
    let contactHtml = '';
    if (user?.email) contactHtml += `<div class="contact-line">E-mail: <a href="mailto:${user.email}" class="email-link">${user.email}</a></div>`;
    if (user?.phone) {
        const cleanPhone = user.phone.replace(/\D/g, '');
        const whatsappNumber = cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone;
        contactHtml += `<div class="contact-line">Telefone: <a href="https://wa.me/${whatsappNumber}" target="_blank" class="phone-link">${user.phone}</a></div>`;
    }
    // links hardcoded
    contactHtml += `<div class="contact-line">GitHub: <a href="https://github.com/MatheusPiresDEV" target="_blank" class="social-link">https://github.com/MatheusPiresDEV</a></div>`;
    contactHtml += `<div class="contact-line">LinkedIn: <a href="https://www.linkedin.com/in/matheusgustavopires/" target="_blank" class="social-link">https://www.linkedin.com/in/matheusgustavopires/</a></div>`;
    contactHtml += `<div class="contact-line">Portfolio: <a href="https://matheuspiresdev.github.io/Portfolioo/" target="_blank" class="social-link">https://matheuspiresdev.github.io/Portfolioo/</a></div>`;
    if (user?.address) contactHtml += `<div class="contact-line">Endereço: ${user.address}</div>`;
    if (user?.birthDate) contactHtml += `<div class="contact-line">Data de Nascimento: ${new Date(user.birthDate).toLocaleDateString('pt-BR')}</div>`;
    if (contactHtml) html += `<div class="curriculum-contact">${contactHtml}</div>`;
    html += '</div>';
    
    // Sobre mim
    if (user?.aboutMe) {
        html += `<div class="curriculum-section">
                    <div class="curriculum-section-title">Sobre Mim</div>
                    <div class="curriculum-entry">${user.aboutMe}</div>
                </div>`;
    }
    
    // Experiência (formato compacto)
    if (experience.length > 0) {
        html += '<div class="curriculum-section">';
        html += '<div class="curriculum-section-title">Experiência Profissional</div>';
        experience.forEach(exp => {
            html += `<div class="curriculum-entry">
                        <div class="entry-title">${exp.jobTitle} — ${exp.company}</div>
                        <div class="entry-subinfo">${formatMonth(exp.startDate)} - ${exp.currentJob ? 'Atual' : formatMonth(exp.endDate)}</div>
                        ${exp.description ? `<div class="entry-desc">${exp.description}</div>` : ''}
                    </div>`;
        });
        html += '</div>';
    }
    
    // Formação
    if (education.length > 0) {
        html += '<div class="curriculum-section">';
        html += '<div class="curriculum-section-title">Formação Acadêmica</div>';
        education.forEach(edu => {
            const eduInfo = getEducationInfo(edu);
            html += `<div class="curriculum-entry">
                        <div class="entry-title">${edu.courseName} — ${edu.institution}</div>
                        <div class="entry-subinfo">Início: ${formatMonth(edu.startMonth)}</div>
                        <div class="entry-desc">${eduInfo}</div>
                    </div>`;
        });
        html += '</div>';
    }
    
    // Skills aparecem no final do currículo
    if (skills.length > 0) {
        html += '<div class="curriculum-section">';
        html += '<div class="curriculum-section-title">Skills</div>';
        html += '<div class="curriculum-entry">' + skills.join(', ') + '</div>';
        html += '</div>';
    }
    
    // Links
    // Links já exibidos no cabeçalho — evitar duplicação aqui
    
    // Certificados
    if (certificates.length > 0) {
        html += '<div class="curriculum-section">';
        html += '<div class="curriculum-section-title">Certificados</div>';
        html += '<div class="curriculum-entry"><a href="#certificates">Ver certificados</a></div>';
        html += '</div>';
    }
    
    document.getElementById('curriculum').innerHTML = html;
    applyEditorSettings(StorageManager.getEditorSettings());
    
    // Atualizar status do currículo
    const hasData = education.length > 0 || experience.length > 0;
    document.getElementById('curriculumStatus').textContent = hasData ? 'Currículo criado' : 'Nenhum currículo criado ainda';
    document.getElementById('exportPdfBtn').disabled = !hasData;
}

// ==================== CRIAR CURRÍCULO ==================== 
function createCurriculum() {
    const user = StorageManager.getUser();
    const education = StorageManager.getEducation();
    const experience = StorageManager.getExperience();
    const skills = StorageManager.getSkills();
    const links = StorageManager.getLinks();
    const certificates = StorageManager.getCertificates();
    const editorSettings = StorageManager.getEditorSettings();

    const hasData = education.length > 0 || experience.length > 0;

    if (!user) {
        showAlert('Você precisa estar logado para criar um currículo.');
        return;
    }

    if (!hasData) {
        showAlert('Preencha pelo menos formação ou experiência para criar um currículo.');
        return;
    }

    const curriculum = {
        createdAt: new Date().toISOString(),
        userData: user,
        education: education,
        experience: experience,
        skills: skills,
        links: links,
        certificates: certificates,
        editorSettings: editorSettings
    };

    StorageManager.saveCurriculum(curriculum);
    // Atualiza preview e UI
    try {
        updateCurriculumPreview();
    } catch (e) {
        console.warn('⚠️ updateCurriculumPreview falhou:', e);
    }

    const statusEl = document.getElementById('curriculumStatus');
    if (statusEl) statusEl.textContent = 'Currículo criado';
    const exportBtn = document.getElementById('exportPdfBtn');
    if (exportBtn) exportBtn.disabled = false;

    // Navega para a aba Formação para revisão
    switchToTab('education');

    showAlert('Currículo criado com sucesso!');
}

// Alterna para uma aba pelo nome (mais seguro que passar um objeto sintético ao switchTab)
function switchToTab(tabName) {
    // Remover classe active de todos os botões e conteúdos
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    const btn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
    if (btn) btn.classList.add('active');
    const content = document.getElementById(tabName);
    if (content) content.classList.add('active');
}

// ==================== EXPORTAR PDF ====================
function exportPDF() {
    const user = StorageManager.getUser();
    if (!user) {
        createToast('Usuário não encontrado. Faça login primeiro.', 'error');
        return;
    }

    const elem = document.getElementById('curriculum');
    if (!elem) {
        createToast('Elemento do currículo não encontrado.', 'error');
        return;
    }

    // Mostrar indicador de carregamento
    const exportBtn = document.getElementById('exportPdfBtn');
    const originalText = exportBtn.textContent;
    exportBtn.textContent = 'Gerando PDF...';
    exportBtn.disabled = true;

    try {
        // Verificar bibliotecas
        if (!window.html2canvas) {
            throw new Error('html2canvas não carregado');
        }
        if (!window.jspdf || !window.jspdf.jsPDF) {
            throw new Error('jsPDF não carregado');
        }

        const { jsPDF } = window.jspdf;
        
        // Coletar informações dos links ANTES de converter
        const links = elem.querySelectorAll('a');
        const linkPositions = [];
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.length > 0) {
                const rect = link.getBoundingClientRect();
                const elemRect = elem.getBoundingClientRect();
                
                linkPositions.push({
                    url: href,
                    x: rect.left - elemRect.left,
                    y: rect.top - elemRect.top,
                    width: rect.width,
                    height: rect.height
                });
            }
        });
        
        console.log('📍 Links encontrados:', linkPositions);
        
        // Determinar scale baseado no tamanho da tela
        // Mobile: scale reduzida
        // Desktop: scale normal
        const isMobile = window.innerWidth <= 768;
        let canvasScale = isMobile ? 1 : 1.5;
        
        // Usar html2canvas para converter o elemento em imagem
        html2canvas(elem, {
            scale: canvasScale,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            allowTaint: true,
            width: elem.scrollWidth,
            height: elem.scrollHeight
        }).then(canvas => {
            try {
                if (!canvas || canvas.width === 0 || canvas.height === 0) {
                    throw new Error('Canvas vazio');
                }
                
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                
                // Margens reduzidas para usar melhor o espaço
                const topMargin = 5;
                const bottomMargin = 5;
                const sideMargin = 5;
                const availableHeight = pdfHeight - topMargin - bottomMargin;
                const availableWidth = pdfWidth - (sideMargin * 2);
                
                // Calcular escala para caber em UMA PÁGINA
                const canvasAspectRatio = canvas.height / canvas.width;
                const pdfAspectRatio = availableHeight / availableWidth;
                
                let imgWidth, imgHeight;
                let pages = 1;
                
                if (canvasAspectRatio > pdfAspectRatio) {
                    // Canvas é mais alto - limitar pela altura
                    imgHeight = availableHeight;
                    imgWidth = imgHeight / canvasAspectRatio;
                } else {
                    // Canvas é mais largo - limitar pela largura
                    imgWidth = availableWidth;
                    imgHeight = imgWidth * canvasAspectRatio;
                }
                
                // Se a altura for muito grande (mais de 95% da página), considerar 2 páginas
                if (imgHeight > availableHeight * 0.95) {
                    pages = 2;
                    imgHeight = availableHeight * 1.9; // Spread para 2 páginas
                }
                
                // Usar toda a largura disponível
                imgWidth = availableWidth;
                imgHeight = imgWidth * canvasAspectRatio;
                
                // Posição inicial
                let xPos = sideMargin;
                let yPos = topMargin;
                
                // Adicionar primeira página
                pdf.addImage(imgData, 'PNG', xPos, yPos, imgWidth, imgHeight);
                
                // Adicionar segunda página se necessário
                if (imgHeight > availableHeight) {
                    pdf.addPage();
                    yPos = topMargin;
                    pdf.addImage(imgData, 'PNG', xPos, yPos - availableHeight, imgWidth, imgHeight);
                }
                
                // Adicionar links
                linkPositions.forEach(linkInfo => {
                    const pdfX = (linkInfo.x * imgWidth) / canvas.width + xPos;
                    const pdfY = (linkInfo.y * imgHeight) / canvas.height + yPos;
                    const pdfW = Math.max((linkInfo.width * imgWidth) / canvas.width, 2);
                    const pdfH = Math.max((linkInfo.height * imgHeight) / canvas.height, 2);
                    
                    try {
                        pdf.link(pdfX, pdfY, pdfW, pdfH, { url: linkInfo.url });
                    } catch(e) {
                        console.warn('⚠️ Erro ao adicionar link:', e);
                    }
                });
                
                // Salvar PDF
                const filename = `curriculo_${(user.fullName || 'sem_nome').replace(/\s/g, '_')}.pdf`;
                pdf.save(filename);
                console.log('✅ PDF gerado com sucesso em 1 página');
                createToast('✅ PDF gerado com sucesso!', 'success');
            } catch (err) {
                console.error('❌ Erro ao gerar PDF:', err);
                createToast('Erro ao gerar PDF: ' + err.message, 'error');
            } finally {
                exportBtn.textContent = originalText;
                exportBtn.disabled = false;
            }
        }).catch(err => {
            console.error('❌ Erro ao converter para imagem:', err);
            createToast('Erro ao converter currículo: ' + err.message, 'error');
            exportBtn.textContent = originalText;
            exportBtn.disabled = false;
        });
    } catch (err) {
        console.error('❌ Erro ao exportar PDF:', err);
        createToast('Erro: ' + err.message, 'error');
        exportBtn.textContent = originalText;
        exportBtn.disabled = false;
    }
}


// ==================== UTILITÁRIOS ==================== 
function switchTab(e) {
    const tabName = e.target.dataset.tab;
    
    // Remover classe active de todos os botões e conteúdos
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Adicionar classe active ao botão e conteúdo clicado
    e.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

function showAlert(message) {
    // Toast-based non-blocking notification
    createToast(message, 'info');
}

function createToast(message, type = 'info', timeout = 4000) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    // auto remove
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => { try { toast.remove(); } catch(e){} }, 500);
    }, timeout);
}

function formatMonth(monthYear) {
    if (!monthYear) return 'Data não especificada';
    
    const [year, month] = monthYear.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
}

function getEducationInfo(edu) {
    if (edu.completed) {
        return 'Concluído';
    }
    
    const [year, month] = edu.startMonth.split('-').map(Number);
    const startDate = new Date(year, month - 1);
    const endDate = new Date(startDate.getTime() + edu.duration * 30 * 24 * 60 * 60 * 1000);
    
    const now = new Date();
    const timeRemaining = endDate - now;
    const monthsRemaining = Math.ceil(timeRemaining / (30 * 24 * 60 * 60 * 1000));
    const progressPercent = Math.min(100, Math.max(0, 100 - ((monthsRemaining / edu.duration) * 100)));
    
    if (timeRemaining <= 0) {
        return `Previsão: Concluído (${endDate.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })})`;
    }
    
    return `Previsão de término: ${endDate.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} | ${monthsRemaining} meses restantes | ${Math.round(progressPercent)}% concluído`;
}

function updateLastAccess() {
    const lastAccess = localStorage.getItem('lastAccess');
    if (lastAccess) {
        const date = new Date(lastAccess);
        document.getElementById('lastAccess').textContent = `Última visita: ${date.toLocaleString('pt-BR')}`;
    }
    
    localStorage.setItem('lastAccess', new Date().toISOString());
}

function updateLastUpdate() {
    const lastUpdate = localStorage.getItem('lastCurriculumUpdate');
    if (lastUpdate) {
        const date = new Date(lastUpdate);
        const now = new Date();
        const days = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        
        let displayText = '';
        if (days === 0) {
            displayText = 'Última atualização: Hoje';
        } else if (days === 1) {
            displayText = 'Última atualização: Ontem';
        } else {
            displayText = `Última atualização: ${days} dias atrás`;
        }
        
        document.getElementById('lastUpdate').textContent = displayText;
    }
}

// ==================== EASTER EGGS ==================== 
function setupLoginEasterEggs() {
    const easterEggText = document.getElementById('easterEggText');
    let clickCount = 0;
    
    easterEggText.addEventListener('click', function() {
        clickCount++;
        
        if (clickCount === 1) {
            easterEggText.textContent = 'Um anel para encontrá-los...';
        } else if (clickCount === 2) {
            easterEggText.textContent = 'Um anel para trazê-los...';
        } else if (clickCount === 3) {
            easterEggText.textContent = 'Um anel para a todos em negra solidão...';
        } else if (clickCount === 4) {
            easterEggText.textContent = 'Na Terra Média, o currículo é poder! 🧙';
            easterEggText.style.color = 'var(--gold)';
        } else if (clickCount === 5) {
            easterEggText.textContent = 'Você desbloqueou um segredo: Você é um verdadeiro leitor de Tolkien!';
            easterEggText.style.textShadow = '0 0 20px rgba(212, 175, 55, 0.8)';
            clickCount = 0;
        }
    });
    
    // Easter egg de konami
    let konami = [];
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', function(e) {
        konami.push(e.key);
        konami = konami.slice(-10);
        
        if (konami.join('') === konamiCode.join('')) {
            document.body.style.filter = 'invert(1)';
            setTimeout(() => {
                document.body.style.filter = 'none';
                easterEggText.textContent = 'Parabéns! Você ativou o Modo Escuro do Anel!';
                easterEggText.style.color = 'var(--gold)';
                easterEggText.style.animation = 'pulse 1s infinite';
            }, 200);
            konami = [];
        }
    });
}

// Fechar modal ao clicar fora
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});
