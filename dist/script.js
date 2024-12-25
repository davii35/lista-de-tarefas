"use strict";
const formNovaTarefa = document.querySelector(".form_nova-tarefa"), inputNome = document.querySelector("#input_nome-da-tarefa"), botaoAdicionar = document.querySelector("#botao-adicionar"), espacoListaTarefas = document.querySelector(".ul_lista-de-tarefas");
class Tarefa {
    constructor(nome) {
        this.nome = nome;
        this.estaConcluida = false;
    }
}
let listaDeTarefas = [];
function removeTarefa(nomeTarefa) {
    listaDeTarefas = listaDeTarefas.filter((tarefa) => tarefa.nome !== nomeTarefa);
    atualizaListaNaMemoria();
    exibeTarefas();
}
function alternaEstadoConcluido(nomeDaTarefa) {
    const tarefaSelecionada = listaDeTarefas.find((tarefa) => tarefa.nome === nomeDaTarefa);
    if (!tarefaSelecionada)
        return;
    tarefaSelecionada.estaConcluida = !tarefaSelecionada.estaConcluida;
    atualizaListaNaMemoria();
    exibeTarefas();
}
function obtemListaDaMemoria() {
    const stringLista = localStorage.getItem("listaDeTarefas");
    if (!stringLista)
        return;
    listaDeTarefas = JSON.parse(stringLista);
}
function atualizaListaNaMemoria() {
    const stringLista = JSON.stringify(listaDeTarefas);
    localStorage.setItem("listaDeTarefas", stringLista);
}
function criaElementoHtml(tarefa) {
    const li = document.createElement("li"), checkbox = document.createElement("input"), label = document.createElement("label"), button = document.createElement("button"), div = document.createElement("div");
    li.classList.add("li_tarefa");
    checkbox.classList.add("tarefa-checkbox");
    label.classList.add("tarefa-nome");
    button.classList.add("botao-remover");
    div.classList.add("botao-remover_icone");
    checkbox.setAttribute("type", "checkbox");
    button.appendChild(div);
    label.append(checkbox, tarefa.nome);
    li.append(label, button);
    if (tarefa.estaConcluida) {
        label.classList.add("tarefa-concluida");
        checkbox.checked = true;
    }
    button.addEventListener("click", () => {
        removeTarefa(tarefa.nome);
    });
    checkbox.addEventListener("change", () => {
        alternaEstadoConcluido(tarefa.nome);
    });
    return li;
}
function criaNovaTarefa() {
    if (!inputNome)
        return;
    const nomeDaTarefa = inputNome.value;
    inputNome.value = "";
    inputNome.focus();
    const novaTarefa = new Tarefa(nomeDaTarefa);
    listaDeTarefas.push(novaTarefa);
}
function exibeTarefas() {
    if (!espacoListaTarefas)
        return;
    espacoListaTarefas.innerText = "";
    listaDeTarefas.forEach((tarefa) => {
        let elementoHtml = criaElementoHtml(tarefa);
        espacoListaTarefas.appendChild(elementoHtml);
    });
}
formNovaTarefa === null || formNovaTarefa === void 0 ? void 0 : formNovaTarefa.addEventListener("submit", (event) => {
    event.preventDefault();
    criaNovaTarefa();
    atualizaListaNaMemoria();
    exibeTarefas();
});
window.onload = () => {
    obtemListaDaMemoria();
    exibeTarefas();
};
