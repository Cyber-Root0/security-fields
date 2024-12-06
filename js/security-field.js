class SecureInput {
    constructor(containerId, options = {}) {
      this.containerId = containerId;
      this.iframe = null;
      this.options = options;
      this.init();
    }
  
    init() {
      // Cria o iframe
      this.iframe = document.createElement('iframe');
      this.iframe.style.border = 'none';
      this.iframe.style.width = '100%';
      this.iframe.style.height = '40px'; // Ajustável
      this.iframe.sandbox = 'allow-scripts'; // Limita ações externas
      this.iframe.srcdoc = this._generateIframeContent();
  
      // Monta o iframe no container especificado
      const container = document.getElementById(this.containerId);
      if (!container) {
        throw new Error(`Container com ID '${this.containerId}' não encontrado.`);
      }
      container.appendChild(this.iframe);
  
      // Listener para receber dados do iframe
      window.addEventListener('message', this._handleMessage.bind(this), false);
    }
  
    _generateIframeContent() {
      // Estilos customizáveis
      const styles = `
        <style>
          body { margin: 0; }
          input {
            width: 100%;
            height: 100%;
            font-size: 14px;
            color: ${this.options.color || '#111827'};
            font-family: ${this.options.fontFamily || 'system-ui, sans-serif'};
            border: 1px solid ${this.options.borderColor || '#ccc'};
            padding: 8px;
          }
          input:focus {
            outline: none;
            border-color: ${this.options.focusBorderColor || '#007bff'};
          }
        </style>
      `;
  
      // Conteúdo do iframe
      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${styles}
        </head>
        <body>
          <input type="text" id="secure-input" placeholder="${this.options.placeholder || 'Digite aqui...'}" />
          <script>
            const input = document.getElementById('secure-input');
            input.addEventListener('input', () => {
              const data = input.value;
              window.parent.postMessage({ type: 'input', data }, '*');
            });
          </script>
        </body>
        </html>
      `;
    }
  
    _handleMessage(event) {
      if (event.origin !== window.location.origin && event.origin != "null") {
        console.warn('Mensagem ignorada de origem não confiável:', event.origin);
        return;
      }
      if (event.data.type === 'input' && typeof this.options.onInput === 'function') {
        this.options.onInput(event.data.data);
      }
    }
  
    destroy() {
      if (this.iframe) {
        this.iframe.remove();
        this.iframe = null;
      }
      window.removeEventListener('message', this._handleMessage.bind(this));
    }
  }
  
  export default SecureInput;
  