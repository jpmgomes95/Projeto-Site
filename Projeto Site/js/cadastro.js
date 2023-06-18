function ajustaCpf(v) {
    v.value = v.value.replace(/\D/g, "");
    v.value = v.value.replace(/^(\d{3})(\d)/, "$1.$2");
    v.value = v.value.replace(/(\d{3})(\d)/, "$1.$2");
    v.value = v.value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  const telefoneCelularInput = document.getElementById('telefoneCelular');
  const mascaraCelular = IMask(telefoneCelularInput, {
    mask: '(+55) 00 00000 0000',
    lazy: true
  });

  const telefoneFixoInput = document.getElementById('telefoneFixo');
  const mascaraTelefone = IMask(telefoneFixoInput, {
    mask: '(+55) 00 0000 0000',
    lazy: true
  });

  function preencherEndereco() {
    var cep = document.getElementById('cep').value;

    cep = cep.replace(/\D/g, '');

    if (cep.length === 8) {
      var url = 'https://viacep.com.br/ws/' + cep + '/json/';

      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          if (!data.erro) {
            document.getElementById('endereco').value = data.logradouro + ', ' + data.bairro + ', ' + data.localidade + ' - ' + data.uf;
          } else {
            document.getElementById('endereco').value = '';
          }
        })
        .catch(function(error) {
          console.log('Ocorreu um erro:', error);
        });
    } else {
      document.getElementById('endereco').value = '';
    }
  }

  document.getElementById('cep').addEventListener('change', preencherEndereco);

function verificarSenhas() {
    var senha = document.getElementById('senha').value;
    var confirmarSenha = document.getElementById('confirmarSenha').value;

    if (senha !== confirmarSenha) {
      document.getElementById('erroSenha').textContent = 'As senhas não são iguais.';
    } else {
      document.getElementById('erroSenha').textContent = '';
    }
  }
  document.getElementById('senha').addEventListener('input', verificarSenhas);
  document.getElementById('confirmarSenha').addEventListener('input', verificarSenhas);

  //teste
const form = document.getElementById('cadastroForm');

form.addEventListener('submit', function(event) {
  event.preventDefault();


  const nome = document.getElementById('nome').value;
  const dataNascimento = document.getElementById('dataNascimento').value;
  const sexo = document.getElementById('sexo').value;
  const nomeMaterno = document.getElementById('nomeMaterno').value;
  const CPF = document.getElementById('CPF').value;
  const telefoneCelular = document.getElementById('telefoneCelular').value;
  const telefoneFixo = document.getElementById('telefoneFixo').value;
  const cep = document.getElementById('cep').value;
  const endereco = document.getElementById('endereco').value;
  const numero = document.getElementById('numero').value;
  const complemento = document.getElementById('complemento').value;
  const login = document.getElementById('login').value;
  const senha = document.getElementById('senha').value;

  const formData = {
    nome: nome,
    dataNascimento: dataNascimento,
    sexo: sexo,
    nomeMaterno: nomeMaterno,
    CPF: CPF,
    telefoneCelular: telefoneCelular,
    telefoneFixo: telefoneFixo,
    cep: cep,
    endereco: endereco,
    numero: numero,
    complemento: complemento,
    login: login,
    senha: senha
  };

  localStorage.setItem('cadastroData', JSON.stringify(formData));

  window.location.href = 'login.html';
});

$(document).ready(function() {
    $("#cadastroForm").submit(function(event) {
      event.preventDefault();
      
      $("#mensagemSucesso").show();

      $("#cadastroForm")[0].reset();
    });
  });

  function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
  }

  function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = "";
  }

  const nomeInput = document.getElementById("nome");
  nomeInput.addEventListener("input", function() {
    const nome = nomeInput.value.trim();
    if (nome.length < 15 || nome.length > 60) {
      displayError("nome-error", "O nome deve ter entre 15 e 60 caracteres.");
    } else {
      clearError("nome-error");
    }
  });
 
   const nomeMaternoInput = document.getElementById("nomeMaterno");
   nomeMaternoInput.addEventListener("input", function() {
    const nome = nomeMaternoInput.value.trim();
    if (nome.length < 15 || nome.length > 60) {
      displayError("nome-error2", "O nome deve ter entre 15 e 60 caracteres.");
    } else {
      clearError("nome-error2");
    }
   });
 
   const cpfInput = document.getElementById("CPF");
   cpfInput.addEventListener("input", function() {
     const cpf = cpfInput.value.trim();
     if (cpf.length !== 14) {
       displayError("cpf-error", "O CPF deve ter 11 caracteres.");
     } else {
       clearError("cpf-error");
     }
   });

   const loginInput = document.getElementById("login");
   loginInput.addEventListener("input", function() {
     const login = loginInput.value.trim();
     if (login.length < 6 || login.length > 6) {
       displayError("login-error", "O login deve ter 6 caracteres.");
     } else {
       clearError("login-error");
     }
   });

   const senhaInput = document.getElementById("senha");
   senhaInput.addEventListener("input", function() {
     const senha = senhaInput.value.trim();
     if (senha.length < 8 || senha.length > 8) {
       displayError("senha-error", "A senha deve ter 8 caracteres.");
     } else {
       clearError("senha-error");
     }
   });

document.getElementById("cadastroForm").addEventListener("submit", function(event) {
  if (!validateForm()) {
    event.preventDefault();
  }
});

function validateForm() {
  let isValid = true;

  const requiredFields = ["nome", "dataNascimento", "sexo", "nomeMaterno", "CPF", "telefoneCelular", "telefoneFixo", "cep", "endereco", "numero", "complemento", "login", "senha", "confirmarSenha"];
  requiredFields.forEach(function(field) {
    const input = document.getElementById(field);
    if (input.value.trim() === "") {
      displayError(field + "-error", "Campo obrigatório.");
      isValid = false;
    } else {
      clearError(field + "-error");
    }
  });

  const senhaInput = document.getElementById("senha");
  const confirmarSenhaInput = document.getElementById("confirmarSenha");
  if (senhaInput.value !== confirmarSenhaInput.value) {
    displayError("erroSenha", "As senhas não coincidem.");
    isValid = false;
  } else {
    clearError("erroSenha");
  }

  return isValid;
}

function displayError(fieldId, errorMessage) {
  const errorElement = document.getElementById(fieldId);
  errorElement.innerText = errorMessage;
}

function clearError(fieldId) {
  const errorElement = document.getElementById(fieldId);
  errorElement.innerText = "";
}