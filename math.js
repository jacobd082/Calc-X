// math.js
// Copyright (c) 2022 Jacob Drath
// Used for math calculations
// Calc X


const math = require('mathjs')
const { ipcRenderer } = require('electron');

function formatNumber(number) {
    return parseFloat(parseFloat(number).toPrecision(12))
}

let ans = "0"


function solve(expr) {
    expr = expr.toLowerCase()
    expr = expr.replaceAll("ans","("+ans+")")
    expr = expr.replaceAll("π","(pi)")
    if (expr.startsWith("graph:")) {
        sessionStorage.setItem("graph.equation", expr.replace("graph:",""))
        window.open("graph.html")
        expr = expr.replace("graph:","")
        try {
            done(formatNumber(math.evaluate(expr)), false)
        } catch(err) {
            done("Graphed", false)
        }
        return
    } else if (expr.startsWith("g:")) {
        sessionStorage.setItem("graph.equation", expr.replace("g:",""))
        window.open("graph.html")
        expr = expr.replace("g:","")
        try {
            done(formatNumber(math.evaluate(expr)), false)
        } catch(err) {
            done("Graphed", false)
        }
        return
    }
    try {
    done(formatNumber(math.evaluate(expr)), false)
    } catch(err) {
        done(err, true)
    }
    
    function done(re, isError) {
    if (isError) {
        document.getElementById("results").innerHTML='<p style="margin:0;color:orange;">'+expr+'</p><p style="font-size: 20px;margin:0;">'+re+'</p><hr style="border-color:gray;">' + document.getElementById("results").innerHTML
        return
    }
    document.getElementById("results").innerHTML='<p style="margin:0;">'+expr+'</p><p style="font-size: 25px;margin:0;">'+re+'</p><hr style="border-color:gray;">' + document.getElementById("results").innerHTML
    ans = re
    }
}
// Get the input field
var input = document.getElementById("in");

function setValue(text) {
var input = document.getElementById("in");
var start = input.selectionStart;
var end = input.selectionEnd;

// Insert the text at the cursor position
input.value = input.value.substring(0, start) + text + input.value.substring(end);

// Move the cursor to the end of the inserted text
input.selectionStart = input.selectionEnd = start + text.length;
}

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
// If the user presses the "Enter" key on the keyboard
if (event.key === "Enter") {
// Cancel the default action, if needed
event.preventDefault();
solve(document.getElementById("in").value)
input.select()
}
});

input.addEventListener("input", function() {
    if (input.value=="+") input.value="ans+"
    if (input.value=="-") input.value="ans-"
    if (input.value=="*") input.value="ans*"
    if (input.value=="/") input.value="ans/"
})