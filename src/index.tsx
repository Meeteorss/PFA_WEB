import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { AuthWrapper } from "./context/AuthContext";
import reportWebVitals from "./reportWebVitals";
import Home from "./routes/home";
import Dashboard from "./routes/Dashboard/Dashboard";

import Settings from "./routes/settings";
import * as serviceWorker from "./serviceWorker";
import MyCoordinates from "./routes/Dashboard/Coordinates/MyCoordinates";
import Register from "./routes/register";

ReactDOM.render(
  <React.StrictMode>
    <AuthWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />}></Route>
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<div>Content</div>} />
              <Route path="coordinates" element={<MyCoordinates />} />
            </Route>
            <Route path="settings" element={<Settings />} />
            <Route path="register" element={<Register />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <AuthWrapper>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<App />}>
//             <Route index element={<Home />}></Route>
//             <Route path="dashboard" element={<Dashboard />}>
//               <Route index element={<div>Content</div>} />
//               <Route path="coordinates" element={<MyCoordinates />} />
//             </Route>
//             <Route path="settings" element={<Settings />} />
//             <Route
//               path="*"
//               element={
//                 <main style={{ padding: "1rem" }}>
//                   <p>There's nothing here!</p>
//                 </main>
//               }
//             />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </AuthWrapper>
//   </React.StrictMode>
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
