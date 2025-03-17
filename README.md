# 📌 Achei! – Rastreando e Recuperando Objetos Roubados  

## 🔎 Uma solução inovadora para segurança e recuperação de bens  

O **Achei!** é uma plataforma digital projetada para ajudar cidadãos e autoridades a rastrear e recuperar objetos roubados. Com uma interface intuitiva e um banco de dados colaborativo, o sistema permite que vítimas de furtos registrem detalhes sobre seus bens desaparecidos, incluindo descrições detalhadas, imagens e locais do incidente.  

Além disso, o **Achei!** oferece acesso exclusivo para **agentes da lei**, permitindo que policiais consultem e atualizem registros, enviem notificações e cruzem informações para aumentar as chances de recuperação dos objetos.  

### 🔹 Funcionalidades principais  
✅ **Cadastro de objetos roubados** – Registre bens furtados com detalhes como número de série, fotos e última localização conhecida.  
✅ **Dashboard para cidadãos** – Gerencie seus registros e facilite a geração de boletins de ocorrência.  
✅ **Plataforma exclusiva para autoridades** – Consultas, atualizações e integração com investigações em andamento.  
✅ **Mapas interativos** – Visualize zonas de risco, registros de furtos e dados de localização em tempo real.  
✅ **Notificações e alertas** – Receba avisos sobre objetos recuperados e movimentações suspeitas.  

Com foco em **segurança, escalabilidade e eficiência**, o **Achei!** utiliza tecnologias modernas para oferecer uma experiência confiável e robusta. A implementação do **Context API** no React garante um gerenciamento eficiente dos estados do sistema, melhorando a consistência e o desempenho da plataforma.  

Nosso objetivo é facilitar a recuperação de bens roubados e fornecer às autoridades uma ferramenta poderosa para combater crimes e aumentar a segurança da população. 🚀  


## 🛠 Tecnologias Utilizadas  

- **React (Web)** – Interface do usuário  
- **Context API** – Gerenciamento global de estado  
- **Styled-Components** – Estilização dinâmica e modular  
- **Formik + Yup** – Manipulação e validação de formulários  
- **Leaflet** – Mapas interativos para exibição de registros  
- **React Router** – Gerenciamento de rotas na versão Web  





## ⚙️ Configuração e Instalação  

1️⃣ **Clone o repositório:**  
```sh
git clone https://github.com/Achei2025/PlataformaWeb.git
cd achei-frontend
```

2️⃣ **Instale as dependências:**  
```sh
npm install
```

3️⃣ **Configure as variáveis de ambiente (`.env`):**  
```
REACT_APP_API_URL=http://localhost:8080
```

4️⃣ **Execute o projeto:**    
```sh
npm run dev
```


---

## 🌍 Gerenciamento de Estados – Context API  

Utilizamos a **Context API** para gerenciar estados globais de forma eficiente e escalável.  

📌 **Exemplo de um Contexto para autenticação (`AuthContext.js`):**  
```jsx
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 🎨 Estilização – Styled-Components  

📌 **Exemplo de um botão estilizado:**  
```jsx
import styled from "styled-components";

const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

export default Button;
```

---

## 📋 Formulários – Formik + Yup  

📌 **Exemplo de um formulário de login:**  
```jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("E-mail inválido").required("Obrigatório"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Obrigatório"),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <Field type="email" name="email" placeholder="E-mail" />
        <ErrorMessage name="email" component="div" />
        
        <Field type="password" name="password" placeholder="Senha" />
        <ErrorMessage name="password" component="div" />
        
        <button type="submit">Entrar</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
```


## 🗺️ Mapas – Leaflet  

📌 **Exemplo de mapa interativo com Leaflet:**  
```jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  return (
    <MapContainer center={[-23.55052, -46.633308]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[-23.55052, -46.633308]}>
        <Popup>Registro de objeto roubado aqui.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
```


## 🚀 Conclusão  

O frontend do **Achei!** foi projetado para ser modular, responsivo e escalável. As tecnologias escolhidas garantem **performance**, **facilidade de manutenção** e **boa experiência do usuário**.  


