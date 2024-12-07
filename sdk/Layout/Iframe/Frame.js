class Frame {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.iframe = null;
        this.config = options;
        this.init();
    }
    addBody(element) {
        this.iframe.srcdoc = `
          <!DOCTYPE html>
          <html lang="pt-br">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body>
            <form action='/unknown' id='form1'>
                ${element.innerHTML}
            </form>
            <script>
              const form = document.getElementById('form1');
              form.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(form);
                const data = {};
                formData.forEach((value, key) => {
                  data[key] = value;
                });
                fetch('${this.config.url}', {
                  method: '${this.config.method}', 
                  headers: ${JSON.stringify(this.config.headers)},
                  body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {
                  window.parent.postMessage({ status: 'success', data: data }, '*');
                })
                .catch(error => {
                  window.parent.postMessage({ status: 'fail', message: error.message }, '*');
                });
              });
            </script>
          </body>
          </html>
        `;
        return this;
      }
    init() {
        this.iframe = document.createElement('iframe');
        this.iframe.style.border = 'none';
        this.iframe.style.width = '100%';
        this.iframe.style.height = '40px';
        this.iframe.sandbox = 'allow-scripts allow-forms'; 
    }
    execute(){
        const container = document.getElementById(this.containerId);
        if (!container) {
            throw new Error(`Container com ID '${this.containerId}' não encontrado.`);
        }
        container.appendChild(this.iframe);
    }
}
export default Frame;