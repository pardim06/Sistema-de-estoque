// --- CONFIGURAÇÃO DE LOGIN LOCAL ---
// Estas credenciais são usadas apenas para simulação local, sem servidor.
// O USUARIO_LOCAL agora é um e-mail para coincidir com o novo campo HTML
const USUARIO_LOCAL = "teste@t";
const SENHA_LOCAL = "123456";
const PAGINA_REDIRECIONAMENTO_LOCAL = "dashboard.html"; 

// Função para exibir mensagens na UI em vez de usar alert()
function showMessage(message) {
    // Usamos console.log para debugging e temporariamente
    // Adicione uma lógica de UI mais robusta aqui (modal, toast) em um ambiente real
    console.warn("Mensagem de Feedback:", message); 
    
    // Tentativa de exibir a mensagem na div de erro do formulário HTML
    const errorMessageElement = document.getElementById("error-message");
    if (errorMessageElement) {
        errorMessageElement.textContent = message;
        errorMessageElement.classList.remove("hidden"); // Mostra a mensagem
        setTimeout(() => {
            errorMessageElement.classList.add("hidden"); // Esconde após 5 segundos
        }, 5000);
    } else {
        // Se a div de erro não existir, voltamos a usar o console ou alert
        alert(message);
    }
}

// Inicialização e Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  
    // --- LÓGICA DE LOGIN (MODIFICADA PARA SIMULAÇÃO LOCAL) ---
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
              e.preventDefault();
                
                // *** CORREÇÃO AQUI: Capturando o valor do ID 'email-address' ***
              const username = document.getElementById("email-address").value; 
              const password = document.getElementById("password").value;

              // Autenticação Local (simulação)
              if (username === USUARIO_LOCAL && password === SENHA_LOCAL) {
                  // Login bem-sucedido: Redireciona para o dashboard.html
                  window.location.href = PAGINA_REDIRECIONAMENTO_LOCAL;
              } else {
                  // Login falhou
                  showMessage("Email ou senha incorretos. Tente novamente.");
              }
        });
    }

    // --- SIMULAÇÃO DE FETCH API (PARA TESTE DE FORMS) ---

    // Lógica simulada para o formulário de cliente (se existir)
    const clienteForm = document.getElementById("cliente-form");
    if (clienteForm) {
        clienteForm.addEventListener("submit", (e) => {
              e.preventDefault();
                // Simula o envio de dados
                console.log("Dados do Cliente:", {
                    nome: document.getElementById("nome").value,
                    endereco: document.getElementById("endereco").value,
                    telefone: document.getElementById("telefone").value
                });
              showMessage("Cliente adicionado com sucesso (Simulação).");
              clienteForm.reset();
        });
    }

    // Lógica simulada para o formulário de produto (se existir)
    const produtoForm = document.getElementById("produto-form");
    if (produtoForm) {
        produtoForm.addEventListener("submit", (e) => {
              e.preventDefault();
                // Simula o envio de dados
                console.log("Dados do Produto:", {
                    nome: document.getElementById("nome").value,
                    descricao: document.getElementById("descricao").value,
                    quantidadeAtual: document.getElementById("quantidadeAtual").value,
                    quantidadeMinima: document.getElementById("quantidadeMinima").value,
                    preco: document.getElementById("preco").value
                });
              showMessage("Produto adicionado com sucesso (Simulação).");
              produtoForm.reset();
        });
    }

    // Lógica simulada para o formulário de entrega (se existir)
    const entregaForm = document.getElementById("entrega-form");
    if (entregaForm) {
        // Simulação de preenchimento do dropdown de clientes (substituindo o fetch)
        const mockClientes = [
            { id: 1, nome: "Construtora Alfa" },
            { id: 2, nome: "Depósito Beta" },
            { id: 3, nome: "Distribuidora Gama" }
        ];
        const clienteSelect = document.getElementById("clienteId");
        if (clienteSelect) {
            // Adiciona uma opção padrão antes de preencher
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Selecione um Cliente";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            clienteSelect.appendChild(defaultOption);

            mockClientes.forEach(cliente => {
                const option = document.createElement("option");
                option.value = cliente.id;
                option.textContent = cliente.nome;
                clienteSelect.appendChild(option);
            });
        }
        
        entregaForm.addEventListener("submit", (e) => {
              e.preventDefault();
                // Simula o envio de dados
                console.log("Dados da Entrega:", {
                    codigo: document.getElementById("codigo").value,
                    clienteId: document.getElementById("clienteId").value,
                    dataEntrega: document.getElementById("dataEntrega").value,
                    status: document.getElementById("status").value
                });
              showMessage("Entrega registrada com sucesso (Simulação).");
              entregaForm.reset();
        });
    }

    // --- LÓGICA DO DASHBOARD E GRÁFICO (Chart.js) ---

    // Inicializa o gráfico de produção semanal se o canvas existir
    const chartCanvas = document.getElementById("production-chart");
    if (chartCanvas) {
        // Dados de Produção (Simulação para o gráfico)
        const productionData = {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            datasets: [{
                label: 'Unidades Produzidas',
                data: [18, 15, 20, 19, 15, 0],
                backgroundColor: 'rgba(0, 123, 255, 0.7)',
                borderColor: '#007bff',
                borderWidth: 1,
                borderRadius: 5,
            }]
        };

        // Certifique-se de que a biblioteca Chart.js esteja carregada na sua página dashboard.html
        if (typeof Chart !== 'undefined') {
            new Chart(chartCanvas, {
                type: 'bar',
                data: productionData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Necessário para usar 100% da altura/largura
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 25, // Limite para melhor visualização
                            title: {
                                display: true,
                                text: 'Unidades'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        }
                    }
                }
            });
        }
    }

    // --- LÓGICA DE CARREGAMENTO DE DADOS (Simulação de APIs) ---

    // Simulação do carregamento de dados do dashboard (usando estrutura original de referência)
    const dashboardContainer = document.getElementById("dashboard-data");
    if (dashboardContainer) {
        // Dados estáticos simulados (em um cenário real, você faria um fetch)
        const data = {
            totalClientes: 45,
            totalProdutos: 120,
            totalEntregas: 350,
            produtosEstoqueBaixo: [
                { nome: "Cabo de Madeira", quantidadeAtual: 15, quantidadeMinima: 30 },
                { nome: "Martelo Tipo X", quantidadeAtual: 8, quantidadeMinima: 10 }
            ]
        };

        // Renderiza os dados no container
        dashboardContainer.innerHTML = `
          <p>Total de Clientes: ${data.totalClientes}</p>
          <p>Total de Produtos: ${data.totalProdutos}</p>
          <p>Total de Entregas: ${data.totalEntregas}</p>
          <h3>Produtos com Estoque Baixo (Simulação):</h3>
          <ul>
            ${data.produtosEstoqueBaixo.map(p => `<li>${p.nome} (Atual: ${p.quantidadeAtual}, Mínima: ${p.quantidadeMinima})</li>`).join("")}
          </ul>
        `;
    }

    // Simulação do carregamento de dados do resumo (usando estrutura original de referência)
    const resumoContainer = document.getElementById("resumo-data");
    if (resumoContainer) {
        // Dados estáticos simulados (em um cenário real, você faria um fetch)
        const data = {
            metricas: {
                valorTotalEstoque: 15450.75,
                itensEstoque: 1250,
                produtosEstoqueBaixo: 3,
                entregasPeriodo: 45
            },
            produtosEstoqueBaixo: {
                labels: ["Cabo de Madeira", "Aço Carbono", "Martelo Tipo X"],
                dados: [15, 32, 8]
            }
        };

        resumoContainer.innerHTML = `
          <h3>Métricas Principais (Simulação):</h3>
          <p>Valor Total do Estoque: R$ ${data.metricas.valorTotalEstoque.toFixed(2).replace('.', ',')}</p>
          <p>Itens em Estoque: ${data.metricas.itensEstoque}</p>
          <p>Produtos com Estoque Baixo: ${data.metricas.produtosEstoqueBaixo}</p>
          <p>Entregas no Período: ${data.metricas.entregasPeriodo}</p>
          
          <h3>Estoque Baixo Detalhe (Simulação):</h3>
          <ul>
            ${data.produtosEstoqueBaixo.labels.map((label, index) => 
               `<li>${label} (Atual: ${data.produtosEstoqueBaixo.dados[index]})</li>`).join("")}
          </ul>
        `;
    }
});
