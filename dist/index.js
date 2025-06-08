"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LegacyXMLSystem_1 = require("./services/LegacyXMLSystem");
const JsonToXMLAdapter_1 = require("./adapters/JsonToXMLAdapter");
const Credito_1 = require("./models/pagamentos/Credito");
const Debito_1 = require("./models/pagamentos/Debito");
const Pix_1 = require("./models/pagamentos/Pix");
// 1. Instância do sistema legado
const legacySystem = new LegacyXMLSystem_1.LegacyXMLSystem();
// 2. Instância do adapter
const adapter = new JsonToXMLAdapter_1.JsonToXmlAdapter(legacySystem);
// 3. Dados do cliente em JSON (simulando entrada do frontend)
const clienteJson = JSON.stringify({
    id: 1,
    nome: "Maria Oliveira",
    cpf: "987.654.321-00",
    dtNascimento: "1985-05-15",
    endereco: {
        rua: "Avenida Brasil",
        numero: 1500,
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20000-000"
    },
    formaPagamento: {
        tipo: "pix" // Pode ser "credito", "debito" ou "pix"
    }
});
// 4. Função para testar diferentes formas de pagamento
function testarFormasPagamento() {
    const formas = [
        { tipo: "credito", instancia: new Credito_1.Credito() },
        { tipo: "debito", instancia: new Debito_1.Debito() },
        { tipo: "pix", instancia: new Pix_1.Pix() }
    ];
    formas.forEach(forma => {
        console.log(`\nTestando ${forma.tipo}:`);
        console.log(forma.instancia.processarPagamento(10.50));
    });
}
// 5. Execução principal
console.log("=== Sistema de Cadastro da Sorveteria ===");
try {
    // Processa o cadastro
    const usuarioCadastrado = adapter.processarCadastro(clienteJson);
    // Resultados
    console.log("\n✅ Cadastro realizado com sucesso!");
    console.log("Dados do usuário:", {
        id: usuarioCadastrado.id,
        nome: usuarioCadastrado.nome,
        cidade: usuarioCadastrado.endereco.cidade,
        formaPagamento: usuarioCadastrado.formaPagamento.constructor.name
    });
    // Testa o processamento de pagamento
    console.log("\n💳 Teste de formas de pagamento:");
    testarFormasPagamento();
}
catch (error) {
    console.error("\n❌ Erro no cadastro:", error instanceof Error ? error.message : error);
}
console.log("\n=== Fim da execução ===");
