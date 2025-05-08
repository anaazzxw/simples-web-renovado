
import React, { useState, useEffect } from "react";
import { LockIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [upperCase, setUpperCase] = useState(true);
  const [lowerCase, setLowerCase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("média");

  // Gerar senha quando as opções mudam
  useEffect(() => {
    generatePassword();
  }, [length, upperCase, lowerCase, numbers, symbols]);

  // Função para gerar senha
  const generatePassword = () => {
    let charset = "";
    if (upperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) charset += "0123456789";
    if (symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    // Se nenhum charset foi selecionado
    if (charset === "") {
      setPassword("");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
    calculatePasswordStrength(newPassword);
  };

  // Calcular força da senha
  const calculatePasswordStrength = (pass) => {
    let score = 0;
    
    // Comprimento da senha
    if (pass.length >= 12) {
      score += 3;
    } else if (pass.length >= 8) {
      score += 2;
    } else if (pass.length >= 5) {
      score += 1;
    }

    // Complexidade
    const patterns = [
      /[A-Z]/, // letras maiúsculas
      /[a-z]/, // letras minúsculas
      /[0-9]/, // números
      /[^A-Za-z0-9]/ // símbolos
    ];

    patterns.forEach(pattern => {
      if (pattern.test(pass)) {
        score += 1;
      }
    });

    // Definir força baseado no score
    if (score >= 6) {
      setPasswordStrength("forte");
    } else if (score >= 4) {
      setPasswordStrength("média");
    } else {
      setPasswordStrength("fraca");
    }
  };

  // Copiar senha para o clipboard
  const copyToClipboard = () => {
    if (!password) return;
    
    navigator.clipboard.writeText(password)
      .then(() => {
        toast.success("Senha copiada para a área de transferência!");
      })
      .catch(() => {
        toast.error("Erro ao copiar a senha");
      });
  };

  // Diminuir tamanho
  const decreaseLength = () => {
    if (length > 4) {
      setLength(length - 1);
    }
  };

  // Aumentar tamanho
  const increaseLength = () => {
    if (length < 32) {
      setLength(length + 1);
    }
  };

  // Mapear a força da senha para a classe CSS
  const getStrengthClass = () => {
    switch (passwordStrength) {
      case "fraca": return "bg-red-500";
      case "média": return "bg-yellow-400";
      case "forte": return "bg-green-500";
      default: return "bg-gray-300";
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-blue-950/90 rounded-lg shadow-xl backdrop-blur-sm">
      {/* Título e ícone */}
      <div className="flex justify-center items-center mb-4">
        <LockIcon className="w-8 h-8 text-blue-400 mr-2" />
        <h1 className="text-2xl font-bold text-white">Gerador de senhas</h1>
      </div>
      
      <p className="text-center text-blue-300 mb-6">Gere instantaneamente uma senha aleatória e segura</p>
      
      {/* Exibição da senha */}
      <div className="relative mb-6">
        <div className="flex items-center justify-between bg-blue-900 p-4 rounded-lg">
          <div className="font-mono text-xl text-white overflow-x-auto whitespace-nowrap max-w-[calc(100%-40px)]">
            {password}
          </div>
          <button 
            onClick={copyToClipboard} 
            className="text-blue-300 hover:text-white transition-colors"
            aria-label="Copiar senha"
          >
            <CopyIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Personalização */}
      <div className="bg-blue-900/50 p-4 rounded-lg mb-6">
        <h2 className="text-xl text-white mb-4">Personalize sua senha</h2>
        
        {/* Comprimento da senha */}
        <div className="mb-4">
          <label className="text-sm text-blue-300 block mb-2">Número de caracteres</label>
          <div className="flex items-center">
            <button 
              onClick={decreaseLength} 
              className="bg-blue-800 text-white w-8 h-8 flex items-center justify-center rounded-l-md hover:bg-blue-700"
            >
              -
            </button>
            <span className="bg-blue-800 text-white px-4 py-1 text-center min-w-[50px]">
              {length}
            </span>
            <button 
              onClick={increaseLength} 
              className="bg-blue-800 text-white w-8 h-8 flex items-center justify-center rounded-r-md hover:bg-blue-700"
            >
              +
            </button>
          </div>
        </div>
        
        {/* Características da senha */}
        <div className="mb-4">
          <label className="text-sm text-blue-300 block mb-2">Características da senha</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="uppercase" 
                checked={upperCase} 
                onChange={() => setUpperCase(!upperCase)} 
                className="w-4 h-4 mr-2 accent-blue-500"
              />
              <label htmlFor="uppercase" className="text-white">Letras maiúsculas</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="lowercase" 
                checked={lowerCase} 
                onChange={() => setLowerCase(!lowerCase)} 
                className="w-4 h-4 mr-2 accent-blue-500"
              />
              <label htmlFor="lowercase" className="text-white">Letras minúsculas</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="numbers" 
                checked={numbers} 
                onChange={() => setNumbers(!numbers)} 
                className="w-4 h-4 mr-2 accent-blue-500"
              />
              <label htmlFor="numbers" className="text-white">Números</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="symbols" 
                checked={symbols} 
                onChange={() => setSymbols(!symbols)} 
                className="w-4 h-4 mr-2 accent-blue-500"
              />
              <label htmlFor="symbols" className="text-white">Símbolos</label>
            </div>
          </div>
        </div>
        
        {/* Força da senha */}
        <div>
          <label className="text-sm text-blue-300 block mb-2">Força da senha</label>
          <div className="flex items-center">
            <div className={`w-full h-2 rounded-full ${getStrengthClass()}`}></div>
            <div className="ml-4 min-w-[60px] text-center">
              <span className="text-sm text-white capitalize">{passwordStrength}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Botão de gerar nova senha */}
      <button 
        onClick={generatePassword}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-bold transition-colors shadow-lg"
      >
        Gerar nova senha
      </button>
    </div>
  );
};

export default PasswordGenerator;
