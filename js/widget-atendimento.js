// widget-atendimento.js - Widget de Atendimento InfoTech
(function() {
    // CONFIGURAÇÕES - NÚMERO DA INFOTECH
    const config = {
        phoneNumber: "5569992331200", // 👈 NÚMERO DA INFOTECH (sem + e sem espaços)
        defaultMessage: "Olá! Vim do site da InfoTech e gostaria de atendimento.",
        position: "right",
        primaryColor: "#2c3e50", // Cinza escuro profissional
        secondaryColor: "#34495e", // Cinza um pouco mais claro
        accentColor: "#3498db", // Azul para detalhes
        botName: "Atendente InfoTech",
        botAvatar: "👨‍💻",
        welcomeMessage: "Olá! Bem-vindo à InfoTech. Como podemos ajudar sua empresa hoje?"
    };

    // Criar elementos do widget
    function createWidget() {
        // Botão flutuante
        const button = document.createElement('div');
        button.id = 'infotech-floating-button';
        button.innerHTML = `
            <div class="infotech-button-inner">
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="white" d="M19.077 4.928C17.191 3.041 14.683 2 12.006 2c-5.35 0-9.703 4.333-9.706 9.68-.001 1.713.448 3.385 1.302 4.86L2 22l5.544-1.565c1.427.781 3.036 1.196 4.684 1.197h.004c5.349 0 9.705-4.333 9.708-9.681.001-2.579-1.003-5.002-2.865-7.023z"/>
                </svg>
                <span class="infotech-button-text">Atendimento</span>
            </div>
        `;

        // Janela de chat
        const chatWindow = document.createElement('div');
        chatWindow.id = 'infotech-chat-window';
        chatWindow.innerHTML = `
            <div class="infotech-chat-header">
                <div class="infotech-chat-header-info">
                    <span class="infotech-avatar">${config.botAvatar}</span>
                    <div>
                        <div class="infotech-bot-name">${config.botName}</div>
                        <div class="infotech-bot-status">● Online</div>
                    </div>
                </div>
                <button class="infotech-close-btn" onclick="toggleChat()">✕</button>
            </div>
            <div class="infotech-chat-body">
                <div class="infotech-message infotech-bot-message">
                    <div class="infotech-message-content">
                        ${config.welcomeMessage}
                    </div>
                    <div class="infotech-message-time">Agora</div>
                </div>
                <div class="infotech-typing" style="display: none;">
                    <span></span><span></span><span></span>
                </div>
            </div>
            <div class="infotech-chat-footer">
                <div class="infotech-options">
                    <button class="infotech-option-btn" data-option="servicos">
                        💼 Serviços
                    </button>
                    <button class="infotech-option-btn" data-option="planos">
                        📋 Planos
                    </button>
                    <button class="infotech-option-btn" data-option="suporte">
                        🔧 Suporte
                    </button>
                    <button class="infotech-option-btn" data-option="orcamento">
                        💰 Orçamento
                    </button>
                </div>
                <div class="infotech-input-area">
                    <input type="text" id="infotech-message-input" placeholder="Digite sua mensagem..." maxlength="500">
                    <button onclick="sendMessage()" class="infotech-send-btn" id="infotech-send-btn">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path fill="white" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
                <div class="infotech-footer-note">
                    <span>⏰ Atendimento: Seg-Sex 8h às 18h</span>
                </div>
            </div>
        `;

        // Estilos profissionais
        const styles = document.createElement('style');
        styles.textContent = `
            #infotech-floating-button {
                position: fixed;
                bottom: 30px;
                ${config.position}: 30px;
                z-index: 999999;
                cursor: pointer;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            .infotech-button-inner {
                background: ${config.primaryColor};
                border-radius: 50px;
                padding: 14px 28px;
                display: flex;
                align-items: center;
                gap: 12px;
                box-shadow: 0 8px 20px rgba(44,62,80,0.3);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                border: 1px solid rgba(255,255,255,0.1);
            }
            
            .infotech-button-inner:hover {
                background: ${config.secondaryColor};
                transform: translateY(-2px);
                box-shadow: 0 12px 28px rgba(44,62,80,0.4);
            }
            
            .infotech-button-text {
                color: white;
                font-weight: 500;
                font-size: 15px;
                letter-spacing: 0.3px;
            }
            
            #infotech-chat-window {
                position: fixed;
                bottom: 100px;
                ${config.position}: 30px;
                width: 360px;
                height: 520px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                display: none;
                flex-direction: column;
                z-index: 999999;
                overflow: hidden;
                animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                border: 1px solid rgba(0,0,0,0.08);
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(20px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            .infotech-chat-header {
                background: ${config.primaryColor};
                color: white;
                padding: 18px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }
            
            .infotech-chat-header-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .infotech-avatar {
                font-size: 28px;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
            }
            
            .infotech-bot-name {
                font-weight: 600;
                font-size: 16px;
                letter-spacing: 0.3px;
            }
            
            .infotech-bot-status {
                font-size: 12px;
                opacity: 0.9;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            
            .infotech-bot-status::before {
                content: '';
                width: 8px;
                height: 8px;
                background: #2ecc71;
                border-radius: 50%;
                display: inline-block;
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }
            
            .infotech-close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 5px 10px;
                border-radius: 8px;
                transition: background 0.2s;
                opacity: 0.8;
            }
            
            .infotech-close-btn:hover {
                background: rgba(255,255,255,0.15);
                opacity: 1;
            }
            
            .infotech-chat-body {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                background: #f8fafc;
                scroll-behavior: smooth;
            }
            
            .infotech-message {
                margin-bottom: 16px;
                display: flex;
                flex-direction: column;
                animation: messageIn 0.3s ease;
            }
            
            @keyframes messageIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .infotech-bot-message {
                align-items: flex-start;
            }
            
            .infotech-user-message {
                align-items: flex-end;
            }
            
            .infotech-message-content {
                max-width: 85%;
                padding: 12px 16px;
                border-radius: 18px;
                font-size: 14px;
                line-height: 1.5;
                box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            }
            
            .infotech-bot-message .infotech-message-content {
                background: white;
                color: ${config.primaryColor};
                border-bottom-left-radius: 5px;
                border: 1px solid #e9ecef;
            }
            
            .infotech-user-message .infotech-message-content {
                background: ${config.accentColor};
                color: white;
                border-bottom-right-radius: 5px;
            }
            
            .infotech-message-time {
                font-size: 10px;
                color: #95a5a6;
                margin-top: 4px;
                margin-left: 8px;
                margin-right: 8px;
            }
            
            .infotech-typing {
                padding: 12px 16px;
                display: flex;
                gap: 6px;
                background: white;
                border-radius: 18px;
                width: fit-content;
                border: 1px solid #e9ecef;
                margin-bottom: 16px;
            }
            
            .infotech-typing span {
                width: 8px;
                height: 8px;
                background: ${config.primaryColor};
                border-radius: 50%;
                animation: typing 1.4s infinite;
                opacity: 0.6;
            }
            
            .infotech-typing span:nth-child(2) { animation-delay: 0.2s; }
            .infotech-typing span:nth-child(3) { animation-delay: 0.4s; }
            
            @keyframes typing {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-8px); }
            }
            
            .infotech-chat-footer {
                padding: 18px;
                border-top: 1px solid #e9ecef;
                background: white;
            }
            
            .infotech-options {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
                margin-bottom: 15px;
            }
            
            .infotech-option-btn {
                padding: 10px;
                border: 1px solid #e9ecef;
                background: white;
                color: ${config.primaryColor};
                border-radius: 10px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
            }
            
            .infotech-option-btn:hover {
                background: ${config.primaryColor};
                color: white;
                border-color: ${config.primaryColor};
                transform: translateY(-1px);
                box-shadow: 0 4px 10px rgba(44,62,80,0.2);
            }
            
            .infotech-input-area {
                display: flex;
                gap: 10px;
                margin-bottom: 10px;
            }
            
            #infotech-message-input {
                flex: 1;
                padding: 12px 16px;
                border: 2px solid #e9ecef;
                border-radius: 25px;
                outline: none;
                font-size: 14px;
                transition: all 0.2s;
                font-family: inherit;
            }
            
            #infotech-message-input:focus {
                border-color: ${config.accentColor};
                box-shadow: 0 0 0 3px rgba(52,152,219,0.1);
            }
            
            #infotech-message-input:disabled {
                background: #f8fafc;
                cursor: not-allowed;
            }
            
            .infotech-send-btn {
                width: 45px;
                height: 45px;
                border: none;
                background: ${config.accentColor};
                color: white;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                box-shadow: 0 4px 10px rgba(52,152,219,0.3);
            }
            
            .infotech-send-btn:hover {
                background: #2980b9;
                transform: scale(1.05);
            }
            
            .infotech-send-btn:disabled {
                background: #bdc3c7;
                cursor: not-allowed;
                transform: none;
                box-shadow: none;
            }
            
            .infotech-footer-note {
                text-align: center;
                font-size: 11px;
                color: #95a5a6;
                margin-top: 8px;
            }
            
            @media (max-width: 480px) {
                #infotech-floating-button {
                    bottom: 20px;
                    ${config.position}: 20px;
                }
                
                .infotech-button-inner {
                    padding: 12px 20px;
                }
                
                .infotech-button-text {
                    font-size: 14px;
                }
                
                #infotech-chat-window {
                    width: calc(100% - 40px);
                    height: 80vh;
                    bottom: 80px;
                    ${config.position}: 20px;
                }
            }
        `;

        document.head.appendChild(styles);
        document.body.appendChild(button);
        document.body.appendChild(chatWindow);

        // Event listeners
        button.addEventListener('click', toggleChat);
        
        // Enter key para enviar mensagem
        const input = document.getElementById('infotech-message-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Opções rápidas
        document.querySelectorAll('.infotech-option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const option = btn.getAttribute('data-option');
                sendQuickOption(option);
            });
        });
    }

    // Função para abrir/fechar chat
    window.toggleChat = function() {
        const chat = document.getElementById('infotech-chat-window');
        const button = document.getElementById('infotech-floating-button');
        
        if (chat.style.display === 'flex') {
            chat.style.display = 'none';
            button.style.display = 'flex';
        } else {
            chat.style.display = 'flex';
            button.style.display = 'none';
            document.getElementById('infotech-message-input').focus();
        }
    };

    // Função para enviar mensagem
    window.sendMessage = function() {
        const input = document.getElementById('infotech-message-input');
        const message = input.value.trim();
        const sendBtn = document.getElementById('infotech-send-btn');
        
        if (message) {
            // Desabilitar input e botão temporariamente
            input.disabled = true;
            sendBtn.disabled = true;
            
            addUserMessage(message);
            input.value = '';
            showTyping();
            
            // Simular resposta do bot
            setTimeout(() => {
                hideTyping();
                addBotMessage("Obrigado pelo contato! Em instantes um de nossos especialistas responderá pelo WhatsApp.");
                
                // Abrir WhatsApp com a mensagem
                setTimeout(() => {
                    openWhatsApp(message);
                    
                    // Reabilitar input
                    input.disabled = false;
                    sendBtn.disabled = false;
                    input.focus();
                }, 1000);
            }, 2000);
        }
    };

    // Função para opções rápidas
    window.sendQuickOption = function(option) {
        const messages = {
            'servicos': 'Gostaria de conhecer os serviços da InfoTech.',
            'planos': 'Quero informações sobre os planos disponíveis.',
            'suporte': 'Preciso de suporte técnico.',
            'orcamento': 'Gostaria de solicitar um orçamento.'
        };
        
        const message = messages[option] || 'Gostaria de atendimento.';
        
        addUserMessage(message);
        showTyping();
        
        setTimeout(() => {
            hideTyping();
            addBotMessage("Ótima escolha! Vou te direcionar para nosso WhatsApp com essas informações.");
            openWhatsApp(message);
        }, 1500);
    };

    // Função para adicionar mensagem do usuário
    function addUserMessage(text) {
        const chatBody = document.querySelector('.infotech-chat-body');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'infotech-message infotech-user-message';
        messageDiv.innerHTML = `
            <div class="infotech-message-content">${escapeHtml(text)}</div>
            <div class="infotech-message-time">${new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</div>
        `;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Função para adicionar mensagem do bot
    function addBotMessage(text) {
        const chatBody = document.querySelector('.infotech-chat-body');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'infotech-message infotech-bot-message';
        messageDiv.innerHTML = `
            <div class="infotech-message-content">${escapeHtml(text)}</div>
            <div class="infotech-message-time">${new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</div>
        `;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Função para mostrar typing
    function showTyping() {
        document.querySelector('.infotech-typing').style.display = 'flex';
    }

    // Função para esconder typing
    function hideTyping() {
        document.querySelector('.infotech-typing').style.display = 'none';
    }

    // Função para abrir WhatsApp
    function openWhatsApp(message) {
        const phoneNumber = config.phoneNumber;
        const fullMessage = `${config.defaultMessage}\n\n*Mensagem:* ${message}`;
        const encodedMessage = encodeURIComponent(fullMessage);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        
        // Fechar chat após redirecionar
        setTimeout(() => {
            toggleChat();
        }, 500);
    }

    // Função para escapar HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Inicializar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createWidget);
    } else {
        createWidget();
    }
})();
